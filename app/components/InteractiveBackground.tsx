"use client";

import { useEffect, useRef } from "react";

type Node = {
  x0: number;
  y0: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const startTime = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let nodes: Node[] = [];
    const spacing = 80;
    const influenceRadius = 140;

    // wave parameters
    const wavePeriod = 10000; // ms
    const waveSpeed = 0.5; // controls travel speed
    const waveWidth = 120;
    const waveStrength = 12;

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
          nodes.push({ x0: x + offset, y0: y });
        }
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = time - startTime.current;
      const phase = (t % wavePeriod) / wavePeriod;

      const diag =
        (window.innerWidth + window.innerHeight) / Math.sqrt(2);
      const waveCenter = phase * diag * waveSpeed;

      const nx = 1 / Math.sqrt(2);
      const ny = -1 / Math.sqrt(2);

      // draw edges
      ctx.strokeStyle = "rgba(150, 170, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx0 = nodes[i].x0 - nodes[j].x0;
          const dy0 = nodes[i].y0 - nodes[j].y0;
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);

          if (dist0 < spacing * 1.1) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x0, nodes[i].y0);
            ctx.lineTo(nodes[j].x0, nodes[j].y0);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        // mouse interaction
        const dxm = n.x0 - mouse.current.x;
        const dym = n.y0 - mouse.current.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        const mouseT = Math.max(0, 1 - dm / influenceRadius);

        // wave interaction
        const s = (n.x0 + n.y0) / Math.sqrt(2);
        const waveAmp = Math.exp(
          -((s - waveCenter) ** 2) / (2 * waveWidth ** 2)
        );

        const wx = waveAmp * waveStrength * nx;
        const wy = waveAmp * waveStrength * ny;

        const x = n.x0 + wx;
        const y = n.y0 + wy;

        const radius = 1.6 + mouseT * 2.8;
        const alpha = 0.15 + mouseT * 0.6 + waveAmp * 0.25;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(117, 250, 246, ${alpha})`;
        ctx.fill();
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
