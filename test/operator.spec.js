var assert = require('assert')
var operator = require('../operator')
var iter = require('../iter')


describe('comparison', function(){})

describe('logical',function(){
var op1 = 1;
var op2 = 10;
var op3 = 0;
var op4 = undefined;

	describe("~truth", function(  ){
		it('should treat positive numbers a true', function(){
			assert.strictEqual( operator.truth( op1 ), true );
			assert.strictEqual( operator.truth( op2 ), true );
		})

		it('should treat 0 as false', function( ){

			assert.strictEqual( operator.truth( op3 ), false );
		});

		it('should treat undefined as false', function(){
			assert.strictEqual( operator.truth( op4 ), false );
		})
	})

	describe("~logical not", function(  ){
		assert.ok( operator.logicalnot( op3 ) );
		assert.ok( operator.logicalnot( op4 ) );


	})

	describe("~logical or", function(  ){
		assert.strictEqual( operator.logor(op1, op2), op1 );
		assert.strictEqual( operator.logor(op3, op2), op2 );
		assert.strictEqual( operator.logor(op4, op3), op3 );


	})

	describe("~logical and", function(  ){
		assert.strictEqual( operator.logand( op3, op1), op3);
		assert.strictEqual( operator.logand( op1, op3), op3);


	})
});
describe('itemgetter',function() {
	var obj1, obj2, obj3;

	obj1 = "Hello world"
	obj2 = [
		 [1,2,5,8]
		,[7,5,3,76]
		,[4,76,99,1]
	];

	obj3={
		 key1:"value1"
		,key2:"value2"
		,key3:"value3"
		,key4:"value4"
	}

	describe("Simple Lookups", function(  ){
		it('should retrive values by key', function(){
			assert.equal( (operator.itemgetter( "key1" )).call(null, obj3), "value1")
			assert.equal( (operator.itemgetter( "key2" )).call(null, obj3), "value2")
			assert.equal( (operator.itemgetter( "key3" )).call(null, obj3), "value3")
			assert.equal( (operator.itemgetter( "key4" )).call(null, obj3), "value4")
		})
	});

	describe("Multiple Indecies", function(  ){

		it('should look up values for multiple indecies', function(){
			var getter = operator.itemgetter(0,2,8);
			var results = getter( obj1 )
			assert.strictEqual( results[0], "H")
			assert.strictEqual( results[1], "l")
			assert.strictEqual( results[2], "r")
		})

	})

	describe("Item Getter: Complex", function(  ){
		var getter = operator.itemgetter( 0, 2 )

		var results = getter( obj2 )

		it('should lookup complex objects', function(){
			assert.equal( results[0], obj2[0])
			assert.equal( results[1], obj2[2])
		});
	});

	describe("Item Getter:Complex Iter Map", function(  ){
		var getter = operator.itemgetter( 0,2,3 );
		var results = iter.map( getter, obj2)

		var t0 = results[0];
		var t1 = results[1]
		it('should return a mapable function', function( ){
			assert.strictEqual( t0[0], obj2[0][0])
			assert.strictEqual( t0[1], obj2[0][2])
			assert.strictEqual( t0[2], obj2[0][3])

			assert.strictEqual( t1[0], obj2[1][0])
			assert.strictEqual( t1[1], obj2[1][2])
			assert.strictEqual( t1[2], obj2[1][3])

		})
	})
});

describe("comparison", function(){
	var val1 = 1;
	var val2 = 2;
	var val3 = 3;
	var val4 = 4;
	var val5 = 5;

	var val6 = new Date("10/10/2011")
	var val7 = new Date("10/10/2012")
	var val8 = [1,2,3]
	var val9 = [3,4]

	var obj = {
		 key1:"value1"
		,key2:"value2"
		,key3:"value3"
		,key4:"value4"
	}

	describe("Strict Equality",  function( ){

		it('should compare plain numbers', function( ){
			assert.strictEqual( operator.compeq( val1, 1), true )
			assert.strictEqual( operator.compeq( val2, 2), true )
			assert.strictEqual( operator.compeq( val3, 3), true )
			assert.strictEqual( operator.compeq( val4, 4), true )
			assert.strictEqual( operator.compeq( val5, 5), true )
			assert.strictEqual( operator.compeq( val5, 6), false )
		})

		it('should compare dates', function(){
			assert.strictEqual( operator.compeq( val7, new Date("10/10/2012")), true )
		})

	});

	describe("Strict Inequality",  function( ){
		it('should compare plain numbers', function(){
			assert.ok( operator.compneq( val1, 5) );
			assert.ok( operator.compneq( val2, 4) );
			assert.ok( operator.compneq( val3, 2) );
			assert.ok( operator.compneq( val4, 3) );
			assert.ok( operator.compneq( val5, 1) );

		})
	});

	describe("Less Than",  function( ){
		it('should accurately compare in equal _.isNumber(object)s', function( ){
			assert.strictEqual( operator.complt( val6, val7), true);
			assert.strictEqual( operator.complt( val7, val6), false);
			assert.strictEqual( operator.complt( val8, val9), false);
			assert.strictEqual( operator.complt( val9, val8), true);
		})
	});

	describe("greater Than",  function( ){
		it('should accurately recognize numbers which are greater', function(){
			assert.strictEqual( operator.compgt( val5, val4), true)
			assert.strictEqual( operator.compgt( val1, val2), false)
			assert.strictEqual( operator.compgt( val7, val6), true)
		})
	});

	describe("Contains",function(  ){
		it('should recognize the presence of an id in an object', function(){
			assert.strictEqual( operator.contains( obj, "key1"), true);
			assert.strictEqual( operator.contains( obj, "key10"), false);
			assert.strictEqual( operator.contains( obj, "key3"), true);

		})
	})
});

describe('bitshift',function(){
	var val1 = 1;
	var val2 = 2;
	var val3 = 3;
	var val4 = 4;
	var val5 = 5;
	var val6 = -6;

	describe("bitnot", function(){
		it('should shift bits to 1+ their negetive counterpart', function(){
			assert.strictEqual( operator.bitnot( val1 ), -2)
			assert.strictEqual( operator.bitnot( val2 ), -3)
			assert.strictEqual( operator.bitnot( val3 ), -4)
			assert.strictEqual( operator.bitnot( val4 ), -5)
			assert.strictEqual( operator.bitnot( val6 ), 5)
		})
	});

	describe("XOR", function(){
		it('should do xor', function( ){
			assert.strictEqual( operator.xor( val1, 3), 2)
			assert.strictEqual( operator.xor( val2, 3), 1)
			assert.strictEqual( operator.xor( val3, 3), 0)
			assert.strictEqual( operator.xor( val4, 3), 7)
			assert.strictEqual( operator.xor( val5, 3), 6)
		})
	});

	describe("OR", function(){
		it('should perform an or on truthy values', function( ){
			assert.strictEqual( operator.or( 1, 0), 1)
			assert.strictEqual( operator.or( 0, 0), 0)
			assert.strictEqual( operator.or( 0, 1), 1)
			assert.strictEqual( operator.or( '', 1), 1)
			assert.strictEqual( operator.or( false, 1), 1)
			assert.strictEqual( operator.or( true, 0), 1 )
		});
	});

	describe("BitLShift", function(){
		it('should shift a x bits to the left', function(){
			assert.strictEqual( operator.bitlshift( 1, 2), 4)
			assert.strictEqual( operator.bitlshift( 1, 3), 8)
			assert.strictEqual( operator.bitlshift( 1, 4), 16)
			assert.strictEqual( operator.bitlshift( 1, 5), 32)
		})

	});

	describe("BitRShift", function(){
		it('should shift a x bits to the right', function( ){
			assert.strictEqual( operator.bitrshift( 10, 1), 5)
			assert.strictEqual( operator.bitrshift( 10, 2), 2)
			assert.strictEqual( operator.bitrshift( 10, 3), 1)
		})
	})

	describe("BitZRShift", function(){
		it('should perform >>> shift', function(){
			assert.strictEqual( operator.bitzrshift( -1, 2 ),1073741823)
		})
	})
});
