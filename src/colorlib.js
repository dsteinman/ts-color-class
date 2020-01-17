"use strict";
exports.__esModule = true;
var color_names_1 = require("./color-names");
function isColorValue(value) {
    return value >= 0 && value <= 255;
}
exports.isColorValue = isColorValue;
function isAlphaValue(value) {
    return value >= 0 && value <= 1;
}
exports.isAlphaValue = isAlphaValue;
function isRGBArray(rgba) {
    if (rgba.length === 3) {
        for (var i = 0; i < 3; i++) {
            if (!isColorValue(rgba[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}
exports.isRGBArray = isRGBArray;
function isRGBAArray(rgba) {
    if (rgba.length === 4) {
        for (var i = 0; i < 3; i++) {
            if (!isColorValue(rgba[i])) {
                return false;
            }
        }
        return isAlphaValue(rgba[3]);
    }
    return false;
}
exports.isRGBAArray = isRGBAArray;
function isColorString(colorString) {
    if (/^#[0-9a-fA-F]{3}/.test(colorString)) {
        return true;
    }
    if (/^#[0-9a-fA-F]{6}/.test(colorString)) {
        return true;
    }
    var namedColorValue = getColorName(colorString);
    if (namedColorValue) {
        return true;
    }
    return false;
}
exports.isColorString = isColorString;
function getColorName(colorString) {
    var colStr = colorString.toLowerCase();
    if (colStr in color_names_1["default"]) {
        return color_names_1["default"][colStr];
    }
    if (/ 1$/.test(colStr)) {
        // some color names had a 1 (eg. "blue 1') but none without the 1
        // the 1's were removed from colorNames, and this code was added to support either case
        var noOne = colStr.replace(/ 1$/, '');
        if (noOne in color_names_1["default"]) {
            return color_names_1["default"][noOne];
        }
    }
}
exports.getColorName = getColorName;
function isHSLA(hsla) {
    return (typeof hsla === 'object' &&
        'h' in hsla && isAlphaValue(hsla.h) &&
        's' in hsla && isAlphaValue(hsla.s) &&
        'l' in hsla && isAlphaValue(hsla.l) &&
        'a' in hsla && isAlphaValue(hsla.a));
}
exports.isHSLA = isHSLA;
function isHSL(hsla) {
    return (typeof hsla === 'object' &&
        'h' in hsla && isAlphaValue(hsla.h) &&
        's' in hsla && isAlphaValue(hsla.s) &&
        'l' in hsla && isAlphaValue(hsla.l) &&
        !('a' in hsla));
}
exports.isHSL = isHSL;
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
