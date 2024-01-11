// Type your program in here!

// Update on 11 Jan 2024: I decided to take a dump so that I could use the
// playground a bit better.


// 1.29

// sums the terms returned by term(a) as long as a <= b
function sum(a, term, next, b) {
    return a > b
         ? 0
         : term(a) + sum(next(a), term, next, b);
}

// returns the riemann sum for a given function (continuous)
function riemann_sum(f, a, b, dx) {
    function add_dx(x) {
        return x + dx;
    }
    function term(x) {
        return f(x);
    }
    return dx * sum(a + dx / 2, term, add_dx, b);
}
// sums up given terms and maintains an index
function sum_with_index(a, term, next, b, i, maxi) {
  return a > b
       ? 0
       : term(a, i, maxi) + 
         sum_with_index(next(a, i, maxi), term, next, b, i + 1, maxi);
}

// implements the Simpson 1/3 rule
function simpson(f, a, b, n) {
  const h = (b - a) / n;
  function term(a, i, maxi) {
    return i === 0 || i === maxi
         ? f(a)
         : i % 2 === 1 
         ? 4 * f(a) // odd
         : 2 * f(a); // even
  }
  function next(t, i, maxi) {
    return t + h; // i, maxi unused
  }
  return (h / 3) * sum_with_index(a, term, next, b, 0, n);
}

function cube(x) {
    return x * x * x;
}

function inc(x) {
    return x + 1;
}
// sums the cubes of integers between a and b
function sum_cubes(a, b) {
    function cube_with_index(x, i, maxi) {
        const c = x * x * x;
        display(x, c, i, maxi);
        return c;
    }
    function next(x, i, maxi) {
        return x + 1;
    }
    return sum_with_index(1, cube_with_index, next, 5, 0, 5);
}
// sum_cubes(1, 5);
display(riemann_sum(cube, 0, 1, 0.001));
display(simpson(cube, 0, 1, 100));
display(simpson(cube, 0, 1, 1000));

function simpson_improved(f, a, b, n) {
  //f, a, b, n are all in scope!
  const h = (b - a) / n;
  function y(k) {
    return f(a + k * h);
  }
  function term(i) {
    return i === 0 || i === n
         ? y(i)
         : i % 2 === 1
         ? 4 * y(i)
         : 2 * y(i);
  }
  return (h / 3) * sum(0, term, inc, n);
}
display(simpson_improved(cube, 0, 1, 1000));


function sum_iter(a, term, next, b) {
    function iter(curr, result) {
        return curr > b 
             ? result
             : iter(next(curr), result + term(curr));
    }
    return iter(a, 0);
}

function square(x) {
    return x * x;
}

function identity(x) {
    return x;
}
display(sum_iter(1, cube, inc, 5));
display(sum_iter(1, square, inc, 5));
display(sum_iter(1, identity, inc, 5));
"done";

function product(a, term, next, b) {
  return a > b
         ? 1 
         : term(a) * product(next(a), term, next, b);
}


function factorial(n) {
  return product(1, identity, inc, n);
}

display(factorial(12)); // => 479001600

function product_iter(a, term, next, b, acc) {
  return a > b
         ? acc 
         : product_iter(next(a), term, next, b, acc * term(a));
}


function factorial_iter(n) {
  return product_iter(1, identity, inc, n, 1);
}

display(factorial_iter(12)); // => 479001600

function wallis_pi(n) {
  function term(i) {
    return square((2 * i + 2) / (2 * i + 1));
  }
  return 2 * product(1, term, inc, n); // should approach π/4
}

display(wallis_pi(10));

function wallis_pi_corrected(n) {
  function term(i) {
    const numerator = 4 * square(i);
    return numerator / (numerator - 1);
  }
  return 2 * product(1, term, inc, n); // should approach π
}
display(wallis_pi_corrected(10));
display(wallis_pi_corrected(100));
display(wallis_pi_corrected(1000));


function accumulate(combiner, null_value, term, a, next, b) {
  return a > b
       ? null_value
       : combiner(term(a), accumulate(combiner, null_value, term, next(a), next, b));
}
function add(a, b) {
  return a + b;
}
function sum_acc(term, a, next, b) {
  return accumulate(add, 0, term, a, next, b);
}
function multiply(a, b) {
  return a * b;
}
function product_acc(term, a, next, b) {
  return accumulate(multiply, 1, term, a, next, b);
}

display(sum_acc(identity, 1, inc, 10)); // => 55
display(product_acc(identity, 1, inc, 5)); // => 120

function accumulate_iter(combiner, term, a, next, b, acc) {
  return a > b
       ? acc
       : accumulate_iter(combiner, term, next(a), next, b, combiner(acc, term(a)));
}

display(accumulate_iter(add, identity, 1, inc, 10, 0)); // => 55
display(accumulate_iter(multiply, identity, 1, inc, 5, 1)); // => 120


function filtered_accumulate(combiner, null_value, term, a, next, b, filter_in) {
  return a > b
       ? null_value
       : filter_in(a)
       ? combiner(term(a), filtered_accumulate(combiner, null_value, term, next(a), next, b, filter_in))
       : filtered_accumulate(combiner, null_value, term, next(a), next, b, filter_in);
}

function is_even(a) {
    return a % 2 === 0;
}

function is_odd(a) {
    return ! is_even(a);
}

display(filtered_accumulate(add, 0, identity, 1, inc, 5, is_even)); // => 2 + 4 = 6
display(filtered_accumulate(add, 0, square, 1, inc, 5, is_odd)); // => 1.1 + 3.3 + 5.5 = 35

function gcd(a, b) {
    return b === 0
         ? a
         : gcd(b, a % b);
}

function rel_prime(a, b) {
    return gcd(a, b) === 1;
}

function rel_prime_prod(n) {
  function is_rel_prime(i) {
    return rel_prime(n, i);
  }
  return filtered_accumulate(multiply, 1, identity, 1, inc, n, is_rel_prime);
}

display(rel_prime_prod(6)); // => 5
display(rel_prime_prod(10)); // => 189

function f(g) {
    return g(2);
}

// f(f);
const tolerance = 0.0001; // some small value
function fixed_point(f, guess) {
    function close_enough(a, b) {
        return math_abs(a - b) < tolerance;
    }
    function try_with(guess) {
        const next = f(guess);
        display(guess, ": current");
        display(next, ": next");
        return close_enough(guess, next)
               ? next  // one may return guess
               : try_with(next);
    }
    return try_with(guess);
}
display(fixed_point(math_tan, 0.1));

// sqrt(x) is tricky. One can apply fixed_point to the transformation y=1/x, but
// that does not converge. 

// The reasons for that are in "convergence" of numerical recipes.
// The converging function that Babylonians knew is this: y=1/2(x+1/x)


// Similarly, the transformation y=1+1/x has its fixed point in \phi - the golden ratio

display(fixed_point(x=>1+1/x, 1)); // yields 1.6180555555555556

display(fixed_point(x => math_log(1000)/math_log(x), 2));
// display(fixed_point(x => math_log(1000)/math_log(x), 1));
display("all done");

