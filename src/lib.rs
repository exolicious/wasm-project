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
pub fn trapez_verfahren(a: f32, b: f32, n: i64) -> f32 {
    let h: f32 = (b-a)/ n as f32;
    let mut iterational_part: f32 = 0.;
    for i in 1..n-1 {
        iterational_part += f(a+i as f32*h);
    }
    h*(0.5*f(a)+0.5*f(b) + iterational_part)
}


fn f(x: f32) -> f32 {
    return x*2.;
}