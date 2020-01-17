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
var colorlib_1 = require("./colorlib");
var Color = /** @class */ (function () {
    function Color(any, green, blue, alpha) {
        if (arguments.length === 0) {
            this.rgba = [0, 0, 0, 0];
        }
        else if (typeof any === 'number') {
            if (arguments.length === 3) {
                if (colorlib_1.isRGBArray([any, green, blue])) {
                    this.rgba = [any, green, blue, 1];
                }
            }
            if (arguments.length === 4) {
                if (colorlib_1.isRGBAArray([any, green, blue, alpha])) {
                    this.rgba = [any, green, blue, alpha];
                }
            }
        }
        else if (typeof any === 'string') {
            if (colorlib_1.isColorString(any)) {
                this.rgba = colorlib_1.getColorName(any);
            }
        }
        else if (typeof any === 'object') {
            if (any.length > 0) {
                if (colorlib_1.isRGBAArray(any)) {
                    this.rgba = any;
                }
            }
            else {
                if (colorlib_1.isHSLA(any)) {
                    this.hsla = any;
                }
                else if (colorlib_1.isHSL(any)) {
                    this.hsla = __assign(__assign({}, any), { a: 1 });
                }
            }
        }
        else {
            throw new Error('invalid color');
        }
    }
    Color.prototype.toString = function () {
        return this.rgba.join(',');
    };
    return Color;
}());
exports["default"] = Color;
