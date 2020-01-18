// import Color from '../dist/bundle.js';
// import {Color} from '../src/Color.js';

var Color = require('../src/Color.js').default;

// console.log(new Color('red'));
//
// let transparent = new Color();
// console.log('transparent = '+transparent);
//
// try {
// 	new Color("x");
// }
// catch(e) {
// 	console.log(e.message);
// }
//
//
// let red = new Color("red");
// red.alpha(0.5);
// console.log('red = '+red);
//
// let white = new Color("#fff");
// let rgb1 = new Color(3, 4, 5);
// let rgb2 = new Color(6, 7, 8, 0.5);
//
// let rgbArray = new Color([1,2,1]);
// console.log("a", rgbArray.toString());
//
// let rgbaArray = new Color([1,2,3, 0.4]);
//
// let hsl = new Color({h: 0.5, s: 1, l: 1});
// console.log(hsl);
//
// console.log('red:', new Color('rgb(250,0,0)'));
//
// let hsla = new Color({
// 	h: 0.2,
// 	s: 0.5,
// 	l: 0.4,
// 	a: 0.5
// });
// console.log('hsla:' + hsla);

console.log('red,alpha = '+new Color("#fff", 0.5));
console.log('[255,255,0],alpha = '+new Color([255,255,0], 0.5));
console.log('{hsl} = '+new Color({ h: 0, s: 1, l: 0.5 }, 0.5));