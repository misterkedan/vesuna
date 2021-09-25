# Vesuna

![Preview](cover.jpg)

Vesuna is a small utiliy to generate and use memorable random seeds.  

[Demo](https://pierrekeda.github.io/vesuna/)  
Note that the generated background will always be the same for a given seed.  
Typing "vesuna" will give the outcome above.

# Credits

This library is based on David Bau's [seedrandom](https://github.com/davidbau/seedrandom).  
More specifically on [Alea](https://github.com/davidbau/seedrandom/blob/released/lib/alea.js), his port of [Johannes Baagøe's PRNG algorithm](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror).

# What it's for

**Use a string as seed**  
Because it is easier to remember, share and differentiate than a numerical seed.  
Ex: bluefox/fireking vs 2030949/1879546.  

**Generate easy to remember strings**  
Use vesuna.autoseed() to generate an amusing short description, a codename, some gibberish, or a serial number.  

**Generate a wide variety of numbers**  
Use vesuna.random() to generate as many pseudorandom 32-bit floats as you need.

**Reproduce specific results**   
Once setup with a seed, vesuna.random() will produce floats in sequences that will always be the same with that exact seed. It's intended as a Math.random() replacement for generative applications using many randomized settings, allowing to easily save and restore an exact outcome.  

	IMPORTANT !
	Intended for personal/creative use.  
	The seeded pseudorandomness is predictable by nature.  
	It is unsafe for security-sensitive applications.  

# Installation

Via [npm](https://www.npmjs.com/package/vesuna).   

	npm install vesuna --save

```javascript
import vesuna from 'vesuna';
```

Or manually import [the minified build](build/vesuna.min.js).

```html
<script src="vesuna.min.js"></script>
```

# Basic usage

```javascript
// Manually set a seed (case sensitive)
vesuna.seed = 'custom seed';

// Generate a random float between 0 and 1, similar to Math.random()

vesuna.random(); // Will always return 0.7621682670433074
vesuna.random(); // Will always return 0.44742328324355185
vesuna.random(); // Will always return 0.6701190846506506

vesuna.reset();  // Reset the sequence

vesuna.random(); // Will always return 0.7621682670433074
vesuna.random(); // Will always return 0.44742328324355185
vesuna.random(); // Will always return 0.6701190846506506

vesuna.seed = 'new seed'; // Change the seed for another sequence

vesuna.random(); // Will always return 0.12564408965408802
vesuna.random(); // Will always return 0.3661188334226608
vesuna.random(); // Will always return 0.6075689995195717
```

# Autoseed

You can seed Vesuna with any string, but it also includes a string generator, designed to create easy to memorize seeds.  

Note: vesuna begins autoseeded.  

```javascript
vesuna.autoseed();

console.log( vesuna.seed ); // Ex: bluefox
```

## Settings

There are a few settings to customize the random seeds you can get.

```javascript
// Set vesuna.verbose to true for more complex seeds
vesuna.verbose = true;
vesuna.autoseed(); // blue-fox-428

// Different modes for different possible outcomes
vesuna.mode = vesuna.modes.CODENAME;
vesuna.autoseed(); // blue-fox, blue-fox-428

vesuna.mode = vesuna.modes.DESCRIPTION;
vesuna.autoseed(); // sneezing-penguin, loudly-sneezing-giant-penguin

vesuna.mode = vesuna.modes.GIBBERISH;
vesuna.autoseed(); // xuve, xuvetemi

vesuna.mode = vesuna.modes.SERIAL;
vesuna.autoseed(); // 58AS, 58AS39KG

// Separate words using a symbol (for urls)
vesuna.separator = vesuna.separators.NONE       // bluefox
vesuna.separator = vesuna.separators.DASH       // blue-fox
vesuna.separator = vesuna.separators.DOT        // blue.fox
vesuna.separator = vesuna.separators.TILDE      // blue~fox
vesuna.separator = vesuna.separators.UNDERSCORE // blue_fox

// Default settings
vesuna.separator = vesuna.separators.NONE;
vesuna.mode = vesuna.modes.CODENAME;
vesuna.verbose = false;
```

## Possible outcomes

This autoseeder provides a limited number of possible seeds, depending on the current settings. For example, using the defaults (vesuna.modes.CODENAME & vesuna.verbose=false) gives 1024 possible outcomes.  

**Codename**  
1024 / 1,024,000  

**Description**  
256 / 65,536  

**Gibberish**  
11,025 / 121,550,625  

**Serial**  
Depending on letter-number RNG  
From 6,561 / 43,046,721  
To 279,841 / 78,310,985,281  

## Use without autoseeding

To leave the current seed unchanged, and just get a random string for another use:  

```javascript
vesuna.codename();
vesuna.description();
vesuna.gibberish();
vesuna.serial();
```
Those will use the current autoseed settings ( separator & verbose ), but unlike vesuna.autoseed() these methods will NOT update vesuna.seed.  

# Random helpers

In addition to vesuna.random(), you can use the following, for convenience:

```javascript
vesuna.random( -1, 1 ); // Float between -1 and 1, inclusive
vesuna.random( -2, 2, true ); // Rounded float
vesuna.int( -3, 3 )     // Integer, same as vesuna.random( -3, 3, true )
vesuna.uint( 4 );       // Unsigned integer, same as vesuna.random( 0, 4, true)
vesuna.bool();          // Either true or false
vesuna.item( array );   // Item from an array
vesuna.char( string );  // Character from a string
```

# Summary

## Seed generation
```javascript
// Generate a seed
vesuna.autoseed();

// Or set a seed manually
vesuna.seed = 'custom seed';

// Get the current seed
console.log( vesuna.seed ); // bluefox

// Modes
vesuna.mode = vesuna.modes.CODENAME;    // blue-fox
vesuna.mode = vesuna.modes.DESCRIPTION; // sneezing-penguin
vesuna.mode = vesuna.modes.GIBBERISH;   // xuve
vesuna.mode = vesuna.modes.SERIAL;      // 58AS

// Separators - Any string will work
vesuna.separator = vesuna.separators.NONE;       // bluefox
vesuna.separator = vesuna.separators.DOT;        // blue.fox
vesuna.separator = vesuna.separators.TILDE;      // blue~fox
vesuna.separator = vesuna.separators.UNDERSCORE; // blue_fox
vesuna.separator = vesuna.separators.DASH;       // blue-fox

// For more complexity
vesuna.verbose = true;

// Defaults
vesuna.mode = vesuna.modes.CODENAME; 
vesuna.separator = vesuna.separators.NONE;
vesuna.verbose = false;
```

## Seed usage

```javascript
// Once the seed is set, use it to generate pseudorandom numbers sequences
vesuna.random(); // Will always return 0.7621682670433074
vesuna.random(); // Will always return 0.44742328324355185
vesuna.random(); // Will always return 0.6701190846506506

vesuna.reset();  // Reset the sequence

vesuna.random(); // Will always return 0.7621682670433074
vesuna.random(); // Will always return 0.44742328324355185
vesuna.random(); // Will always return 0.6701190846506506

vesuna.seed = 'new seed'; // Change the seed for another sequence

vesuna.random(); // Will always return 0.12564408965408802
vesuna.random(); // Will always return 0.3661188334226608
vesuna.random(); // Will always return 0.6075689995195717

vesuna.random( 0, 1, false ); // Defaults min, max, rounded

// Helper methods
vesuna.int( -3, 3 );
vesuna.uint( 4 );
vesuna.bool();
vesuna.item( array );
vesuna.char( string );
```

***
*Pierre Keda - 2021*
