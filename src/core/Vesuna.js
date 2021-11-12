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

}

export { Vesuna };
