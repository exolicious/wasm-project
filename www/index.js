import * as wasm from "wasm-calculator";
import * as js from "js-calculator";


//DOM
const textarea = $("#textarea").get(0);
const button = $("#run").get(0);
const canvas = $("canvas").get(0);
const ctx = canvas.getContext('2d');
const engineSelect = $("#engine-select").get(0);
button.addEventListener("click", startCalculation);

//Trapezverfahren parameter
const a = 0.23;
const b = 100.2;
const n = 1000000000;

//state
let points = [];
let highestYValue = 0;
let paddingHorizontal = 20;
let paddingVertical = 20;
let canvasMiddle = canvas.height/2;
let xScaleFactor = 1;
let yScaleFactor = 1;

function startCalculation() {
    if(engineSelect.value === "js") runJsTrapez();
    else if (engineSelect.value === "wasm") runWasmTrapez();
}

function runJsTrapez() {
    textarea.innerHTML = textarea.innerHTML + "JS: \n"
    let beforeJS = performance.now();
    let result = js.trapezVerfahren(a, b, n);
    let jsDuration = performance.now() - beforeJS;
    textarea.innerHTML = textarea.innerHTML + "result:" + result + " \n";
    textarea.innerHTML = textarea.innerHTML + jsDuration + " ms\n";
}

function runWasmTrapez() {
    textarea.innerHTML = textarea.innerHTML + "WASM: \n"
    let beforeWasm = performance.now();
    let result = wasm.trapez_verfahren(a, b, n);
    let wasmDuration = performance.now() - beforeWasm;
    textarea.innerHTML = textarea.innerHTML + "result:" + result + " \n";
    textarea.innerHTML = textarea.innerHTML + wasmDuration + " ms\n";
}

function drawBackground() {
    ctx.fillStyle = "#AAAAAA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawAxis() {
    ctx.strokeStyle = "#002277";
    ctx.beginPath();
    //x-axis
    ctx.moveTo(paddingHorizontal, canvasMiddle);
    ctx.lineTo(canvas.width - paddingHorizontal, canvasMiddle);
    //y-axis
    ctx.moveTo(paddingHorizontal, paddingVertical);
    ctx.lineTo(paddingHorizontal, canvas.height - paddingVertical);

    ctx.stroke();
}

function calculatePointCoordinates() {
    let discretePointsAmount = 100;
    let delta = b-a;
    let stepWidth = delta / discretePointsAmount;
    for (let i = 0; i < discretePointsAmount; i++) {
        let xPos = i*stepWidth;
        let yPos = js.f(xPos);
        points.push({
                        x: xPos,
                        y: yPos
                    });
        if(yPos > highestYValue) highestYValue = yPos;
    }
    setScaleFactors();
}

function setScaleFactors() {
    let availableWidthInPixels = canvas.width - paddingHorizontal;
    xScaleFactor = availableWidthInPixels/b;
    let availablePositiveHeightInPixels = canvasMiddle - paddingVertical;
    yScaleFactor = availablePositiveHeightInPixels/highestYValue;
}

function drawFunctionCurve() {
    // move to the first point
    ctx.beginPath();
    scalePointToCanvasSpace(points[0]);
    scalePointToCanvasSpace(points[1]);
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    for (var i = 1; i < points.length - 2; i ++) {
        scalePointToCanvasSpace(points[i+1]);
        var xc = (points[i].x + points[i + 1].x) / 2;
        var yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.strokeStyle = "#992200"
    ctx.stroke();
}

function scalePointToCanvasSpace(point) {
    point.x = point.x * xScaleFactor + paddingHorizontal;
    point.y = ((-1 * point.y) * yScaleFactor + canvasMiddle);
}


drawBackground();
drawAxis();
calculatePointCoordinates();
drawFunctionCurve();