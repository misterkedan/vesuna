import { random } from './utils/random';
import { description } from './data/description';

function generateDescription() {

	return description.map( words => random.item( words ) ).join( '-' );

}

function generate() {

	return generateDescription();

}

const vesunna = { generate };

export default vesunna;
