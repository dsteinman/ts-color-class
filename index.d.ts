// import { HSL } from './interfaces';

declare module 'ts-color-class' {

    interface HSL {
        h: number
        s: number
        l: number
    }

    export default class Color {
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
        constructor(red: number, green: number, blue: number);
        constructor(red: number, green: number, blue: number, alpha: number);
        constructor(red?: any, green?: number, blue?: number, alpha?: number);

        getRGB(): number[];
        getHex(): string;
        getHSL(): HSL;
        alpha(alpha: number): Color;
        getRed(): number;
        red(r: number): Color;
        getGreen(): number;
        green(g: number): Color;
        getBlue(): number;
        blue(b: number): Color;
        getAlpha(): number;
        getSaturation(): number;
        getHue(): number;
        hue(hue: number): Color;
        shiftHue(amount: number): Color;
        saturation(saturation: number): Color;
        saturate(amount: number): Color;
        desaturate(amount: number): Color;
        getLightness(): number;
        lightness(lightness: number): Color;
        lighten(amount: number): Color;
        darken(amount: number): Color;
        combine(colorValue: any, percentage: number): Color;
        invert(): Color;
        tint(colorValue: any, percentage: number | undefined): Color;
        toString(): string;
        static getNames(): any;
    }

}
