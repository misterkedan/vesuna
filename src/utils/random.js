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

const random = { int, uint, item, boolean };

export { random };
