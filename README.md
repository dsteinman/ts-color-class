JavaScript Color Class
-----------

An opinionated JavaScript Color class.  This is what the JavaScript language should provide as the de facto `Color` object.

This module is a more simple alternative to the npm module [color](https://www.npmjs.com/package/color) with some important differences:

- toString() always returns CSS-compatible color strings like `"#fff"` so the color objects can be used to change CSS style values or when creating strings, eg: `elm.style.color = new Color('azure')`
- in addition to RGB arrays, also accepts CSS strings as inputs, eg: `new Color('rgba(255,0,0,0.5)')` or `new Color('#ff00ff')`
- HSL calculations use floating point values between 0.0 and 1.0
- larger list of [color names](https://dsteinman.github.io/color-class/colors.html)
- full test coverage using `npm run test`
- invalid colors throw errors
- no CMYK color space support
- all setter methods are immutable, chainable, and always return a new instance of `Color`
- [static minified build](https://github.com/dsteinman/color-class/tree/master/dist) available that provides a global `Color` object available in any html file
- no dependencies
- small build size (20KB or 7KB without color names)

## Documentation

- [Color Class API](https://dsteinman.github.io/color-class/api/Color.html)

## Install

#### Use NPM Module

```
import Color from 'js-color-class';
```

#### Or Use The Static Build

The static build file `color-class.min.js` is included in the [/dist](https://github.com/dsteinman/color-class/tree/master/dist) directory.  A smaller `color-class-no-names.min.js` file is also provided without color names support.

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
new Color([255, 0, 0]);
new Color([255, 0, 0, 0.5]); // 50% transparent
new Color(255, 0, 0);
new Color(255, 0, 0, 0.5); // 50% transparent
new Color('rgb(255, 0, 0)');
new Color('rgba(255, 0, 0, 0.5)'); // 50% transparent
new Color({ h: 0, s: 1, l: 0.5 });
new Color({ h: 0, s: 1, l: 0.5, a: 0.5 }); // 50% transparent
```

## Color Names

Any of the colors in the [named color list](https://dsteinman.github.io/color-class/colors.html) can be used as the input value.

The hash of names and their RGB values can be accessed using:

```
Color.names
```

## Methods

#### toString()

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

In certain cases, such as when applying styles in CSS, using `console.log()`, or when manipulating strings, the `.toString()` is implied and can be omitted;

```
document.body.style.backgroundColor = new Color('red').darken(0.3);
```

```
console.log( new Color('red').darken(0.3) );
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

#### alpha()

Sets the alpha channel (transparency):

```
new Color('red').alpha(0.5).toString();
// returns "rgba(255,0,0,0.5)"
```

#### lighten()

Increases the lightness value (0 - 1):

```
new Color('red').lighten(0.5).toString();
// returns '#ff8080'
```

#### darken()

Decreases the lightness value (0 - 1):

```
new Color('red').darken(0.5).toString();
// returns '#800000'
```

#### saturate()

Increases the saturation value (0 - 1):

```
var cornsilk = new Color('corn silk 3');
console.log(cornsilk.getSaturation());
// returns 0.2187500000000001
console.log(cornsilk.saturate(0.2).getSaturation());
// returns 0.26562499999999994
```

#### desaturate()

Decreases the saturation value (0 - 1):

```
new Color([125,0,0]).desaturate(0.2).toString()
// returns '#710c0c'
```

#### shiftHue()

Adjusts the hue value (0 - 1):

```
new Color(255, 255, 0).shiftHue(0.25).toString();
// returns '#00ff7f'
```

#### combine()

Combines the color with another.

By default, combines at 50%:

```
new Color('black').combine('red').toString();
// returnss '#800000'
```

Add a percentage parameter (0 - 1) to define how much of the new color to combine:

```
new Color('black').combine('red', 0.2).toString();
// returns '#300'
```

#### tint()

Adjusts the hue toward another color (0 - 1).

This is similar to `combine()` but only applies to the hue, not saturation or lightness.

```
new Color('red').tint([0,0,255], 0.5).toString();
// returns '#f0f'
new Color('red').tint([0,0,1], 0.5).toString();
// also returns '#f0f'
```

#### hue()

Sets the hue value (0 - 1):

```
new Color('red').hue(0.23).toString()
// returns '#9eff00'
```

#### saturation()

Sets the saturation value (0 - 1):

```
new Color(100,50,50).saturation(0).toString()
// returns '#4b4b4b' (greyscale)
new Color(100,50,50).saturation(1).toString();
// returns '#960000' (dark red)
```

#### lightness()

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

#### hsl()

Sets the hue, saturation, and lightess.  Provide `null` to keep the existing value.

```
new Color('#fa8072').hsl(null,0.5,0.5).toString()
// returns '#bf4d40' // hue is the same
```

#### red()

Sets the red value (0 - 255):

```
new Color('black').red(255).toString()
// returns '#f00'
```

#### green()

Sets the green value (0 - 255):

```
new Color('black').green(255).toString()
// returns '#0f0'
```

#### blue()

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

If an alpha channel is applied it is also returned in the array:

```
console.log( new Color('rgba(255,0,0,0.5)').rgb );
// returns [255,0,0,0.5]
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

Returns the hue, saturation, and lightness values as an array.

#### getHue()

Returns the hue value (0 - 1);

#### getSaturation()

Returns the saturation value (0 - 1);

#### getLightness()

Returns the lightness value (0 - 1);