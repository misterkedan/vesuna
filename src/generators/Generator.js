import { Random } from '../core/Random';

class Generator {

	/**
	 * Creates a basic string generator.
	 * @param {Random} random A Random instance that will be used for generating
	 * string outputs.
	 */
	constructor( random = new Random() ) {

		this.random = random;

	}

	/**
	 * Generates a hash.
	 * @returns {String} A 6 character alphanumeric hash.
	 */
	generate( separator, verbose ) {

		const length = ( verbose ) ? 2 : 1;

		return Array.from( { length } )
			.map( () => this.random.amount().toString( 36 ).slice( - 6 ) )
			.join( separator );

	}

}

export { Generator };
