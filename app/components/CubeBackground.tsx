"use client";

import { useEffect, useRef } from "react";

type Vec3 = {
  x: number;
  y: number;
  z: number;
};
  
  export default function CubeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 10, y: 10 });
  const startTime = useRef(performance.now());

  const points = useRef<Vec3[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let lensX = 100;
    let lensY = 100;
    let lensR = 70;
    let lensF = 100;

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      lensX = canvas.width/ 2;
      lensY = canvas.height / 2;
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

      lensR = Math.abs((mouse.current.x - lensX) / (lensX)) * 180;
      lensF = Math.abs((mouse.current.y - lensY)/(lensY)* 2000);

      const tempR = Math.min(1, Math.abs((mouse.current.y - lensY) / (lensY))) * 180;

      if (mouse.current.x > 0) {
        lensF = Math.min((mouse.current.x - lensX)/(lensX), 1) * 600;
      } else {
        lensF = Math.max((mouse.current.x - lensX)/(lensX), 1) * 2000;
      }
      const tempF = lensF;
      

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const t = (time - startTime.current) * 0.00015;
      const cx = Math.cos(t);
      const sx = Math.sin(t);
      const cy = Math.cos(t * 0.7);
      const sy = Math.sin(t * 0.7);

      ctx.fillStyle = "white";
      let maxD = 0;
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
        const oZ = z;
        const dFromCent = Math.sqrt((oX - lensX) ** 2 +  (oY - lensY) ** 2);
        if (dFromCent >= tempR){
            ctx.beginPath();
            const normZ = 800 / oZ;
            const alpha = 0.8 * normZ
            ctx.arc(oX, oY, 2.8 * normZ, 0, Math.PI * 2);
            
            ctx.fillStyle = `rgba(117, 250, 246,${alpha})`;
            ctx.fill();
        }

        const imgDist = 1 / (1 / tempF - 1 / z);
        newX = - imgDist * (oX - lensX) / z + lensX;
        newY = - imgDist * (oY - lensY) / z + lensY;
        const newD = Math.sqrt((newX - lensX) ** 2 +  (newY - lensY) ** 2);
        if (newD < tempR){
            const normZ = Math.abs(imgDist / 800);
            const alpha = 0.8 * normZ;
            const radius = 2.8 * normZ;
            if (newD <= tempR - radius){
                ctx.beginPath();
                ctx.arc(newX, newY, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(117, 250, 246, ${alpha})`;
                maxD = Math.max(maxD, newD)
                ctx.fill();
        }
        }
      }

      ctx.beginPath();
      ctx.arc(lensX, lensY, tempR, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(117, 250, 246, 0.7)';
      ctx.stroke();

      //Color distortion or whatevs
      const brightness = Math.abs(80 * maxD/tempR);
      for (let i = 0; i < 360; i++) {
        ctx.beginPath();
        const hue = i;
        ctx.strokeStyle = `hsl(${hue}, 100%, ${brightness}%)`; 
        ctx.lineWidth = 8 * Math.abs(i - 120) % 365 / 365;
        ctx.arc(lensX, lensY, tempR, (i - 1) * (Math.PI / 180), i * (Math.PI / 180));
        ctx.stroke();
    }
      
      ctx.globalAlpha = 0.7;
      
      let focString = "Focal length: " + (Math.round(tempF * 100) / 100);
      ctx.font = "14px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(focString, 0.45 * canvas.width, 0.1 * canvas.height);
      ctx.globalAlpha = 1;


      requestAnimationFrame(draw);
    }

    resize();
    generateCubePoints();
    requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      });
    return () => window.removeEventListener("resize", resize);
  });

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}