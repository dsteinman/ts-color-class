// define Color global object
const Color = require('./dist/Color');
if (typeof window !== undefined) {
	window.Color = Color;
}