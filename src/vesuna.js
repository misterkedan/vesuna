import { Alea } from './lib/Alea';

import { codename } from './data/codename';
import { description } from './data/description';
import { characters } from './data/characters';
import { random } from './utils/random';

// Seed generation

const CODENAME = 'codename';
const DESCRIPTION = 'description';
const GIBBERISH = 'gibberish';
const SERIAL = 'serial';
const modes = {
	CODENAME: CODENAME,
	DESCRIPTION: DESCRIPTION,
	GIBBERISH: GIBBERISH,
	SERIAL: SERIAL
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

let basic = true;
let seed = '';

function getRandomWord( words ) {

	return random.item( words );

}

function generateCodename() {

	const { basic, separator } = vesuna;

	const words = ( basic )
		? codename.map( getRandomWord )
		: [ ...codename.map( getRandomWord ), random.uint( 999 ) ];
	return words.join( separator );

}

function generateDescription() {

	const { basic, separator } = vesuna;

	const words = ( basic )
		? [ description[ 1 ], description[ 3 ] ]
		: description;
	return words.map( getRandomWord ).join( separator );

}

function generateGibberish() {

	const { basic } = vesuna;
	const { vowels, consonnants } = characters;

	const length = ( basic ) ? 4 : 8;
	const letters = Array.from( { length }, ( _, i ) => {

		const pool = ( i % 2 ) ?  vowels : consonnants;
		return random.item( pool );

	} );

	return letters.join( '' );

}

function generateSerial() {

	const { basic } = vesuna;

	const length = ( basic ) ? 4 : 8;

	const filtered = 'ilo'; // To avoid Il/o0 confusion
	const pool = characters.alphabet
		.filter( letter => ! filtered.includes( letter ) );

	const chars = Array.from( { length }, () =>
		random.boolean()
			? random.item( pool ).toUpperCase()
			: random.int( 1, 9 )
	);
	return chars.join( '' );

}

function generate() {

	const { mode } = vesuna;

	const defaultGenerator = generateCodename;

	const generators = {
		[ CODENAME ]: generateCodename,
		[ DESCRIPTION ]: generateDescription,
		[ GIBBERISH ]: generateGibberish,
		[ SERIAL ]: generateSerial,
	};

	const generator = generators[ mode ] || defaultGenerator;
	reset( generator() );

	return vesuna.seed;

}

// Seed usage

let _engine = new Alea( seed );

function reset( seed ) {

	if ( seed ) vesuna.seed = seed;
	vesuna._engine = new Alea( vesuna.seed );

}

function getRandom( min = 0, max = 1, rounded = false ) {

	const { _engine } = vesuna;

	const seededRandom = _engine.random();

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

	return array( vesuna.uint( array.length - 1 ) );

}

function char( string ) {

	return string.charAt( vesuna.uint( string.length - 1 ) );

}

function bool() {

	return ( vesuna.random() < 0.5 );

}

// Final object

const vesuna = {
	_engine,
	modes, mode, separators, separator, basic, seed,
	generate, reset,
	random: getRandom, int, uint, item, bool, char
};

generate();

export default vesuna;
