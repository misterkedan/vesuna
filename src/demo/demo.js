import 'core-js/stable';
import { Sketchpad } from 'sk3tch';
import sketch from './DemoSketch';

const sketchpad = new Sketchpad( { fps: 60 } );
sketchpad.open( sketch );
