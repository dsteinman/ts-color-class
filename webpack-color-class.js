// define Color global object
const Color = require('./color-class');
if (typeof window !== undefined) {
	window.Color = Color;
}