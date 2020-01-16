const chai = require('chai');
const expect = chai.expect;

const Color = require('../color');

describe('Color class constructor', function() {
	it('converts the supplied color into a CSS compatible hex, rgb, rgba string', function(done) {
		expect(new Color([255,0,0]).value).to.be.equal('#f00');
		expect(new Color(255,0,0).value).to.be.equal('#f00');
		expect(new Color('#FF0000').value).to.be.equal('#f00');
		expect(new Color('red').value).to.be.equal('#f00');
		expect(new Color('transparent').value).to.be.equal('rgba(0,0,0,0)');
		expect(new Color('rgb(255,0,0)').value).to.be.equal('#f00');
		expect(new Color('rgba(255, 0, 0, 0.5)').value).to.be.equal('rgba(255,0,0,0.5)');
		expect(new Color([255,0,0,0.5]).value).to.be.equal('rgba(255,0,0,0.5)');
		expect(new Color(255,0,0,0.5).value).to.be.equal('rgba(255,0,0,0.5)');
		done();
	});

	it('throws Error invalid color string', function(done) {
		try {
			new Color('this is not a color string')
		}
		catch(e) {
			expect(e.toString()).to.be.equal('Error: invalid color string');
			done();
		}
	});

	it('throws Error: invalid color data', function(done) {
		try {
			let c = new Color(['a',-10,0,1.01]);
		}
		catch(e) {
			expect(e.toString()).to.be.equal('Error: invalid color data');
			done();
		}
	});
	
	it('can be used as a function', function(done) {
		let mycolor = new Color('red');
		expect(Color(mycolor)).to.be.equal('#f00');
		expect(Color([255,0,0])).to.be.equal('#f00');
		expect(Color('blue')).to.be.equal('#00f');
		done();
	});
});

describe('.toString()', function() {
	it('should return a 3 or 6 character hex', function(done) {
		expect(new Color(255,0,0).toString()).to.be.equal('#f00');
		expect(new Color([255,0,0]).toString()).to.be.equal('#f00');
		expect(new Color([255,0,1]).toString()).to.be.equal('#ff0001');
		expect(new Color([255,0,0,1]).toString()).to.be.equal('#f00');
		expect(new Color([255,0,0,0.5]).toString()).to.not.be.equal('#f00');

		expect(new Color([255,0,0,0.5]).getHex()).to.be.equal('#f00');
		expect(new Color('red').toString()).to.be.equal('#f00');
		expect(new Color('green').toString()).to.be.equal('#0f0');
		expect(new Color('blue').toString()).to.be.equal('#00f');
		expect(new Color('salmon').toString()).to.be.equal('#fa8072');
		done();
	});
	it('should return a rgba()', function(done) {
		expect(new Color([255,0,0,0.5]).toString()).to.be.equal('rgba(255,0,0,0.5)');
		expect(new Color([255,0,0,0]).toString()).to.be.equal('rgba(255,0,0,0)');
		done();
	});
});

describe('.alpha()', function() {
	it('converts to rgba()', function(done) {
		expect(new Color('red').alpha(0.5).toString()).to.be.equal('rgba(255,0,0,0.5)');
		expect(new Color('red').alpha(0).toString()).to.be.equal('rgba(255,0,0,0)');
		expect(new Color([255,0,0,0.5]).alpha(1).toString()).to.be.equal('#f00');
		done();
	});
});

describe('.lighten()', function() {
	it('lightens', function(done) {
		expect(new Color('#f00').lighten(0.5).toString()).to.be.equal('#ff8080');
		expect(new Color('blue').lighten(0.1).toString()).to.be.equal('#1a1aff');
		done();
	});
});

describe('.darken()', function() {
	it('darkens', function(done) {
		expect(new Color('red').darken(0.5).toString()).to.be.equal('#800000');
		expect(new Color('blue').darken(0.1).toString()).to.be.equal('#0000e6');
		done();
	});
});

describe('.saturate()', function() {
	it('increases the saturation by a percentage (1.0 = 100%)', function(done) {
		expect(new Color('rgb(125,0,0)').saturate(0.2).toString()).to.be.equal('#7d0000');
		expect(new Color('#656464').saturate(100).toString()).to.be.equal('#973232');
		expect(new Color('#aa5555').saturate(1).toString()).to.be.equal('#d42b2b');
		expect(new Color('red').saturate(0.1).toString()).to.be.equal('#f00'); // already fully saturated
		done();
	});
});

describe('.desaturate()', function() {
	it('decreases the saturation by a percentage (1.0 = 100%)', function(done) {
		expect(new Color('rgb(125,0,0)').desaturate(0.2).toString()).to.be.equal('#710c0c');
		expect(new Color('#656464').desaturate(100).toString()).to.be.equal('#656565');
		expect(new Color('#aa5555').desaturate(1).toString()).to.be.equal('#808080');
		expect(new Color('#888').desaturate(0.1).toString()).to.be.equal('#888'); // already fully desaturated
		done();
	});
});
