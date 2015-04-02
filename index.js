/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Standard set of javascript tools, helpers and utilities
 * @module alice-stdlib
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires alice-stdlib/exception
 * @requires alice-stdlib/class
 * @requires alice-stdlib/number
 * @requires alice-stdlib/iter
 * @requires alice-stdlib/function
 * @requires alice-stdlib/time
 * @requires alice-stdlib/date
 * @requires alice-stdlib/string
 * @requires alice-stdlib/typeOf
 * @requires alice-stdlib/lang
 * @requires alice-stdlib/object
 * @requires alice-stdlib/array
 * @requires alice-stdlib/querystring
 * @requires alice-stdlib/collection
 * @requires mout/math
 */

module.exports = {
	exception   : require('./exception')
  , Class       : require('./class')
  , number      : require('./number')
  , iter        : require('./iter')
  , 'function'  : require('./function')
  , time        : require('./time')
  , date        : require('./date')
  , string      : require('./string')
  , tyoeOf      : require('./typeOf')
  , lang        : require("./lang")
  , object      : require('./object')
  , array       : require('./array')
  , querystring : require('./querystring')
  , collection  : require('./collection')
  , math        : require('mout/math')
}
