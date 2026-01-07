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
  const mouse = useRef({ x: 10, y: 10 });
  const startTime = useRef(performance.now());


  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let lastTime = performance.now();

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }

    


    function draw(time: number) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = time - startTime.current;
      

    
          
        
      }


      requestAnimationFrame(draw);


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
