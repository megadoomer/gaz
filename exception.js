/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Loads configuration form different data stores before the server starts
 * @module alice-stdlib/exception
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires class
 * @requires options
 */

 var util = require('util')
   , Class   = require( './class' )         //
   , Options = require( './class/options' ) //
   , Parent  = require( './class/parent' )  //
   , Exception
   ;

/**
 * A subclassible Error class that retains Name, message and stack when subclassed
 * @constructor
 * @alias module:alice-stdlib/exception
 * @extends Error
 * @mixes module:alice-stdlib/class/options
 * @param {Object} options Config options for the error instance
 * @example var Exception = require("alice-stdlib/exception");
var FakeExcpetion = new Class({
	inherits:exception
	,options:{
		name:"FakeExcpetion"
	}
});

var e = new FakeException({
	message:"Unable to read file",
	code:2100
	type:'unreadable_file'
});

console.log( e instanceof Error ); // true
console.log( e instanceof exception ); // true 
console.log( e instanceof FakeExcpetion ); // true
throw e
 */
module.exports =  Exception = new Class(/* @lends module:alice-stdlib/exception.prototype */{
	inherits: Error
	,mixin: [Parent, Options]
	,options:{
		name:'Exception'
		,message:""
		,code:1000
		,type:'base_exception'
	}
	,constructor: function( options ){
		var tmp // temporary error object
		this.setOptions( options );

		// force this thing to really be an error
		tmp        = Error.call( this, this.options.message );
		tmp.name   = this.name;
		this.stack = tmp.stack;
		// cleanup
		tmp        = undefined;

	}
	,toString: function toString(){
		return util.format( '[%s] %s', this.name, this.message )
	}
	,toJSON: function(){
		return {
			name:this.name
			,message: this.message
			,code: this.code
			,stack: this.stack
			,type: this.type
		}
	}
});

Object.defineProperties( Exception.prototype,{

/**
 * @readonly
 * @static
 * @name name
 * @memberof module:alice-stdlib/exception
 * @property {String} name The name of the exception
 */
	name:{
		get: function(){
			return this.options.name;
		}
	}
/**
 * @readonly
 * @name code
 * @memberof module:alice-stdlib/exception
 * @property {Number} Internal numberic representation of the error
 */
  , code:{
		get: function(){
			return this.options.code;
		}
  }

  /**
   * @readonly
   * @name type
   * @memberof module:alice-stdlib/exception
   * @property {String} type The internal type of the error
   */
  , type:{
		get: function(){
			return this.options.type;
		}
  }

  /**
   * @readonly
   * @name message
   * @memberof module:alice-stdlib/exception
   * @property {String} message The message the error will display when thrown
   */
  , message:{
		get: function(){
			return this.options.message;
		}
  }
})
