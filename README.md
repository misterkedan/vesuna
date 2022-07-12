# Vesuna

![Preview](preview.gif)

Vesuna is a small utility library, to generate and use memorable random seeds.  

# Demo

[pierrekeda.com/demo/vesuna](https://pierrekeda.com/demo/vesuna/) 

Note that the result is always the same for a given seed, despite being pseudorandomly generated.  

*Demo made with:
[sk3ch](https://github.com/pierrekeda/sk3tch), 
[three.js](https://github.com/mrdoob/three.js) and 
[lil-gui](https://lil-gui.georgealways.com).*

# What it's for

**Use a string as seed**  
Because it is easier to remember, share and differentiate than a numerical seed.  
Ex: skywolf/spacetuna vs 2030949/1879546.  

**Generate easy to remember strings**  
Use vesuna.autoseed() to generate a codename, a dish, some gibberish, or a hash.  

**Generate a wide variety of numbers**  
Use vesuna.random() to generate pseudorandom 32-bit floats between 0 and 1. You can generate as many as you need, and also can use some built-in helper methods to generate uints, booleans etc.  

**Reproduce specific results**   
Once setup with a seed, vesuna.random() will produce floats in sequences that will always be the same with that exact seed. It is intended as a Math.random() replacement for generative applications using many randomized settings, allowing to easily save and restore an exact outcome.  

	IMPORTANT: 
	Made for creative/generative applications.  
	Seeded pseudorandomness is predictable by nature, which makes it unsafe for security-sensitive applications.  

# Installation

Via [npm](https://www.npmjs.com/package/vesuna).   

	npm install vesuna --save

```javascript
import {Vesuna} from 'vesuna';

const vesuna = new Vesuna();
```

# Basic usage

```javascript

// Manually set a seed (case sensitive)
vesuna.seed = 'a random seed';

// Generate a random float between 0 and 1, similar to Math.random()

vesuna.random(); // Will always return 0.6696700062602758
vesuna.random(); // Will always return 0.7957393529359251
vesuna.random(); // Will always return 0.49764455226249993

vesuna.reset();  // Reset the sequence

vesuna.random(); // Will always return 0.6696700062602758
vesuna.random(); // Will always return 0.7957393529359251
vesuna.random(); // Will always return 0.49764455226249993

vesuna.seed = 'another random seed'; // Change the seed for another sequence

vesuna.random(); // Will always return 0.18839840171858668
vesuna.random(); // Will always return 0.3372709883842617
vesuna.random(); // Will always return 0.737179079791531
```

# Random helpers

In addition to vesuna.random(), you can use the following, for convenience:

```javascript
// Numbers
vesuna.number(-2, 2); 		// Float between -2 and 2
vesuna.number(-2, 2, true);	// -2, -1, 0, 1, 2 (rounded)
vesuna.integer(-3, 3);		// -3, -2, -1, 0, 1, 2, 3
vesuna.unsignedInteger(4);	// 0, 1, 2, 3, 4

// Booleans
vesuna.boolean();	// true or false
vesuna.chance(1/4);	// 1/4 chance to be true, 3/4 to be false

// Numbers (advanced)
vesuna.noise()	// Float between -1 and 1
vesuna.sign();	// -1 or 1
vesuna.numberFrom({min:-3, max:3});	// Float between -3 and 3
vesuna.integerFrom({min:2, max 4});	// 2, 3, 4

// Objects
vesuna.entry({foo:0, bar:1});	// ['foo', 0] or ['bar', 1]
vesuna.key({foo:0, bar:1});		// 'foo' or 'bar'
vesuna.value({foo:0, bar:1});	// 0 or 1
vesuna.item([foo, bar]);		// foo or bar
vesuna.character('abc');		// 'a', 'b' or 'c'

// Aliases / Shorthands
vesuna.amount();	// vesuna.random()
vesuna.num();		// vesuna.number()
vesuna.int();		// vesuna.integer()
vesuna.uint();		// vesuna.unsignedInteger()
vesuna.bool();		// vesuna.boolean()
vesuna.numFrom();	// vesuna.numberFrom()
vesuna.intFrom();	// vesuna.integerFrom()
vesuna.char();		// vesuna.character()
```

# Autoseed

You can seed a Vesuna instance with any string, but it also includes a string generator, designed to create easy to memorize seeds.  

Note: Vesuna instances autoseed by default.  

```javascript
let vesuna = new Vesuna('foobar');
console.log(vesuna.seed); // foobar

vesuna = new Vesuna();
console.log(vesuna.seed); // Ex: skywolf 

vesuna.autoseed();
console.log(vesuna.seed); // Ex: spacetuna
```

## Settings

There are a few settings to customize the random seeds you can get.

```javascript
// Set vesuna.verbose to true for more complex seeds
vesuna.verbose = true;
vesuna.autoseed(); // skywolfspacetuna

// Different modes for different possible outcomes
vesuna.mode = Vesuna.modes.CODENAME;
vesuna.autoseed(); // skywolf, skywolfspacetuna

vesuna.mode = Vesuna.modes.DISH;
vesuna.autoseed(); // spicybeef, spicybeefavocadosalad

vesuna.mode = Vesuna.modes.GIBBERISH;
vesuna.autoseed(); // wopeko, wopekosakina

vesuna.mode = Vesuna.modes.HASH;
vesuna.autoseed(); // 2af7as, 2af7asks3gqh

// Separate words using a symbol
vesuna.separator = Vesuna.separators.NONE;       // skywolf
vesuna.separator = Vesuna.separators.DASH;       // sky-wolf
vesuna.separator = Vesuna.separators.DOT;        // sky.wolf
vesuna.separator = Vesuna.separators.SLASH;      // sky/wolf
vesuna.separator = Vesuna.separators.SPACE;      // sky wolf
vesuna.separator = Vesuna.separators.TILDE;      // sky~wolf
vesuna.separator = Vesuna.separators.UNDERSCORE; // sky_wolf
// Can be any string
vesuna.separator = '+'; // sky+wolf

// Constructor options (with default values)
const vesuna = new Vesuna({
	seed: '',
	mode: Vesuna.modes.CODENAME,
	separator: Vesuna.separators.NONE,
	verbose: false,
});
```

## Possible outcomes

This autoseeder provides a limited number of possible seeds, depending on the current mode and verbose settings. For example, using the defaults (Vesuna.modes.CODENAME & verbose=false) results in about 60,000 possible outcomes.  

**Codename**  
61,863 / ~3,700,000,000

**Dish**  
22,524 / 67,731,456

**Gibberish**  
524,288 / ~160,000,000,000

**Hash**  
2,176,782,336 / 2,176,782,336²

# Lite version

If you don't need the fancy autoseed function, you can use the lite version instead.

```javascript
import {VesunaLite} from 'vesuna';

const vesuna = new VesunaLite();
vesuna.autoseed();	// 2af7as

// Mode, verbose and separator have no effect,
// but all the random helpers still work.
vesuna.uint();
vesuna.noise();
vesuna.item(array);
```
It's basically Alea with a basic hash autoseed, plus the random helpers.  
If you don't need those either, you can simply use Alea on its own.

```javascript
import {Alea} from 'vesuna';

const alea = new Alea('mySeed');
alea.random(); // 0-1 float
```


# Credits

This library is based on [Johannes Baagøe's PRNG algorithm](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror).

***
*Pierre Keda - 2022*
