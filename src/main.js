import { Random } from './core/Random';
import { SeedGenerator } from './core/SeedGenerator';
import { Vesuna } from './core/Vesuna';
import { Alea } from './lib/Alea';

let instance;

const { modes, separators, codenames, descriptions, letters } = SeedGenerator;

const vesuna = {

	Random, SeedGenerator, Vesuna, Alea,

	modes, separators, codenames, descriptions, letters,

	/*-----------------------------------------------------------------------------/

		Vesuna instance

	/-----------------------------------------------------------------------------*/

	get instance() {

		if ( ! instance ) instance = new Vesuna();
		return instance;

	},

	autoseed() {

		vesuna.instance.autoseed();

	},

	reset() {

		vesuna.instance.reset();

	},

	random( min = 0, max = 1, rounded = false ) {

		return vesuna.instance.random( min, max, rounded );

	},

	int( min, max ) {

		return vesuna.instance.int( min, max );

	},

	uint( max ) {

		return vesuna.instance.uint( max );

	},

	bool() {

		return vesuna.instance.bool();

	},

	item( array ) {

		return vesuna.instance.item( array );

	},

	char( string ) {

		return vesuna.instance.char( string );

	},

	get seed() {

		return vesuna.instance.seed;

	},

	set seed( value ) {

		vesuna.instance.seed = value;

	},

	/*-------------------------------------------------------------------------/

		SeedGenerator

	/-------------------------------------------------------------------------*/

	codename() {

		return vesuna.instance.generator.codename();

	},

	description() {

		return vesuna.instance.generator.description();

	},

	gibberish() {

		return vesuna.instance.generator.gibberish();

	},

	serial() {

		return vesuna.instance.generator.serial();

	},

	get mode() {

		return vesuna.instance.generator.mode;

	},

	set mode( value ) {

		vesuna.instance.generator.mode = value;

	},

	get separator() {

		return vesuna.instance.generator.separator;

	},

	set separator( value ) {

		vesuna.instance.generator.separator = value;

	},

	get verbose() {

		return vesuna.instance.generator.verbose;

	},

	set verbose( value ) {

		vesuna.instance.generator.verbose = value;

	},

};

//export { Alea };
//export { Random };
//export { SeedGenerator };
//export { Vesuna };

export default vesuna;
