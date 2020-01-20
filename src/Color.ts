import {
    isRGBArray,
    isRGBAArray,
    isColorValue,
    isAlphaValue,
    isHSL,
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


/** @class Color
 * Color class accepts a CSS color string, rgb, hsl data as the input, manipulate the color, and returns a CSS-compatible color string.
 * @constructor
 *
 * @example
 * new Color('red')  // named CSS colors
 *
 * @example
 * new Color('red', 0.5)  // named CSS colors and transparency
 *
 * @example
 * new Color('#f00')  // hex 3 characters
 *
 * @example
 * new Color('#e2b644')  // hex 6 characters
 *
 * @example
 * new Color('rgb(255, 0, 100)')  // rgb()
 *
 * @example
 * new Color('rgba(255, 0, 100, 0.5)')  // rgba()
 *
 * @example
 * new Color('rgba(255, 0, 100, 0.5)', 0.1)  // 0.1 overrides alpha from rgba
 *
 * @example
 * new Color([255,0,0])  // rgb array
 *
 * @example
 * new Color([255,0,0], 0.5)  // rgb and transparency
 *
 * @example
 * new Color({  // hsl object
 *     h: 0.2,
 *     s: 0.5,
 *     l: 1
 * })
 *
 * @example
 * new Color({  // hsl object and transparency
 *     h: 0.5,
 *     s: 1,
 *     l: 1
 * }, 0.5)
 */
class Color {
    private rgb: number[];
    private hsl: HSL;
    private readonly a: number;

    constructor();
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
                if (arguments.length === 2 && isAlphaValue(arguments[1])) {
                    this.a = arguments[1];
                }
                else if (rgba.length === 4) {
                    this.a = rgba[3];
                }
                else {
                    this.a = 1;
                }
            } else throw Error('invalid color');
        } else if (typeof any === 'object') {
            if (any.length > 0) {
                if (any.length === 3 && isRGBArray(any)) {
                    this.rgb = any.slice(0, 3);
                    if (arguments.length === 2) {
                        if (isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        } else throw new Error('invalid alpha value');
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
                        } else throw new Error('invalid alpha value');
                    } else {
                        this.a = any.a;
                    }
                } else if (isHSL(any)) {
                    this.hsl = {
                        ...any
                    };
                    if (arguments.length === 2) {
                        if (isAlphaValue(arguments[1])) {
                            this.a = arguments[1];
                        } else throw new Error('invalid alpha value');
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

    /**
     * Return the red, green, blue color values with the alpha channel as an array
     *
     * @method getRGB
     * @memberof Color
     * @return {Array} rgba the array of color values
     * @instance
     *
     * @example
     * new Color('red).getRGB();   // returns [255,0,0]
     *
     */
    getRGB(): number[] {
        return this._getRGB().slice();
    }

    /**
     * Returns the hexidecimal value of the color
     *
     * @method getHex
     * @memberof Color
     * @return {String} hex color value
     * @instance
     *
     * @example
     * new Color('rgba(255,0,0,0.5)').getHex(); // returns "#f00"
     *
     */
    getHex(): string {
        return rgb2hex(this._getRGB());
    }

    private _getHSL(): HSL {
        if (!this.hsl) {
            this.hsl = rgb2hsl(this.rgb);
        }
        return this.hsl;
    }

    /**
     * Returns an [h,s,l] array from color string
     *
     * @method getHSL
     * @memberof Color
     * @return {Number[]} hsl array of [hue,saturation,lightness]
     * @instance
     *
     * @example
     * new Color('#f00').getHSL(); // returns [0,1,0.5]
     *
     */
    getHSL(): HSL {
        return {
            ...this._getHSL()
        }
    }

    /**
     * Sets the transparency of a color
     *
     * @method alpha
     * @memberof Color
     * @param {Number} alpha transparency level between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').alpha(0.5).toString();  // returns "rgba(255,0,0,0.5)"
     *
     */
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

    /**
     * Returns the red component of a color string
     *
     * @method getRed
     * @memberof Color
     * @return {Number} red component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getRed(); // returns 255
     *
     */
    getRed(): number {
        return this._getRGB()[0];
    }

    /**
     * Set the red component of a color
     *
     * @method red
     * @memberof Color
     * @param {Number} red red component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(0,0,255)').red(255).toString();  // returns "#F0F"
     *
     */
    red(r: number): Color {
        if (isColorValue(r)) {
            let rgb = this._getRGB();
            return new Color( [r, rgb[1], rgb[2]], this.a);
        }
        else throw new Error('invalid red');
    }

    /**
     * Returns the green component of a color string
     *
     * @method getGreen
     * @memberof Color
     * @return {Number} green component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getGreen(); // returns 255
     *
     */
    getGreen():number {
        return this._getRGB()[1];
    }

    /**
     * Set the green component of a color
     *
     * @method green
     * @memberof Color
     * @param {Number} green green component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').green(255).toString();  // returns "#FF0"
     *
     */
    green(g: number): Color {
        if (isColorValue(g)) {
            let rgb = this._getRGB();
            return new Color( [rgb[0], g, rgb[2]], this.a);
        }
        else throw new Error('invalid green');
    }

    /**
     * Returns the blue component of a color string
     *
     * @method getBlue
     * @memberof Color
     * @return {Number} blue component 0-255
     * @instance
     *
     * @example
     * new Color('#fff').getBlue(); // returns 255
     *
     */
    getBlue(): number {
        return this._getRGB()[2];
    }

    /**
     * Set the blue component of a color
     *
     * @method blue
     * @memberof Color
     * @param {Number} blue blue component 0-255
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#FF0').blue(255).toString();  // returns "#FFF"
     *
     */
    blue(b: number): Color {
        if (isColorValue(b)) {
            let rgb = this._getRGB();
            return new Color( [rgb[0], rgb[1], b], this.a);
        }
        else throw new Error('invalid blue');
    }

    /**
     * Returns the transparency of a color
     *
     * @method getAlpha
     * @memberof Color
     * @return {Number} alpha transparency level between 0 and 1
     * @instance
     *
     * @example
     * new Color('#F00').getAlpha(); // returns 0
     * new Color('rgba(255,0,0,0.5)').getAlpha(); // returns 0.5
     *
     */
    getAlpha(): number {
        return this.a;
    }

    /**
     * Return the "saturation" of a color
     *
     * @method getSaturation
     * @memberof Color
     * @return {Number} saturation saturation value between 0 and 1
     * @instance
     v
     * @example
     * new Color('rgb(100,100,100)').getSaturation(); // returns 0
     * new Color('rgb(100,50,100)').getSaturation();  // returns 0.8333333333333334
     * new Color('rgb(100,0,100)').getSaturation();   // returns 1
     *
     */
    getSaturation(): number {
        let hsl = this._getHSL();
        return hsl.s;
    }

    /**
     * Return the "hue" of a color
     *
     * @method getHue
     * @memberof Color
     * @return {Number} hue hue value between 0 and 1
     * @instance
     *
     * @example
     * new Color('#a1b2c1').getHue(); // returns "0.578125"}
     * new Color('#f00').getHue(); // returns 0
     * new Color('#0f0').getHue(); // returns 0.3333333333333333
     * new Color('#00f').getHue(); // returns 0.6666666666666666
     *
     */
    getHue(): number {
        let hsl = this._getHSL();
        return hsl.h;
    }

    /**
     * Set the "hue" of a color
     *
     * @method hue
     * @memberof Color
     * @param {Number} hue hue value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').hue(2/3).toString(); // returns "#00F"
     * new Color('#0f0').hue(1).toString(); // returns "#F00"
     * new Color('#00f').hue(1/3).toString(); // returns "#0F0"
     *
     */
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

    /**
     * Shifts the "hue" of a color value by a given percentage
     *
     * @method shiftHue
     * @memberof Color
     * @param {Number} hueShift amount to modify the hue by between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(255,255,0).shiftHue(0.25).toString(); // returns "#00FF7F"
     *
     */
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

    /**
     * Set the "saturation" of a color
     *
     * @method saturation
     * @memberof Color
     * @param {Number} saturation saturation value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(100,50,50)').saturation(0).toString(); // returns "#4B4B4B"
     * new Color('rgb(50,0,0)').saturation(0.5).toString();  // returns "#260C0C"
     * new Color('rgb(50,50,100)').saturation(1).toString(); // returns "#000096"
     *
     */
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

    /**
     * Increases the "saturation" of a color value
     *
     * @method saturate
     * @memberof Color
     * @param {Number} saturateBy amount to saturate between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(125,0,0)').saturate(0.2).toString(); // returns "#7D0000"
     *
     */
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

    /**
     * Decreases the "saturation" of a color value
     *
     * @method desaturate
     * @memberof Color
     * @param {Number} desaturateBy amount to desaturate between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(125,0,0).desaturate(0.2).toString(); // returns "#710C0C"
     *
     */
    desaturate(amount: number): Color {
        return this.saturate(-amount);
    }

    /**
     * Return the lightness of a color (how close to white or black the color is)
     *
     * @method getLightness
     * @memberof Color
     * @return {Number} lightness lightness value between 0 and 1
     * @instance
     *
     * @example
     * new Color('rgb(0,0,0)').getLightness();       // returns 0
     * new Color('rgb(100,50,100)').getLightness();  // returns 0.29411764705882354
     * new Color('rgb(255,255,255)').getLightness(); // returns 1
     *
     */
    getLightness(): number {
        let hsl = this._getHSL();
        return hsl.l;
    }

    /**
     * Set the lightness of a color, how close to white or black the color will be
     *
     * @method lightness
     * @memberof Color
     * @param {Number} lightness lightness value between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').lightness(0).toString(); // returns "#000"
     * new Color('rgb(255,0,0)').lightness(0.5).toString(); // returns "#F00"
     * new Color('rgb(255,0,0)').lightness(1).toString(); // returns "#FFF"
     *
     */
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

    /**
     * Increases the "lightness" of a color value
     *
     * @method lighten
     * @memberof Color
     * @param {Number} lightenBy amount to lighten between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').lighten(0.5).toString(); // returns "#FF8080"
     *
     */
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

    /**
     * Decreases the "lightness" of a color value
     *
     * @method darken
     * @memberof Color
     * @param {Number} darkenBy amount to darken between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').darken(0.5).toString(); // returns "#800000"
     *
     */
    darken(amount: number): Color {
        return this.lighten(-amount);
    }

    /**
     * Changes the color closer to another color by a given percentage
     *
     * @method combine
     * @memberof Color
     * @param {Object} targetColor color string, array, or object
     * @param {Number} [amount=0.5] how close to the target color between 0 and 1 (0.5 is half-way between)
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color(0).combine('#fff').toString(); // returns "#808080"
     * new Color(255,0,0).combine('#00f',0.7).toString(); // returns "#4D00B3"
     *
     */
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

    /**
     * Inverts the color
     *
     * @method invert
     * @memberof Color
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('#f00').invert(1).toString(); // returns "#0FF"
     * new Color('#fff').invert().toString();  // returns "#000"
     *
     */
    invert(): Color {
        return new Color( invert(this._getRGB()), this.a );
    }

    /**
     * Shifts only the hue of a color closer to another color by a given percentage
     *
     * @method tint
     * @memberof Color
     * @param {String} targetColor color string or array
     * @param {Number} amount amount to shift the hue toward the target color between 0 and 1
     * @return {Color} new Color() instance
     * @instance
     *
     * @example
     * new Color('rgb(255,0,0)').tint('#00f',0.5).toString(); // returns "#F0F"
     * new Color('rgb(0,0,100)').tint('rgb(100,0,0)',0.1).toString(); // returns "#140064"
     *
     */
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

export = Color;
