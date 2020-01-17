import { isRGBArray, isRGBAArray, isAlphaValue, isColorString, isHSL, isHSLA, getColorName } from './colorlib';

class Color {
    private rgba: number[];
    private hsla: object;

    constructor();
    constructor(any: number, green: number, blue: number);
    constructor(any?: any, green?: number, blue?: number, alpha?: number) {
        if (arguments.length === 0) {
            this.rgba = [0,0,0,0];
        }
        else if (typeof any === 'number') {
            if (arguments.length === 3) {
                if (isRGBArray([any, green, blue])) {
                    this.rgba = [any, green, blue, 1];
                }
            }
            if (arguments.length === 4) {
                if (isRGBAArray([any, green, blue, alpha])) {
                    this.rgba = [any, green, blue, alpha];
                }
            }
        }
        else if (typeof any === 'string') {
            if (isColorString(any)) {
                this.rgba = getColorName(any);
            }
        }
        else if (typeof any === 'object') {
            if (any.length > 0) {
                if (isRGBAArray(any)) {
                    this.rgba = any;
                }
            }
            else {
                if (isHSLA(any)) {
                    this.hsla = any;
                }
                else if (isHSL(any)) {
                    this.hsla = {
                        ...any,
                        a: 1
                    };
                }
            }
        }
        else {
            throw new Error('invalid color');
        }
    }

    toString() {
        return this.rgba.join(',');
    }
}

export default Color;
