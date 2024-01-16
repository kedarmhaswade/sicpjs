// Implement 1.38, Euler's number, e, as a continued fraction

// We reuse the continued fraction's iterative process 
function cont_frac(n, d, k) {
    function sum(curr, acc) {
        const partial = n(curr) / (acc + d(curr));
        return (curr === 1)
             ? partial
             : sum(curr - 1, partial);
    }
    return sum(k, 0);
}

// For e, n_i's are all 1, d_i's are drawn from this curious sequence:
// 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, 1, ...
// Expressing that as a function is perhaps not that difficult, but
// I keep wondering how Euler came up with that!

// function dfun(i) {
//     const d = i % 3 < 2 
//          ? 1
//          : 2 * (math_ceil(i/3));
    
//     display(d);
//     return d;
// }
cont_frac(i => 1, i => i % 3 < 2 ? 1 : 2 * (math_ceil(i/3)), 100); // prints 0.7182818284590453 ~ e-2

