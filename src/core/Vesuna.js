import { Alea } from '../lib/Alea';
import { Random } from './Random';
import { SeedGenerator } from './SeedGenerator';

class Vesuna extends Random {

	/**
	 * Creates a string-seeded PRNG, that will always generate the same
	 * pseudorandom number sequence for a given seed.
	 *
	 * @param {String} seed		The text-based seed.
	 */
	constructor( seed ) {

		super();

		if ( seed ) this.seed = seed;
		else this.autoseed();

	}

	/**
	 * Generates a seed for this Vesuna instance, using a SeedGenerator.
	 */
	autoseed() {

		this.seed = this.generator.generate();

	}

	/**
	 * Reset the number sequence. If the seed is unchanged, the sequence will
	 * be the same every time.
	 */
	reset() {

		this.prng = new Alea( this.seed );

	}

	/*-------------------------------------------------------------------------/

		Getters & Setters

	/-------------------------------------------------------------------------*/

	get generator() {

		if ( ! this._generator ) {

			if ( ! Vesuna.generator ) Vesuna.generator = new SeedGenerator();
			this._generator = Vesuna.generator;

		}

		return this._generator;

	}

	set generator( value ) {

		this._generator = value;

	}

	get seed() {

		return this._seed;

	}

	set seed( value ) {

		this._seed = value;
		this.reset();

	}

	/*-------------------------------------------------------------------------/

		Generator shortcuts

	/-------------------------------------------------------------------------*/

	codename() {

		return this.generator.codename();

	}

	description() {

		return this.generator.description();

	}

	gibberish() {

		return this.generator.gibberish();

	}

	serial() {

		return this.generator.serial();

	}

	get mode() {

		return this.generator.mode;

	}

	set mode( value ) {

		this.generator.mode = value;

	}

	get separator() {

		return this.generator.separator;

	}

	set separator( value ) {

		this.generator.separator = value;

	}

	get verbose() {

		return this.generator.verbose;

	}

	set verbose( value ) {

		this.generator.verbose = value;

	}

	get modes() {

		return SeedGenerator.modes;

	}

	get separators() {

		return SeedGenerator.separators;

	}

}

export { Vesuna };
