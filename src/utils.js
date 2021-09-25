/**
 * Helper functions used for autoseeding.
 * Redudant with vesuna's random helpers, but this is necessary because using
 * vesuna for this purpose will produce predictable random seed patterns.
 */

function int( min, max ) {

	return Math.floor( Math.random() * ( max - min + 1 ) + min );

}

function uint( max ) {

	return int( 0, max );

}

function item( array ) {

	return array[ uint( array.length - 1 ) ];

}

function boolean() {

	return Math.random() < 0.5;

}

const utils = { random: { int, uint, item, boolean } };

export { utils };
