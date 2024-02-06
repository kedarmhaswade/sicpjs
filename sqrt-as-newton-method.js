// 06 Feb 2024
// I don't understand this all that well, but it seems to work!
// How does the newton's method applied to a function y => square(y) - x yield the square-root of x?

function fixed_point(f, guess) {
    const e = 1e-5;
    function try_with(curr) {
        const next = f(curr);
        return math_abs(curr - next) <= e
             ? curr
             : try_with(next);
    }
    return try_with(guess);
}

function square(x) {
    return x * x;
}
const h = 1e-6;
function deriv(g) {
    return x => (g(x+h) - g(x)) / h;
}

function newton_transform(g) {
    return x => x - g(x)/deriv(g)(x);
}

function newtons_method(g, guess) {
    return fixed_point(newton_transform(g), guess);
}

function sqrt(x) {
    return newtons_method(y => square(y) - x, 1);
}
sqrt(89);
