import { Alea } from './lib/Alea';

import { codenames } from './data/codenames';
import { descriptions } from './data/descriptions';
import { characters } from './data/characters';

// Seed generation

const modes = {
	CODENAME: 'codename',
	DESCRIPTION: 'description',
	GIBBERISH: 'gibberish',
	SERIAL: 'serial'
};
let mode = modes.CODENAME;

const separators = {
	NONE: '',
	DASH: '-',
	DOT: '.',
	TILDE: '~',
	UNDERSCORE: '_'
};
let separator = separators.NONE;

let verbose = false;
let _seed = String( Math.random() );

function getWord( words ) {

	return vesuna.item( words );

}

function codename() {

	const { verbose, separator } = vesuna;

	const words = ( verbose )
		? [ ...codenames.map( getWord ), vesuna.uint( 999 ) ]
		: codenames.map( getWord );
	return words.join( separator );

}

function description() {

	const { verbose, separator } = vesuna;

	const words = ( verbose )
		? descriptions
		: [ descriptions[ 1 ], descriptions[ 3 ] ];
	return words.map( getWord ).join( separator );

}

function gibberish() {

	const { verbose } = vesuna;
	const { vowels, consonnants } = characters;

	const length = ( verbose ) ? 8 : 4;
	const letters = Array.from( { length }, ( _, i ) => {

		const pool = ( i % 2 ) ?  vowels : consonnants;
		return vesuna.item( pool );

	} );

	return letters.join( '' );

}

function serial() {

	const { verbose } = vesuna;

	const length = ( verbose ) ? 8 : 4;

	const filtered = 'ilo'; // To avoid Il/o0 confusion
	const pool = characters.alphabet
		.filter( letter => ! filtered.includes( letter ) );

	const chars = Array.from( { length }, () =>
		vesuna.bool()
			? vesuna.item( pool ).toUpperCase()
			: vesuna.int( 1, 9 )
	);
	return chars.join( '' );

}

function autoseed() {

	const { mode } = vesuna;

	const defaultGenerator = codename;
	const generators = { codename, description, gibberish, serial };
	const generator = generators[ mode ] || defaultGenerator;

	vesuna.seed = generator();
	return vesuna.seed;

}

// Seed usage

let prng = new Alea( _seed );

function reset() {

	vesuna.prng = new Alea( vesuna.seed );

}

function random( min = 0, max = 1, rounded = false ) {

	const { prng } = vesuna;

	const seededRandom = prng.random();

	if ( isNaN( min ) || isNaN( max ) ) return seededRandom;

	return ( rounded )
		?  Math.floor( seededRandom * ( max - min + 1 ) + min )
		: seededRandom * ( max - min ) + min;

}

// Random helpers

function int( min, max ) {

	return vesuna.random( min, max, true );

}

function uint( max ) {

	return vesuna.int( 0, max );

}

function item( array ) {

	return array[ vesuna.uint( array.length - 1 ) ];

}

function char( string ) {

	return string.charAt( vesuna.uint( string.length - 1 ) );

}

function bool() {

	return ( vesuna.random() < 0.5 );

}

// Final object

const vesuna = {

	modes, mode, separators, separator, verbose, prng,
	codename, description, gibberish, serial, autoseed,
	reset, random, int, uint, item, bool, char,

	get seed() {

		return _seed;

	},

	set seed( seed ) {

		_seed = seed;
		this.reset();

	}

};

autoseed();

export default vesuna;
