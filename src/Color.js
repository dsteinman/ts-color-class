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
                this.a = 1;
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
                if (color_lib_1.isHSLA(any)) {
                    this.hsl = {
                        h: any.h,
                        s: any.l,
                        l: any.l,
                        a: any.a
                    };
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
    Color.prototype.getRGBA = function () {
        var rgba = this.getRGB();
        rgba.push(this.a);
        return rgba;
    };
    Color.prototype.getRGB = function () {
        return this._getRGB().slice();
    };
    Color.prototype.getHex = function () {
        return color_lib_1.rgb2hex(this._getRGB());
    };
    Color.prototype._getHSL = function () {
        if (!this.hsl) {
            console.log('calculate hsl');
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
                return new Color(this.getHSL()); // todo: add ,this.a
            }
            else {
                return new Color(this.getRGBA()); // todo: add ,this.a
            }
        }
        else {
            throw new Error('invalid alpha value');
        }
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
