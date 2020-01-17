Color Class
-----------

An opinionated JavaScript Color class.  This is what the JavaScript language should provide as the de facto `Color` object.

This modules is an alternative to the npm module [color](https://www.npmjs.com/package/color) but with some important differences:

- in addition to RGB arrays, also accepts CSS strings as inputs like `new Color('rgba(255,0,0,0.5)')` or `new Color('#ff00ff')`
- toString() always outputs CSS hex values like `#fff`
- HSL calculations use floating point values between 0.0 and 1.0
- larger list of [color names](https://dsteinman.github.io/color-class/colors.html)
- 100% unit test code coverage
- invalid colors throw errors
- no CMYK color space support
- all setter methods are immutable, chainable, and always return a new instance of `Color`
- [static minified build](https://github.com/dsteinman/color-class/tree/master/dist) available that provides a global `Color` object available in any html file
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

Any of the colors in the [named color list](https://dsteinman.github.io/color-class/colors.html) can be used as the input value.

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
new Color(255, 255, 0).shiftHue(0.25).toString());
// returns '#00ff7f'
```

### combine()

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

### tint()

Adjusts the hue toward another color (0 - 1).

This is similar to `combine()` but only applies to the hue, not saturation or lightness.

```
new Color('red').tint([0,0,255], 0.5).toString();
// returns '#f0f'
new Color('red').tint([0,0,1], 0.5).toString();
// also returns '#f0f'
```

### hue()

Sets the hue value (0 - 1):

```
new Color('red').hue(0.23).toString()
// returns '#9eff00'
```

### saturation()

Sets the saturation value (0 - 1):

```
new Color(100,50,50).saturation(0).toString()
// returns '#4b4b4b' (greyscale)
new Color(100,50,50).saturation(1).toString();
// returns '#960000' (dark red)
```

### lightness()

Sets the lightness value (0 - 1);

```
new Color('#cdc8b1').lightness(0.5).toString()
// returns '#9b9164'
```

### invert()

Inverts the color:

```
new Color('#fff').invert().toString()
// returns '#000'
```

### hsl()

Sets the hue, saturation, and lightess.  Provide `null` to keep the existing value.

```
new Color('#fa8072').hsl(null,0.5,0.5).toString()
// returns '#bf4d40' // hue is the same
```

### red()

Sets the red value (0 - 255):

```
new Color('black').red(255).toString()
// returns '#f00'
```

### green()

Sets the green value (0 - 255):

```
new Color('black').green(255).toString()
// returns '#0f0'
```

### blue()

Sets the blue value (0 - 255):

```
new Color('black').green(255).toString()
// returns '#00f'
```

### Getter Methods

### getAlpha()

Returns the alpha channel value (0 - 1).

### getHex

Returns the hexidecimal css value (ignores alpha channel value).

### getRed

Returns the red value (0 - 255).

### getGreen

Returns the green value (0 - 255).

### getBlue

Returns the blue value (0 - 255).

### getHSL

Returns the hue, saturation, and lightness values as an array.

### getHue

Returns the hue value (0 - 1);

### getSaturation

Returns the saturation value (0 - 1);

### getLightness

Returns the lightness value (0 - 1);