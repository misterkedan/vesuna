import { Controls } from 'sk3tch';
import { Vesuna } from '../core/Vesuna';

class DemoControls extends Controls {

	init( sketch ) {

		if ( sketch.sketchpad.device.phone ) {

			sketch.config.keyboard = false;
			sketch.config.gui = false;

		}

		super.init( sketch );

	}

	initGUI() {

		super.initGUI();

		const { gui, sketch } = this;
		const { modes } = Vesuna;
		const { separators } = Vesuna;
		const rebuild = () => sketch.rebuild();
		const generate = () => sketch.generate();

		gui.add( sketch.random, 'seed' ).listen().onFinishChange( rebuild );
		gui.add( sketch.random, 'mode', modes ).onChange( generate );
		gui.add( sketch.random, 'separator', separators ).onChange( generate );
		gui.add( sketch.random, 'verbose' ).onChange( generate );
		gui.add( sketch, 'generate' );

	}

	initKeyboard() {

		super.initKeyboard( {
			'Shift + O': () => this.sketchpad.overlay.visibility.toggle(),
			'Shift + P': () => this.sketchpad.ticker.toggle(),
			'Shift + S': () => this.sketchpad.savePNG(),
			'Backspace': () => this.sketch.replay(),
			'Space': () => this.sketch.generate(),
		} );

	}

	initClick() {

		super.initClick( () => this.sketch.generate() );

	}

}

export { DemoControls };
