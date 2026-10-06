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
 * A field of luminous filaments: the contour lines of a slowly flowing,
 * domain-warped noise field, drawn as thin glowing threads in aqua and
 * seafoam over deep navy. The cursor bends the threads around it. The left
 * side is kept dim so the headline stays easy to read.
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

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

// thin bright line wherever the field crosses a whole number of "levels"
float filament(float f, float levels, float sharp) {
  float d = abs(fract(f * levels) - 0.5);
  return exp(-d * d * sharp);
}

void main() {
  float asp = uRes.x / uRes.y;
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * asp, uv.y) * 1.5;

  // the cursor bends the field
  vec2 m = vec2(uMouse.x * asp, uMouse.y) * 1.5;
  vec2 d = p - m;
  float md2 = dot(d, d);
  p += d / (sqrt(md2) + 1e-3) * exp(-md2 * 7.0) * 0.18 * uMouseK;

  float t = uTime;
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.05)), fbm(p + vec2(5.2, 1.3) - vec2(t * 0.04, 0.0)));
  float f1 = fbm(p + 2.2 * q + vec2(t * 0.03, 0.0));
  vec2 p2 = p * 1.7 + vec2(8.3, 2.1);
  vec2 q2 = vec2(fbm(p2 + vec2(t * 0.06, 3.0)), fbm(p2 + vec2(1.7, 9.2) - vec2(0.0, t * 0.05)));
  float f2 = fbm(p2 + 2.0 * q2 - vec2(t * 0.04, 0.0));

  float l1 = filament(f1, 7.0, 2600.0) + 0.16 * filament(f1, 7.0, 90.0);
  float l2 = filament(f2, 10.0, 3200.0) * 0.4;

  vec3 aqua = vec3(0.30, 0.79, 0.91);
  vec3 foam = vec3(0.24, 0.88, 0.71);
  vec3 col1 = mix(aqua, foam, smoothstep(0.35, 0.75, f1));
  vec3 col2 = mix(vec3(0.20, 0.55, 0.85), aqua, smoothstep(0.3, 0.7, f2));

  // dim on the left (text), brightest toward the right and the middle band
  float w = mix(0.08, 1.0, smoothstep(0.2, 0.85, uv.x)) * (0.6 + 0.4 * sin(uv.y * 3.14159));

  vec3 base = mix(vec3(0.008, 0.07, 0.12), vec3(0.016, 0.16, 0.25), clamp(uv.x * 0.7 + (1.0 - uv.y) * 0.4, 0.0, 1.0));
  vec3 col = base + (col1 * l1 + col2 * l2) * w * 0.62;
  col += vec3(0.15, 0.55, 0.75) * exp(-md2 * 14.0) * 0.1 * uMouseK;
  col *= 1.0 - 0.4 * pow(length(uv - vec2(0.55, 0.5)) * 1.1, 2.2);

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
 * Rendered at 0.6 scale: filaments stay crisp enough while the shader stays
 * cheap on laptops and phones.
 */
export default function FilamentBackground() {
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

    let shown = false;
    let time = 30; // start part-way in so the first frame already has structure
    const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, k: 0, tk: 0 };

    const draw = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseK, mouse.k);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!shown) {
        shown = true;
        canvas.style.opacity = "1";
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = 0.6;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
    />
  );
}
