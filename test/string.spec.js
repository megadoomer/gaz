/*jshint laxcomma: true, smarttabs: true, node: true, mocha: true*/
/*global beforeAll*/
'use strict';
var assert = require('assert');
var string = require('../string');


describe( 'String', function(){
	var str = 'This is a pretty decent sentence. it probably has some    Problems   ';
	beforeEach(function( ){
	});

	describe('clean', function( ){
		it('clean method should remove leading, trailing and all extraneous whitespace', function(){
			assert.equal( str.length, 69 );
			assert.equal( string.clean(str).length , 63 );
		});
	});

	describe('trim', function( ){
		var t = '  HELLO WORLD  ';
		assert.equal( str.length, 69 );

		it('should remove only the leading and trailing whitespace', function(){
			assert.notEqual( string.trim(str ).length , str.length );
			assert.equal( string.trim('   Hello world, I have    a    lot of space    ' ).length , 40);
			assert.equal( string.trim( str ).length , 66  );
		});

		it('should not alter character bytes', function(){
			assert.strictEqual(string.trim( t ), 'HELLO WORLD');
		});
	});

	describe('stripHtmlTags', function(){
		var str  =
				'<div>'+
					'<script>var x = \'hello world\';function(){return x};</script>'+
					'<span> this is some text & the number 5</span>'+
				'</div>';


		describe('tags', function( ){
			str = string.stripHtmlTags( str, 'span');
			it('should remove passed in tags', function(){
				assert.equal( str.indexOf( 'span'), -1);
			});

			it('should not remove the contents of the tag that was removed', function(){
				assert.notEqual(str.indexOf( 'world'), -1);
			});

			str = string.stripHtmlTags( str, 'span', true );
		});
		
		describe('#removeNonWord', function( ){
			var str = string.removeNonWord( str );
			it('should removeNonWord should strip out numbers' , function(){
				assert.strictEqual( str.indexOf( '5' ), -1 );
			});

			it('should strip special characters ( <,> )', function(){
				assert.strictEqual( str.indexOf( '>' ), -1 );
			});

			it('should strip special characters ( &, # )', function(){
				assert.strictEqual( str.indexOf( '&' ), -1 );
			});
		});
	});

	describe( 'munging', function(){

		describe('#reverse', function(  ){
			var str = 'abc123';
			var s = string.reverse( str );
			it('reverse should return a string', function(){
				assert.equal(typeof s, 'string' );
				
			});

			it('should not alter the original string', function(){
				assert.equal( str, 'abc123' );
			});
			it('should return the characters in the opposing order the started', function(){
				assert.strictEqual( s, '321cba' );
			});
		});

		describe('#hyphenate', function(  ){
			var str;
			it('should convery camelcase to hyphenated, all lowercase', function(){
				str = 'helloWorld';
				assert.strictEqual( string.hyphenate( str ), 'hello-world', 'Expected \'hello-world\' got :' + string.hyphenate( str ) );

				str = 'thisIsIt';
				assert.strictEqual( string.hyphenate( str ), 'this-is-it', 'Expected \'this-is-it\' got :' + string.hyphenate( str ) );

				str = 'thisIsNotit';
				assert.strictEqual( string.hyphenate( str ), 'this-is-notit', 'Expected \'this-is-notit\' got :' + string.hyphenate( str ) );

				str = 'powerToTheP3ople';
				assert.strictEqual( string.hyphenate( str ), 'power-to-the-p3ople', 'Expected \'power-to-the-p3ople\' got :' + string.hyphenate( str ) );
			});
		});

		describe('#camelCase', function( ){
			var str;
			it('should convert hyphenated words to camelCase', function(){
				str = 'hello-world';
				assert.strictEqual( string.camelCase( str ), 'helloWorld', 'Expected \'helloWorld\' got :' + string.camelCase( str ) );

				str = 'this-is-it';
				assert.strictEqual( string.camelCase( str ), 'thisIsIt', 'Expected \'thisIsIt\' got :' + string.camelCase( str ) );

				str = 'this-is-notit';
				assert.strictEqual( string.camelCase( str ), 'thisIsNotit', 'Expected \'thisIsNotit\' got :' + string.camelCase( str ) );

				str = 'power-to-the-p3ople';
				assert.strictEqual( string.camelCase( str ), 'powerToTheP3ople', 'Expected \'powerToTheP3ople\' got :' + string.camelCase( str ) );
			});
		});

		describe('#slugify', function(){
			var str;

			it('should remove non-words, lowercase and replace spaces with delimeter', function(){
				str = 'hello world';
				assert.strictEqual( string.slugify( str ), 'hello-world', 'Expected \'hello-world\' got :' + string.slugify( str ) );

				str = 'this is it';
				assert.strictEqual( string.slugify( str ), 'this-is-it', 'Expected \'this-is-it\' got :' + string.slugify( str ) );

				str = 'this is notit';
				assert.strictEqual( string.slugify( str ), 'this-is-notit', 'Expected \'this-is-notit\' got :' + string.slugify( str ) );

				str = 'power to the p3ople';
				assert.strictEqual( string.slugify( str ), 'power-to-the-p3ople', 'Expected \'power-to-the-p3ople\' got :' + string.slugify( str ) );
			});
		});

		describe('#truncate', function(){
			var str
				,tail = '...';

			str = 'abc123';

			it('Passing a maxlength smaller than the tails size should return the tail' ,function(){
				assert.strictEqual( string.truncate(str, 1, tail), tail );
			});

			it('Max length should include the length of the tail', function(){
				assert.strictEqual( string.truncate(str, 4, tail), 'a' + tail );
			});
			it('Passing a maxlength larger than the string size should return the string' ,function(){
				assert.strictEqual( string.truncate(str, 10, tail), str);
			});
		});

		describe('#rpad', function(){
			var str = 'abc123';

			it('should append remaning chars to end ', function(){
				assert.strictEqual( string.rpad(str, 10, 'x'),'abc123xxxx' );
			});
		});

		describe('#lpad', function( ){
			var str = 'abc123';

			it('should prepend remaning chars to end ', function(){
				assert.strictEqual( string.lpad(str, 10, 'x'),'xxxxabc123' );
			});
		});
	});

	describe( 'evaluating', function(){
		var str = 'hello_world-This is $(#)33';
		describe( '#contains', function(  ){
			it('should find substrings and return a boolean', function(){
				assert.ok(string.contains( str, 'hello'), 'string should return true' );
				assert.ok(string.contains( str, 'hello_world'), 'string should return true' );
				assert.ok(string.contains( str, 'hello'), 'string should return true' );
				assert.strictEqual(false, string.contains( str, 'hello world'), 'string should return false' );
			})
		})
	});

	describe( '#pluralize', function( ){
			var easyWord = 'Power'
			var mildWord = 'fish'
			var moderateWord = 'Index'
			var hardword = 'knife';

		describe('w/ Count', function( test ){

			it('should pluralize by adding s to easy words', function(){
				assert.equal( string.pluralize(1, easyWord, easyWord+'s' ), 'Power', 'Expected Power, but got ' + string.pluralize(1, easyWord, easyWord+'s' ) );
				assert.equal( string.pluralize(0, easyWord, easyWord+'s' ), 'Powers' , 'Expected Powers, but got ' + string.pluralize(1, easyWord, easyWord+'s' ) );
				assert.equal( string.pluralize(2, easyWord, easyWord+'s' ), 'Powers' , 'Expected Powers, but got ' + string.pluralize(1, easyWord, easyWord+'s' ) );
			})			
		});

		describe('Smart pluralize Power', function( test ){
			it('should pluralize by adding s to easy words', function(){
				assert.equal( string.smartPlural( easyWord ), 'Powers');
			});
		});

		describe('Smart pluralize fish', function( test ){
			it('should ad es to complex words', function(){
				assert.equal( string.smartPlural(mildWord ), 'fishes');
			});
		});

		describe('Smart pluralize Index', function( test ){
			it('should replace x with ies', function(){
				assert.equal( string.smartPlural(moderateWord ), 'Indcies');
			});
		});

		describe('Smart pluralize knife', function( test ){
			it('should replace fe with ves', function(){
				assert.equal( string.smartPlural(hardword ), 'knives');
			});
		});
	});


	describe( '#id', function(  ){

		it('should generate a unique id every time', function( done ){
			var id = string.id()
				,count = 0
				,interval
				,next;

			interval = setInterval( function(){
				if( count > 11 ){
					next = string.id();
					assert.notEqual( id, next, 'string.id should return a unique ID');
					id = next;
					count++;
				}else{
					clearInterval( interval );
					done();
				}
			},1);
			
		})
	});


	describe('#interpolate', function () {

	    it('should replace values', function () {

	        assert.equal( string.interpolate('{{a}} ipsum {{b}}', {
	            a : 'lorem',
	            b : 'dolor'
	        }), 'lorem ipsum dolor' );

	        assert.equal( string.interpolate('{{0}} ipsum {{1}}', ['lorem', 'dolor']), 'lorem ipsum dolor' );

	    });

	    it('should remove undefined tokens', function () {

	        assert.equal( string.interpolate('{{a}}{{b}}{{c}}', {
	            a : 'lorem',
	            b : 'ipsum'
	        }), 'loremipsum' );

	        assert.equal( string.interpolate('{{0}}{{1}}{{2}}', ['lorem', 'ipsum']),  'loremipsum' );

	    });

	    it('should allow a different syntax', function () {

	        var syntax = /\$\{([^}]+)\}/g;

	        assert.equal( string.interpolate('${a} ipsum ${b}', {
	            a : 'lorem',
	            b : 'dolor'
	        }, syntax),  'lorem ipsum dolor' );

	        assert.equal( string.interpolate('${0} ipsum ${1}', ['lorem', 'dolor'], syntax),  'lorem ipsum dolor' );

	    });

	    it('should treat null as empty string', function(){
	        assert.equal( string.interpolate('{{a}}', { a: null }) ,'');
	        assert.equal( string.interpolate(null, {}), '');
	    });

	    it('should treat undefined as empty string', function(){
	        assert.equal( string.interpolate('{{a}}', { a: void 0 }) ,'');
	        assert.equal( string.interpolate(null, {}) ,'');
	    });

	    it('should treat false as string "false"', function() {
	        assert.equal( string.interpolate('{{a}} {{b}}', { a: false, b: true }) , 'false true' );
	    });

	    it('should allow nested replacement objects', function(){
	        var replacements = {
	            a: { b: {c: 'lorem ipsum' } }
	        };

	        assert.equal( string.interpolate('{{a.b.c}}', replacements), 'lorem ipsum');
	        assert.equal( string.interpolate('{{a.b.d}}', replacements), '');
	    });

	    it('should allow nested complex key names', function(){
	        var replacements = {
	            '-#$&@_': 'foo bar'
	        };

	        assert.equal( string.interpolate('{{-#$&@_}}', replacements), 'foo bar');
	    });

	});

    describe('#typecast', function () {

        it('should typecast values if Number, Boolean, null or undefined', function () {
            assert.strictEqual( string.typecast('true'),  true );
            assert.strictEqual( string.typecast('false'),  false );
            assert.strictEqual( string.typecast('123'),  123 );
            assert.strictEqual( string.typecast('123.45'),  123.45 );
            assert.strictEqual( string.typecast('null'),  null );
            assert.strictEqual( string.typecast(null),  null );
            assert.strictEqual( string.typecast('undefined'),  undefined );
            assert.strictEqual( string.typecast(),  undefined );
            assert.strictEqual( string.typecast('foo'),  "foo" );
        });

    });

    describe('#escapeRegExp', function () {

        it('should escape special chars', function () {
            assert.strictEqual( string.escapeRegExp('lorem.ipsum'), 'lorem\\.ipsum' );
            assert.strictEqual( string.escapeRegExp("\\.+*?^$[](){}/'#"),
                "\\\\\\.\\+\\*\\?\\^\\$\\[\\]\\(\\)\\{\\}\\/\\'\\#");
        });

        it('should treat null as empty string', function(){
            assert.strictEqual( string.escapeRegExp(null), '');
        });

        it('should treat undefined as empty string', function(){
            assert.strictEqual( string.escapeRegExp(void 0), '');
        });

    });

});



