class Random {

	/**
	 * Creates a wrapper for a PRNG, augmenting it with utility methods,
	 * for easy generation of integers, booleans etc.
	 * @param {*} prng A pseudorandom number generator, ie Math.random
	 * or an Alea instance. It needs to implement a random() method returning
	 * a pseudorandom float between 0 and 1.
	 */
	constructor( prng = Math ) {

		this.prng = prng;

	}

	/*-------------------------------------------------------------------------/

		Numbers

	/-------------------------------------------------------------------------*/

	/**
	 * Returns a pseudorandom float between 0 and 1.
	 * Will be a 32-bit float if the prng is an Alea instance.
	 * Can vary depending on browsers (32-64 bits) if the prng is Math.
	 * @returns {Number} A pseudorandom float between 0 and 1.
	 */
	random() {

		return this.prng.random();

	}

	/**
	 * Returns a pseudorandom number between a given min and max, and optionally
	 * rounds it.
	 * @param {Number} min Minimum number (inclusive).
	 * @param {Number} max Maximum number (inclusive).
	 * @param {Boolean} rounded Round the number before returning.
	 * @returns {Number} The pseudorandomly generated number.
	 */
	number( min = 0, max = 1, rounded = false ) {

		const random = this.random();

		if ( isNaN( min ) || isNaN( max ) ) return random;

		return ( rounded )
			? Math.floor( random * ( max - min + 1 ) + min )
			: random * ( max - min ) + min;

	}

	/**
	 * Returns a pseudorandom integer.
	 * @param {Number} min Minimum number (inclusive).
	 * @param {Number} max Maximum number (inclusive).
	 * @returns {Number} The pseudorandomly generated integer.
	 */
	integer( min, max ) {

		return this.number( min, max, true );

	}

	/**
	 * Returns a pseudorandom unsigned integer.
	 * @param {Number} max Maximum number (inclusive).
	 * @returns {Number} The pseudorandomly generated unsigned integer.
	 */
	unsignedInteger( max ) {

		return this.number( 0, max, true );

	}

	/*-------------------------------------------------------------------------/

		Booleans

	/-------------------------------------------------------------------------*/

	/**
	 * Returns a pseudorandom boolean.
	 * @returns {Boolean} The pseudorandomly generated boolean.
	 */
	boolean() {

		return ( this.random() < 0.5 );

	}

	/**
	 * Returns a pseudorandom boolean for a given probability.
	 * @param {Number} probability A probability between 0 and 1.
	 * @returns {Boolean} The pseudorandomly generated boolean.
	 */
	chance( probability ) {

		return ( this.random() < probability );

	}

	/*-------------------------------------------------------------------------/

		Numbers (advanced)

	/-------------------------------------------------------------------------*/

	/**
	 * Returns a float between -1 and 1.
	 * @returns {Number} A float between 0 and 1
	 */
	noise() {

		return this.number( - 1, 1 );

	}

	/**
	 * Returns a pseudorandom signed 1 ( either -1 or 1 ).
	 * @param {Number} bias	Probability of the sign to be positive
	 * ( more negatives towards 0, more positives at 1, unbiased at 0.5).
	 * @returns {Number} The pseudorandomly signed 1 ( either -1 or 1 ).
	 */
	sign( bias = 0.5 ) {

		return ( this.chance( bias ) ) ? 1 : - 1;

	}

	/**
	 * Returns a number within the range provided by an object.
	 * For example, random.numberFrom( { min: 2.3, max: 5.4 } ) will return
	 * a number between 2.3 and 5.4.
	 * @param {Object|Array} range Either {min,max} or [min, max].
	 * @param {String} minKey The key of the min property.
	 * @param {String} maxKey The key of the max property.
	 * @returns {Number} The pseudorandomly generated number in the specified range.
	 */
	numberFrom( range, minKey = 'min', maxKey = 'max', rounded = false ) {

		const fromArray = Array.isArray( range );
		const min = ( fromArray ) ? Math.min( ...range ) : range[ minKey ];
		const max = ( fromArray ) ? Math.max( ...range ) : range[ maxKey ];

		return this.number( min, max, rounded );

	}

	/**
	 * Returns an integer within the range provided by an object.
	 * For example, random.integerFrom( { min: 2, max: 5 } ) will return
	 * a number between 2 and 5.
	 * @param {Object|Array} range Either {min,max} or [min, max].
	 * @param {String} minKey The key of the min property.
	 * @param {String} maxKey The key of the max property.
	 * @returns {Number} TThe pseudorandomly generated number in the specified range
	 */
	integerFrom( range, min = 'min', max = 'max' ) {

		return this.numberFrom( range, min, max, true );

	}

	/*-------------------------------------------------------------------------/

		Objects

	/-------------------------------------------------------------------------*/

	/**
	 * Returns a pseudorandomly drawn entry from an object.
	 * @param {Object} object Object to draw the entry from.
	 * @returns {Array} A pseudorandomly drawn key/value pair.
	 */
	entry( object ) {

		return this.item( Object.entries( object ) );

	}

	/**
	 * Returns a pseudorandomly drawn key from an object.
	 * @param {Object} object Object to draw the key from.
	 * @returns {String} The pseudorandomy drawn key.
	 */
	key( object ) {

		return this.item( Object.keys( object ) );

	}

	/**
	 * Returns a pseudorandomly drawn value from an object.
	 * @param {Object} object Object to draw the value from.
	 * @returns {*} The pseudorandomy drawn value.
	 */
	value( object ) {

		return this.item( Object.values( object ) );

	}

	/**
	 * Returns a pseudorandomly drawn item from an array.
	 * @param {Array} array	The array to draw from.
	 * @returns {*} The pseudorandomly drawn item.
	 */
	item( array ) {

		return array[ this.uint( array.length - 1 ) ];

	}

	/**
	 * Returns a pseudorandomly drawn character from an string.
	 * @param {String} string The string to draw from.
	 * @returns {String} The pseudorandomly drawn character.
	 */
	character( string ) {

		return string.charAt( this.uint( string.length - 1 ) );

	}

	/*-------------------------------------------------------------------------/

		Aliases / shorthands

	/-------------------------------------------------------------------------*/

	/**
	 * Alias for random().
	 * @returns {Number} A pseudorandom float between 0 and 1.
	 */
	amount() {

		return this.random();

	}

	/**
	 * Shorthand for number().
	 * @param {Number} min Minimum number (inclusive).
	 * @param {Number} max Maximum number (inclusive).
	 * @param {Boolean} rounded Round the number before returning.
	 * @returns {Number} The pseudorandomly generated number.
	 */
	num( min, max, rounded ) {

		return this.number( min, max, rounded );

	}

	/**
	 * Shorthand for integer().
	 * @param {Number} min Minimum number (inclusive).
	 * @param {Number} max Maximum number (inclusive).
	 * @returns {Number} The pseudorandomly generated integer.
	 */
	int( min, max ) {

		return this.integer( min, max );

	}

	/**
	 * Shorthand for unsignedInteger().
	 * @param {Number} max Maximum number (inclusive).
	 * @returns {Number} The pseudorandomly generated unsigned integer.
	 */
	uint( max ) {

		return this.unsignedInteger( max );

	}

	/**
	 * Shorthand for boolean().
	 * @returns {Boolean} The pseudorandomly generated boolean.
	 */
	bool() {

		return this.boolean();

	}

	/**
	 * Shorthand for numberFrom().
	 * @param {Object|Array} range Either {min,max} or [min, max].
	 * @param {String} minKey The key of the min property.
	 * @param {String} maxKey The key of the max property.
	 * @returns {Number} The pseudorandomly generated number in the specified range.
	 */
	numFrom( range, minKey, maxKey ) {

		return this.numberFrom( range, minKey, maxKey );

	}

	/**
	 * Shorthand for integerFrom().
	 * @param {Object|Array} range Either {min,max} or [min, max].
	 * @param {String} minKey The key of the min property.
	 * @param {String} maxKey The key of the max property.
	 * @returns {Number} TThe pseudorandomly generated number in the specified range
	 */
	intFrom( range, min, max ) {

		return this.integerFrom( range, min, max );

	}

	/**
	 * Shorthand for character().
	 * @param {String} string The string to draw from.
	 * @returns {String} The pseudorandomly drawn character.
	 */
	char( string ) {

		return this.character( string );

	}

}

export { Random };
