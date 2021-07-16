mod utils;

use wasm_bindgen::prelude::*;
use web_sys::console;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-calculator!");
}

#[wasm_bindgen]
pub fn add(a: u32, b: u32 ) -> u32 {
    a+b
}


#[wasm_bindgen]
pub fn trapez_verfahren(a: f64, b: f64, n: u32) -> f64 {
    let h: f64 = (b-a)/ n as f64;
    let mut iterational_part: f64 = 0.;
    for i in 1..n {
        iterational_part += f(a+i as f64*h);
    }
    return h*(0.5*f(a)+0.5*f(b) + iterational_part);
}

fn f(x: f64) -> f64 {
    return x.sin();
}

#[wasm_bindgen]
pub fn fib(n: u32) -> u32 {
    if n == 1 {
        return 1;
    }
    else if n == 2 {
        return 1;
    }
    else {
        return fib(n-1) + fib(n-2);
    }
}

