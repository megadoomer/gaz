/*jshint laxcomma: true, smarttabs: true, node: true, mocha: true*/

'use strict';
var iter = require('../iter');
var assert = require('assert');

describe('Iterable', function(){
	describe('#toString', function(){
		it('should identify it self as an iterable', function(){
			var x = new iter.cycle(1,2,3);
			assert.ok( x.toString().indexOf('Iterable' ) != -1, 'Iterable toString method should indeicate it is an Iterable' );
		});
	});

	describe('Iterable From Array', function(){
		before(function(){
			this.sequence =  [1,2,3,4];

		});

		after(function(){
			this.sequence = null;
		});

		it('should generate an step iterator from an array', function(){
			var x = iter.from( this.sequence );
			assert.equal(typeof x.next, 'function', 'iter.from should create a new Iterable');
			assert.equal(x.next(), 1, 'elements of the Iterable should match that of the sequence');
			assert.equal(x.next(), 2, 'elements of the Iterable should match that of the sequence');
			assert.equal(x.next(), 3, 'elements of the Iterable should match that of the sequence');
			assert.equal(x.next(), 4, 'elements of the Iterable should match that of the sequence');
		});

		it('it should throw a StopIteration when the end is reached', function(){
			var x = iter.from( this.sequence );
			while( true ){
				try{
					assert.ok( x.next(), 'Calling next should return a value if it can');
				} catch( e ){
					assert.strictEqual( e, iter.StopIteration, 'A StopIteration should be thrown when an iterable has been exhausted');
					break;
				}
			}
		});
	});

	describe('Iterable From Object', function(){
		var obj = {
			key1:1
			,key2:2
			,key3:'value'
		};

		describe('~values',function(  ){
			it('should genrate an step iterator from object values', function(){
				var itr = iter.from( obj );
				assert.strictEqual(itr.next(), 1);
				assert.strictEqual(itr.next(), 2);
				assert.strictEqual(itr.next(), 'value');
			});
		});

		describe('~error', function(  ){
			var x = iter.from( obj );
			while( true ){
				try{
					assert.ok( x.next(), 'Calling next should return a value if it can');
				} catch( e ){
					assert.strictEqual( e, iter.StopIteration, 'A StopIteration should be thrown when an iterable has been exhausted');
					break;
				}
			}
		});
	});
});

describe('~count', function() {
	before(function(){
		this.counter = new iter.count();
	});


	describe('Base Counter', function(  ){
		it('should accept a single number',function(){
			assert.doesNotThrow( function(){ new iter.count();}, 'count should not throw an error if passed no parameters' );
			assert.throws( function(){
				new iter.count('Hello world');
			});
		});


		it('should return the next step when next() is called', function(){
			for( 0; this.counter.next() < 99;){}
			assert.equal( this.counter.next(), 100, 'counter should increment by one with every next');
		});
	});

});

describe('~cycle', function(){
	before( function(){
		this.cycle = new iter.cycle( 1,2,3 );
	});

	it('should never throw a StopIteration error', function(){
		var _cycle = this.cycle;
		assert.doesNotThrow(function(){
			for (var i = 0; i >= 100; i++) {
				_cycle.next();
			}
		});
	});
});

describe('iSlice', function(){

	before(function(  ){
		this.sequence = [ 1,2,3,4, 'good', 'bad', true, false ];
	});

	describe('~No Step', function(  ){
		it('should retrun every value upto the limit ', function(){
			var itr = iter.islice( this.sequence, 3 );
			var val = itr.next();
			assert.strictEqual( val , 1, 'Expected 1 got ' + val );

			val = itr.next();
			assert.strictEqual( val , 2, 'Expected 2 got ' + val );

			val = itr.next();
			assert.strictEqual( val , 3, 'Expected 3 got ' + val );

			assert.throws(function(){itr.next();}, 'Should throw a StopIteration error');

		});
	});

	describe('~With Step', function(  ){
		it('should set the specified number of items on next', function(){
			var itr = iter.islice( this.sequence, 0, this.sequence.length, 2);

			var val = itr.next();
			assert.strictEqual( val , 1, 'Expected 2 got ' + val );

			val = itr.next();
			assert.strictEqual( val ,3, 'Expected 2 got ' + val );

			val = itr.next();
			assert.strictEqual( val , 'good', 'Expected good got ' + val );

			val = itr.next();
			assert.strictEqual( val , true, 'Expected true got ' + val );

			assert.throws( function(){ iter.next(); }  );
		});
	});
});

describe('#sum',function() {

	describe('sum with numbers', function(){
		var s = iter.sum( [21,32,54,12,44 ] );
		assert.strictEqual(s, 163, 'sum should add all values in an Iterator');
	});

	describe('Sum with start', function(  ){
		var s = iter.sum( [21,32,54,12,44 ], 10);
		assert.strictEqual(s, 173, 'sum should add all values in an Iterator');
	});

	describe('sum: mixed values', function(){
		var s = iter.sum(['1', '2', '3']);
		assert.strictEqual(s, '0123', 'sum should not do any type casting');
	});
});

describe('#each', function(){
	var arraySequence = [ 1,2,3,4 ];
	// var objSequence = {key1:'value1', key2:'value2', key3:'value3', key4:'value4'};

	describe('~over an array', function(  ){
		iter.forEach( arraySequence, function( val /* ,index */ ){
			assert.ok( val );
		});
	});
});

describe('#sorted', function(){
	before(function( ){
		this.arraySequence = [12,43,54,32,21,-4,4];
		this.objSequence = {key1:12,key2:43,key3:54,key4:32,key5:21,key6:-4,key7:4};
	});

	it('should sort an array', function( ){
		var x = iter.sorted( this.arraySequence );

		var itr = iter.from( x );
		var last = itr.next();
		var now = null;
		while( true ){
			try{
				now = itr.next();
				assert.ok( last < now, 'sorted should return a sorted array' );
				last = now;
			}catch( e ){
				assert.strictEqual(e, iter.StopIteration );
				break;
			}
		}


	});

	it('Iter.sort Object', function( ){
		var x = iter.sorted( this.objSequence );
		var itr = iter.from( x );
		var last = itr.next();
		var now = null;

		while( true ){
			try{
				now = itr.next();
				assert.ok( last < now, 'sorted should return a sorted array' );
				last = now;
			}catch( e ){
				assert.strictEqual(e, iter.StopIteration, 'Iterable should throw StopIteration when it can not continue');
				break;
			}
		}
	});
});

describe('#imap', function(){
	before(function(  ){
		this.iterA = [1,2,3,4];
		this.iterB = [5,6,7,8];
		this.iterC = [9,10,11,12];

	});


	it('should accept & map multiple iterators', function( ){
		var mapped = iter.imap( function( x, y, z ){
			return x + y + z;
		}, this.iterA, this.iterB, this.iterC );

		var value = null;
		assert.doesNotThrow( function(){
			value = mapped.next();
		});

		assert.strictEqual(value, 15, 'Expected 15, got ' + value );

		assert.doesNotThrow( function(){
			value = mapped.next();
		});

		assert.strictEqual(value, 18, 'Expected 18, got ' + value );

		assert.doesNotThrow( function(){
			value = mapped.next();
		});
		assert.strictEqual(value, 21, 'Expected 21, got ' + value );

		assert.doesNotThrow( function(){
			value = mapped.next();
		});
		assert.strictEqual(value, 24, 'Expected 24, got ' + value );

		try{
			mapped.next();
		}catch( e ){
			assert.strictEqual(e, iter.StopIteration, 'Iterables should throw a StopIteration when they cannot continue');
		}
	});
});

describe('#cycle', function(){
	before(function( ){
		this.arraySequence = [1,2,3,4,5];
		this.objSequence = {key1:1, key2:2, key3:3, key4:4, key5:5};

	});

	it('it should accept an array', function(  ){
		var itr = iter.cycle( this.arraySequence);
		for(var x=0; x<3; x++){
			for(var y=1; y<6; y++){
				assert.equal( itr.next(), y, 'Expected ' + y + 'got: ' + y);
			}
		}
	});

	it('it should accept an object', function(  ){
		var itr = iter.cycle( this.objSequence);
		for(var x=0; x<3; x++){
			for(var y=1; y<6; y++){
				assert.equal( itr.next(), y, 'Expected ' + y + ' got: ' + y);
			}
		}
	});
});

describe('#reduce', function(){
	it('should reduce an array', function(  ){
		var result;
		assert.doesNotThrow( function(){
			result = iter.reduce( [1,2,3,4,5], function( a,  b ){ return a + b; });
		});
		assert.strictEqual( result, 15,  'expected 15, got '  + result );
	});


	it('should reduce an object', function( ){
		var result;
		assert.doesNotThrow( function(){
			result = iter.reduce({
				key1:1,
				key2:2,
				key3:3,
				key4:4,
				key5:5
			}, function( a, b ){ return a + b ;});
		});
		assert.strictEqual( result, 15,  'expected 15, got '  + result );
	});
});
