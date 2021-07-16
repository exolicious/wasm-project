import * as wasm from "wasm-calculator";

class Trapezverfahren {
    constructor() {
        this.a = 0;
        this.b = 25;
        this.clickEventListener = null;
        this.points = [];
        this.highestYValue = 0;
        this.paddingHorizontal = 20;
        this.paddingVertical = 20;
        this.xScaleFactor = 1;
        this.yScaleFactor = 1;
        this.canvasMiddleVertical = 0;
        this.canvasMiddleHorizontal = 0;
        this.textarea = null;
        this.canvas = null;
        this.ctx = null;
    }

    init() {
        this.textarea = $("#bench-results").get(0);
        this.canvas = $("canvas").get(0);
        this.canvasMiddleVertical = canvas.height/2 - this.paddingVertical;
        this.ctx = canvas.getContext('2d');
        this.drawBackground();
        this.drawAxis();
        this.calculatePointCoordinates();
        this.drawFunctionCurve();
    }

    runJsTrapez(a, b, n) {
        this.textarea.innerHTML = this.textarea.innerHTML + "JS: \n"
        let beforeJS = performance.now();
        let result = this.trapezVerfahren(parseInt(a), parseInt(b), parseInt(n));
        let jsDuration = performance.now() - beforeJS;
        this.textarea.innerHTML = this.textarea.innerHTML + "result:" + result + " \n";
        this.textarea.innerHTML = this.textarea.innerHTML + jsDuration + " ms\n\n";
        this.textarea.scrollTop = this.textarea.scrollHeight
    }

    runWasmTrapez(a, b, n) {
        this.textarea.innerHTML = this.textarea.innerHTML + "WASM: \n"
        let beforeWasm = performance.now();
        let result = wasm.trapez_verfahren(parseInt(a), parseInt(b), parseInt(n));
        let wasmDuration = performance.now() - beforeWasm;
        this.textarea.innerHTML = this.textarea.innerHTML + "result:" + result + " \n";
        this.textarea.innerHTML = this.textarea.innerHTML + wasmDuration + " ms\n\n ";
        this.textarea.scrollTop = this.textarea.scrollHeight
    }

    drawBackground() {
        this.ctx.fillStyle = "#AAAAAA";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawAxis() {
        this.ctx.strokeStyle = "#002277";
        this.ctx.beginPath();
        //x-axis
        this.ctx.moveTo(this.paddingHorizontal, this.canvasMiddleVertical);
        this.ctx.lineTo(this.canvas.width - this.paddingHorizontal, this.canvasMiddleVertical);
        //y-axis
        this.ctx.moveTo(this.paddingHorizontal, this.paddingVertical);
        this.ctx.lineTo(this.paddingHorizontal, this.canvas.height - this.paddingVertical);

        this.ctx.stroke();
    }

    calculatePointCoordinates() {
        let discretePointsAmount = 100;
        let delta = this.b-this.a;
        let stepWidth = delta / discretePointsAmount;
        for (let i = 0; i < discretePointsAmount; i++) {
            let xPos = i*stepWidth;
            let yPos = this.f(xPos);
            this.points.push({
                            x: xPos,
                            y: yPos
                        });
            if(yPos > this.highestYValue) this.highestYValue = yPos;
        }
        this.setScaleFactors();
    }

    setScaleFactors() {
        let availableWidthInPixels = this.canvas.width - this.paddingHorizontal;
        this.xScaleFactor = availableWidthInPixels/this.b;
        let availablePositiveHeightInPixels = this.canvasMiddleVertical - this.paddingVertical;
        this.yScaleFactor = availablePositiveHeightInPixels/this.highestYValue;
    }

    drawFunctionCurve() {
        // move to the first point
        this.ctx.beginPath();
        this.scalePointToCanvasSpace(this.points[0]);
        this.scalePointToCanvasSpace(this.points[1]);
        this.ctx.moveTo(this.points[0].x, this.points[0].y);
        let xc = (this.points[0].x + this.points[0 + 1].x) / 2;
        let yc = (this.points[0].y + this.points[0 + 1].y) / 2;
        this.ctx.quadraticCurveTo(this.points[0].x, this.points[0].y, xc, yc);
        for (let i = 1; i < this.points.length - 2; i ++) {
            this.scalePointToCanvasSpace(this.points[i+1]);
            let xc = (this.points[i].x + this.points[i + 1].x) / 2;
            let yc = (this.points[i].y + this.points[i + 1].y) / 2;
            this.ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        this.ctx.strokeStyle = "#992200"
        this.ctx.stroke();
    }

    scalePointToCanvasSpace(point) {
        point.x = point.x * this.xScaleFactor + this.paddingHorizontal;
        point.y = ((-1 * point.y) * this.yScaleFactor + this.canvasMiddleVertical);
    }

    trapezVerfahren(a, b, n) {
        let h = (b-a)/n;
        let iterationalPart = 0;
        for(let i = 1; i < n; i++) {
            iterationalPart += this.f(a+i*h);
        }
        return h*(0.5*this.f(a)+0.5*this.f(b) + iterationalPart)
    }
    
    f(x) {
        return Math.sin(x);
    }

}
class Fibonacci {
    constructor() {
        this.textarea = null;
        this.engineSelect = null;
    }

    init() {
        this.textarea = $("#bench-results-fib").get(0);
        this.engineSelect = $("#engine-select").get(0);
    }

    runJsFib(n) {
        this.textarea.innerHTML = this.textarea.innerHTML + "JS: \n"
        let beforeJS = performance.now();
        let result = this.fib(n);
        let jsDuration = performance.now() - beforeJS;
        this.textarea.innerHTML = this.textarea.innerHTML + "result:" + result + " \n";
        this.textarea.innerHTML = this.textarea.innerHTML + jsDuration + " ms\n \n";
    }

    runWasmFib(n) {
        this.textarea.innerHTML = this.textarea.innerHTML + "WASM: \n"
        let beforeWasm = performance.now();
        let result = wasm.fib(n);
        let wasmDuration = performance.now() - beforeWasm;
        this.textarea.innerHTML = this.textarea.innerHTML + "result:" + result + " \n";
        this.textarea.innerHTML = this.textarea.innerHTML + wasmDuration + " ms\n \n";
    }

    fib(n) {
        if (n === 1) return 1;
        if (n === 2) return 1;
        else return this.fib(n-1) + this.fib(n-2);
    }
}

export {Trapezverfahren, Fibonacci}