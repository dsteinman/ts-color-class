Color Class
-----------

An opinionated JavaScript Color class.  This is what the JavaScript language should provide as the de facto `Color` object.

This modules is an alternative to the npm module [color](https://www.npmjs.com/package/color) but with some important differences:

- in addition to RGB arrays, also accepts CSS strings as inputs like `new Color('rgba(255,0,0,0.5)')` or `new Color('#ff00ff')`
- toString() always outputs CSS hex values like `#fff`
- HSL calculations use floating point values between 0.0 and 1.0
- larger list of [color names]()
- 100% unit test code coverage
- invalid colors throw errors
- no CMYK color space support
- all setter methods are immutable, chainable, and always return a new instance of `Color`
- static minified build available that provides a global `Color` object available in any html file
- no dependencies
- small build size (20KB)

## Install

#### Use NPM Module

```
import Color from 'color-class';
```

#### Or Use The Static Build

```
<script type="text/javascript" src="color-class.min.js"></script>
```

## Usage

Different ways to define `red`:

```
new Color('red');
new Color('#f00');
new Color('#ff0000');
new Color([255, 0, 0]);
new Color([255, 0, 0, 0.5]); // 50% transparent
new Color(255, 0, 0);
new Color(255, 0, 0, 0.5); // 50% transparent
new Color('rgb(255, 0, 0)');
new Color('rgba(255, 0, 0, 0.5)'); // 50% transparent
new Color({ h: 0, s: 1, l: 0.5 });
new Color({ h: 0, s: 1, l: 0.5, a: 0.5 }); // 50% transparent
```

## Properties

The Color Class has only one property `.rgb` containing an array of the red, green, blue color values (0 - 255) and the alpha channel value (0.0 - 1.0):

```
console.log( new Color('red').rgb );
// returns [255,0,0]
```

```
console.log( new Color('rgba(255,0,0,0.5)').rgb );
// returns [255,0,0,0.5]
```

## Methods

####toString()

Returns a CSS-compatible 3 or 6 character hex string:

```
new Color('red').toString()
// returns "#f00"
```

If an alpha channel is supplied, an rgba string is returned:

```
new Color('red').alpha(0.5).toString()
// returns "rgba(255,0,0,0.5)"
```


In certain cases `.toString()` is implied and can be omitted;

```
document.write( new Color('red') );
```

### Setter Methods

All setter methods are immutable and return a new instance of `Color`.  This means calling a method like `.alpha()` does not modify the object, but returns a new method with that alpha channel applied.  This is useful when making modifications to a base color value but not changing the original color.

```
var mycolor = new Color('red');
console.log( mycolor.toString() ); // '#f00'
console.log( mycolor.alpha(0.5).toString() ); // 'rgba(255,0,0,0.5)'
console.log( mycolor.toString() ); // '#f00'
```

####alpha()

```
new Color('red').alpha(0.5).toString();
// returns "rgba(255,0,0,0.5)"
```

lighten

```
new Color('red').lighten(0.5).toString();
// returns '#ff8080'
```

darken

saturate

desaturate

shiftHue

combine

tint

hue

saturation

lightness

invert

hsl

red

green

blue

### Getter Methods

getAlpha

getHex

getRed

getGreen

getBlue

getHSL

getHue

getSaturation

getSaturation

getLightness