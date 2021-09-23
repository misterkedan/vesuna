import { random } from './utils/random';
import { codename } from './data/codename';
import { description } from './data/description';
import { characters } from './data/characters';
//import { seedrandom } from '../_/seedrandom';
import { Alea } from './lib/Alea';

// Seed generation

const CODENAME = 'codename';
const DESCRIPTION = 'description';
const GIBBERISH = 'gibberish';
const SERIAL = 'serial';
const modes = {
	DESCRIPTION: DESCRIPTION,
	CODENAME: CODENAME,
	GIBBERISH: GIBBERISH,
	SERIAL: SERIAL
};
let mode = modes.CODENAME;

const separators = {
	NONE: '',
	DOT: '.',
	DASH: '-',
	TILDE: '~',
	UNDERSCORE: '_'
};
let separator = separators.DASH;

let basic = true;
let seed = '';

function getRandomWord( words ) {

	return random.item( words );

}

function generateCodename() {

	const { basic, separator } = vesunna;

	const words = ( basic )
		? codename.map( getRandomWord )
		: [ ...codename.map( getRandomWord ), random.uint( 999 ) ];
	return words.join( separator );

}

function generateDescription() {

	const { basic, separator } = vesunna;

	const words = ( basic )
		? [ description[ 1 ], description[ 3 ] ]
		: description;
	return words.map( getRandomWord ).join( separator );

}

function generateGibberish() {

	const { basic } = vesunna;
	const { vowels, consonnants } = characters;

	const length = ( basic ) ? 4 : 8;
	const letters = Array.from( { length }, ( _, i ) => {

		const pool = ( i % 2 ) ?  vowels : consonnants;
		return random.item( pool );

	} );

	return letters.join( '' );

}

function generateSerial() {

	const { basic } = vesunna;

	const length = ( basic ) ? 4 : 8;

	const filtered = 'ilo'; // To avoid Il/o0 confusion
	const pool = characters.alphabet.filter( letter => ! filtered.includes( letter ) );

	const chars = Array.from( { length }, () =>
		random.boolean()
			? random.item( pool ).toUpperCase()
			: random.int( 1, 9 )
	);
	return chars.join( '' );

}

function generate() {

	const { mode } = vesunna;

	const defaultGenerator = generateCodename;

	const generators = {
		[ CODENAME ]: generateCodename,
		[ DESCRIPTION ]: generateDescription,
		[ GIBBERISH ]: generateGibberish,
		[ SERIAL ]: generateSerial,
	};

	const generator = generators[ mode ] || defaultGenerator;
	reset( generator() );

	return vesunna.seed;

}

// Seed interpretation

//let engine = new seedrandom( seed );
let engine = new Alea( seed );

function reset( seed ) {

	if ( seed ) vesunna.seed = seed;

	//vesunna.engine = seedrandom( vesunna.seed );
	//console.log( { seed: vesunna.seed } );
	vesunna.engine = new Alea( vesunna.seed );

}

function getRandom( min, max, rounded = true ) {

	const { engine } = vesunna;

	const seededRandom = engine.random();

	if ( isNaN( min ) || isNaN( max ) ) return seededRandom;

	return ( rounded )
		?  Math.floor( seededRandom * ( max - min + 1 ) + min )
		: seededRandom * ( max - min ) + min;

}

const vesunna = {
	modes, mode, separators, separator, basic, seed, engine,
	generate, reset, random: getRandom
};

export default vesunna;
