// import Color from '../dist/bundle.js';
// import {Color} from '../src/Color.js';
var Color = require('../src/Color.js').default;

// console.log(Color);
// console.log(new Color('red'));

// let transparent = new Color();
let red = new Color("tan");
console.log(red);

// let white = new Color("#fff");
// let rgb1 = new Color(3, 4, 5);
// let rgb2 = new Color(6, 7, 8, 0.5);
// let rgbArray = new Color([1,2,3]);
// let rgbaArray = new Color([1,2,3, 0.4]);

let hsl = new Color({h: 0.5, s: 1, l: 1});
console.log(hsl);
// let hsla = new Color({h: 0.5, s: 1, l: 1, a: 0.5});

// console.log('red:', red.getColorString());