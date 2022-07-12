import { VesunaLite } from './VesunaLite';
import { CodenameGenerator } from '../generators/CodenameGenerator';
import { Generator } from '../generators/Generator';
import { DishGenerator } from '../generators/DishGenerator';
import { GibberishGenerator } from '../generators/GibberishGenerator';

class Vesuna extends VesunaLite {

	/**
	 * Creates a string-seeded PRNG, that will always generate the same
	 * pseudorandom number sequence for a given seed, coupled with an advanced
	 * seed generator.
	 * @param {Object} options Options object.
	 * @param {String} options.seed The initial seed.
	 * @param {String} options.mode A generator mode, pick one from Vesuna.modes.
	 * @param {String} options.separator A character to separate words. See
	 * Vesuna.separators for examples.
	 * @param {Boolean} options.verbose Set to true for longer seeds with more
	 * possible outcomes.
	 */
	constructor( {
		seed,
		mode = Vesuna.modes.CODENAME,
		separator = Vesuna.separators.NONE,
		verbose = false,
	} = {} ) {

		const GeneratorClass = Vesuna.generators[ mode ] || CodenameGenerator;
		const generator = new GeneratorClass();

		if ( ! seed ) seed = generator.generate( separator, verbose );

		super( seed, generator );

		this._mode = mode;
		this.separator = separator;
		this.verbose = verbose;

	}

	/**
	 * Generates a seed for this Vesuna instance, using a Generator.
	 */
	autoseed() {

		this.seed = this.generator.generate( this.separator, this.verbose );

	}

	/*-------------------------------------------------------------------------/

		Getters & Setters

	/-------------------------------------------------------------------------*/

	get mode() {

		return this._mode;

	}

	set mode( string ) {

		const Generator = Vesuna.generators[ string ];
		if ( ! Generator ) {

			this.mode = Vesuna.modes.CODENAME;
			return;

		}

		this._mode = string;
		this.generator = new Generator();
		this.autoseed();

	}

}

const CODENAME = 'codename';
const DISH = 'dish';
const GIBBERISH = 'gibberish';
const HASH = 'hash';
Vesuna.modes = { CODENAME, DISH, GIBBERISH, HASH };

Vesuna.generators = {
	[ CODENAME ]: CodenameGenerator,
	[ DISH ]: DishGenerator,
	[ GIBBERISH ]: GibberishGenerator,
	[ HASH ]: Generator,
};

Vesuna.separators = {
	NONE: '',
	DASH: '-',
	DOT: '.',
	SLASH: '/',
	SPACE: ' ',
	TILDE: '~',
	UNDERSCORE: '_',
};

export { Vesuna };
