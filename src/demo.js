import vesunna from 'vesunna';
import * as dat from 'dat.gui';

/*-----------------------------------------------------------------------------/

	Demo

/-----------------------------------------------------------------------------*/

const element = document.getElementById( 'demo' );

const demo = { seed: '', generate };

function generate() {

	const seed = vesunna.generate();
	demo.seed = seed;
	element.textContent = formatDescription( seed );
	console.log( seed );

}

function capitalize( string ) {

	return string.charAt( 0 ).toUpperCase() + string.slice( 1 );

}

function formatDescription( string ) {

	return string.split( '-' ).map( word => capitalize( word ) ).join( ' ' );

}

generate();

/*-----------------------------------------------------------------------------/

	Demo GUI

/-----------------------------------------------------------------------------*/

const gui = new dat.GUI();
gui.vesunna = gui.addFolder( 'Vesunna' );
gui.vesunna.add( demo, 'seed' ).listen();
gui.vesunna.add( demo, 'generate' );
gui.vesunna.open();
