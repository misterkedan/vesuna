import { random } from './utils/random';
import { codename } from './data/codename';
import { description } from './data/description';



const DESCRIPTION = 'description';
const CODENAME = 'codename';
const modes = {
	DESCRIPTION: DESCRIPTION,
	CODENAME: CODENAME
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

	const defaultGenerator = generateCodename;

	const generators = {
		[ DESCRIPTION ]: generateDescription,
		[ CODENAME ]: generateCodename,
	};

	const generator = generators[ vesunna.mode ] || defaultGenerator;

	vesunna.seed = generator( basic );

	return vesunna.seed;

}

const vesunna = { modes, mode, separators, separator, basic, seed, generate };

export default vesunna;
