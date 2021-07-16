import { Trapezverfahren, Fibonacci } from "js-trapezverfahren";

let trapezverfahren = new Trapezverfahren();
trapezverfahren.init();
let fib = new Fibonacci();
fib.init();
let buttonTrapez = $("#run-trapez").get(0);
buttonTrapez.addEventListener("click", startCalculation);
buttonTrapez.addEventListener("click", startCalculation);


function startCalculation() {
    if(trapezverfahren) {
        let engineSelectTrapez = $("#engine-select-trapez").get(0);
        let trapezA = $("#trapez-a").get(0).value;
        let trapezB = $("#trapez-b").get(0).value;
        let trapezN = $("#trapez-n").get(0).value;
        if(engineSelectTrapez.value === "js") trapezverfahren.runJsTrapez(trapezA, trapezB, trapezN);
        else if (engineSelectTrapez.value === "wasm") trapezverfahren.runWasmTrapez(trapezA, trapezB, trapezN);
    }
    else if(fib) {
        let engineSelectFib = $("#engine-select-fib").get(0);
        let nthFib = parseInt($("#nth-fib").get(0).value);
        if(engineSelectFib.value === "js") fib.runJsFib(nthFib);
        else if (engineSelectFib.value === "wasm") fib.runWasmFib(nthFib);
    }
}

function toggleTrapezverfahren() {
    if($("#content").hasClass("trapezverfahren")) return;
    fib = null;
    let buttonFib = $("#run-fib").get(0);
    buttonFib.removeEventListener("click", startCalculation);
    $("#content").removeClass("fib");
    $("#content").addClass("trapezverfahren");
    if(trapezverfahren == null) {
        trapezverfahren = new Trapezverfahren();
        trapezverfahren.init();
    }
    let buttonTrapez = $("#run-trapez").get(0);
    buttonTrapez.addEventListener("click", startCalculation);
}

function toggleFib() {
    if($("#content").hasClass("fib")) return;
    let buttonTrapez = $("#run-trapez").get(0);
    buttonTrapez.removeEventListener("click", startCalculation);
    $("#content").removeClass("fib");
    trapezverfahren = null;
    $("#content").removeClass("trapezverfahren");
    $("#content").addClass("fib");
    if(fib == null) {
        fib = new Fibonacci();
    }
    let buttonFib = $("#run-fib").get(0);
    buttonFib.addEventListener("click", startCalculation);
}

$("#tab-trapezverfahren").get(0).addEventListener("click", toggleTrapezverfahren);  

$("#tab-fib").get(0).addEventListener("click", toggleFib);  

