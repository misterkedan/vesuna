# Vesuna

![Preview](cover.jpg)

Vesuna is a small utiliy to generate and use memorable random seeds.  

[Demo](https://pierrekeda.github.io/vesuna/)  ( the pseudorandom generative background will always be the same for a given string )

# Credits

This library is based on David Bau's [seedrandom](https://github.com/davidbau/seedrandom) (and more exactly on [Alea](https://github.com/davidbau/seedrandom/blob/released/lib/alea.js), his port of [Johannes Baagøe's PRNG algorithm](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror)).

# Objectives

**Use a string as seed**  
Because it is easier to remember, share and differentiate than a numerical seed.  
Ex: bluefox, redking vs 2030949, 1879546.  

**Generate easy to remember strings**  
Use vesuna.autoseed() to generate a short amusing description, a codename, a gibberish word, or a serial number.  

**Generate a wide variety of numbers**  
Use vesuna.random() to generate pseudorandom 32-bit floats.

**Reproduce a specific result**   
Once setup with a seed, vesuna.random() will produce floats in sequences that will always be the same with that exact seed. It's intended to replace Math.random() for generative applications using many randomized settings, allowing to easily save and restore an unlimited amount of pseudorandom numbers.  


	IMPORTANT !
	The seeded pseudorandomness is predictable.  
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
// Manually set a seed
vesuna.seed = 'vesuna';

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

Note: vesuna autoseeds itself on initiation.  

```javascript
vesuna.autoseed();

console.log( vesuna.seed ); // Ex: bluefox
```

## Settings

There are a few settings to customize the random seeds you can get.

```javascript
// Separate words using a symbol (for urls)
vesuna.separator = vesuna.separators.NONE       // Ex: bluefox
vesuna.separator = vesuna.separators.DOT        // Ex: blue.fox
vesuna.separator = vesuna.separators.TILDE      // Ex: blue~fox
vesuna.separator = vesuna.separators.UNDERSCORE // Ex: blue_fox
vesuna.separator = vesuna.separators.DASH       // Ex: blue-fox

// Set vesuna.verbose to true for more complex seeds
vesuna.verbose = true;
vesuna.autoseed(); // Ex: blue-fox-428

// Different modes for different possible outcomes
vesuna.mode = vesuna.modes.CODENAME;
vesuna.autoseed(); // Ex: blue-fox / blue-fox-428

vesuna.mode = vesuna.modes.DESCRIPTION;
vesuna.autoseed(); // Ex: sneezing-penguin / loudly-sneezing-giant-penguin

vesuna.mode = vesuna.modes.GIBBERISH;
vesuna.autoseed(); // Ex: xuve / xuvetemi

vesuna.mode = vesuna.modes.SERIAL;
vesuna.autoseed(); // Ex: 58AS / 58AS39KG

// Default settings
vesuna.separator = vesuna.separators.NONE;
vesuna.mode = vesuna.modes.CODENAME;
vesuna.verbose = false;
```

## Possible outcomes

This autoseeder provides a limited number of possible seeds, depending on vesuna.mode and vesuna.verbose. For example, using the default settings (vesuna.modes.CODENAME & vesuna.verbose=false) gives 1024 possible outcomes.  

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

If you don't wanna change the current seed, and just want a random string for another use, you can use one of the following: 

```javascript
vesuna.codename();
vesuna.description();
vesuna.gibberish();
vesuna.serial();
```
Those will use the current autoseed settings, but unlike vesuna.autoseed() these methods will NOT update vesuna.seed.  

# Random helpers

In addition to vesuna.random(), you can use the following, for convenience:

```javascript
//Float between -1 and 1, inclusive
vesuna.random( -1, 1 );

//Rounded float between -2 and 2, inclusive
vesuna.random( -2, 2, true );

// Integer between -3 and 3, inclusive
// Equivalent to vesuna.random( -3, 3, true )
vesuna.int( -3, 3 )

// Unsigned integer between 0 and 4, inclusive
// Equivalent to vesuna.random( 0, 4, true ), or vesuna.int( 0, 4 );
vesuna.uint( 4 );

// Boolean, either true or false
vesuna.bool();

// Item from an array
vesuna.item( array );

// Character from a string
vesuna.char( string );
```

# Summary


## Seed generation
```javascript
// Set the seed manually or set an automatic seed
// This is not mandatory, vesuna starts automatically autoseeded
vesuna.seed = 'custom seed';
vesuna.autoseed();

// Get the current seed
console.log( vesuna.seed ); // Ex: bluefox

// Modes
vesuna.mode = vesuna.modes.CODENAME;    // Ex: blue-fox
vesuna.mode = vesuna.modes.DESCRIPTION; // Ex: sneezing-penguin
vesuna.mode = vesuna.modes.GIBBERISH;   // Ex: xuve
vesuna.mode = vesuna.modes.SERIAL;      // Ex: 58AS

// Separators - Any string will work
vesuna.separator = vesuna.separators.NONE;       // Ex: bluefox
vesuna.separator = vesuna.separators.DOT;        // Ex: blue.fox
vesuna.separator = vesuna.separators.TILDE;      // Ex: blue~fox
vesuna.separator = vesuna.separators.UNDERSCORE; // Ex: blue_fox
vesuna.separator = vesuna.separators.DASH;       // Ex: blue-fox

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

// Helper methods
vesuna.random( -2, 2, true ); // min, max, rounded
vesuna.int( -3, 3 );
vesuna.uint( 4 ); // max
vesuna.bool();
vesuna.item( array );
vesuna.char( string );
```

***
*Pierre Keda - 2021*
