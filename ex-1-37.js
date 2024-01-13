// Implement 1.37, the finite continued fraction

// Implement the finite continued fraction using an iterative process.
// n is a function that returns the numerator of the ith fraction
// d is a function that returns the denominator of the ith fraction
// k is the number of times to iterate
function cont_frac(n, d, k) {
    function sum(curr, acc) {
        const partial = n(curr) / (acc + d(curr));
        return (curr === 1)
             ? partial
             : sum(curr - 1, partial);
    }
    return sum(k, 0);
}
display(cont_frac(i => 1, i => 1, 10));



// function iter_to_1_by_phi(k) {
//     return math_abs(cont_frac(i => 1, i => 1, k) - phi_mul_inv) < diff 
//          ? k
//          : iter_to_1_by_phi(k + 1);
// }
// display(iter_to_1_by_phi(1));

// Implement the finite continued fraction using a recursive process.
// n is a function that returns the numerator of the ith fraction
// d is a function that returns the denominator of the ith fraction
// k is the number of times to iterate
function cont_frac_rec(n, d, k) {
    function sum(curr) {
        return curr === k
             ? n(k)/d(k)
             : n(k)/(d(k) + sum(curr + 1));
    }
    return sum(1);
}
display(cont_frac_rec(i => 1, i => 1, 10));

const phi_mul_inv = 0.6180339887498948;
const diff = 0.00000001;

// Find the number of iterations it takes for a given continued_fraction
// function to reach a given limit.
function find_conv_iters(cont_frac_calculator, nfun, dfun, k, limit) {
    return math_abs(cont_frac_calculator(nfun, dfun, k) - limit) < diff
         ? k
         : find_conv_iters(cont_frac_calculator, nfun, dfun, k + 1, limit);
}
display(find_conv_iters(cont_frac, i => 1, i => 1, 1, phi_mul_inv));
display(find_conv_iters(cont_frac_rec, i => 1, i => 1, 1, phi_mul_inv));
