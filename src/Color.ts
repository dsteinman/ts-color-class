import {
    isRGBArray,
    isRGBAArray,
    isColorValue,
    isAlphaValue,
    isHSL,
    isHSLA,
    parseColorString,
    rgb2hex,
    hsl2rgb,
    rgb2hsl,
    combine,
    tint,
    invert
} from './color-lib';

import {HSL} from './interfaces';

import colorNames from './color-names';

class Color {
    private rgb: number[];
    private hsl: HSL;
    private readonly a: number;

    constructor();
    // constructor(any: Color);
    constructor(any: Color);
    constructor(any: string);
    constructor(any: number[]);
    constructor(any: HSL);
    constructor(any: any);
    constructor(any: Color, alpha: number);
    constructor(any: string, alpha: number);
    constructor(any: number[], alpha: number);
    constructor(any: HSL, alpha: number);
    constructor(any: any, alpha: number);
    constructor(any: number, green: number, blue: number);
    constructor(any: number, green: number, blue: number, alpha: number);
    constructor(any?: any, green?: number, blue?: number, alpha?: number) {
        if (arguments.length === 0) {
            this.rgb = [0, 0, 0];
            this.a = 0;
        } else if (typeof any === 'number') {
            if (arguments.length === 3 && isRGBArray([any, green, blue])) {
                this.rgb = [any, green, blue];
                this.a = 1;
            } else if (arguments.length === 4 && isRGBAArray([any, green, blue, alpha])) {
                this.rgb = [any, green, blue];
                this.a = alpha;
            } else throw Error('invalid color');
        } else if (typeof any === 'string') {
            let rgba = parseColorString(any);
            if (rgba) {
                this.rgb = rgba.slice(0, 3);
                if (rgba.length === 4) {
                    this.a = rgba[3];
                } else {
                    if (arguments.length === 2 && isAlphaValue(arguments[1])) {
                        this.a = arguments[1];
                    } else {
                        this.a = 1;
                    }
                }
            } else throw Error('invalid color');
        } else if (typeof any === 'object') {
            if (any.length > 0) {
                if (any.length === 4 && isRGBAArray(any)) {
                    this.rgb = any.slice(0, 3);
                    this.a = any[3];
                } else if (any.length === 3 && isRGBArray(any)) {
                    this.rgb = any.slice(0, 3);
                    if (arguments.length === 2) {
                        this.a = arguments[1];
                    } else {
                        this.a = 1;
                    }
                } else throw Error('invalid color');
            } else {
                if (any instanceof Color) {
                    if (any.hsl) {
                        this.hsl = {
                            ...any.hsl
                        };
                    }
                    if (any.rgb) {
                        this.rgb = any.rgb.slice();
                    }
                    if (arguments.length === 2) {
                        if (isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        } else throw Error('invalid color');
                    } else {
                        this.a = any.a;
                    }
                } else if (isHSLA(any)) {
                    this.hsl = {
                        h: any.h,
                        s: any.s,
                        l: any.l
                    };
                    this.a = any.a;
                } else if (isHSL(any)) {
                    this.hsl = {
                        ...any
                    };
                    if (arguments.length === 2) {
                        this.a = arguments[1];
                    } else {
                        this.a = 1;
                    }
                } else throw Error('invalid color');
            }
        } else throw new Error('invalid color');
    }

    private _getRGB(): number[] {
        if (!this.rgb) {
            this.rgb = hsl2rgb(this.hsl);
        }
        return this.rgb;
    }

    getRGB(): number[] {
        return this._getRGB().slice();
    }

    getHex(): string {
        return rgb2hex(this._getRGB());
    }

    private _getHSL(): HSL {
        if (!this.hsl) {
            this.hsl = rgb2hsl(this.rgb);
        }
        return this.hsl;
    }

    getHSL(): HSL {
        return {
            ...this._getHSL()
        }
    }

    alpha(alpha: number): Color {
        if (isAlphaValue(alpha)) {
            if (this.hsl) {
                return new Color(this.getHSL(), alpha);
            } else {
                return new Color(this.getRGB(), alpha);
            }
        } else {
            throw new Error('invalid alpha value');
        }
    }

    getRed(): number {
        return this._getRGB()[0];
    }

    red(r: number): Color {
        if (isColorValue(r)) {
            let rgb = this._getRGB();
            return new Color( [r, rgb[1], rgb[2]], this.a);
        }
        else throw new Error('invalid red');
    }

    getGreen():number {
        return this._getRGB()[1];
    }

    green(g: number): Color {
        if (isColorValue(g)) {
            let rgb = this._getRGB();
            return new Color( [rgb[0], g, rgb[2]], this.a);
        }
        else throw new Error('invalid green');
    }

    getBlue(): number {
        return this._getRGB()[2];
    }

    blue(b: number): Color {
        if (isColorValue(b)) {
            let rgb = this._getRGB();
            return new Color( [rgb[0], rgb[1], b], this.a);
        }
        else throw new Error('invalid blue');
    }

    getAlpha(): number {
        return this.a;
    }

    getSaturation(): number {
        let hsl = this._getHSL();
        return hsl.s;
    }

    getHue(): number {
        let hsl = this._getHSL();
        return hsl.h;
    }

    hue(hue: number): Color {
        if (isAlphaValue(hue)) {
            let hsl = this._getHSL();
            return new Color( {
                h: hue,
                s: hsl.s,
                l: hsl.l,
            }, this.a);
        }
        else throw new Error('invalid hue');
    }

    shiftHue(amount: number): Color {
        let hsl = this._getHSL();
        let newHue = hsl.h + amount;
        if (newHue > 1) {
            let x = Math.floor(newHue);
            newHue -= x;
        }
        if (newHue < -1) {
            let x = Math.floor(newHue);
            newHue += Math.abs(x);
        }
        if (newHue < 0) {
            newHue += 1;
        }

        return new Color( {
            h: newHue,
            s: hsl.s,
            l: hsl.l,
        }, this.a);
    }

    saturation(saturation: number): Color {
        if (isAlphaValue(saturation)) {
            let hsl = this._getHSL();
            return new Color( {
                h: hsl.h,
                s: saturation,
                l: hsl.l,
            }, this.a);
        }
        else throw new Error('invalid saturation');
    }

    saturate(amount: number): Color {
        if (amount >= -1 && amount <= 1) {
            let s = this.getSaturation();
            s += amount;
            if (s > 1) s = 1;
            if (s < 0) s = 0;
            return this.saturation(s);
        }
        else throw new Error('invalid saturate');
    }

    desaturate(amount: number): Color {
        return this.saturate(-amount);
    }

    getLightness(): number {
        let hsl = this._getHSL();
        return hsl.l;
    }

    lightness(lightness: number): Color {
        if (isAlphaValue(lightness)) {
            let hsl = this._getHSL();
            return new Color( {
                h: hsl.h,
                s: hsl.s,
                l: lightness,
            }, this.a);
        }
    }

    lighten(amount: number): Color {
        if (amount >= -1 && amount <= 1) {
            let hsl = this._getHSL();
            let l = hsl.l + amount;
            if (l > 1) l = 1;
            if (l < 0) l = 0;
            return new Color( {
                h: hsl.h,
                s: hsl.s,
                l
            }, this.a);
        }
        else throw new Error('invalid lighten');
    }

    darken(amount: number): Color {
        return this.lighten(-amount);
    }

    combine(colorValue: any, percentage: number ): Color {
        if (isAlphaValue(percentage)) {
            let color;
            if (colorValue instanceof Color) {
                color = colorValue;
            } else {
                color = new Color(colorValue);
            }
            let newrgb = combine(this._getRGB(), color._getRGB(), percentage);
            return new Color(newrgb, this.a);
        }
        else throw new Error('invalid combine percentage');
    }

    invert(): Color {
        return new Color( invert(this._getRGB()), this.a );
    }

    tint (colorValue: any, percentage: number | undefined): Color {
        let color;
        if (colorValue instanceof Color) {
            color = colorValue;
        }
        else {
            color = new Color(colorValue);
        }
        if (typeof percentage === 'undefined') {
            percentage = 0.5;
        }
        let h = tint(this.getHue(), color.getHue(), percentage);
        return new Color({
            h,
            s: this.hsl.s,
            l: this.hsl.l
        }, this.a);
    }

    toString(): string {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            let rgb = this._getRGB();
            return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.a + ')';
        } else {
            return this.getHex();
        }
    }

    static getNames(): any {
        return colorNames;
    }
}

export default Color;
