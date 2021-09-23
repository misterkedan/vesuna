import { random } from './utils/random';
import { codename } from './data/codename';
import { description } from './data/description';
import { characters } from './data/characters';

console.log( characters );

const CODENAME = 'codename';
const DESCRIPTION = 'description';
const GIBBERISH = 'gibberish';
const modes = {
	DESCRIPTION: DESCRIPTION,
	CODENAME: CODENAME,
	GIBBERISH: GIBBERISH
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

const getRandomWord = ( words ) => random.item( words );

function generateGibberish() {

	const { basic } = vesunna;
	const { vowels, consonnants } = characters;

	const length = ( basic ) ? 3 : 6;
	const letters = Array.from( { length }, ( _, i ) => {

		const pool = ( i % 2 ) ?  vowels : consonnants;
		return random.item( pool );

	} );

	return letters.join( '' );

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

function generate() {

	const { mode } = vesunna;

	const defaultGenerator = generateCodename;

	const generators = {
		[ CODENAME ]: generateCodename,
		[ DESCRIPTION ]: generateDescription,
		[ GIBBERISH ]: generateGibberish,
	};

	const generator = generators[ mode ] || defaultGenerator;

	vesunna.seed = generator();

	return vesunna.seed;

}

const vesunna = { modes, mode, separators, separator, basic, seed, generate };

export default vesunna;
