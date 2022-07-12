import {
	BoxGeometry,
	ConeGeometry,
	CylinderGeometry,
	DodecahedronGeometry,
	IcosahedronGeometry,
	InstancedMesh,
	MathUtils,
	MeshBasicMaterial,
	Object3D,
	OctahedronGeometry,
	SphereGeometry,
	TetrahedronGeometry,
	TorusGeometry
} from 'three';
import { Sketch } from 'sk3tch';
import { Vesuna } from 'vesuna';

import { DemoControls } from './DemoControls';
import { DemoSettings } from './DemoSettings';
import { DemoColors } from './DemoColors';
import { Simplex } from './Simplex';

class Demo extends Sketch {

	constructor() {

		super( DemoControls, DemoSettings );

	}

	init() {

		this.dummy = new Object3D();
		this.meshes = [];
		this.random = new Vesuna();
		this.initCaption();

		super.init();

		this.updateCaption();

	}

	initCaption() {

		const caption = document.createElement( 'div' );
		caption.classList.add( 'caption' );
		caption.innerText = this.random.seed;
		this.caption = caption;
		this.sketchpad.container.appendChild( caption );

	}

	initScene() {

		const { random } = this;
		const simplex = new Simplex( random );

		const geometries = [
			BoxGeometry,
			ConeGeometry,
			CylinderGeometry,
			DodecahedronGeometry,
			IcosahedronGeometry,
			OctahedronGeometry,
			SphereGeometry,
			TetrahedronGeometry,
			TorusGeometry
		];

		const elements = random.int( 5, 20 );

		const colors = new DemoColors( random, 2, elements );
		this.background.color1.copy( colors.backgrounds[ 0 ] );
		this.background.color2.copy( colors.backgrounds[ 1 ] );

		this.sfx.radialBlur.strength = random.number( 0.15, 0.5 );
		this.sfx.bloom.strength = random.number( 0.2, 0.6 );

		const PI2 = Math.PI * 2;

		let radius = 0;
		const stepRadius = 3 / elements;

		for ( let i = 0; i < elements; i ++ ) {

			//const simple = random.boolean();

			const count = random.int( 5, 100 );

			const Class = random.item( geometries );
			const geometry = new Class();

			const material = new MeshBasicMaterial( {
				color: colors.foregrounds[ i ],
				wireframe: true,
				transparent: true,
				opacity: random.number( 0.1, 0.6 ),
			} );

			const mesh = new InstancedMesh(
				geometry,
				material,
				count
			);

			const randomness = random.chance( 0.6 ) ? 0 : random.number( 1, 3 );

			const stepRotation = PI2 / count;

			const noiseScale = random.number( 0.2, 0.05 );

			for ( let j = 0; j < count; j ++ ) {

				const rotation = stepRotation * j;

				const x = Math.cos( rotation ) * radius;
				const y = Math.sin( rotation ) * radius;

				const offsetX = ( randomness )
					? randomness  * simplex.noise2D( x * noiseScale, y * noiseScale )
					: 0;

				const offsetY = ( randomness )
					? randomness * simplex.noise2D( y * noiseScale, x * noiseScale )
					: 0;

				this.dummy.position.set(
					x + offsetX,
					y + offsetY,
				);
				this.dummy.rotation.z = x + y;

				this.dummy.updateMatrix();
				mesh.setMatrixAt( j, this.dummy.matrix );

			}

			mesh.instanceMatrix.needsUpdate = true;
			this.add( mesh );
			this.meshes.push( mesh );

			mesh.scale.set( 0, 0, 0 );

			mesh.userData.staggerStart = random.number( 0.4, 1.2 );
			mesh.userData.stagger = mesh.userData.staggerStart;
			mesh.userData.scale = 0;
			mesh.userData.rotation = random.number( - 0.2, 0.2 );

			radius += i * stepRadius + random.number( 0, stepRadius );

		}

	}

	clear() {

		this.meshes.forEach( mesh => {

			this.remove( mesh );
			mesh.geometry.dispose();
			mesh.material.dispose();
			mesh.dispose();

		} );

		this.meshes = [];

	}


	updateCaption() {

		const seed = this.random.seed.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' )
			.toLowerCase()
			.replace( /[^a-z0-9.\-/+~_ ]/g, '' );

		this.caption.innerText = seed;

	}

	generate() {

		this.random.autoseed();
		this.rebuild();

	}

	rebuild() {

		this.clear();
		this.initScene();
		this.updateCaption();

	}

	replay() {

		this.meshes.forEach( mesh => {

			mesh.userData.stagger = mesh.userData.staggerStart;
			mesh.userData.scale = 0;
			mesh.scale.set( 0, 0, 0 );

		} );

	}

	tick( delta ) {

		const speed = 0.001;
		const progress = delta * speed;

		const circ = t => 1 - Math.sqrt( 1 - t * t );
		const circOut = t => 1 - circ( 1 - t );

		this.meshes.forEach( mesh => {

			if ( mesh.userData.stagger > 0 ) mesh.userData.stagger -= progress;
			else {

				const scale = MathUtils.clamp(
					mesh.userData.scale + progress, 0, 1
				);
				mesh.userData.scale = scale;

				const easedScale = circOut( scale );
				mesh.scale.set( easedScale, easedScale, easedScale );

				mesh.rotation.z += progress * mesh.userData.rotation;

			}

		} );

		super.tick( delta );

	}

}

export { Demo };
export default Demo;
