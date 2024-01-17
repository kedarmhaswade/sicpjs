
// We reuse the continued fraction's iterative process
function cont_frac(n, d, k) {
    function sum(curr, acc) {
        const partial = n(curr) / (acc + d(curr));
        return (curr <= 1)
             ? partial
             : sum(curr - 1, partial);
    }
    return sum(k, 0);
}

// J. H. Lambert's approximation of the tan function as a cont_frac
function tan_cf(x, k) {
    return cont_frac(i => i <= 1 ? x : -x * x, i => 2 * i - 1, k);
}
const theta = math_PI / 10;
const k = 100;
math_tan(theta) - tan_cf(theta, k); // difference should be very small
