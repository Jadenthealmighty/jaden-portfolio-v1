"use client";

import { useEffect, useRef } from "react";

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

export default function CubeBackground({
    focalLength,
}: {
    focalLength: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTime = useRef(performance.now());

  const points = useRef<Vec3[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let lensX = 100;
    let lensY = 100;
    let lensR = 70;
    const lensF = focalLength;

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      lensX = canvas.width/ 2;
      lensY = canvas.height / 2;
      lensR = 70;
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
        y: (p.y / (p.z + d)) * scale + window.innerHeight * 0.5,
      };
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const t = (time - startTime.current) * 0.00015;
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

        let proj = project({ x, y, z });

        const oX = proj.x;
        const oY = proj.y;

        let newX = oX;
        let newY = oY;

        
        z = (z + 4) * 400;
        const dFromCent = Math.sqrt((oX - lensX) ** 2 +  (oY - lensY) ** 2);
        if (dFromCent <= lensR){
            const imgDist = 1 / (1 / lensF - 1 / z);
            newX = - imgDist * (oX - lensX) / z + lensX;
            newY = - imgDist * (oY - lensY) / z + lensY;

            ctx.beginPath();
            ctx.arc(newX, newY, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(117, 250, 246, 0.4)`;
            ctx.fill();
            
        } else {
            ctx.beginPath();
            ctx.arc(oX, oY, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(117, 250, 246, 0.4)`;
            ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(lensX, lensY, lensR, 0, Math.PI * 2);
      ctx.lineWidth = 2;
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
