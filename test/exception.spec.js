/*jshint node:true, laxcomma: true, smarttabs: true, mocha:true*/
'use strict';

var assert = require('assert')
var Exception = require('../exception');
var Class = require('../class');

describe('Exception', function(){
	describe("Base Exception", function(){
		it('should be recognized as an Error', function(){
			var e = new Exception({
				message:"I am an error"
			});

			assert.throws( function(){
				throw e;
			});

			assert.ok( e instanceof Error );

		});
	});

	describe('~ Exception subclassing', function(){
		var FakeException = new Class({
			inherits:Exception
			,options:{
				name:"FakeException"
			}
		});
		it('should be subclass-ible', function(){
			var f = new FakeException({
				message:'this was a bad idea'
			});

			assert.ok( f instanceof Error ); // true
			assert.ok( f instanceof Exception ); // true 
			assert.equal( f.name, 'FakeException' )
		});

		it("should accept a name option", function(){
			var f = new FakeException({
				message:'this was a bad idea'
			});
			assert.ok( f instanceof Error ); // true
			assert.ok( f instanceof Exception ); // true 
			assert.ok( f instanceof FakeException ); // true 
		});

		it('should accept a message option', function(){
			var msg = 'this was a bad idea'
			var f = new FakeException({
				message:msg
			});

			assert.equal( f.message, msg )
		});
	});

});
