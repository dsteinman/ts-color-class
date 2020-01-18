import {
    isRGBArray,
    isRGBAArray,
    isAlphaValue,
    isHSL,
    isHSLA,
    parseColorString,
    rgb2hex,
    hsl2rgb,
    rgb2hsl
} from './color-lib';

class Color {
    private rgb: number[];
    private hsl: object;
    private readonly a: number;

    constructor();
    constructor(any: any);
    constructor(any: any, alpha: number); // todo
    constructor(any: number, green: number, blue: number);
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
                this.a = 1;
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
                    }
                    else {
                        this.a = 1;
                    }
                }
            } else throw Error('invalid color');
        } else if (typeof any === 'object') {
            if (any.length > 0) {
                if (any.length === 4 && isRGBAArray(any)) {
                    this.rgb = any.slice(0, 3);
                    this.a = any[3];
                }
                else if (any.length === 3 && isRGBArray(any)) {
                    this.rgb = any.slice(0, 3);
                    if (arguments.length === 2) {
                        this.a = arguments[1];
                    }
                    else {
                        this.a = 1;
                    }
                } else throw Error('invalid color');
            } else {
                if (isHSLA(any)) {
                    this.hsl = {
                        h: any.h,
                        s: any.l,
                        l: any.l,
                        a: any.a
                    };
                } else if (isHSL(any)) {
                    this.hsl = {
                        ...any
                    };
                    if (arguments.length === 2) {
                        this.a = arguments[1];
                    }
                    else {
                        this.a = 1;
                    }
                } else throw Error('invalid color');
            }
        } else throw new Error('invalid color');
    }

    _getRGB() {
        if (!this.rgb) {
            this.rgb = hsl2rgb(this.hsl);
        }
        return this.rgb;
    }

    getRGBA() {
        let rgba = this.getRGB();
        rgba.push(this.a);
        return rgba;
    }

    getRGB() {
        return this._getRGB().slice();
    }

    getHex() {
        return rgb2hex(this._getRGB());
    }

    _getHSL() {
        if (!this.hsl) {
            console.log('calculate hsl');
            this.hsl = rgb2hsl(this.rgb);
        }
        return this.hsl;
    }

    getHSL() {
        return {
            ...this._getHSL()
        }
    }

    alpha(alpha: number) {
        if (isAlphaValue(alpha)) {
            if (this.hsl) {
                return new Color( this.getHSL(), alpha );
            }
            else {
                return new Color( this.getRGB(), alpha );
            }
        } else {
            throw new Error('invalid alpha value');
        }
    }

    toString() {
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
}

export default Color;
