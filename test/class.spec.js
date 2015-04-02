/*jshint node:true, laxcomma: true, smarttabs: true*/
/* global it,describe */
'use strict';
/**
 * Tests around Class implementation
 * @module class.inheritance.spec.js
 * @author Eric Satterwhite 
 * @since 0.0.0
 * @requires assert
 * @requires mocha
 * @requires module:alice-stdlib/class/options
 * @requires module:alice-stdlib/class/parentize
 */

var assert = require( 'assert' )
  , Class = require( '../class' )
  , Options = require( '../class/options' )
  , Parent = require( '../class/parent' )
  ;



describe('Class', function( ){
	describe('#constructor', function(){
		it('should not require a constructor function', function(){
			var cls;
			var MyClass = new Class({
				method:  function(){
					return 1;
				}
			});

			assert.doesNotThrow(function(){
				cls = new MyClass();	
			});

			assert.equal( cls.method() , 1);
		});

		it('should use the constructor as the constructor', function(){
			var cls;
			var MyClass = new Class({
				key:1
				,constructor:function( value ){
					this.value = value || 12;
				}
			});

			assert.doesNotThrow(function(){
				cls = new MyClass( 100 );
			})

			assert.equal( cls.key, 1 );
			assert.equal( cls.value, 100 );
		})
	});

	describe('Inheritance', function( ){
		var Base = new Class({
			key:1
			,method: function(){
				return 1
			}
		})
		describe('Direct inheritance', function(){

			it('should inherit all properties and method from a parent class', function(){
				var Extended = new Class({
					inherits:Base
					,constructor: function( ){
						this.value = this.method();
					}
				});

				var e = new Extended();

				assert.ok( e instanceof Base );
				assert.equal( typeof e.method, 'function' );
				assert.equal( typeof e.key, 'number' );
				assert.equal( e.value,  1);
			});

			it('should allow any function to be a parent', function( done ){
				var Evented = new Class({
					inherits: require('events').EventEmitter
				});
				var e = new Evented();
				e.on('anything', function(){
					assert.ok( true );
					done();
				});
				e.emit('anything');
			});
		});

		describe("Mixins", function(){
			it('should only copy all properties of mixin classes', function(){
				var Mixed = new Class({
					mixin:Base
				});

				var m = new Mixed();

				assert.ok( !(m instanceof Base) );
				assert.equal( typeof m.method, 'function' );
				assert.equal( typeof m.key, 'number' );
			})

			describe("Options mixin", function(){
				it("should stand on its own", function(){
					var o = new Options();
					o.setOptions({
						foo:'bar',
						bar:'baz',
						data:{
							boo:1
						}
					});
					assert.equal(o.options.data.boo, 1 );
					assert.equal(o.options.foo, 'bar' );

					o.setOptions({data:{boo:2}});
					assert.equal(o.options.data.boo, 2 );
				});

				it('should function as a mixin', function(){
					var OptionalCls = new Class({
						mixin: Options
						,options:{
							foo:'bar',
							bar:'baz',
							data:{
								boo:1
							}
						}
						,constructor: function( options ){
							this.setOptions( options )
							Object.defineProperty( this, 'boo',{
								get: function(){
									return this.options.data.boo
								}
							});
						}
					});


					var o = new OptionalCls({
						data:{
							boo: 100
						}
					});

					assert.equal( o.boo, 100 )
				})

				it('should treat on<Foo> keys as event handlers', function( done ){
					var EventsCls = new Class({
						inherits: require('events').EventEmitter
						,mixin:[Options]
						,options:{
							test:12
						}
						,constructor: function( options ){
							this.setOptions( options )
						}
					});


					var e = new EventsCls({
						onTest: function( a, b ,c ){
							assert.equal( a, 1 );
							assert.equal( b, 2 );
							assert.equal( c, 3 );
							done();
						}
					});

					e.emit('test', 1, 2, 3 );
				});
			});

			describe("Parent Mixin", function(){
				it('should allow method overrides', function(){
					var Base2 = new Class({
						mixin: Parent
						,say: function( word ){
							return word
						}
					});

					var Child = new Class({
						inherits: Base2
						,say: function( word ){
							return this.parent('say', word ).toUpperCase();
						}
					});

					var c = new Child();

					assert.equal( c.say('foo'), 'FOO' ) ;
				});

				it('should allow calling of the parent constructor', function(){
					var Base3 = new Class({
						mixin:[ Parent, Options ]
						,options:{
							foo:'bar'
						}
						,constructor: function( options ){
							this.setOptions( options );
						}

						,foo: function foo( ){
							return this.options.foo;
						}
					});

					var Child1 = new Class({
						inherits: Base3
						,options:{
							test:1
						}
						,constructor: function( options ){
							this.parent('constructor', options );
						}
					});

					var c = new Child1({
						foo: 'baz'
					});

					assert.equal( c.foo(), 'baz');
					assert.equal( c.options.test, 1);
				})
			});
		});

		describe("Mutators", function(){
			it('should modify the class at definition time', function(){
				Class.defineMutator('test', function( obj ){
					obj = obj || {};

					return Object.keys( obj );
				})

				Class.defineMutator('plain', function( thing ){
					return thing;
				})

				var TestClass = new Class({
					test:{ test:1, fake:1, foo:1 }
					,plain:1
				});
				assert.deepEqual( TestClass.prototype.test, ['test', 'fake', 'foo'] )
				var t = new TestClass({
					test:{ some:1, other:1, values:1 }
				});
				assert.deepEqual( t.test, ['test', 'fake', 'foo'] )
			})
		});
	})
})
