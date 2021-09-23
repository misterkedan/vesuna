const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split( '' );
const vowels = 'aeiou'.split( '' );
const consonnants = alphabet.filter( letter => ! vowels.includes( letter ) );
const characters = { alphabet, vowels, consonnants };

export { characters };