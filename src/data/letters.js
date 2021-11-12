const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split( '' );
const vowels = 'aeiou'.split( '' );
const consonnants = alphabet.filter( letter => ! vowels.includes( letter ) );

export default { alphabet, vowels, consonnants };
