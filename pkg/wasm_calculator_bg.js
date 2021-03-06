import * as wasm from './wasm_calculator_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/
export function greet() {
    wasm.greet();
}

/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a, b) {
    var ret = wasm.add(a, b);
    return ret >>> 0;
}

/**
* @param {number} a
* @param {number} b
* @param {number} n
* @returns {number}
*/
export function trapez_verfahren(a, b, n) {
    var ret = wasm.trapez_verfahren(a, b, n);
    return ret;
}

/**
* @param {number} n
* @returns {number}
*/
export function fib(n) {
    var ret = wasm.fib(n);
    return ret >>> 0;
}

export const __wbg_alert_2834b6ac9f2e4094 = function(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

