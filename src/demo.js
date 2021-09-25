import vesuna from 'vesuna';
import * as dat from 'dat.gui';

/*-----------------------------------------------------------------------------/

	Demo

/-----------------------------------------------------------------------------*/

const element = document.getElementById( 'demo' );

const LABEL = 'GENERATE';
const demo = { [ LABEL ]: generate };

vesuna.separator = vesuna.separators.DASH;

function generate() {

	vesuna.autoseed();
	update();

}

function update() {

	const { seed, separator } = vesuna;

	const capitalize = ( string ) =>
		string.charAt( 0 ).toUpperCase() + string.slice( 1 );

	const split = ( separator )
		? seed.split( separator )
		: [ seed ];

	element.textContent = split.map( word => capitalize( word ) ).join( ' ' );

	draw();

}

/*-----------------------------------------------------------------------------/

	GUI

/-----------------------------------------------------------------------------*/

const gui = new dat.GUI();
gui.vesuna = gui.addFolder( 'Vesuna' );
gui.vesuna.add( vesuna, 'mode', vesuna.modes ).onChange( generate );
gui.vesuna.add( vesuna, 'separator', vesuna.separators ).onChange( generate );
gui.vesuna.add( vesuna, 'verbose' ).onChange( generate );
gui.vesuna.add( vesuna, 'seed' ).onChange( update ).listen();
gui.vesuna.add( demo, LABEL );
gui.vesuna.open();

// Hide GUI on small screens/windows
const testWidth = ( window.devicePixelRatio <= 2 ) ? 640 : 1280;
if ( window.innerWidth < testWidth ) gui.close();

/*-----------------------------------------------------------------------------/

	Generative background

/-----------------------------------------------------------------------------*/

const canvas = document.getElementById( 'demo-canvas' );
const context = canvas.getContext( '2d' );

function draw() {

	vesuna.reset();

	const width = window.innerWidth;
	const height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;

	context.globalCompositeOperation = 'source-over';
	context.clearRect( 0, 0, width, height );

	const scale = vesuna.random( 0.1, 0.5 );
	const maxRadius = Math.max( width, height ) * scale;

	const r1 = vesuna.int( 0, 255 );
	const g1 = vesuna.int( 0, 255 );
	const b1 = vesuna.int( 0, 255 );

	const r2 = vesuna.int( 0, 255 );
	const g2 = vesuna.int( 0, 255 );
	const b2 = vesuna.int( 0, 255 );

	const color1 = `rgba(${r1}, ${g1}, ${b1}, 0.15)`;
	const color2 = `rgba(${r2}, ${g2}, ${b2}, 0.15)`;

	const gradient = context.createLinearGradient( 0, 0, width, 0 );
	gradient.addColorStop( 0, color1 );
	gradient.addColorStop( 1, color2 );
	context.fillStyle = gradient;

	const circles = vesuna.int( 7, 14 );
	const ripples = vesuna.int( 3, 6 );

	const cicleIncrement = 1 / circles;
	const rippleIncrement = 1 / ripples;

	for ( var i = 0; i < circles; i ++ ) {

		const randomX = vesuna.uint( width );
		const randomY = vesuna.uint( height );

		const radius = maxRadius * ( cicleIncrement * i );

		for ( var j = 0; j < ripples; j ++ ) {

			context.beginPath();
			context.arc(
				randomX,
				randomY,
				radius * rippleIncrement * j,
				0, 2 * Math.PI, false
			);
			context.fill();

		}

	}

	const saturationGradient = context.createLinearGradient( 0, 0, 0, height );
	saturationGradient.addColorStop( 0, color1 );
	saturationGradient.addColorStop( 1, color2 );
	context.fillStyle = saturationGradient;

	context.globalCompositeOperation = 'saturation';
	context.fillRect( 0, 0, width, height );

}

/*-----------------------------------------------------------------------------/

	Init

/-----------------------------------------------------------------------------*/

window.addEventListener( 'resize', draw );
element.addEventListener( 'pointerup', generate );

generate();
