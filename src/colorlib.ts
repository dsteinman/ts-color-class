import colorNames from './color-names';

export function isColorValue(value: number): boolean {
    return value >= 0 && value <= 255;
}

export function isAlphaValue(value: number): boolean {
    return value >= 0 && value <= 1;
}

export function isRGBArray(rgba: number[]): boolean {
    if (rgba.length === 3) {
        for (let i = 0; i < 3; i++) {
            if (!isColorValue(rgba[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export function isRGBAArray(rgba: number[]): boolean {
    if (rgba.length === 4) {
        for (let i = 0; i < 3; i++) {
            if (!isColorValue(rgba[i])) {
                return false;
            }
        }
        return isAlphaValue(rgba[3]);
    }
    return false;
}

export function isColorString(colorString: string): boolean {
    if (/^#[0-9a-fA-F]{3}/.test(colorString)) {
        return true;
    }
    if (/^#[0-9a-fA-F]{6}/.test(colorString)) {
        return true;
    }
    let namedColorValue = getColorName(colorString);
    if (namedColorValue) {
        return true;
    }
    return false;
}

export function getColorName(colorString: string): number[] {
    var colStr = colorString.toLowerCase();
    if (colStr in colorNames) {
        return colorNames[colStr];
    }
    if (/ 1$/.test(colStr)) {
        // some color names had a 1 (eg. "blue 1') but none without the 1
        // the 1's were removed from colorNames, and this code was added to support either case
        var noOne = colStr.replace(/ 1$/,'');
        if (noOne in colorNames) {
            return colorNames[noOne];
        }
    }
}

export function isHSLA(hsla: any): boolean {
    return (typeof hsla === 'object' &&
        'h' in hsla && isAlphaValue(hsla.h) &&
        's' in hsla && isAlphaValue(hsla.s) &&
        'l' in hsla && isAlphaValue(hsla.l) &&
        'a' in hsla && isAlphaValue(hsla.a)
    );
}

export function isHSL(hsla: any): boolean {
    return (typeof hsla === 'object' &&
        'h' in hsla && isAlphaValue(hsla.h) &&
        's' in hsla && isAlphaValue(hsla.s) &&
        'l' in hsla && isAlphaValue(hsla.l) &&
        !('a' in hsla)
    );
}


// function getRGB() {
//     if (typeof arguments[0] === 'string') {
//         var c = arguments[0];
//         if (/^#/.test(c)) {
//             return hex2rgb(c);
//         }
//         var m;
//         if (m = c.match(/rgb\( ?(\d+), ?(\d+), ?(\d+) ?\)/)) {
//             return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3])];
//         }
//         if (m = c.match(/rgba\( ?(\d+), ?(\d+), ?(\d+), ?(\d+.?\d*) ?\)/)) {
//             return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), parseFloat(m[4])];
//         }
//
//         var name = getColorName(c);
//         if (name) {
//             // return hex2rgb(name);
//             return name;
//         }
//
//         throw new Error('invalid color string');
//     }
//     else if (isRGBAArray(arguments[0])) {
//         return arguments[0];
//     }
//     else {
//         throw new Error('invalid color data');
//     }
// }