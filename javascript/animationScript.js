export {option, fade, slide, zoom, resize, pump, bounce};

function option(duration = 0,
                delay = 0,
                easing = 'linear',
                direction = 'normal',
                iterations = 1,
                fill = 'forwards') {
    return {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: easing,
        fill: fill,
        direction: direction,
        iterations: iterations
    };
}

function fade(type = true) {
    if (type === true) {
        return [{
            opacity: 0,
            visibility: 'hidden'
        }, {
            opacity: 1,
            visibility: 'visible'
        }];
    } else {
        return [{
            opacity: 1,
            visibility: 'visible'
        }, {
            opacity: 0,
            visibility: 'hidden'
        }];
    }
}

function slide(x, y, type = true) {
    if (type === true) {
        return [{
            opacity: 0,
            visibility: 'hidden',
            transform: `translate(${x}px, ${y}px)`
        }, {
            opacity: 1,
            visibility: 'visible',
            transform: 'translate(0, 0)'
        }];
    } else {
        return [{
            opacity: 1,
            visibility: 'visible',
            transform: 'translate(0, 0)'
        }, {
            opacity: 0,
            visibility: 'hidden',
            transform: `translate(${x}px, ${y}px)`
        }];
    }
}

function zoom(fromValue, toValue, type = true) {
    if (type === true) {
        return [{
            opacity: 0,
            visibility: 'hidden',
            transform: `scale(${fromValue})`
        }, {
            opacity: 1,
            visibility: 'visible',
            transform: `scale(${toValue})`
        }];
    } else {
        return [{
            opacity: 1,
            visibility: 'visible',
            transform: `scale(${fromValue})`
        }, {
            opacity: 0,
            visibility: 'hidden',
            transform: `scale(${toValue})`
        }];
    }
}

function resize(height, padding) {
    if (height === 0) {
        return [{
            opacity: 1,
            visibility: 'visible'
        }, {
            opacity: 0,
            visibility: 'hidden',
            height: 0,
            padding: 0
        }];
    } else {
        return [{
            opacity: 0,
            visibility: 'hidden'
        }, {
            opacity: 1,
            visibility: 'visible',
            height: height + 'px',
            padding: padding
        }];
    }
}

function pump(value) {
    return [{
        transform: `scale(${value})`
    }];
}

function bounce(x, y) {
    return [{
        transform: `translate(${x}px, ${y}px)`
    }];
}