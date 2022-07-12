import { Generator } from './Generator';

class CodenameGenerator extends Generator {

	/**
	 * Generates a codename.
	 * @param {String} separator A character to insert between words.
	 * @param {Boolean} verbose Set to true for longer results.
	 * @returns {String} A codename.
	 */
	generate( separator, verbose ) {

		const wordPool = [
			'amber',
			'angel',
			'anti',
			'armor',
			'back',
			'bane',
			'bay',
			'beast',
			'beat',
			'bird',
			'blade',
			'blast',
			'block',
			'bolt',
			'bot',
			'brake',
			'cable',
			'cage',
			'cell',
			'city',
			'clear',
			'clone',
			'cloud',
			'code',
			'core',
			'craft',
			'crown',
			'cypher',
			'dash',
			'dawn',
			'deck',
			'deep',
			'delta',
			'demon',
			'dive',
			'dock',
			'doll',
			'dome',
			'dove',
			'draft',
			'dragon',
			'dream',
			'drift',
			'drive',
			'drone',
			'drop',
			'drum',
			'dune',
			'dust',
			'east',
			'eden',
			'echo',
			'edge',
			'elder',
			'elite',
			'fade',
			'fake',
			'fall',
			'far',
			'fiber',
			'field',
			'fish',
			'flake',
			'flare',
			'flash',
			'flow',
			'flower',
			'force',
			'forge',
			'forest',
			'fox',
			'free',
			'fresh',
			'garden',
			'gate',
			'ghost',
			'glove',
			'grace',
			'grid',
			'ground',
			'hack',
			'halo',
			'hand',
			'harp',
			'haven',
			'hawk',
			'heart',
			'hill',
			'hide',
			'hive',
			'home',
			'hope',
			'house',
			'hydra',
			'hyper',
			'jack',
			'jet',
			'jump',
			'jungle',
			'karma',
			'key',
			'kill',
			'kind',
			'king',
			'knight',
			'lab',
			'lake',
			'lance',
			'land',
			'laser',
			'last',
			'light',
			'link',
			'lion',
			'liquid',
			'lock',
			'logic',
			'lost',
			'lotus',
			'lunar',
			'lynx',
			'macro',
			'mage',
			'mana',
			'mask',
			'maze',
			'meta',
			'mind',
			'mine',
			'miss',
			'mist',
			'mode',
			'monk',
			'moon',
			'moss',
			'mouse',
			'mute',
			'nano',
			'neon',
			'neuron',
			'nest',
			'noise',
			'north',
			'nova',
			'ocean',
			'omen',
			'order',
			'over',
			'pack',
			'paper',
			'past',
			'pine',
			'phase',
			'plastic',
			'prime',
			'prism',
			'pulse',
			'queen',
			'quest',
			'quick',
			'raid',
			'rain',
			'rank',
			'rare',
			'raven',
			'realm',
			'retro',
			'rise',
			'river',
			'road',
			'rock',
			'rust',
			'sand',
			'scan',
			'saber',
			'salt',
			'seal',
			'sector',
			'shadow',
			'sharp',
			'shield',
			'shift',
			'shrine',
			'ship',
			'shock',
			'shore',
			'shot',
			'silk',
			'snow',
			'sky',
			'solar',
			'soul',
			'sound',
			'south',
			'space',
			'spade',
			'spark',
			'spider',
			'spirit',
			'spring',
			'stack',
			'star',
			'stream',
			'stone',
			'storm',
			'sugar',
			'summer',
			'sun',
			'swan',
			'swift',
			'sword',
			'synth',
			'tango',
			'tank',
			'task',
			'techno',
			'tide',
			'tiger',
			'time',
			'titan',
			'token',
			'tower',
			'trap',
			'tree',
			'tribe',
			'tuna',
			'twin',
			'vector',
			'velvet',
			'vision',
			'wake',
			'walk',
			'wall',
			'war',
			'warp',
			'water',
			'watch',
			'wave',
			'way',
			'west',
			'wild',
			'will',
			'wind',
			'wing',
			'winter',
			'wire',
			'wise',
			'witch',
			'wolf',
			'wood',
			'world',
			'youth',
			'zeal',
			'zen',
			'zero',
			'zone',
		];
		const getRandomWord = () => this.random.item( wordPool );

		const vowels = 'aeiouy';
		const isVowel = ( char ) => vowels.includes( char );
		const getFirstLetter = ( word ) => word.charAt( 0 );
		const getLastLetter = ( word ) => word.charAt( word.length - 1 );

		const length = ( verbose ) ? 4 : 2;
		const words = Array.from( { length } ).reduce( ( array, _, i ) => {

			let word = getRandomWord();
			if ( i === 0 ) {

				array.push( word );
				return array;

			}

			const lastLetter = getLastLetter( array[ i - 1 ] );

			while (
				// Confusing vowel repeats (ex: sea + all = seaall)
				( isVowel( lastLetter ) && isVowel( getFirstLetter( word ) ) ) ||
				// Confusing letter repeats (ex: fit + top = fittop)
				( lastLetter === getFirstLetter( word ) ) ||
				// Word repetitions (ex: appleapple )
				array.includes( word )
			) {

				word = getRandomWord();

			}

			array.push( word );
			return array;

		}, [] );

		return words.join( separator );

	}

}

export { CodenameGenerator };
