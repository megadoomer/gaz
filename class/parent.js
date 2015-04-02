/*jshint node:true laxcomma:true, smarttabs: true */
'use strict';
/**
 * short cut to parent module from prime util
 * @module module:alice-stdlib/class/parent
 * @author Eric Satterwhite
 * @requires prime-util/prime/parent
 * @since 0.1.0
 **/

/**
 * @alias module:alice-stdlib/class/parent
 */

/**
 * Calls a named method from the parent class
 * @method module:alice-stdlib/class/parent#parent
 * @param {String} method Name of the method to call
 * @param {...Mixed} argument positional Argument to pass to the parent method
 **/

module.exports = require('prime-util/prime/parentize')
