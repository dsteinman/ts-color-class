"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var color_lib_1 = require("./color-lib");
var Color = /** @class */ (function () {
    function Color(any, green, blue, alpha) {
        if (arguments.length === 0) {
            this.rgb = [0, 0, 0];
            this.a = 0;
        }
        else if (typeof any === 'number') {
            if (arguments.length === 3 && color_lib_1.isRGBArray([any, green, blue])) {
                this.rgb = [any, green, blue];
                this.a = 1;
            }
            else if (arguments.length === 4 && color_lib_1.isRGBAArray([any, green, blue, alpha])) {
                this.rgb = [any, green, blue];
                this.a = alpha;
            }
            else
                throw Error('invalid color');
        }
        else if (typeof any === 'string') {
            var rgba = color_lib_1.parseColorString(any);
            if (rgba) {
                this.rgb = rgba.slice(0, 3);
                if (rgba.length === 4) {
                    this.a = rgba[3];
                }
                else {
                    if (arguments.length === 2 && color_lib_1.isAlphaValue(arguments[1])) {
                        this.a = arguments[1];
                    }
                    else {
                        this.a = 1;
                    }
                }
            }
            else
                throw Error('invalid color');
        }
        else if (typeof any === 'object') {
            if (any.length > 0) {
                if (any.length === 4 && color_lib_1.isRGBAArray(any)) {
                    this.rgb = any.slice(0, 3);
                    this.a = any[3];
                }
                else if (any.length === 3 && color_lib_1.isRGBArray(any)) {
                    this.rgb = any.slice(0, 3);
                    if (arguments.length === 2) {
                        this.a = arguments[1];
                    }
                    else {
                        this.a = 1;
                    }
                }
                else
                    throw Error('invalid color');
            }
            else {
                if (any instanceof Color) {
                    if (any.hsl) {
                        this.hsl = __assign({}, any.hsl);
                    }
                    if (any.rgb) {
                        this.rgb = any.rgb.slice();
                    }
                    if (arguments.length === 2) {
                        if (color_lib_1.isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        }
                        else
                            throw Error('invalid color');
                    }
                    else {
                        this.a = any.a;
                    }
                }
                else if (color_lib_1.isHSLA(any)) {
                    this.hsl = {
                        h: any.h,
                        s: any.s,
                        l: any.l
                    };
                    this.a = any.a;
                }
                else if (color_lib_1.isHSL(any)) {
                    this.hsl = __assign({}, any);
                    if (arguments.length === 2) {
                        this.a = arguments[1];
                    }
                    else {
                        this.a = 1;
                    }
                }
                else
                    throw Error('invalid color');
            }
        }
        else
            throw new Error('invalid color');
    }
    Color.prototype._getRGB = function () {
        if (!this.rgb) {
            this.rgb = color_lib_1.hsl2rgb(this.hsl);
        }
        return this.rgb;
    };
    Color.prototype.getRGB = function () {
        return this._getRGB().slice();
    };
    Color.prototype.getHex = function () {
        return color_lib_1.rgb2hex(this._getRGB());
    };
    Color.prototype._getHSL = function () {
        if (!this.hsl) {
            this.hsl = color_lib_1.rgb2hsl(this.rgb);
        }
        return this.hsl;
    };
    Color.prototype.getHSL = function () {
        return __assign({}, this._getHSL());
    };
    Color.prototype.alpha = function (alpha) {
        if (color_lib_1.isAlphaValue(alpha)) {
            if (this.hsl) {
                return new Color(this.getHSL(), alpha);
            }
            else {
                return new Color(this.getRGB(), alpha);
            }
        }
        else {
            throw new Error('invalid alpha value');
        }
    };
    Color.prototype.getRed = function () {
        return this._getRGB()[0];
    };
    Color.prototype.red = function (r) {
        if (color_lib_1.isColorValue(r)) {
            var rgb = this._getRGB();
            return new Color([r, rgb[1], rgb[2]], this.a);
        }
        else
            throw new Error('invalid red');
    };
    Color.prototype.getGreen = function () {
        return this._getRGB()[1];
    };
    Color.prototype.green = function (g) {
        if (color_lib_1.isColorValue(g)) {
            var rgb = this._getRGB();
            return new Color([rgb[0], g, rgb[2]], this.a);
        }
        else
            throw new Error('invalid green');
    };
    Color.prototype.getBlue = function () {
        return this._getRGB()[2];
    };
    Color.prototype.blue = function (b) {
        if (color_lib_1.isColorValue(b)) {
            var rgb = this._getRGB();
            return new Color([rgb[0], rgb[1], b], this.a);
        }
        else
            throw new Error('invalid blue');
    };
    Color.prototype.getAlpha = function () {
        return this.a;
    };
    Color.prototype.getSaturation = function () {
        var hsl = this._getHSL();
        return hsl.s;
    };
    Color.prototype.getHue = function () {
        var hsl = this._getHSL();
        return hsl.h;
    };
    Color.prototype.hue = function (hue) {
        if (color_lib_1.isAlphaValue(hue)) {
            var hsl = this._getHSL();
            return new Color({
                h: hue,
                s: hsl.s,
                l: hsl.l
            }, this.a);
        }
        else
            throw new Error('invalid hue');
    };
    Color.prototype.shiftHue = function (amount) {
        var hsl = this._getHSL();
        var newHue = hsl.h + amount;
        if (newHue > 1) {
            var x = Math.floor(newHue);
            newHue -= x;
        }
        if (newHue < -1) {
            var x = Math.floor(newHue);
            newHue += Math.abs(x);
        }
        if (newHue < 0) {
            newHue += 1;
        }
        return new Color({
            h: newHue,
            s: hsl.s,
            l: hsl.l
        }, this.a);
    };
    Color.prototype.saturation = function (saturation) {
        if (color_lib_1.isAlphaValue(saturation)) {
            var hsl = this._getHSL();
            return new Color({
                h: hsl.h,
                s: saturation,
                l: hsl.l
            }, this.a);
        }
        else
            throw new Error('invalid saturation');
    };
    Color.prototype.saturate = function (amount) {
        if (amount >= -1 && amount <= 1) {
            var s = this.getSaturation();
            s += amount;
            if (s > 1)
                s = 1;
            if (s < 0)
                s = 0;
            return this.saturation(s);
        }
        else
            throw new Error('invalid saturate');
    };
    Color.prototype.desaturate = function (amount) {
        return this.saturate(-amount);
    };
    Color.prototype.getLightness = function () {
        var hsl = this._getHSL();
        return hsl.l;
    };
    Color.prototype.lightness = function (lightness) {
        if (color_lib_1.isAlphaValue(lightness)) {
            var hsl = this._getHSL();
            return new Color({
                h: hsl.h,
                s: hsl.s,
                l: lightness
            }, this.a);
        }
    };
    Color.prototype.lighten = function (amount) {
        if (amount >= -1 && amount <= 1) {
            var hsl = this._getHSL();
            var l = hsl.l + amount;
            if (l > 1)
                l = 1;
            if (l < 0)
                l = 0;
            return new Color({
                h: hsl.h,
                s: hsl.s,
                l: l
            }, this.a);
        }
        else
            throw new Error('invalid lighten');
    };
    Color.prototype.darken = function (amount) {
        return this.lighten(-amount);
    };
    Color.prototype.combine = function (colorValue, percentage) {
        var color;
        if (colorValue instanceof Color) {
            color = colorValue;
        }
        else {
            color = new Color(colorValue);
        }
        var newrgb = color_lib_1.combine(this._getRGB(), color._getRGB(), percentage || 0.5);
        return new Color(newrgb, this.a);
    };
    Color.prototype.invert = function () {
        return new Color(color_lib_1.invert(this._getRGB()), this.a);
    };
    Color.prototype.tint = function (colorValue, percentage) {
        var color;
        if (colorValue instanceof Color) {
            color = colorValue;
        }
        else {
            color = new Color(colorValue);
        }
        if (typeof percentage === 'undefined') {
            percentage = 0.5;
        }
        var h = color_lib_1.tint(this.getHue(), color.getHue(), percentage);
        return new Color({
            h: h,
            s: this.hsl.s,
            l: this.hsl.l
        }, this.a);
    };
    Color.prototype.toString = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            var rgb = this._getRGB();
            return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.a + ')';
        }
        else {
            return this.getHex();
        }
    };
    return Color;
}());
exports["default"] = Color;
