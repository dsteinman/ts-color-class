var Color = require('./color');
var names2hex = require('./color-names');
for (var name in names2hex) {
	var h = names2hex[name]
	// console.log(h,' -> ',new Color(h).rgb);
	names2hex[name] = new Color(h).rgb;
}
console.log(JSON.stringify(names2hex));