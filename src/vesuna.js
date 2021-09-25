import { Alea } from './lib/Alea';
import { utils } from './utils';
import { codenames } from './data/codenames';
import { descriptions } from './data/descriptions';
import { characters } from './data/characters';

/*-----------------------------------------------------------------------------/

	Seed generation

/-----------------------------------------------------------------------------*/

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
let _seed = '';

/**
 * Helper function to randomly draw a string from a words array.
 * @param {[String]}	words 	An array of strings.
 * @returns {String}	A randomly drawn string.
 */
function getWord( words ) {

	return utils.random.item( words );

}

/**
 * Returns a codename ( ex: blue-fox-428 ).
 * @returns {String} The generated codename.
 */
function codename() {

	const { verbose, separator } = vesuna;

	const words = ( verbose )
		? [ ...codenames.map( getWord ), utils.random.uint( 999 ) ]
		: codenames.map( getWord );
	return words.join( separator );

}

/**
 * Returns an amusing description ( ex: loudly-sneezing-giant-penguin ).
 * @returns {String} The generated description.
 */
function description() {

	const { verbose, separator } = vesuna;

	const words = ( verbose )
		? descriptions
		: [ descriptions[ 1 ], descriptions[ 3 ] ];
	return words.map( getWord ).join( separator );

}

/**
 * Returns some gibberish ( ex: xuvetemi ).
 * @returns {String} The generated gibberish.
 */
function gibberish() {

	const { verbose } = vesuna;
	const { vowels, consonnants } = characters;

	const length = ( verbose ) ? 8 : 4;
	const letters = Array.from( { length }, ( _, i ) => {

		const pool = ( i % 2 ) ?  vowels : consonnants;
		return utils.random.item( pool );

	} );

	return letters.join( '' );

}

/**
 * Returns a serial number ( ex: 58AS39KG ).
 * @returns {String} The generated serial number.
 */
function serial() {

	const { verbose } = vesuna;

	const length = ( verbose ) ? 8 : 4;

	const filtered = 'ilo'; // To avoid Il/o0 confusion
	const pool = characters.alphabet
		.filter( letter => ! filtered.includes( letter ) );

	const chars = Array.from( { length }, () =>
		vesuna.bool()
			? utils.random.item( pool ).toUpperCase()
			: utils.random.int( 1, 9 )
	);
	return chars.join( '' );

}

/**
 * Seeds vesuna automatically with a randomized seed.
 * @returns {String} The generated seed.
 */
function autoseed() {

	const { mode } = vesuna;

	const defaultGenerator = codename;
	const generators = { codename, description, gibberish, serial };
	const generator = generators[ mode ] || defaultGenerator;

	vesuna.seed = generator();
	return vesuna.seed;

}

/*-----------------------------------------------------------------------------/

	Seed usage

/-----------------------------------------------------------------------------*/

let prng = new Alea( _seed );

/**
 * Resets the PRNG sequence.
 */
function reset() {

	vesuna.prng = new Alea( vesuna.seed );

}

/**
 * Returns a pseudorandom 32-bit float between 0 and 1.
 * @param 	{Number} 	min 		Minimum value ( inclusive ).
 * @param 	{Number} 	max 		Maximum value ( inclusive ).
 * @param 	{Boolean} 	rounded		Round the number before returning.
 * @returns {Number} 	The pseudorandomly generated number.
 */
function random( min = 0, max = 1, rounded = false ) {

	const { prng } = vesuna;

	const seededRandom = prng.random();

	if ( isNaN( min ) || isNaN( max ) ) return seededRandom;

	return ( rounded )
		?  Math.floor( seededRandom * ( max - min + 1 ) + min )
		: seededRandom * ( max - min ) + min;

}

/*-----------------------------------------------------------------------------/

	Random helpers

/-----------------------------------------------------------------------------*/

/**
 * Returns a pseudorandom integer.
 * @param 	{Number}	min		Minimum value ( inclusive ).
 * @param 	{Number}	max		Maximum value ( inclusive ).
 * @returns {Number}	The pseudorandomly generated integer.
 */
function int( min, max ) {

	return vesuna.random( min, max, true );

}

/**
 * Returns a pseudorandom unsigned integer.
 * @param 	{Number}	max		Maximum value ( inclusive ).
 * @returns {Number}	The pseudorandomly generated unsigned integer.
 */
function uint( max ) {

	return vesuna.int( 0, max );

}

/**
 * Returns a pseudorandom boolean.
 * @returns {Boolean}	The pseudorandomly generated boolean.
 */
function bool() {

	return ( vesuna.random() < 0.5 );

}

/**
 * Returns a pseudorandomly drawn item from an array.
 * @param 	{Array}	array	The array to draw from.
 * @returns {*}		The pseudorandomly drawn item.
 */
function item( array ) {

	return array[ vesuna.uint( array.length - 1 ) ];

}

/**
 * Returns a pseudorandomly drawn character from an string.
 * @param 	{String}	string	The string to draw from.
 * @returns {String}	The pseudorandomly drawn character.
 */
function char( string ) {

	return string.charAt( vesuna.uint( string.length - 1 ) );

}

/*-----------------------------------------------------------------------------/

	Init & Export

/-----------------------------------------------------------------------------*/

const vesuna = {
	// Properties
	modes, mode, separators, separator, verbose, prng,

	// Seed generation methods
	codename, description, gibberish, serial, autoseed,

	// Seed usage / PRNG methods
	reset, random, int, uint, item, bool, char,

	// Seed getter-setter
	get seed() {

		return _seed;

	},
	set seed( seed ) {

		_seed = seed;
		this.reset();

	}
};

// Init
autoseed();

// Export
export default vesuna;
