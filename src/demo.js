import vesunna from 'vesunna';
import * as dat from 'dat.gui';

// Demo

const element = document.getElementById( 'demo' );

const LABEL = 'GENERATE SEED';
const demo = { [ LABEL ]: generate };

function generate() {

	const seed = vesunna.generate();
	demo.seed = seed;
	element.textContent = formatDescription( seed );
	log( false );

}

function capitalize( string ) {

	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );

}

function formatDescription( string ) {

	const splitted = ( vesunna.separator )
		? string.split( vesunna.separator )
		: [ string ];
	return splitted.map( word => capitalize( word ) ).join( ' ' );

}

function log( reset = true ) {

	const r = vesunna.random;
	if ( reset ) vesunna.reset();
	console.log( Array.from( { length: 8 }, () => r( 0, 9 ) ).join( '' ) );

}

generate();

// GUI

const gui = new dat.GUI();
gui.vesunna = gui.addFolder( 'Vesunna' );
gui.vesunna.add( vesunna, 'mode', vesunna.modes ).onChange( generate );
gui.vesunna.add( vesunna, 'separator', vesunna.separators ).onChange( generate );
gui.vesunna.add( vesunna, 'basic' ).onChange( generate );
gui.vesunna.add( vesunna, 'seed' ).onFinishChange( log ).listen();
gui.vesunna.add( demo, LABEL );
gui.vesunna.open();

