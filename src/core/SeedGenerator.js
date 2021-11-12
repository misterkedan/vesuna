import { Random } from './Random';

import codenames from '../data/codenames';
import descriptions from '../data/descriptions';
import letters from '../data/letters';

class SeedGenerator {

	/**
	 * Creates a vesuna seed generator instance.
	 *
	 * Use the generate() method to get a new string.
	 *
	 * @param {Object} options
	 * Options object.
	 * @param {String} options.mode
	 * A mode from SeedGenerator.modes.
	 * @param {String} options.separator
	 * A separator from SeedGenerator.modes, or any string.
	 * Will be inserted between words for multi-word modes.
	 * @param {Boolean} options.verbose
	 * Set to true for longer strings, with more possible outcomes.
	 */
	constructor( {
		mode = SeedGenerator.modes.CODENAME,
		separator = SeedGenerator.separators.NONE,
		verbose = false,
	} = {} ) {

		Object.assign( this, { mode, separator, verbose } );

		this.random = new Random();

	}

	/**
	 * Generates a codename ( ex: blue-fox-428 ).
	 *
	 * @returns {String} The generated codename.
	 */
	codename() {

		const { verbose, separator, random } = this;
		const { attributes, entities } = codenames;

		const words = [ random.item( attributes ), random.item( entities ) ];
		if ( verbose ) words.push( random.uint( 999 ) );

		return words.join( separator );

	}

	/**
	 * Generates an amusing description ( ex: loudly-sneezing-giant-penguin ).
	 *
	 * @returns {String} The generated description.
	 */
	description() {

		const { verbose, separator, random } = this;
		const { adverbs, verbs, adjectives, nouns } = descriptions;

		const pools = ( verbose )
			? [ adverbs, verbs, adjectives, nouns ]
			: [ verbs, nouns ];

		return pools.map( pool => random.item( pool ) ).join( separator );

	}

	/**
	 * Generates some gibberish ( ex: xuvetemi ).
	 *
	 * @returns {String} The generated gibberish.
	 */
	gibberish() {

		const { verbose, random } = this;
		const { vowels, consonnants } = letters;

		const length = ( verbose ) ? 8 : 4;
		const randomLetters = [];

		for ( let i = 0; i < length; i ++ ) {

			const pool = ( i % 2 ) ?  vowels : consonnants;
			randomLetters.push( random.item( pool ) );

		}

		return randomLetters.join( '' );

	}

	/**
	 * Generates a serial number ( ex: 58AS39KG ).
	 *
	 * @returns {String} The generated serial number.
	 */
	serial() {

		const { verbose, random } = this;

		const length = ( verbose ) ? 8 : 4;
		const filtered = 'ilo'; // To avoid Il/o0 confusion
		const pool = letters.alphabet
			.filter( letter => ! filtered.includes( letter ) );

		const chars = Array.from( { length }, () =>
			random.bool()
				? random.item( pool ).toUpperCase()
				: random.int( 1, 9 )
		);

		return chars.join( '' );

	}

	/**
	 * Generates a random string, intended to be used as a seed by a Vesuna
	 * instance. The output will depend on the mode, separator and verbose
	 * properties.
	 *
	 * @returns {String} The generated string.
	 */
	generate() {

		const { mode, codename, description, gibberish, serial } = this;

		const defaultMethod = codename;
		const methods = { codename, description, gibberish, serial };
		const method = methods[ mode ] || defaultMethod;

		return method.call( this );

	}

}

SeedGenerator.codenames = codenames;
SeedGenerator.descriptions = descriptions;
SeedGenerator.letters = letters;

SeedGenerator.modes = {
	CODENAME: 'codename',
	DESCRIPTION: 'description',
	GIBBERISH: 'gibberish',
	SERIAL: 'serial'
};

SeedGenerator.separators = {
	NONE: '',
	DASH: '-',
	DOT: '.',
	SLASH: '/',
	SPACE: ' ',
	TILDE: '~',
	UNDERSCORE: '_'
};

export { SeedGenerator };
