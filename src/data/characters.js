const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split( '' );
const vowels = 'aeiou'.split( '' );
const consonnants = alphabet.filter( letter => ! vowels.includes( letter ) );
const numbers = Array.from( { length: 10 }, ( _, i ) => String( i ) );

const characters = { alphabet, vowels, consonnants, numbers };

export { characters };
