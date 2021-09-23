const adverbs = [
	'loud', 'adorab', 'glad', 'zealous',
	'grumpi', 'happi', 'polite', 'expert',
	'awkward', 'warm', 'sincere', 'shy',
	'quiet', 'lazi', 'mad', 'bold'
].map( adverb => `${adverb}ly` );

const verbs = [
	'beam', 'giggl', 'paint', 'smil',
	'danc', 'laugh', 'sing', 'sneez',
	'clapp', 'whistl', 'hopp', 'cheer',
	'fly', 'greet', 'wav', 'juggl'
].map( verb => `${verb}ing` );

const adjectives = [
	'smart', 'creative', 'bubbly', 'fun',
	'cute', 'tiny', 'giant', 'laidback',
	'upbeat', 'kind', 'cool', 'brave',
	'dumb', 'tipsy', 'popular', 'generous'
];

const nouns = [
	'puppy', 'kitten', 'monkey', 'pumpkin',
	'robot', 'nun', 'ninja', 'giraffe',
	'baby', 'penguin', 'panda', 'koala',
	'bear', 'wizard', 'pirate', 'knight'
];

const description = [ adverbs, verbs, adjectives, nouns ];

export { description };
