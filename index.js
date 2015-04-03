/*jshint node:true, laxcomma: true, smarttabs: true*/
'use strict';
/**
 * Standard set of javascript tools, helpers and utilities
 * @module hive-stdlib
 * @author Eric Satterwhite
 * @since 0.1.0
 * @requires hive-stdlib/exception
 * @requires hive-stdlib/class
 * @requires hive-stdlib/number
 * @requires hive-stdlib/iter
 * @requires hive-stdlib/function
 * @requires hive-stdlib/time
 * @requires hive-stdlib/date
 * @requires hive-stdlib/string
 * @requires hive-stdlib/typeOf
 * @requires hive-stdlib/lang
 * @requires hive-stdlib/object
 * @requires hive-stdlib/array
 * @requires hive-stdlib/querystring
 * @requires hive-stdlib/collection
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
