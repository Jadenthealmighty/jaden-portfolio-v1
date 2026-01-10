"use client";

import { useEffect, useRef } from "react";



class PredictionPointX {
    pos_x: number;
    v_x: number;
    a_x: number;

    normed_params: Array<number>;
    vec_mag: number;

    weight: number;
    result: number;
    result_set: boolean;
    most_recent_proj: number;
    windWidth = 1000;

    constructor(pos_x: number, v_x: number, a_x: number) {
        this.pos_x = pos_x;
        this.v_x = v_x;
        this.a_x = a_x;
        this.normed_params = this.get_normed_params();
        this.vec_mag = this.get_mag();
        this.weight = 1;
        this.result = 0;
        this.result_set = false;
        this.most_recent_proj = 0.01;
    }

    set_result(result: number) {
        this.result = result;
        this.result_set = true;
    }


    get_normed_params(): Array<number> {
        const k = this.windWidth / 800;
        return [this.pos_x / this.windWidth, abs_min(this.v_x * k / 400, 10),
        abs_min(this.a_x * k / 80000, 10)];
    }

    get_mag(): number {
        const tup = this.normed_params
        return Math.sqrt(tup[0] ** 2 + tup[1] ** 2 + tup[2] ** 2 + tup[3] ** 2 + tup[4] ** 2 + tup[5] ** 2);
    }

    project_onto_this(other: PredictionPointX): number{
        const a = this.normed_params;
        const b = other.normed_params;
        if (this.vec_mag < 0.01){
            return 0.01
        }
        return this.weight * (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] + a[4] * b[4] + a[5] * b[5]) / this.vec_mag;
    }
    
    return_best_match(others: Array<PredictionPointX>): PredictionPointX {
        let highest = 0;
        let result = 0;
        if (!this.result_set){
            return others[0];
        }
        for (let i = 0; i < others.length; i++){
            let other = others[i];
            if (other.result_set && other != this){
                const proj = this.project_onto_this(other);
                if (proj > highest){
                    highest = proj;
                    result = i;
                }
            }
        }
        let best_match = others[result];
        best_match.most_recent_proj = highest
        return best_match;
    }

    update_weight(diff: number){
        this.weight = this.weight * (min((5/(diff +0.1)**0.5), 10))
    }
}

class DataPoint {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    constructor(x: number, y: number, vx: number, vy: number, ax: number, ay: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
    }
}

function abs_min(x: number, limit: number): number {
    if ( -limit < x && x < limit) {
        return x;
    } else if (x < 0){
        return -limit;
    } else {
        return limit;
    }
}
function min(x: number, y: number): number {
    if (x < y) {
        return x;
    } else {
        return y;
    }
}



function create_point(x_list: Array<number>, y_list: Array<number>, vx_list: Array<number>, vy_list: Array<number>, ax_list: Array<number>, ay_list: Array<number>): DataPoint {
    const len = x_list.length;
    return new DataPoint(x_list[len-1], y_list[len-1], vx_list[len-1], vy_list[len-1], ax_list[len-1], ay_list[len-1]);
}

function update_lists(x: number, y: number, x_list: Array<number>, y_list: Array<number>, vx_list: Array<number>, vy_list: Array<number>, ax_list: Array<number>, ay_list: Array<number>){
    x_list.push(x);
    y_list.push(y);
    if (x_list.length < 4){
        vx_list.push(0);
        vy_list.push(0);
        ax_list.push(0);
        ay_list.push(0);
    } else {
        const len = x_list.length;
        const vx = (x_list[len -1] - x_list[len-2]) / 0.03;
        const vy = (y_list[len-1] - y_list[len-2]) / 0.03;
        const ax = (vx_list[len-1] - vx_list[len-2]) / 0.03;
        const ay = (vy_list[len-1] - vy_list[len-2]) / 0.03;
        vx_list.push(vx);
        vy_list.push(vy);
        ax_list.push(ax);
        ay_list.push(ay);
    }
    if (x_list.length > 5){
        x_list.shift();
        y_list.shift();
        vx_list.shift();
        vy_list.shift();
        ax_list.shift();
        ay_list.shift();
    }
}



export default function MLBackground() {
    let running = true;


    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouse = useRef({ x: 10, y: 10 });
    const startTime = useRef(performance.now());

    let x_list: Array<number> = [];
    let y_list: Array<number> = [];
    let vx_list: Array<number> = [];
    let vy_list: Array<number> = [];
    let ax_list: Array<number> = [];
    let ay_list: Array<number> = [];
    let pointsQueue: Array<DataPoint> = [];

    let predictionQueueX: Array<PredictionPointX> = [];
    let predictionQueueY: Array<PredictionPointX> = [];

    let windWidth = 1000;
    const memWindow = 10;
    const expected_t = 0.03
    const queueLen = 60;


  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;

    let lastTime = performance.now();
    let accumulator = 0;
    const DRAW_INTERVAL = 30;

    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      windWidth = canvas.width;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }

    


    function draw() {
      let startTime = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;
      update_lists(mouseX, mouseY, x_list, y_list, vx_list, vy_list, ax_list, ay_list);
      const point = create_point(x_list, y_list, vx_list, vy_list, ax_list, ay_list);
      pointsQueue.push(point);
      console.log(point.ax)
      if (pointsQueue.length > 60){
        let pt = pointsQueue[0]
        pointsQueue.shift();
        let newPredX = new PredictionPointX(pt.x, pt.vx, pt.ax);
        let newPredY = new PredictionPointX(pt.y, pt.vy, pt.ay);
        newPredX.set_result(pt.x - mouseX);
        newPredY.set_result(pt.y - mouseY);
        predictionQueueX.push(newPredX);
        predictionQueueY.push(newPredY);
        if (predictionQueueX.length > 100){
            const best_matchX = newPredX.return_best_match(predictionQueueX);
            const best_matchY = newPredY.return_best_match(predictionQueueY);
            const newX = pt.x - best_matchX.result;
            const newY = pt.y - best_matchY.result;
            const differenceX = Math.abs(mouseX - newX);
            const differenceY = Math.abs(mouseY - newY);
            best_matchX.update_weight(differenceX);
            best_matchY.update_weight(differenceY);

            ctx.beginPath();
            ctx.arc(newX, newY, 20, 0, Math.PI * 2);
            ctx.fillStyle = "#7FAF6";
            ctx.fill();
            
            predictionQueueX.shift();
            predictionQueueY.shift();
        }

      }
      


      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#586994";
      ctx.fill();

      const pointPrev = pointsQueue[0];
      
      ctx.beginPath();
      ctx.arc(pointPrev.x, pointPrev.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#586994";
      ctx.fill();

         
          
      const dt = performance.now() - startTime;

    //   requestAnimationFrame(draw);
 
      }

    function drawLoop() {
        if (!running){
            return;
        }
        const start = performance.now();
        draw();
        const elapsed = performance.now() - start;
        console.log(elapsed);
        const delay = Math.max(0, 30 - elapsed);
        setTimeout(drawLoop, delay);
        }



    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });


    resize();

    requestAnimationFrame(drawLoop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", (e) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
      });
      running = false;
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
