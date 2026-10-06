"use client";

import { useEffect, useRef } from "react";

const POP_TIME = 0.3; // seconds

type Bubble = {
  x: number; // base x (px)
  y: number; // px from the top
  r: number; // radius at birth
  speed: number; // px / s
  phase: number;
  freq: number;
  sway: number; // px
  born: number; // y at spawn, to measure travel for growth
  dieY: number; // where it ends: somewhere in the upper-middle of the section
  pops: boolean; // pops with a little spray, or just fades away
  popT: number; // seconds into the pop, -1 while still rising
};

/** One bubble drawn once to a sprite: clear body, bright rim, a sharp highlight and a faint bounce light. */
function makeSprite() {
  const S = 128;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  const m = S / 2;
  const R = m - 4;

  const body = ctx.createRadialGradient(m, m, R * 0.35, m, m, R);
  body.addColorStop(0, "rgba(190,235,255,0)");
  body.addColorStop(0.75, "rgba(190,235,255,0.07)");
  body.addColorStop(1, "rgba(200,242,255,0.3)");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(m, m, R, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(215,244,255,0.6)";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(m, m, R - 1, 0, Math.PI * 2);
  ctx.stroke();

  // main highlight, upper left
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.ellipse(m - R * 0.42, m - R * 0.46, R * 0.2, R * 0.11, -0.7, 0, Math.PI * 2);
  ctx.fill();

  // soft crescent of light bouncing through the bottom right
  ctx.strokeStyle = "rgba(170,230,255,0.38)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(m, m, R * 0.72, 0.15 * Math.PI, 0.55 * Math.PI);
  ctx.stroke();
  return c;
}

/**
 * Aquarium-style air bubbles rising through the section — and nothing else.
 * Small bubbles drifting up in lazy S-curves, swelling slightly as they rise,
 * a few streams from fixed "air stone" spots plus random strays. None reach the
 * top: each one either pops with a little spray or fades away somewhere in the
 * upper-middle of the section. Drawn on a
 * 2D canvas from one pre-rendered sprite, so it stays cheap. Pauses when the
 * section is off screen. Not rendered at all for reduced motion.
 */
export default function BubblesBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = makeSprite();
    const STREAMS = [0.1, 0.34, 0.58, 0.8, 0.93];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let bubbles: Bubble[] = [];

    const spawn = (anywhere: boolean): Bubble => {
      const r = 1.4 + Math.pow(Math.random(), 3) * 7;
      const dieY = h * (0.18 + Math.random() * 0.5);
      const fromStream = Math.random() < 0.6;
      const x = fromStream
        ? STREAMS[Math.floor(Math.random() * STREAMS.length)] * w + (Math.random() + Math.random() - 1) * 22
        : Math.random() * w;
      const y = anywhere ? dieY + 40 + Math.random() * (h - dieY) : h + r + Math.random() * 30;
      return {
        x,
        y,
        r,
        speed: 20 + r * 8 + Math.random() * 12,
        phase: Math.random() * Math.PI * 2,
        freq: 0.8 + Math.random() * 1.2,
        sway: 2 + r * 0.8 + Math.random() * 3,
        born: y,
        dieY,
        pops: Math.random() < 0.55,
        popT: -1,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const target = Math.min(140, Math.round((w * h) / 8000));
      bubbles = Array.from({ length: target }, () => spawn(true));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let clock = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || w === 0) return;
      clock += dt;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        const x = b.x + Math.sin(clock * b.freq + b.phase) * b.sway;

        // popping: a thin ring flicks outward with a few droplets, then it is gone
        if (b.popT >= 0) {
          b.popT += dt;
          const p = b.popT / POP_TIME;
          if (p >= 1) {
            bubbles[i] = spawn(false);
            continue;
          }
          const rr = b.r * (1 + Math.max(0, (b.born - b.dieY) / Math.max(h, 1)) * 0.3);
          ctx.globalAlpha = (1 - p) * 0.85;
          ctx.strokeStyle = "rgba(225,247,255,1)";
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.arc(x, b.y, rr * (1 + p * 0.9), 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "rgba(235,250,255,1)";
          for (let k = 0; k < 6; k++) {
            const ang = (k / 6) * Math.PI * 2 + b.phase;
            const dist = rr * (0.7 + p * 2.4);
            ctx.beginPath();
            ctx.arc(x + Math.cos(ang) * dist, b.y + Math.sin(ang) * dist, Math.max(0.5, rr * 0.13 * (1 - p)), 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        b.y -= b.speed * dt;
        const travelled = (b.born - b.y) / Math.max(h, 1);
        const r = b.r * (1 + Math.max(0, travelled) * 0.3);

        if (b.y <= b.dieY) {
          if (b.pops) {
            b.popT = 0;
            continue;
          }
          // a fader dissolves over the last stretch instead
          if (b.y < b.dieY - 90) {
            bubbles[i] = spawn(false);
            continue;
          }
        }

        const fadeIn = Math.min(1, Math.max(0, (h + r - b.y) / 60));
        const fadeOut = b.pops ? 1 : Math.min(1, Math.max(0, (b.y - (b.dieY - 90)) / 90));
        const a = Math.min(fadeIn, fadeOut) * (0.7 + Math.min(r, 9) / 22);
        if (a <= 0.01) continue;
        ctx.globalAlpha = a;
        const d = r * 2;
        ctx.drawImage(sprite, x - r, b.y - r, d, d);
      }
      ctx.globalAlpha = 1;
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
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
