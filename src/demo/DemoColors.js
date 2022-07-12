import { Color, MathUtils } from 'three';

class DemoColors {

	constructor(
		random,
		backgrounds = 2,
		foregrounds = 6,
	) {

		// H
		const baseHue = random.amount();
		const darkHueShift = 0.5 * random.noise();
		const lightHueShift = 0.1 * random.noise();

		// S
		const saturation = 1;

		// L
		const darkMin = 0;
		const darkMax = 0.2;
		const darkRandom = random.number( darkMin, darkMax );

		const lightMin = 0.6;
		const lightMax = 1;
		const lightRandom = random.number( lightMin, lightMax );

		const computeRange = ( min, max, steps ) => {

			const amplitude = max - min;
			const increment = ( steps < 3 ) ? amplitude : amplitude / ( steps - 1 );
			return { min, max, increment };

		};

		const dark = computeRange( darkRandom, darkMax, backgrounds );
		const light = computeRange( lightMin, lightRandom, foregrounds );

		// Get color variations

		const backgroundColors = Array.from( { length: backgrounds }, ( _, i ) => {

			const hue = Math.abs( ( baseHue + darkHueShift * i ) % 1 );
			const lightness = MathUtils.clamp(
				dark.min + dark.increment * i,
				darkMin,
				darkMax
			);

			return new Color().setHSL( hue, saturation, lightness );

		} );

		const foregroundColors = Array.from( { length: foregrounds }, ( _, i ) => {

			const hue = Math.abs( ( baseHue + lightHueShift * i ) % 1 );
			const lightness = MathUtils.clamp(
				light.max - light.increment * i,
				lightMin,
				lightMax
			);

			return new Color().setHSL( hue, saturation, lightness );

		} );

		if ( random.boolean ) backgroundColors.reverse();
		if ( random.boolean ) foregroundColors.reverse();

		this.backgrounds = backgroundColors;
		this.foregrounds = foregroundColors;

	}

}

export { DemoColors };
