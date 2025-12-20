"use client";

import { useEffect, useRef } from "react";

type Node = {
  x0: number;
  y0: number;
  xt: number;
  yt: number;
};

type Ball = {
  xt: number;
  yt: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  r: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const startTime = useRef(performance.now());

  const ball = useRef<Ball>({
    xt: 200, yt: 200,
    vx: 90, vy: 120,
    ax: 0, ay: 0,
    r: 5
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let nodes: Node[] = [];
    const spacing = 80;
    const influenceRadius = 140;

    const ballInfRad = 80;
    const gStrength = 100;
    const ballMove = 0.3;



    // wave parameters
    const wavePeriod = 12000; // ms
    const waveSpeed = 1.4;
    const waveWidth = 100;
    const waveStrength = 20;
    const waveOffset = 200;
    const mouseMove = 0.5;

    let lastTime = performance.now();

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes = [];
      const vSpacing = spacing * Math.sqrt(3) / 2;

      for (let y = 0; y < window.innerHeight + spacing; y += vSpacing) {
        for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
          const offset = Math.round(y / vSpacing) % 2 ? spacing / 2 : 0;
          nodes.push({ x0: x + offset, y0: y, xt: x + offset, yt: y});
        }
      }
    }
    
    function updateBall(dt: number) {
      const b = ball.current;

      b.xt += b.vx * dt;
      b.yt += b.vy * dt;

      if (b.xt < b.r) {
        b.xt = b.r;
        b.vx *= -1;
      }
      if (b.xt > window.innerWidth - b.r) {
        b.xt = window.innerWidth - b.r;
        b.vx *= -1;
      }
      if (b.yt < b.r) {
        b.yt = b.r;
        b.vy *= -1;
      }
      if (b.yt > window.innerHeight - b.r) {
        b.yt = window.innerHeight - b.r;
        b.vy *= -1;
      }

      const dxm = (b.xt - mouse.current.x) / ballInfRad / 2;
      const dym = (b.yt - mouse.current.y) / ballInfRad / 2;
      const d = Math.sqrt(dxm * dxm + dym * dym);
      b.ax = - gStrength / (d * d) * (dxm / d);
      b.ay = - gStrength / (d * d) * (dym/ d);

      const speed = b.vx * b.vx + b.vy * b.vy;
      
      if (speed > 700){
        b.vx = (Math.abs(b.vx) * 400)/ (b.vx * b.vx);
        b.vy = (Math.abs(b.vy) * 400)/ (b.vy * b.vy);
      }

      b.vx = b.vx + b.ax * dt;
      b.vy = b.vy + b.ay * dt;
    }

    function draw(time: number) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = time - startTime.current;
      const phase = (t % wavePeriod) / wavePeriod;

      const diag =
        (window.innerWidth + window.innerHeight) / Math.sqrt(2);
      const waveCenter = phase * diag * waveSpeed * 1.1 - waveOffset;

      const nx = 1 / Math.sqrt(2);
      const ny = -1 / Math.sqrt(2);


      // update + draw ball (on top)
      updateBall(dt);

      const b = ball.current;
      ctx.beginPath();
      ctx.arc(b.xt, b.yt, b.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();

      // draw nodes
      for (const n of nodes) {
        // mouse interaction
        const dxm = n.x0 - mouse.current.x;
        const dym = n.y0 - mouse.current.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        const mouseT = Math.max(0, 1 - dm / influenceRadius);

        // ball interaction
        const dxb = n.x0 - b.xt;
        const dyb = n.y0 - b.yt;
        const db = Math.sqrt(dxb * dxb + dyb * dyb);
        const ballT = Math.max(0, 1 - db / ballInfRad);


        // wave interaction
        const s = (n.x0 + n.y0) / Math.sqrt(2);
        const waveAmp = Math.exp(
          -((s - waveCenter) ** 2) / (2 * waveWidth ** 2)
        );

        const wx = waveAmp * waveStrength * nx;
        const wy = waveAmp * waveStrength * ny;

        const x = n.x0 + wx - dxm * mouseT * mouseMove;
        const y = n.y0 + wy - dym * mouseT * mouseMove;

        n.xt = x - dxb * ballT * ballMove;
        n.yt = y - dyb * ballT * ballMove;

        const radius = Math.min(1.6 + mouseT * 2.8 + waveAmp * 1, 4.4);
        const alpha = 0.25 + mouseT * 0.6 + waveAmp * 0.4;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(117, 250, 246, ${alpha})`;
        ctx.fill();
      }

      // draw edges
      ctx.strokeStyle = "rgba(150, 170, 255, 0.15)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx0 = nodes[i].x0 - nodes[j].x0;
          const dy0 = nodes[i].y0 - nodes[j].y0;
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);

          if (dist0 < spacing * 1.1) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].xt, nodes[i].yt);
            ctx.lineTo(nodes[j].xt, nodes[j].yt);
            ctx.stroke();
          }
        }
      }


      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    resize();
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
