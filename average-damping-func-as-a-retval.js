
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

function average(x, y) {
    return (x + y) / 2;
}

// accepts a function f and returns a function which when applied to x
// returns the average of x and f(x)
function average_damp(f) {
    return x => average(x, f(x));
}

function cube_root_1(x) {
	return fixed_point(y => average(y, x / square(y)), 1);
}

function cube_root_2(x) {
	return fixed_point(average_damp(y => x/square(y)), 1);
}

display(cube_root_1(27));
display(cube_root_2(27));
