var assert      = require('assert')
  , path        = require('path')
  , os          = require('os')
  , util        = require('util')
  , date        = require('../date');


describe('stdlib-date', function(){

	before(function( done ){
		this.date1 = new Date(1981, 5, 2, 00, 30, 50, 75);
		this.date2 = new Date(2008, 0, 31, 17, 46, 35, 9);
		this.date3 = new Date(1900, 0, 31, 17, 46, 35, 9);
		this.date4 = new Date(1994, 9, 13, 05, 19, 44, 564);
		done();
	});

	after(function( done ){
		done();
	});

	describe('#clone', function(){
		it( 'Should clone Date Objects', function(){
			assert.deepEqual(date.clone(this.date1), new Date(1981, 5, 2, 00, 30, 50, 75), 'clone() should return an exact copy of the argument date object');
			assert.deepEqual(date.clone(this.date2), new Date(2008, 0, 31, 17, 46, 35, 9), 'clone() should return an exact copy of the argument date object');
			assert.deepEqual(date.clone(this.date3), new Date(1900, 0, 31, 17, 46, 35, 9), 'clone() should return an exact copy of the argument date object');
			assert.deepEqual(date.clone(this.date4), new Date(1994, 9, 13, 05, 19, 44, 564), 'clone() should return an exact copy of the argument date object');

			assert.ok( true );
		});
	});

	describe('#isLeapYear', function(){
		it('should calculate leap years', function(){
			assert.strictEqual(date.isLeapYear(this.date1), false, 'isLeapYear() should return false');
			assert.strictEqual(date.isLeapYear(this.date2), true, 'isLeapYear() should return true');
			assert.strictEqual(date.isLeapYear(this.date3), false, 'isLeapYear() should return true');
			assert.strictEqual(date.isLeapYear(this.date4), false, 'isLeapYear() should return true');
		});
	});

	describe('getordinal',function(){
		it('should compute and ordinal string', function(){
			assert.strictEqual(date.getOrdinal(this.date1), 'nd', 'getOrdinal() should return "nd"');
			assert.strictEqual(date.getOrdinal(this.date2), 'st', 'getOrdinal() should return "st"');
			assert.strictEqual(date.getOrdinal(this.date3), 'st', 'getOrdinal() should return "st"');
			assert.strictEqual(date.getOrdinal(this.date4), 'th', 'getOrdinal() should return "th"');
			assert.strictEqual(date.getOrdinal(new Date(1981, 5, 3, 00, 30, 50, 75)), 'rd', 'getOrdinal() should return "rd"');
			assert.strictEqual(date.getOrdinal(new Date(1981, 5, 9, 00, 30, 50, 75)), 'th', 'getOrdinal() should return "th"');
		})
	})
	describe("#clearTime", function() {
		it('should zero out time values', function(){
			assert.deepEqual(date.clearTime(this.date1), new Date(1981, 5, 2, 0, 0, 0, 0), 'clearTime() should zero out the time');
			assert.deepEqual(date.clearTime(this.date2), new Date(2008, 0, 31, 0, 0, 0, 0), 'clearTime() should zero out the time');
		})
	})
	describe("#now", function() {
		it('should return the number of milliseconds since the epoch',function(){
			var now = date.now(),then = new Date().getTime()
			assert.strictEqual(now,then);
		})
	})

	describe("#diff", function() {
		it('should return the differnce in milliseconds',function(){
			assert.strictEqual(date.diff(this.date1, this.date2), 9739);
			assert.strictEqual(date.diff(this.date3, this.date4), 34587);
			assert.strictEqual(date.diff(this.date1, this.date2, 'day'), 9739);
			assert.strictEqual(date.diff(this.date3, this.date4, 'day'), 34587);
			assert.strictEqual(date.diff(this.date1, this.date2, 'year'), 27);
			assert.strictEqual(date.diff(this.date3, this.date4, 'year'), 95);
			assert.strictEqual(date.diff(this.date1, this.date1), 0);
		})
	})

	describe("#within", function() {
		it('should determine if a date false withing a range',function(){
			assert.strictEqual(date.within(this.date4, this.date1, this.date2), true, 'within() should return true');
			assert.strictEqual(date.within(this.date1, this.date4, this.date3), false, 'within() should return false');
			assert.strictEqual(date.within(this.date1, this.date1, this.date2), false, 'within() should return false');

		})
	})

	describe("#getLastDayOfMonth", function() {
		it('should return the number of the last day of the month',function(){
			assert.strictEqual(date.getLastDayOfMonth(this.date1), 30, 'getLastDayOfMonth() should return 30');
			assert.strictEqual(date.getLastDayOfMonth(this.date2), 31, 'getLastDayOfMonth() should return 31');
			assert.strictEqual(date.getLastDayOfMonth(this.date3), 31, 'getLastDayOfMonth() should return 31');
			assert.strictEqual(date.getLastDayOfMonth(this.date4), 31, 'getLastDayOfMonth() should return 31');
		})
	})

	describe("#getDayOfYear", function() {
		it('should return the number of the day in the current year',function(){
			assert.strictEqual(date.getDayOfYear(this.date1), 153, 'getDayOfYear() should return 153');
			assert.strictEqual(date.getDayOfYear(this.date2), 31, 'getDayOfYear() should return 31');
			assert.strictEqual(date.getDayOfYear(this.date3), 31, 'getDayOfYear() should return 31');
			assert.strictEqual(date.getDayOfYear(this.date4), 286, 'getDayOfYear() should return 286');
		})
	})

	describe("#getTimeZone", function() {
		it('should return the 3 char value of the timezone',function(){
			var tz1 = this.date1.toString().match(/(?:\()([A-Z]{3})(?:\))/)[1]
			var tz2 = this.date2.toString().match(/(?:\()([A-Z]{3})(?:\))/)[1]
			var tz3 = this.date3.toString().match(/(?:\()([A-Z]{3})(?:\))/)[1]
			var tz4 = this.date4.toString().match(/(?:\()([A-Z]{3})(?:\))/)[1]

			assert.strictEqual(date.getTimeZone(this.date1), tz1, 'date1 getTimeZone() should return "CDT"');
			assert.strictEqual(date.getTimeZone(this.date2), tz2, 'date2 etTimeZone() should return "CST"');
			assert.strictEqual(date.getTimeZone(this.date3), tz3, 'date3 getTimeZone() should return "CST"');
			assert.strictEqual(date.getTimeZone(this.date4), tz4, 'date4 getTimeZone() should return "CDT"');
		});
	});
})
/*

*/
