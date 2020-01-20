"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var color_names_1 = __importDefault(require("./color-names"));
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
function isHex3(colorString) {
    return /^#[0-9a-fA-F]{3}/.test(colorString);
}
exports.isHex3 = isHex3;
function isHex6(colorString) {
    return /^#[0-9a-fA-F]{6}/.test(colorString);
}
exports.isHex6 = isHex6;
function parseColorString(colorString) {
    var c = colorString;
    if (isHex6(c)) {
        return [parseInt(c.substring(1, 3), 16), parseInt(c.substring(3, 5), 16), parseInt(c.substring(5, 7), 16)];
    }
    if (isHex3(c)) {
        return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
    }
    var m;
    if (m = c.match(/rgb\( ?(\d+), ?(\d+), ?(\d+) ?\)/)) {
        var r = parseInt(m[1], 10);
        var g = parseInt(m[2], 10);
        var b = parseInt(m[3], 10);
        if (isColorValue(r) && isColorValue(g) && isColorValue(b)) {
            return [r, g, b];
        }
    }
    if (m = c.match(/rgba\( ?(\d+), ?(\d+), ?(\d+), ?(\d+.?\d*) ?\)/)) {
        var r = parseInt(m[1], 10);
        var g = parseInt(m[2], 10);
        var b = parseInt(m[3], 10);
        var a = parseFloat(m[4]);
        if (isColorValue(r) && isColorValue(g) && isColorValue(b) && isAlphaValue(a)) {
            return [r, g, b, a];
        }
    }
    var name = getColorName(c);
    if (name) {
        return name;
    }
}
exports.parseColorString = parseColorString;
function getColorName(colorString) {
    var colStr = colorString.toLowerCase();
    if (colStr in color_names_1.default) {
        return color_names_1.default[colStr];
    }
    if (/ 1$/.test(colStr)) {
        // some color names had a 1 (eg. "blue 1') but none without the 1
        // the 1's were removed from colorNames, and this code was added to support either case
        var noOne = colStr.replace(/ 1$/, '');
        if (noOne in color_names_1.default) {
            return color_names_1.default[noOne];
        }
    }
}
exports.getColorName = getColorName;
function isHSL(hsla) {
    return (typeof hsla === 'object' &&
        'h' in hsla && isAlphaValue(hsla.h) &&
        's' in hsla && isAlphaValue(hsla.s) &&
        'l' in hsla && isAlphaValue(hsla.l) &&
        !('a' in hsla));
}
exports.isHSL = isHSL;
function rgb2hex(c) {
    var r = int2hex(Math.round(c[0]));
    var g = int2hex(Math.round(c[1]));
    var b = int2hex(Math.round(c[2]));
    if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1])
        return ('#' + r[0] + g[0] + b[0]); //.toLowerCase();
    return ('#' + r + g + b); //.toLowerCase();
}
exports.rgb2hex = rgb2hex;
function int2hex(i) {
    var v = i.toString(16);
    return v.length === 1 ? '0' + v : v;
}
function hslval(x, y, r) {
    if (r < 0)
        r += 1;
    if (r > 1)
        r -= 1;
    var c;
    if (6 * r < 1)
        c = x + (y - x) * 6 * r;
    else if (2 * r < 1)
        c = y;
    else if (3 * r < 2)
        c = x + (y - x) * ((2 / 3) - r) * 6;
    else
        c = x;
    return c * 255;
}
function hsl2rgb(hsl) {
    var h = hsl.h, s = hsl.s, l = hsl.l, r, g, b;
    if (s === 0) {
        r = g = b = l * 255;
    }
    else {
        var x = void 0, y = void 0;
        if (l < 0.5)
            y = l * (1 + s);
        else
            y = l + s - l * s;
        x = 2 * l - y;
        r = hslval(x, y, h + 1 / 3);
        g = hslval(x, y, h);
        b = hslval(x, y, h - 1 / 3);
    }
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return [r, g, b];
}
exports.hsl2rgb = hsl2rgb;
function rgb2hsl(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var x = Math.max(r, g, b);
    var n = Math.min(r, g, b);
    var l = (x + n) / 2;
    var s = 0, h = 0;
    if (x === n) {
        s = 0;
        h = 0;
    }
    else {
        var d = x - n;
        if (l > 0.5)
            s = d / (2 - x - n);
        else
            s = d / (x + n);
        if (x === r)
            h = (g - b) / d + (g < b ? 6 : 0);
        if (x === g)
            h = 2 + (b - r) / d;
        if (x === b)
            h = 4 + (r - g) / d;
        h /= 6;
        if (h < 0)
            h += 1;
    }
    return {
        h: h,
        s: s,
        l: l
    };
}
exports.rgb2hsl = rgb2hsl;
function combine(s, t, amount) {
    amount = typeof amount === 'number' ? amount : 0.5;
    var r = Math.round((t[0] - s[0]) * amount);
    var g = Math.round((t[1] - s[1]) * amount);
    var b = Math.round((t[2] - s[2]) * amount);
    var rgb = [s[0] + r, s[1] + g, s[2] + b];
    if (s.length === 4)
        rgb[3] = s[3];
    return rgb;
}
exports.combine = combine;
function invert(c) {
    var rgba = c.slice();
    for (var i = 0; i < 3; i++) {
        rgba[i] = 255 - rgba[i];
    }
    return rgba;
}
exports.invert = invert;
function tint(sourceHue, targetHue, amount) {
    var sH = sourceHue;
    var tH = targetHue;
    var diff = tH - sH;
    var dH = diff * amount;
    var newh = sH + dH;
    if (newh < 0)
        newh += 1;
    if (newh > 1)
        newh -= 1;
    return newh;
}
exports.tint = tint;
