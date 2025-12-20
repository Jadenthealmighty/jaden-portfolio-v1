"use client";

import { useEffect, useRef } from "react";

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export default function CubeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTime = useRef(performance.now());

  const points = useRef<Vec3[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let lensX = 100;
    let lensY = 100;
    let lensR = 100;

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      lensX = canvas.width/ 2;
      lensY = canvas.width / 2;
      lensR = 100;
    }



    function generateCubePoints() {
      const pts: Vec3[] = [];
      const N = 25; // per edge
      const s = 1;

      const lin = (i: number) => -s + (2 * s * i) / (N - 1);

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const a = lin(i);
          const b = lin(j);

          pts.push({ x: a, y: b, z: -s });
          pts.push({ x: a, y: b, z: s });
          pts.push({ x: a, y: -s, z: b });
          pts.push({ x: a, y: s, z: b });
          pts.push({ x: -s, y: a, z: b });
          pts.push({ x: s, y: a, z: b });
        }
      }

      points.current = pts;
    }

    function project(p: Vec3) {
      const d = 4;
      const scale = 400;
      return {
        x: (p.x / (p.z + d)) * scale + window.innerWidth * 0.5,
        y: (p.y / (p.z + d)) * scale + window.innerHeight * 0.45,
      };
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const t = (time - startTime.current) * 0.00025;
      const cx = Math.cos(t);
      const sx = Math.sin(t);
      const cy = Math.cos(t * 0.7);
      const sy = Math.sin(t * 0.7);

      ctx.fillStyle = "white";

      for (const p of points.current) {
        // rotate Y
        let x = cy * p.x + sy * p.z;
        let z = -sy * p.x + cy * p.z;

        // rotate X
        let y = cx * p.y - sx * z;
        z = sx * p.y + cx * z;

        const proj = project({ x, y, z });

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(117, 250, 246, 0.4)`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(lensX, lensY, lensR, 0, Math.PI * 2);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(255, 255, 250, 0.3)';
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    resize();
    generateCubePoints();
    requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
