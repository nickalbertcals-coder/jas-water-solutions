"use client";

import { useEffect, useRef } from "react";

const CONTOUR_SRC = "/images/contours.svg";
const CONTOUR_W = 1600;
const CONTOUR_H = 900;
const GRID_W = 256; // simulation columns; rows follow the hero's aspect ratio
const STEP_MS = 33.3; // simulation tick; larger = slower waves (16.7 ≈ real-time)
const DAMPING = 0.978;
const GRADIENT_GAIN = 1.1;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uBg;
uniform sampler2D uWave;
uniform float uTime;
void main() {
  vec3 w = texture2D(uWave, vUv).rgb;
  vec2 g = (w.rg - 0.5) * 2.0;          // surface slope (x right, y up)
  float mag = length(g);

  // slow drift of the contour layer, then refract it through the surface
  vec2 drift = vec2(sin(uTime * 0.025), cos(uTime * 0.02)) * 0.012;
  vec2 uv = (vUv - 0.5) * 0.94 + 0.5 + drift + g * 0.05;
  vec3 col = texture2D(uBg, uv).rgb;

  // water light: aqua caustic on the slope + a thin specular glint
  vec3 aqua = vec3(0.30, 0.79, 0.91);
  float light = clamp(dot(normalize(g + 1e-4), vec2(-0.55, 0.83)), 0.0, 1.0) * mag;
  col += aqua * (mag * 0.4 + light * 0.9);
  col += vec3(0.85, 0.97, 1.0) * pow(light, 2.0) * 1.2;

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

/** Rasterises the topographic contours onto the void-blue base, "cover"-fitted. */
function paintBackground(img: HTMLImageElement | null, w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  ctx.fillStyle = "#03121f";
  ctx.fillRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(w * 0.72, h * 0.3, 0, w * 0.72, h * 0.3, Math.max(w, h) * 0.55);
  glow.addColorStop(0, "rgba(23,75,114,0.28)");
  glow.addColorStop(1, "rgba(23,75,114,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  if (img) {
    const k = Math.max(w / CONTOUR_W, h / CONTOUR_H);
    const dw = CONTOUR_W * k;
    const dh = CONTOUR_H * k;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }
  return c;
}

async function loadContours(): Promise<HTMLImageElement | null> {
  try {
    const text = await (await fetch(CONTOUR_SRC)).text();
    // the file only has a viewBox; give it explicit pixel size so drawImage is reliable everywhere
    const sized = text.replace("<svg ", `<svg width="${CONTOUR_W}" height="${CONTOUR_H}" `);
    const url = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("contours failed"));
      img.src = url;
    });
    URL.revokeObjectURL(url);
    return img;
  } catch {
    return null;
  }
}

/**
 * Hero backdrop: the topographic contour layer rendered as a live water
 * surface. A small height-field wave simulation runs on the CPU; a WebGL
 * shader refracts the contours through it and lights the slopes. The
 * surface ripples under the cursor/finger and breathes with a faint idle
 * drop every second or two.
 *
 * The CSS `.contours` layer stays underneath as the fallback — it is what
 * shows for reduced-motion visitors, before the canvas is ready, and if
 * WebGL is unavailable.
 */
export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    gl.uniform1i(gl.getUniformLocation(prog, "uBg"), 0);
    gl.uniform1i(gl.getUniformLocation(prog, "uWave"), 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const makeTexture = (unit: number) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const bgTex = makeTexture(0);
    const waveTex = makeTexture(1);

    // ── simulation state ──
    let cols = GRID_W;
    let rows = 150;
    let cur = new Float32Array(cols * rows);
    let prev = new Float32Array(cols * rows);
    let pixels = new Uint8Array(cols * rows * 4).fill(128);
    let waveAllocated = false;

    const drop = (cx: number, cy: number, radius: number, strength: number) => {
      const x0 = Math.max(1, Math.floor(cx - radius));
      const x1 = Math.min(cols - 2, Math.ceil(cx + radius));
      const y0 = Math.max(1, Math.floor(cy - radius));
      const y1 = Math.min(rows - 2, Math.ceil(cy + radius));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x - cx, y - cy) / radius;
          if (d < 1) cur[y * cols + x] += strength * 0.5 * (1 + Math.cos(Math.PI * d));
        }
      }
    };

    const step = () => {
      for (let y = 1; y < rows - 1; y++) {
        const row = y * cols;
        for (let x = 1; x < cols - 1; x++) {
          const i = row + x;
          prev[i] = ((cur[i - 1] + cur[i + 1] + cur[i - cols] + cur[i + cols]) * 0.5 - prev[i]) * DAMPING;
        }
      }
      const t = cur;
      cur = prev;
      prev = t;
    };

    const encode = () => {
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const gx = (cur[i + 1] - cur[i - 1]) * GRADIENT_GAIN;
          const gy = (cur[i + cols] - cur[i - cols]) * GRADIENT_GAIN; // rows run top→bottom
          const o = i * 4;
          pixels[o] = Math.max(0, Math.min(255, 127.5 + gx * 127.5));
          pixels[o + 1] = Math.max(0, Math.min(255, 127.5 - gy * 127.5));
          pixels[o + 2] = 128;
          pixels[o + 3] = 255;
        }
      }
    };

    // ── sizing / background texture ──
    let contourImg: HTMLImageElement | null = null;
    let cancelled = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(2, Math.round(Math.min(rect.width * dpr, 1920)));
      const h = Math.max(2, Math.round(w * (rect.height / Math.max(rect.width, 1))));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);

      cols = GRID_W;
      rows = Math.max(32, Math.round(GRID_W * (h / w)));
      cur = new Float32Array(cols * rows);
      prev = new Float32Array(cols * rows);
      pixels = new Uint8Array(cols * rows * 4).fill(128); // border cells stay neutral (flat water)
      waveAllocated = false;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, bgTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, paintBackground(contourImg, w, h));
    };

    // ── input ──
    let last: { x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) {
        last = null;
        return;
      }
      const gx = ((e.clientX - rect.left) / rect.width) * cols;
      const gy = ((e.clientY - rect.top) / rect.height) * rows;
      if (last) {
        const dist = Math.hypot(gx - last.x, gy - last.y);
        // lay drops along the path so a fast swipe leaves a continuous wake
        const n = Math.min(8, Math.ceil(dist / 3));
        const strength = Math.min(0.9, 0.18 + dist * 0.025);
        for (let k = 1; k <= n; k++) {
          const t = k / n;
          drop(last.x + (gx - last.x) * t, last.y + (gy - last.y) * t, 3.2, strength / Math.sqrt(n));
        }
      }
      last = { x: gx, y: gy };
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      drop(((e.clientX - rect.left) / rect.width) * cols, ((e.clientY - rect.top) / rect.height) * rows, 5, 1.4);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    // ── loop ──
    let raf = 0;
    let visible = true;
    let lastT = performance.now();
    let acc = 0;
    let nextIdle = 600;
    let clock = 0;
    let shown = false;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        lastT = now;
        return;
      }
      const dt = Math.min(now - lastT, 64);
      lastT = now;
      clock += dt;
      acc += dt;
      while (acc >= STEP_MS) {
        step();
        acc -= STEP_MS;
      }
      nextIdle -= dt;
      if (nextIdle <= 0) {
        drop(8 + Math.random() * (cols - 16), 8 + Math.random() * (rows - 16), 4 + Math.random() * 2, 0.55);
        nextIdle = 2200 + Math.random() * 3000;
      }
      encode();
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, waveTex);
      if (!waveAllocated) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, cols, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        waveAllocated = true;
      } else {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, cols, rows, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      }
      gl.uniform1f(uTime, clock / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    loadContours().then((img) => {
      if (cancelled) return;
      contourImg = img;
      width = 0; // force a texture rebuild now that the contours exist
      resize();
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <>
      <div className="contours" aria-hidden />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
      />
    </>
  );
}
