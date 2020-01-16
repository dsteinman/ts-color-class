const path = require('path');

module.exports = function(env) {
	return {
		entry: './webpack-color-class.js',
		output: {
			filename: 'color-class.min.js',
			path: path.resolve(__dirname, 'dist')
		}
	};
};