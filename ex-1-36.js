// Implements the average damping for fixed_point of x^x = 1000, ex 1.36
const tolerance = 0.0001; // some small value
function fixed_point(f, guess, n_iter) {
    function close_enough(a, b) {
        return math_abs(a - b) < tolerance;
    }
    function try_with(guess, n_iter) {
        const next = f(guess);
        display(guess, ": current");
        display(next, ": next");
        display(n_iter, ": n_iter");
        return close_enough(guess, next)
               ? next  // one may return guess
               : try_with(next, n_iter + 1);
    }
    return try_with(guess, n_iter);
}

function average(x, y) {
    return (x + y) / 2;
}
// sqrt(x) is tricky. One can apply fixed_point to the transformation y=1/x, but
// that does not converge. 

// The reasons for that are in "convergence" of numerical recipes.
// The converging function that Babylonians knew is this: y=1/2(x+1/x)


// Similarly, the transformation y=1+1/x has its fixed point in \phi - the golden ratio

//display(fixed_point(x=>1+1/x, 1, 1)); // yields 1.6180555555555556

display(fixed_point(x => math_log(1000)/math_log(x), 2, 1)); // => conv in 29 iterations
// display(fixed_point(x => math_log(1000)/math_log(x), 1, 1)); // this is wrong!
display(fixed_point(x => average(x, math_log(1000)/math_log(x)), 2, 1));

display("all done");

