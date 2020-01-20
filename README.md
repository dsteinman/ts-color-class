TypeScript Color Class
-----------

An opinionated TypeScript/JavaScript Color class.  This is what the JavaScript language should provide as the de facto `Color` object.

This module is a more simple alternative to the npm modules [color](https://www.npmjs.com/package/color) and [color-js](https://www.npmjs.com/package/color-js) with some important differences:

- written in TypeScript, exports an ES5 module, and ES4/legacy static build
- toString() always returns CSS-compatible color strings like `"#fff"` so the color objects can be used to change CSS style values or when creating strings, eg: `elm.style.color = new Color('azure')`
- in addition to RGB arrays, also accepts CSS strings as inputs, eg: `new Color('rgba(255,0,0,0.5)')` or `new Color('#ff00ff')`
- HSL calculations use floating point values between 0.0 and 1.0
- larger list of [color names](https://dsteinman.github.io/color-class/colors.html)
- full test coverage using `npm run test` and for ES5 use `npm run test:es5`
- invalid constructor or methods throw errors
- all setter methods are immutable, chainable, and always return a new instance of `Color`
- the [static minified build](https://github.com/dsteinman/color-class/tree/master/build) provides a global `Color` object available in any html file
- no dependencies
- small build size (22KB)

## Documentation

- [Color Class API](https://dsteinman.github.io/color-class/api/Color.html)

## Install

#### Use NPM Module

```
import Color from 'ts-color-class';
```

#### Or use commonjs import syntax: 

```
var Color = require('ts-color-class');
```

#### Or use the static build

The static build file `color-class.min.js` is included in the [/build](https://github.com/dsteinman/color-class/tree/master/build) directory.

```
<script type="text/javascript" src="color-class.min.js"></script>
```

## Usage

```
new Color( inputValue )
```

The `inputValue` can be one of:

- a CSS string
- an array of RGB values (and optionally an alpha channel)
- an HSL object

The constructor also accepts RGBA values in the form:

```
new Color( red, green, blue, alpha )
```

Here are some diifferent ways to define `red`:

```
new Color('red');
new Color('#f00');
new Color('#ff0000');
new Color('red', 0.5); // 50% transparent
new Color([255, 0, 0]);
new Color([255, 0, 0], 0.5); // 50% transparent
new Color(255, 0, 0);
new Color(255, 0, 0, 0.5); // 50% transparent
new Color('rgb(255, 0, 0)');
new Color('rgba(255, 0, 0, 0.5)'); // 50% transparent
new Color({ h: 0, s: 1, l: 0.5 });
new Color({ h: 0, s: 1, l: 0.5 }, 0.5); // 50% transparent
```

## Color Names

Any of the colors in the [named color list](https://dsteinman.github.io/color-class/colors.html) can be used as the input value.

The hash of names and their RGB values can be accessed using:

```
Color.getNames()
```

## Methods

#### toString()

Returns a CSS-compatible 3 or 6 character hex string:

```
new Color('red').toString()
// returns "#f00"
```

If an alpha channel is supplied, and it is not equal to 1.0, an rgba string is returned:

```
new Color('red').alpha(0.5).toString()
// returns "rgba(255,0,0,0.5)"
```

If the alpha channel is equal to 0, then `transparent` is returned:

```
new Color('red').alpha(0).toString()
// returns "transparent"
```

In certain cases, such as when applying styles in CSS, using `console.log()`, or when manipulating strings, the `.toString()` is implied and can be omitted;

```
document.body.style.backgroundColor = new Color('red').darken(0.3);
```

```
console.log( "color = " + new Color('red').darken(0.3) );
```

```
var borderStyle = "1px solid " + new Color('red').darken(0.3);
myElement.style.border = borderStyle;
```

### Setter Methods

All setter methods are immutable and return a new instance of `Color`.  This means calling a method like `.alpha()` does not modify the object, but returns a new method with that alpha channel applied.  This is useful when making modifications to a base color value but not changing the original color.

```
var red = new Color('red');
var blue = new Color('blue');
var darkpurple = red.combine(blue.darken(0.2)).alpha(0.5);
console.log('red = '+red);
console.log('blue = '+ blue);
console.log('darkpurple = '+darkpurple);

// OUTPUT:
// red = #f00
// blue = #00f
// darkpurple = rgba(128,0,102,0.5)
```

#### alpha( value )

Sets the alpha channel (transparency):

```
new Color('red').alpha(0.5).toString();
// returns "rgba(255,0,0,0.5)"
```

#### lighten( amount )

Increases the lightness value (0 - 1):

```
new Color('#f00').lighten(0.1).toString();
// returns '#33f'
```

#### darken( amount )

Decreases the lightness value (0 - 1):

```
new Color('#f00').darken(0.5).toString();
// returns '#c00'
```

#### saturate( amount )

Increases the saturation value (0 - 1):

```
var cornsilk = new Color('corn silk 3');
console.log(cornsilk.getSaturation());
// returns 0.2187500000000001

// increase saturation fom 0.21 to 0.31:
console.log(cornsilk.saturate(0.1).getSaturation());
// returns 0.3187500000000001
```

#### desaturate( amount )

Decreases the saturation value (0 - 1):

```
new Color('#d3ccab'.desaturate(0.1).toString()
// returns '#cdc8b1'
```

#### shiftHue( amount )

Adjusts the hue value (0 - 1):

```
new Color(255, 255, 0).shiftHue(0.25).toString();
// returns '#00ff7f'
```

#### combine( Color, percent )

Combines the color with another.

Add a percentage parameter (0 - 1) to define how much of the new color to combine:
```
new Color('black').combine('red', 0.5).toString();
// returns '#800000'
```

#### tint( Color, percent )

Adjusts the hue toward another color based on a percentage value (0 - 1).

This is similar to `combine()` but only applies to the hue, not saturation or lightness.

```
new Color('red').tint('blue', 0.5).toString();
// returns '#0f0'
new Color('red').tint([0,0,1], 0.5).toString();
// also returns '#0f0'
```

#### hue( value )

Sets the hue value (0 - 1):

```
new Color('red').hue(0.23).toString()
// returns '#9eff00'
```

#### saturation( value )

Sets the saturation value (0 - 1):

```
new Color(100,50,50).saturation(0.5).toString()
// returns "#712626";
```

#### lightness( value )

Sets the lightness value (0 - 1);

```
new Color('#cdc8b1').lightness(0.5).toString()
// returns '#9b9164'
```

#### invert()

Inverts the color:

```
new Color('#fff').invert().toString()
// returns '#000'
```

#### red( value )

Sets the red value (0 - 255):

```
new Color('black').red(255).toString()
// returns '#f00'
```

#### green( value )

Sets the green value (0 - 255):

```
new Color('black').green(255).toString()
// returns '#0f0'
```

#### blue( value )

Sets the blue value (0 - 255):

```
new Color('black').green(255).toString()
// returns '#00f'
```

### Getter Methods

#### getRGB()

Returns the red, green, blue color values as an array:

```
console.log( new Color('red').getRGB() );
// returns [255,0,0]
```

#### getAlpha()

Returns the alpha channel value (0 - 1).

#### getHex()

Returns the hexidecimal css value (ignores alpha channel value).

#### getRed()

Returns the red value (0 - 255).

#### getGreen()

Returns the green value (0 - 255).

#### getBlue()

Returns the blue value (0 - 255).

#### getHSL()

Returns the hue, saturation, and lightness values as an object literal.

```
{h: 0.5, s: 1, l: 0.5}`.
```

#### getHue()

Returns the hue value (0 - 1);

#### getSaturation()

Returns the saturation value (0 - 1);

#### getLightness()

Returns the lightness value (0 - 1);