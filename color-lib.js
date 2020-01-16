var colorNames = require('./color-names');

var isArray = function (o) {
	return typeof o === 'object' && Object.prototype.toString.apply(o) === '[object Array]';
};
var isRGBAArray = function (a) {
	if (isArray(a) && a.length === 3 || a.length === 4) {
		for (var i=0;i<3;i++) {
			if (typeof a[i] !== 'number' || !(a[i] >= 0 && a[i] <= 255)) {
				return false;
			}
		}
		if (a.length === 4) {
			if (typeof a[3] !== 'number' || !(a[3] >= 0 && a[3] <= 1)) {
				return false;
			}
		}
		return true;
	}
	return false;
};

function alpha(c, a) {
	return [c[0], c[1], c[2], a];
}

function lighten(c, l) {
	return shiftHSL(c, 0, 0, l);
}

function darken(c, l) {
	return lighten(c, -l);
}

function saturate(c, s) {
	return shiftHSL(c, 0, s, 0);
}

function desaturate(c, s) {
	return saturate(c, -s);
}

function hslval(x, y, r) {
	if (r < 0) r += 1;
	if (r > 1) r -= 1;
	var c;
	if (6 * r < 1) c = x + (y - x) * 6 * r;
	else if (2 * r < 1) c = y;
	else if (3 * r < 2) c = x + (y - x) * ((2 / 3) - r) * 6;
	else c = x;
	return c * 255;
}

function hsl2rgb(hsl) {
	var h = hsl[0], s = hsl[1], l = hsl[2], r, g, b;
	if (s === 0) {
		r = g = b = l * 255;
	} else {
		var x, y;
		if (l < 0.5) y = l * (1 + s);
		else y = l + s - l * s;
		x = 2 * l - y;
		r = hslval(x, y, h + 1 / 3);
		g = hslval(x, y, h);
		b = hslval(x, y, h - 1 / 3);
	}
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	if (hsl.length === 4) return [r, g, b, hsl[3]];
	else return [r, g, b];
}

function shiftHSL(o, h, s, l) {
	if (typeof h === 'undefined') h = 0;
	if (typeof s === 'undefined') s = 0;
	if (typeof l === 'undefined') l = 0;
	var x = getHSL(o);
	x[0] += h;
	if (x[0] < 0) x[0] += 1;
	if (x[0] > 1) x[0] -= 1;
	x[1] *= 1 + s;
	if (x[1] < 0) x[1] = 0;
	if (x[1] > 1) x[1] = 1;
	x[2] *= 1 + l;
	if (x[2] < 0) x[2] = 0;
	if (x[2] > 1) x[2] = 1;
	var n = hsl2rgb(x);
	if (o.length === 4) n[3] = o[3];
	return n;
}

function shiftHue(c, h) {
	if (typeof h === 'undefined') return c;
	return shiftHSL(c, h, 0, 0);
}

function combine(s, t, amount) {
	amount = typeof amount==='number'? amount : 0.5;
	var r = Math.round((t[0] - s[0]) * amount);
	var g = Math.round((t[1] - s[1]) * amount);
	var b = Math.round((t[2] - s[2]) * amount);
	var rgb = [s[0] + r, s[1] + g, s[2] + b];
	if (s.length === 4) rgb[3] = s[3];
	return rgb;
}

function tint(sourceColor, targetColor, amount) {
	var sH = getHue(sourceColor);
	var tH = getHue(targetColor);
	var diff = tH - sH;
	if (diff > 0 && diff > 0.5) diff -= 1;
	else if (diff < 0 && diff < -0.5) diff += 1;
	var dH = diff * amount;
	return shiftHSL(sourceColor, dH, null, null);
}

function hue(c, h) {
	return setHSL(c, h);
}

function saturation(c, s) {
	return setHSL(c, null, s);
}

function lightness(c, l) {
	return setHSL(c, null, null, l);
}

function setHSL(c, h, s, l) {
	var x = getHSL(c);
	if (typeof h === 'undefined' || h === null) h = x[0];
	if (typeof s === 'undefined' || s === null) s = x[1];
	if (typeof l === 'undefined' || l === null) l = x[2];
	if (x.length === 4) return hsl2rgb([h, s, l, x[3]]);
	else return hsl2rgb([h, s, l]);
}

function rgb2css(r) {
	if (r.length === 4) {
		if (r[3] >= 0 && r[3] < 1) {
			if (r[3] === 0) return 'transparent';
			return 'rgba(' + r[0] + ',' + r[1] + ',' + r[2] + ',' + r[3] + ')';
		}
	}
	return rgb2hex(r);
}

function getColorName(a) {
	var colStr = a.toLowerCase();
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

function isValidNumber(r) {
	return typeof r === 'number' && r >= 0 && r <= 255;
}
function isValidAlpha(r) {
	return typeof r === 'number' && r >= 0 && r < 1;
}

function setRGB(oldc, newc) {
	var c = oldc.slice();
	if (isValidNumber(newc[0])) c[0] = newc[0];
	if (isValidNumber(newc[1])) c[1] = newc[1];
	if (isValidNumber(newc[2])) c[2] = newc[2];
	if (isValidAlpha(newc[3])) c[3] = newc[3];
	return c;
}

function getAlpha(color) {
	var x = getRGB(color);
	if (x.length === 4) return x[3];
	return 0;
}

function hex2rgb(h) {
	if (/^#[0-9a-f]{6}$/i.test(h)) return [parseInt(h.substring(1, 3), 16), parseInt(h.substring(3, 5), 16), parseInt(h.substring(5, 7), 16)];
	if (/^#[0-9a-f]{3}$/i.test(h)) return [parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16), parseInt(h[3] + h[3], 16)];
	throw new Error('invalid color hex');
}
function getRGB() {
	if (typeof arguments[0] === 'string') {
		var c = arguments[0];
		if (/^#/.test(c)) {
			return hex2rgb(c);
		}
		var m;
		if (m = c.match(/rgb\( ?(\d+), ?(\d+), ?(\d+) ?\)/)) {
			return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3])];
		}
		if (m = c.match(/rgba\( ?(\d+), ?(\d+), ?(\d+), ?(\d+.?\d*) ?\)/)) {
			return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), parseFloat(m[4])];
		}
		
		var name = getColorName(c);
		if (name) {
			// return hex2rgb(name);
			return name;
		}
		
		throw new Error('invalid color string');
	}
	else if (isRGBAArray(arguments[0])) {
		return arguments[0];
	}
	else {
		throw new Error('invalid color data');
	}
}

function rgb2hex(c) {
	var r = int2hex(Math.round(c[0]));
	var g = int2hex(Math.round(c[1]));
	var b = int2hex(Math.round(c[2]));
	if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) return ('#' + r[0] + g[0] + b[0]).toLowerCase();
	return ('#' + r + g + b).toLowerCase();
}

function getHex(color) {
	if (color) {
		var c = getRGB(color);
		if (c) {
			return rgb2hex(color);
		}
	}
	return '#000';
}

function int2hex(i) {
	var v = i.toString(16);
	return v.length === 1 ? '0' + v : v;
}

function getHSL(rgb) {
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
	} else {
		var d = x - n;
		if (l > 0.5) s = d / (2 - x - n);
		else s = d / (x + n);
		if (x === r) h = (g - b) / d + (g < b ? 6 : 0);
		if (x === g) h = 2 + (b - r) / d;
		if (x === b) h = 4 + (r - g) / d;
		h /= 6;
		if (h < 0) h += 1;
	}
	
	if (rgb.length === 4) return [h, s, l, rgb[3]];
	else return [h, s, l];
}

function getHue(c) {
	return getHSL(c)[0];
}

function invert(c) {
	var rgba = c.slice();
	for (var i = 0; i < 3; i++) {
		rgba[i] = 255 - rgba[i];
	}
	return rgba;
}

module.exports = {
	rgb2hex: rgb2hex,
	rgb2css: rgb2css,
	hsl2rgb: hsl2rgb,
	hslval: hslval,
	int2hex: int2hex,
	alpha: alpha,
	lighten: lighten,
	darken: darken,
	saturate: saturate,
	desaturate: desaturate,
	shiftHSL: shiftHSL,
	shiftHue: shiftHue,
	combine: combine,
	tint: tint,
	hue: hue,
	saturation: saturation,
	lightness: lightness,
	setHSL: setHSL,
	setRGB: setRGB,
	getAlpha: getAlpha,
	getRGB: getRGB,
	getHex: getHex,
	getHSL: getHSL,
	invert: invert
};
