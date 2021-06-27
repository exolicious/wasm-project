
export function trapezVerfahren(a, b, n) {
    let h = (b-a)/n;
    let iterationalPart = 0;
    for(let i = 1; i < n; i++) {
        iterationalPart += f(a+i*h);
    }
    console.log("iterational Part: " + iterationalPart);
    return h*(0.5*f(a)+0.5*f(b) + iterationalPart)
}

export function f(x) {
    return x*2;
}