"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/*
 * Sunlight through moving water: an ocean gradient (deep navy → blue → teal)
 * lit by drifting caustic networks — the bright, shifting web you see on a
 * pool floor. The cursor gently parts the surface and picks up a soft glow.
 */
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseK;
uniform float uIntensity;

#define TAU 6.28318530718

float caustic(vec2 uv, float t) {
  vec2 p = mod(uv * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}

void main() {
  float asp = uRes.x / uRes.y;
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * asp, uv.y);

  // the cursor parts the surface
  vec2 m = vec2(uMouse.x * asp, uMouse.y);
  vec2 d = p - m;
  float md2 = dot(d, d);
  p += d / (sqrt(md2) + 1e-3) * exp(-md2 * 16.0) * 0.05 * uMouseK;

  // ocean gradient, light from the lower right
  vec3 deep = vec3(0.008, 0.075, 0.13);
  vec3 mid  = vec3(0.02, 0.20, 0.34);
  vec3 teal = vec3(0.03, 0.40, 0.50);
  float g = clamp(dot(uv - vec2(0.1, 1.0), normalize(vec2(1.0, -0.85))) / 1.25, 0.0, 1.0);
  vec3 col = mix(deep, mid, smoothstep(0.05, 0.7, g));
  col = mix(col, teal, smoothstep(0.55, 1.0, g) * 0.75);

  // two caustic layers at different scales/speeds for depth
  float c1 = caustic(p * 0.5, uTime * 0.30);
  float c2 = caustic(p * 0.85 + 3.7, uTime * 0.45 + 7.0);
  float c = c1 * 0.95 + c2 * 0.5;

  // keep the light away from the headline (left), richer to the right and low
  float w = mix(0.28, 1.0, smoothstep(0.2, 0.85, uv.x)) * mix(1.0, 0.7, uv.y);
  col += vec3(0.38, 0.88, 1.0) * c * 1.05 * w * uIntensity;

  // faint slanting light shafts
  float sh = sin((p.x * 1.7 - p.y * 1.1) * 3.2 + uTime * 0.18) * 0.5 + 0.5;
  col += vec3(0.08, 0.32, 0.46) * pow(sh, 7.0) * 0.12 * (1.0 - uv.y * 0.7);

  // cursor glow + vignette
  col += vec3(0.18, 0.6, 0.8) * exp(-md2 * 26.0) * 0.12 * uMouseK;
  col *= 1.0 - 0.38 * pow(length(uv - vec2(0.5, 0.55)) * 1.15, 2.2);

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

/**
 * Hero backdrop. The section's own CSS gradient sits underneath as the
 * fallback (no WebGL / loading); the canvas fades in over it. With
 * reduced-motion preferred, a single still frame is drawn and nothing animates.
 * The canvas renders at half resolution — caustics are soft, and it keeps the
 * shader cheap on laptops and phones.
 */
export default function WaterBackground({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uMouseK = gl.getUniformLocation(prog, "uMouseK");
    const uIntensity = gl.getUniformLocation(prog, "uIntensity");

    let shown = false;
    let time = 14; // start part-way in so the first frame already has structure
    const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, k: 0, tk: 0 };

    const draw = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseK, mouse.k);
      gl.uniform1f(uIntensity, intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = 0.5;
      canvas.width = Math.max(2, Math.round(rect.width * scale));
      canvas.height = Math.max(2, Math.round(rect.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) {
      return () => {
        ro.disconnect();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mouse.tk = inside ? 1 : 0;
      if (inside) {
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible) return;
      time += dt;
      const ease = 1 - Math.exp(-dt * 4);
      mouse.x += (mouse.tx - mouse.x) * ease;
      mouse.y += (mouse.ty - mouse.y) * ease;
      mouse.k += (mouse.tk - mouse.k) * ease;
      draw();
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
    />
  );
}
