"use client";

import { useEffect, useRef } from "react";



class PredictionPointX {
    pos_x: number;
    v_x: number;
    a_x: number;
    vx_cov: number;
    ax_cov: number;

    normed_params: Array<number>;
    vec_mag: number;

    weight: number;
    result: number;
    result_set: boolean;
    most_recent_proj: number;
    most_recent_proj_index: number;
    windWidth = 1000;

    constructor(pos_x: number, v_x: number, a_x: number, vx_cov: number, ax_cov: number) {
        this.pos_x = pos_x;
        this.v_x = v_x;
        this.a_x = a_x;
        this.vx_cov = vx_cov;
        this.ax_cov = ax_cov;
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
        return [this.pos_x / this.windWidth, abs_min(this.v_x * k / 400, 10), min(this.vx_cov * k /500, 10),
        abs_min(this.a_x * k / 80000, 10), min(this.ax_cov * k /40000, 10)];
    }

    get_mag(): number {
        const tup = this.normed_params;
        return Math.sqrt(tup[0] ** 2 + tup[1] ** 2 + tup[2] ** 2 + tup[3] ** 2 + tup[4] ** 2);
    }

    project_onto_this(other: PredictionPointX): number{
        const a = this.normed_params;
        const b = other.normed_params;
        if (this.vec_mag < 0.01){
            return 0.01;
        }
        return this.weight * (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] + a[4] * b[4]) / this.vec_mag;
    }
    
    return_best_match(others: Array<PredictionPointX>): PredictionPointX {
        let highest = 0;
        let result = 0;
        for (let i = 0; i < others.length; i++){
            let other = others[i];
            if (other.result_set && other != this){
                let proj = this.project_onto_this(other);
                if (proj > highest){
                    highest = proj;
                    result = i;
                }
            }
        }
        let best_match = others[result];
        this.most_recent_proj = highest;
        this.most_recent_proj_index = result;
        return best_match;
    }

    update_weight(diff: number): number {
        const next = this.weight * (min((5/(diff +0.1)**0.5), 10));
        this.weight = next;
        return next;
    }
}

class DataPoint {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    ax_cov: number;
    vx_cov: number;
    ay_cov: number;
    vy_cov: number;
    constructor(x: number, y: number, vx: number, vy: number, ax: number, ay: number, ax_cov: number, vx_cov: number, ay_cov: number, vy_cov: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.ax_cov = ax_cov;
        this.vx_cov = vx_cov;
        this.ay_cov = ay_cov;
        this.vy_cov = vy_cov;
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
function get_mean(x_list: Array<number>): number {
    let sum = 0;
    for (let i = 0; i < x_list.length; i++){
        sum += x_list[i];
    }
    return sum /x_list.length ;
}

function get_std(x_list: Array<number>): number {
    let mean = get_mean(x_list);
    let sum = 0;
    for (let i = 0; i < x_list.length; i++){
        sum += (x_list[i] - mean) ** 2;
    }
    return Math.sqrt(sum /x_list.length);
}



function create_point(x_list: Array<number>, y_list: Array<number>, vx_list: Array<number>, vy_list: Array<number>, ax_list: Array<number>, ay_list: Array<number>): DataPoint {
    const len = x_list.length;
    const vy_cov = get_std(vy_list);
    const vx_cov = get_std(vx_list);
    const ay_cov = get_std(ay_list);
    const ax_cov = get_std(ax_list);
    return new DataPoint(x_list[len-1], y_list[len-1], vx_list[len-1], vy_list[len-1], ax_list[len-1], ay_list[len-1], ax_cov, vx_cov, ay_cov, vy_cov);
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
    if (x_list.length > 10){
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


  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = window.devicePixelRatio || 1;
    const matrixPadding = 0.05; // 5% margins → 90% usage
    // const rows = Math.min(25, canvas.height / 60);
    // const cols = Math.min(40, canvas.width / 60);
    const rows = 25;
    const cols = 30;

    const fontFamily = "monospace";



    function drawMatrix(centerX: number, centerY: number, start: boolean) {
      
        const width = canvas.clientWidth * 0.9;
        const height = canvas.clientHeight * 0.9;

        const startX = (canvas.clientWidth - width) / 2;
        const startY = (canvas.clientHeight - height) / 2;

        // --- FONT + CELL SIZE ---
        const fontSize = Math.max(
            12,
            Math.min(canvas.clientWidth, canvas.clientHeight) * 0.025
        );

        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const sampleText = "-1.23";
        const cellW = ctx.measureText(sampleText).width + fontSize * 0.6;
        const cellH = fontSize * 1.6;

        const cols = Math.floor(width / cellW);
        const rows = Math.floor(height / cellH);
        const lenQ = predictionQueueX.length;
      
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = startX + c * cellW + cellW / 2;
            const y = startY + r * cellH + cellH / 2;
            const iter = r * cols + c;
            let value = "0";
            if (start) {
                const numvalue = predictionQueueX[ Math.floor(iter/5) % lenQ].normed_params[iter % 5];
                value = numvalue.toFixed(2);
            }
            ctx.fillStyle = "rgba(255,255,255,0.15)";
            ctx.fillText(value, x, y);
          }
        }
      
        drawBrackets(
          startX - 20,
          startX + width + 20,
          startY,
          startY + height
        );
      }

      function drawBrackets(
        xLeft: number,
        xRight: number,
        yTop: number,
        yBottom: number
      ) {
        const thickness = 4;
      
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = thickness;
      
        // Left bracket [
        ctx.beginPath();
        ctx.moveTo(xLeft + 15, yTop);
        ctx.lineTo(xLeft, yTop);
        ctx.lineTo(xLeft, yBottom);
        ctx.lineTo(xLeft + 15, yBottom);
        ctx.stroke();
      
        // Right bracket ]
        ctx.beginPath();
        ctx.moveTo(xRight - 15, yTop);
        ctx.lineTo(xRight, yTop);
        ctx.lineTo(xRight, yBottom);
        ctx.lineTo(xRight - 15, yBottom);
        ctx.stroke();
      }
      
      


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
      let xCen = canvas.clientWidth / 2;
      let yCen = canvas.clientHeight / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouseX = mouse.current.x;
      const mouseY = mouse.current.y;
      update_lists(mouseX, mouseY, x_list, y_list, vx_list, vy_list, ax_list, ay_list);
      const point = create_point(x_list, y_list, vx_list, vy_list, ax_list, ay_list);
      pointsQueue.push(point);
      if (predictionQueueX.length <= 100){
        drawMatrix(xCen, yCen, false);
      }
      if (pointsQueue.length > 50){
        let pt = pointsQueue[0];
        pointsQueue.shift();
        let newPredX = new PredictionPointX(pt.x, pt.vx, pt.ax, pt.vx_cov, pt.ax_cov);
        let newPredY = new PredictionPointX(pt.y, pt.vy, pt.ay, pt.vy_cov, pt.ay_cov);
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
            const xWeight = best_matchX.update_weight(differenceX);
            const yWeight = best_matchY.update_weight(differenceY);

            if (xWeight < 0.2){
                predictionQueueX.splice(newPredX.most_recent_proj_index, 1);
            } else {
                predictionQueueX.shift();
            }
            if (yWeight < 0.2){
                predictionQueueY.splice(newPredY.most_recent_proj_index, 1);
            } else {
                predictionQueueY.shift();
            }
            const confidence =1 - (newPredX.most_recent_proj + newPredY.most_recent_proj)/3 ;
            console.log(confidence);

            drawMatrix(newX, newY, true);
            
            
            ctx.beginPath();
            ctx.arc(newX, newY, 20, 0, Math.PI * 2);
            ctx.fillStyle = "#75FAF6";
            ctx.fill();

        }
        const lenPoints = pointsQueue.length;
        for (let j =0; j < 10; j++){
            const pt = pointsQueue[lenPoints - 1 - j];
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 20, 0, Math.PI * 2);
            const alpha = 1 - j / 10;
            ctx.fillStyle = "rgba(255,255,255," + alpha + ")";
            ctx.fill();
        }

      }
      

      const pointPrev = pointsQueue[0];
      
      ctx.beginPath();
      ctx.arc(pointPrev.x, pointPrev.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#586994";
      ctx.fill();

         
          
      const dt = performance.now() - startTime;

 
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
