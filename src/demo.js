import vesunna from 'vesunna';
import * as dat from 'dat.gui';

// Demo

const element = document.getElementById( 'demo' );

const LABEL = 'GENERATE SEED';
const demo = { [ LABEL ]: generate };

function generate() {

	vesunna.generate();
	update();

}

function update() {

	const { seed, separator } = vesunna;

	const capitalize = ( string ) =>
		string.charAt( 0 ).toUpperCase() + string.slice( 1 );

	const split = ( separator )
		? seed.split( separator )
		: [ seed ];

	element.textContent = split.map( word => capitalize( word ) ).join( ' ' );

	draw();

}

// GUI

const gui = new dat.GUI();
gui.vesunna = gui.addFolder( 'Vesunna' );
gui.vesunna.add( vesunna, 'mode', vesunna.modes ).onChange( generate );
gui.vesunna.add( vesunna, 'separator', vesunna.separators ).onChange( generate );
gui.vesunna.add( vesunna, 'basic' ).onChange( generate );
gui.vesunna.add( vesunna, 'seed' ).onFinishChange( update ).listen();
gui.vesunna.add( demo, LABEL );
gui.vesunna.open();

// DRAW CIRCLES

const canvas = document.getElementById( 'demo-canvas' );
const context = canvas.getContext( '2d' );

function draw() {

	vesunna.reset();

	const width = window.innerWidth;
	const height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;

	context.globalCompositeOperation = 'source-over';
	context.clearRect( 0, 0, width, height );

	const scale = vesunna.random( 0.1, 0.5 );
	const maxRadius = Math.max( width, height ) * scale;

	const r1 = vesunna.int( 0, 255 );
	const g1 = vesunna.int( 0, 255 );
	const b1 = vesunna.int( 0, 255 );

	const r2 = vesunna.int( 0, 255 );
	const g2 = vesunna.int( 0, 255 );
	const b2 = vesunna.int( 0, 255 );

	const color1 = `rgba(${r1}, ${g1}, ${b1}, 0.15)`;
	const color2 = `rgba(${r2}, ${g2}, ${b2}, 0.15)`;

	const gradient = context.createLinearGradient( width / 3, 0, width * 2 / 3, 0 );
	gradient.addColorStop( 0, color1 );
	gradient.addColorStop( 1, color2 );
	context.fillStyle = gradient;

	const circles = vesunna.int( 7, 14 );
	const ripples = vesunna.int( 3, 6 );

	const cicleIncrement = 1 / circles;
	const rippleIncrement = 1 / ripples;

	for ( var i = 0; i < circles; i ++ ) {

		const randomX = vesunna.uint( width );
		const randomY = vesunna.uint( height );

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

	const background = context.createLinearGradient( 0, 0, 0, height );
	background.addColorStop( 0, color1 );
	background.addColorStop( 1, color2 );
	context.fillStyle = background;

	context.globalCompositeOperation = 'saturation';
	context.fillRect( 0, 0, width, height );

}

window.addEventListener( 'resize', draw );
element.addEventListener( 'pointerup', generate );

vesunna.separator = vesunna.separators.DASH;
generate();
