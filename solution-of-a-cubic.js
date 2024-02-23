
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

function cube(x) {
    return x * x * x;
}

const h = 1e-6;
// returns a function
function deriv(g) {
    return x => (g(x+h) - g(x)) / h;
}

// returns a function
function newton_transform(g) {
    return x => x - g(x)/deriv(g)(x);
}

function newtons_method(g, guess) {
    return fixed_point(newton_transform(g), guess);
}

function sqrt(x) {
    return newtons_method(y => square(y) - x, 1);
}

// returns a function which when passed to newtons_method, solves
// the cubic x^3 + ax^2 + bx + c
function cubic(a, b, c) {
    return x => cube(x) + a * square(x) + b * x + c;
}

newtons_method(cubic(1, -2, -1), 0); // returns a zero, -0.445041815923943

