import { Generator } from './Generator';

class GibberishGenerator extends Generator {

	/**
	 * Generates some gibberish.
	 * @param {String} separator A character to insert between words.
	 * @param {Boolean} verbose Set to true for longer results.
	 * @returns {String} Some gibberish.
	 */
	generate( separator, verbose ) {

		return ( verbose )
			? this.generateWord() + separator + this.generateWord()
			: this.generateWord( 6 );

	}

	/**
	 * Returns a gibberish word, alternating between vowels and consonants.
	 * @param {Number} length The number of characters.
	 * @param {Boolean} vowelFirst Whether to start with a vowel or not.
	 * @returns {String} A gibberish word.
	 */
	generateWord( length = this.random.int( 3, 6 ), vowelFirst = this.random.bool() ) {

		let toggle = vowelFirst;

		return Array.from( { length }, () => {

			toggle = ! toggle;

			return ( toggle )
				? this.random.char( 'bcdfgjkmnprstvwz' )
				: this.random.char( 'aeio' );

		} ).join( '' );

	}

}

export { GibberishGenerator };
