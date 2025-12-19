"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let nodes: Node[] = [];
    const spacing = 80;
    const influenceRadius = 140;

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.scale(DPR, DPR);

      nodes = [];
      const vSpacing = spacing * Math.sqrt(3) / 2;

      for (let y = 0; y < window.innerHeight + spacing; y += vSpacing) {
        for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
          const offset = Math.round(y / vSpacing) % 2 ? spacing / 2 : 0;
          nodes.push({ x: x + offset, y });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        const t = Math.max(0, 1 - d / influenceRadius);
        const radius = 1.5 + t * 2.5;
        const alpha = 0.15 + t * 0.6;

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
        ctx.fill();
      }

      // edges
      ctx.strokeStyle = "rgba(150, 170, 255, 0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < spacing * 1.1) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
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
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
    />
  );
}
