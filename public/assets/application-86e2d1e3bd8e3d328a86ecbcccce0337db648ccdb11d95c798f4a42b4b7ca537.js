/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
var Markdown;if(typeof exports==="object"&&typeof require==="function")Markdown=exports;else Markdown={};(function(){function e(e){return e}function t(e){return false}function n(){}function r(){}n.prototype={chain:function(t,n){var r=this[t];if(!r)throw new Error("unknown hook "+t);if(r===e)this[t]=n;else this[t]=function(e){return n(r(e))}},set:function(e,t){if(!this[e])throw new Error("unknown hook "+e);this[e]=t},addNoop:function(t){this[t]=e},addFalse:function(e){this[e]=t}};Markdown.HookCollection=n;r.prototype={set:function(e,t){this["s_"+e]=t},get:function(e){return this["s_"+e]}};Markdown.Converter=function(){function u(e){e=e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(e,n,r,s,o,u){n=n.toLowerCase();t.set(n,A(r));if(o){return s}else if(u){i.set(n,u.replace(/"/g,"&quot;"))}return""});return e}function a(e){var t="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";var n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,f);e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,f);e=e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,f);e=e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,f);e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,f);return e}function f(e,t){var n=t;n=n.replace(/^\n+/,"");n=n.replace(/\n+$/g,"");n="\n\n~K"+(s.push(n)-1)+"K\n\n";return n}function l(e,t){e=y(e);var n="<hr />\n";e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,n);e=e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,n);e=e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,n);e=b(e);e=S(e);e=k(e);e=a(e);e=L(e,t);return e}function c(e){e=T(e);e=h(e);e=O(e);e=v(e);e=p(e);e=M(e);e=e.replace(/~P/g,"://");e=A(e);e=C(e);e=e.replace(/  +\n/g," <br>\n");return e}function h(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");t=j(t,e.charAt(1)=="!"?"\\`*_/":"\\`*_");return t});return e}function p(e){e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,d);e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,d);e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,d);return e}function d(e,n,r,s,o,u,a,f){if(f==undefined)f="";var l=n;var c=r.replace(/:\/\//g,"~P");var h=s.toLowerCase();var p=o;var d=f;if(p==""){if(h==""){h=c.toLowerCase().replace(/ ?\n/g," ")}p="#"+h;if(t.get(h)!=undefined){p=t.get(h);if(i.get(h)!=undefined){d=i.get(h)}}else{if(l.search(/\(\s*\)$/m)>-1){p=""}else{return l}}}p=B(p);p=j(p,"*_");var v='<a href="'+p+'"';if(d!=""){d=m(d);d=j(d,"*_");v+=' title="'+d+'"'}v+=">"+c+"</a>";return v}function v(e){e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,g);e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,g);return e}function m(e){return e.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function g(e,n,r,s,o,u,a,f){var l=n;var c=r;var h=s.toLowerCase();var p=o;var d=f;if(!d)d="";if(p==""){if(h==""){h=c.toLowerCase().replace(/ ?\n/g," ")}p="#"+h;if(t.get(h)!=undefined){p=t.get(h);if(i.get(h)!=undefined){d=i.get(h)}}else{return l}}c=j(m(c),"*_[]()");p=j(p,"*_");var v='<img src="'+p+'" alt="'+c+'"';d=m(d);d=j(d,"*_");v+=' title="'+d+'"';v+=" />";return v}function y(e){e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return"<h1>"+c(t)+"</h1>\n\n"});e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return"<h2>"+c(t)+"</h2>\n\n"});e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return"<h"+r+">"+c(n)+"</h"+r+">\n\n"});return e}function b(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(o){e=e.replace(t,function(e,t,n){var r=t;var i=n.search(/[*+-]/g)>-1?"ul":"ol";var s=E(r,i);s=s.replace(/\s+$/,"");s="<"+i+">"+s+"</"+i+">\n";return s})}else{t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;e=e.replace(t,function(e,t,n,r){var i=t;var s=n;var o=r.search(/[*+-]/g)>-1?"ul":"ol";var u=E(s,o);u=i+"<"+o+">\n"+u+"</"+o+">\n";return u})}e=e.replace(/~0/,"");return e}function E(e,t){o++;e=e.replace(/\n{2,}$/,"\n");e+="~0";var n=w[t];var r=new RegExp("(^[ \\t]*)("+n+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+n+")[ \\t]+))","gm");var i=false;e=e.replace(r,function(e,t,n,r){var s=r;var o=t;var u=/\n\n$/.test(s);var a=u||s.search(/\n{2,}/)>-1;if(a||i){s=l(D(s),true)}else{s=b(D(s));s=s.replace(/\n$/,"");s=c(s)}i=u;return"<li>"+s+"</li>\n"});e=e.replace(/~0/g,"");o--;return e}function S(e){e+="~0";e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t;var i=n;r=N(D(r));r=P(r);r=r.replace(/^\n+/g,"");r=r.replace(/\n+$/g,"");r='<pre class="prettyprint linenums"><code>'+r+"\n</code></pre>";return"\n\n"+r+"\n\n"+i});e=e.replace(/~0/,"");return e}function x(e){e=e.replace(/(^\n+|\n+$)/g,"");return"\n\n~K"+(s.push(e)-1)+"K\n\n"}function T(e){e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;s=s.replace(/^([ \t]*)/g,"");s=s.replace(/[ \t]*$/g,"");s=N(s);s=s.replace(/:\/\//g,"~P");return t+"<code>"+s+"</code>"});return e}function N(e){e=e.replace(/&/g,"&");e=e.replace(/</g,"&lt;");e=e.replace(/>/g,"&gt;");e=j(e,"*_{}[]\\",false);return e}function C(e){e=e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4");e=e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4");return e}function k(e){e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;n=n.replace(/^[ \t]*>[ \t]?/gm,"~0");n=n.replace(/~0/g,"");n=n.replace(/^[ \t]+$/gm,"");n=l(n);n=n.replace(/(^|\n)/g,"$1  ");n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;n=n.replace(/^  /mg,"~0");n=n.replace(/~0/g,"");return n});return x("<blockquote>\n"+n+"\n</blockquote>")});return e}function L(e,t){e=e.replace(/^\n+/g,"");e=e.replace(/\n+$/g,"");var n=e.split(/\n{2,}/g);var r=[];var i=/~K(\d+)K/;var o=n.length;for(var u=0;u<o;u++){var a=n[u];if(i.test(a)){r.push(a)}else if(/\S/.test(a)){a=c(a);a=a.replace(/^([ \t]*)/g,"<p>");a+="</p>";r.push(a)}}if(!t){o=r.length;for(var u=0;u<o;u++){var f=true;while(f){f=false;r[u]=r[u].replace(/~K(\d+)K/g,function(e,t){f=true;return s[t]})}}}return r.join("\n\n")}function A(e){e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&");e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;");return e}function O(e){e=e.replace(/\\(\\)/g,F);e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,F);return e}function M(t){t=t.replace(/(^|\s)(https?|ftp)(:\/\/[-A-Z0-9+&@#\/%?=~_|\[\]\(\)!:,\.;]*[-A-Z0-9+&@#\/%=~_|\[\]])($|\W)/gi,"$1<$2$3>$4");var n=function(t,n){return'<a href="'+n+'">'+e.plainLinkText(n)+"</a>"};t=t.replace(/<((https?|ftp):[^'">\s]+)>/gi,n);var r=function(t,n){var r="mailto:";var i;var s;if(n.substring(0,r.length)!=r){i=r+n;s=n}else{i=n;s=n.substring(r.length,n.length)}return'<a href="'+i+'">'+e.plainLinkText(s)+"</a>"};t=t.replace(/<((?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+))>/gi,r);return t}function _(e){e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)});return e}function D(e){e=e.replace(/^(\t|[ ]{1,4})/gm,"~0");e=e.replace(/~0/g,"");return e}function P(e){if(!/\t/.test(e))return e;var t=["    ","   ","  "," "],n=0,r;return e.replace(/[\n\t]/g,function(e,i){if(e==="\n"){n=i+1;return e}r=(i-n)%4;n=i+1;return t[r]})}function B(e){if(!e)return"";var t=e.length;return e.replace(H,function(n,r){if(n=="~D")return"%24";if(n==":"){if(r==t-1||/[0-9\/]/.test(e.charAt(r+1)))return":";if(e.substring(0,"mailto:".length)==="mailto:")return":";if(e.substring(0,"magnet:".length)==="magnet:")return":"}return"%"+n.charCodeAt(0).toString(16)})}function j(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";if(n){r="\\\\"+r}var i=new RegExp(r,"g");e=e.replace(i,F);return e}function F(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}var e=this.hooks=new n;e.addNoop("plainLinkText");e.addNoop("preConversion");e.addNoop("postConversion");var t;var i;var s;var o;this.makeHtml=function(n){if(t)throw new Error("Recursive call to converter.makeHtml");t=new r;i=new r;s=[];o=0;n=e.preConversion(n);n=n.replace(/~/g,"~T");n=n.replace(/\$/g,"~D");n=n.replace(/\r\n/g,"\n");n=n.replace(/\r/g,"\n");n="\n\n"+n+"\n\n";n=P(n);n=n.replace(/^[ \t]+$/mg,"");n=a(n);n=u(n);n=l(n);n=_(n);n=n.replace(/~D/g,"$$");n=n.replace(/~T/g,"~");n=e.postConversion(n);s=i=t=null;return n};var w={ol:"\\d+[.]",ul:"[*+-]"};var H=/(?:["'*()[\]:]|~D)/g}})();(function(){function p(){}function d(e){this.buttonBar=r.getElementById("wmd-button-bar"+e);this.preview=r.getElementById("wmd-preview"+e);this.input=r.getElementById("wmd-input"+e)}function v(t,n){var r=this;var i=[];var s=0;var o="none";var a;var f;var l;var c=function(e,t){if(o!=e){o=e;if(!t){p()}}if(!u.isIE||o!="moving"){f=setTimeout(h,1)}else{l=null}};var h=function(e){l=new m(n,e);f=undefined};this.setCommandMode=function(){o="command";p();f=setTimeout(h,0)};this.canUndo=function(){return s>1};this.canRedo=function(){if(i[s+1]){return true}return false};this.undo=function(){if(r.canUndo()){if(a){a.restore();a=null}else{i[s]=new m(n);i[--s].restore();if(t){t()}}}o="none";n.input.focus();h()};this.redo=function(){if(r.canRedo()){i[++s].restore();if(t){t()}}o="none";n.input.focus();h()};var p=function(){var e=l||new m(n);if(!e){return false}if(o=="moving"){if(!a){a=e}return}if(a){if(i[s-1].text!=a.text){i[s++]=a}a=null}i[s++]=e;i[s+1]=null;if(t){t()}};var d=function(e){var t=false;if(e.ctrlKey||e.metaKey){var n=e.charCode||e.keyCode;var i=String.fromCharCode(n);switch(i){case"y":r.redo();t=true;break;case"z":if(!e.shiftKey){r.undo()}else{r.redo()}t=true;break}}if(t){if(e.preventDefault){e.preventDefault()}if(window.event){window.event.returnValue=false}return}};var v=function(e){if(!e.ctrlKey&&!e.metaKey){var t=e.keyCode;if(t>=33&&t<=40||t>=63232&&t<=63235){c("moving")}else if(t==8||t==46||t==127){c("deleting")}else if(t==13){c("newlines")}else if(t==27){c("escape")}else if((t<16||t>20)&&t!=91){c("typing")}}};var g=function(){e.addEvent(n.input,"keypress",function(e){if((e.ctrlKey||e.metaKey)&&(e.keyCode==89||e.keyCode==90)){e.preventDefault()}});var t=function(){if(u.isIE||l&&l.text!=n.input.value){if(f==undefined){o="paste";p();h()}}};e.addEvent(n.input,"keydown",d);e.addEvent(n.input,"keydown",v);e.addEvent(n.input,"mousedown",function(){c("moving")});n.input.onpaste=t;n.input.ondrop=t};var y=function(){g();h(true);p()};y()}function m(t,n){var i=this;var s=t.input;this.init=function(){if(!e.isVisible(s)){return}if(!n&&r.activeElement&&r.activeElement!==s){return}this.setInputAreaSelectionStartEnd();this.scrollTop=s.scrollTop;if(!this.text&&s.selectionStart||s.selectionStart===0){this.text=s.value}};this.setInputAreaSelection=function(){if(!e.isVisible(s)){return}if(s.selectionStart!==undefined&&!u.isOpera){s.focus();s.selectionStart=i.start;s.selectionEnd=i.end;s.scrollTop=i.scrollTop}else if(r.selection){if(r.activeElement&&r.activeElement!==s){return}s.focus();var t=s.createTextRange();t.moveStart("character",-s.value.length);t.moveEnd("character",-s.value.length);t.moveEnd("character",i.end);t.moveStart("character",i.start);t.select()}};this.setInputAreaSelectionStartEnd=function(){if(!t.ieCachedRange&&(s.selectionStart||s.selectionStart===0)){i.start=s.selectionStart;i.end=s.selectionEnd}else if(r.selection){i.text=e.fixEolChars(s.value);var n=t.ieCachedRange||r.selection.createRange();var o=e.fixEolChars(n.text);var u="";var a=u+o+u;n.text=a;var f=e.fixEolChars(s.value);n.moveStart("character",-a.length);n.text=o;i.start=f.indexOf(u);i.end=f.lastIndexOf(u)-u.length;var l=i.text.length-e.fixEolChars(s.value).length;if(l){n.moveStart("character",-o.length);while(l--){o+="\n";i.end+=1}n.text=o}if(t.ieCachedRange)i.scrollTop=t.ieCachedScrollTop;t.ieCachedRange=null;this.setInputAreaSelection()}};this.restore=function(){if(i.text!=undefined&&i.text!=s.value){s.value=i.text}this.setInputAreaSelection();s.scrollTop=i.scrollTop};this.getChunks=function(){var t=new p;t.before=e.fixEolChars(i.text.substring(0,i.start));t.startTag="";t.selection=e.fixEolChars(i.text.substring(i.start,i.end));t.endTag="";t.after=e.fixEolChars(i.text.substring(i.end));t.scrollTop=i.scrollTop;return t};this.setChunks=function(e){e.before=e.before+e.startTag;e.after=e.endTag+e.after;this.start=e.before.length;this.end=e.before.length+e.selection.length;this.text=e.before+e.selection+e.after;this.scrollTop=e.scrollTop};this.init()}function g(n,i,s){var o=this;var a;var f;var l;var c=3e3;var h="delayed";var p=function(t,n){e.addEvent(t,"input",n);t.onpaste=n;t.ondrop=n;e.addEvent(t,"keypress",n);e.addEvent(t,"keydown",n)};var d=function(){var e=0;if(window.innerHeight){e=window.pageYOffset}else if(r.documentElement&&r.documentElement.scrollTop){e=r.documentElement.scrollTop}else if(r.body){e=r.body.scrollTop}return e};var v=function(){if(!i.preview)return;var e=i.input.value;if(e&&e==l){return}else{l=e}var t=(new Date).getTime();e=n.makeHtml(e);var r=(new Date).getTime();f=r-t;T(e)};var m=function(){if(a){clearTimeout(a);a=undefined}if(h!=="manual"){var e=0;if(h==="delayed"){e=f}if(e>c){e=c}a=setTimeout(v,e)}};var g=function(e){if(e.scrollHeight<=e.clientHeight){return 1}return e.scrollTop/(e.scrollHeight-e.clientHeight)};var y=function(){if(i.preview){i.preview.scrollTop=(i.preview.scrollHeight-i.preview.clientHeight)*g(i.preview)}};this.refresh=function(e){if(e){l="";v()}else{m()}};this.processingTime=function(){return f};var b=true;var w=function(e){var t=i.preview;var n=t.parentNode;var r=t.nextSibling;n.removeChild(t);t.innerHTML=e;if(!r)n.appendChild(t);else n.insertBefore(t,r)};var E=function(e){i.preview.innerHTML=e};var S;var x=function(e){if(S)return S(e);try{E(e);S=E}catch(t){S=w;S(e)}};var T=function(e){var n=t.getTop(i.input)-d();if(i.preview){x(e);s()}y();if(b){b=false;return}var r=t.getTop(i.input)-d();if(u.isIE){setTimeout(function(){window.scrollBy(0,r-n)},0)}else{window.scrollBy(0,r-n)}};var N=function(){p(i.input,m);v();if(i.preview){i.preview.scrollTop=0}};N()}function y(t,n,r,i,o,a){function p(e){f.focus();if(e.textOp){if(r){r.setCommandMode()}var t=new m(n);if(!t){return}var s=t.getChunks();var o=function(){f.focus();if(s){t.setChunks(s)}t.restore();i.refresh()};var u=e.textOp(s,o);if(!u){o()}}if(e.execute){e.execute(r)}}function d(e,t){if(t){e.disabled=false;if(!e.isHelp){e.onclick=function(){if(this.onmouseout){this.onmouseout()}p(this);return false}}}else{e.disabled=true}}function v(e){if(typeof e==="string")e=o[e];return function(){e.apply(o,arguments)}}function g(){var e=n.buttonBar;var r=document.createElement("div");r.id="wmd-button-row"+t;r.className="btn-toolbar";r=e.appendChild(r);var i=function(e,n,i,s,o){var u=document.createElement("button");u.className="btn btn-default";var a=document.createElement("i");a.className=i;u.id=e+t;u.appendChild(a);u.title=n;$(u).tooltip({placement:"bottom",container:"body"});if(s)u.textOp=s;d(u,true);if(o){o.appendChild(u)}else{r.appendChild(u)}return u};var o=function(e){var n=document.createElement("div");n.className="btn-group wmd-button-group"+e;n.id="wmd-button-group"+e+t;r.appendChild(n);return n};group1=o(1);l.bold=i("wmd-bold-button","Bold - Ctrl+B","fa fa-bold",v("doBold"),group1);l.italic=i("wmd-italic-button","Italic - Ctrl+I","fa fa-italic",v("doItalic"),group1);group2=o(2);l.link=i("wmd-link-button","Link - Ctrl+L","fa fa-link",v(function(e,t){return this.doLinkOrImage(e,t,false)}),group2);l.quote=i("wmd-quote-button","Blockquote - Ctrl+Q","fa fa-quote-left",v("doBlockquote"),group2);l.code=i("wmd-code-button","Code Sample - Ctrl+K","fa fa-code",v("doCode"),group2);l.image=i("wmd-image-button","Image - Ctrl+G","fa fa-picture-o",v(function(e,t){return this.doLinkOrImage(e,t,true)}),group2);group3=o(3);l.olist=i("wmd-olist-button","Numbered List - Ctrl+O","fa fa-list-ol",v(function(e,t){this.doList(e,t,true)}),group3);l.ulist=i("wmd-ulist-button","Bulleted List - Ctrl+U","fa fa-list-ul",v(function(e,t){this.doList(e,t,false)}),group3);l.heading=i("wmd-heading-button","Heading - Ctrl+H","fa fa-header",v("doHeading"),group3);l.hr=i("wmd-hr-button","Horizontal Rule - Ctrl+R","fa fa-ellipsis-h",v("doHorizontalRule"),group3);group4=o(4);l.undo=i("wmd-undo-button","Undo - Ctrl+Z","fa fa-undo",null,group4);l.undo.execute=function(e){if(e)e.undo()};var u=/win/.test(s.platform.toLowerCase())?"Redo - Ctrl+Y":"Redo - Ctrl+Shift+Z";l.redo=i("wmd-redo-button",u,"fa fa-rotate-right",null,group4);l.redo.execute=function(e){if(e)e.redo()};if(a){group5=o(5);group5.className=group5.className+" pull-right";var f=document.createElement("button");var c=document.createElement("i");c.className="fa fa-question";f.appendChild(c);f.className="btn";f.id="wmd-help-button"+t;f.isHelp=true;f.title=a.title||h;$(f).tooltip({placement:"bottom",container:"body"});f.onclick=a.handler;d(f,true);group5.appendChild(f);l.help=f}y()}function y(){if(r){d(l.undo,r.canUndo());d(l.redo,r.canRedo())}}var f=n.input,l={};g();var c="keydown";if(u.isOpera){c="keypress"}e.addEvent(f,c,function(e){if((e.ctrlKey||e.metaKey)&&!e.altKey&&!e.shiftKey){var t=e.charCode||e.keyCode;var n=String.fromCharCode(t).toLowerCase();switch(n){case"b":p(l.bold);break;case"i":p(l.italic);break;case"l":p(l.link);break;case"q":p(l.quote);break;case"k":p(l.code);break;case"g":p(l.image);break;case"o":p(l.olist);break;case"u":p(l.ulist);break;case"h":p(l.heading);break;case"r":p(l.hr);break;case"y":p(l.redo);break;case"z":if(e.shiftKey){p(l.redo)}else{p(l.undo)}break;default:return}if(e.preventDefault){e.preventDefault()}if(window.event){window.event.returnValue=false}}});e.addEvent(f,"keyup",function(e){if(e.shiftKey&&!e.ctrlKey&&!e.metaKey){var t=e.charCode||e.keyCode;if(t===13){var n={};n.textOp=v("doAutoindent");p(n)}}});if(u.isIE){e.addEvent(f,"keydown",function(e){var t=e.keyCode;if(t===27){return false}})}this.setUndoRedoButtonStates=y}function b(e){this.hooks=e}function E(e){return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/,function(e,t,n){t=t.replace(/\?.*$/,function(e){return e.replace(/\+/g," ")});t=decodeURIComponent(t);t=encodeURI(t).replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29");t=t.replace(/\?.*$/,function(e){return e.replace(/\+/g,"%2b")});if(n){n=n.trim?n.trim():n.replace(/^\s*/,"").replace(/\s*$/,"");n=$.trim(n).replace(/"/g,"quot;").replace(/\(/g,"&#40;").replace(/\)/g,"&#41;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}return n?t+' "'+n+'"':t})}var e={},t={},n={},r=window.document,i=window.RegExp,s=window.navigator,o={lineLength:72},u={isIE:/msie/.test(s.userAgent.toLowerCase()),isIE_5or6:/msie 6/.test(s.userAgent.toLowerCase())||/msie 5/.test(s.userAgent.toLowerCase()),isOpera:/opera/.test(s.userAgent.toLowerCase())};var a='<code>http://example.com/ "optional title"</code>';var f='<code>http://example.com/images/diagram.jpg "optional title"</code>';var l="http://";var c="http://";var h="Markdown Editing Help";Markdown.Editor=function(e,t,n){t=t||"";var i=this.hooks=new Markdown.HookCollection;i.addNoop("onPreviewRefresh");i.addNoop("postBlockquoteCreation");i.addFalse("insertImageDialog");this.getConverter=function(){return e};var s=this,o;this.run=function(){if(o)return;o=new d(t);var u=new b(i);var a=new g(e,o,function(){i.onPreviewRefresh()});var f,l;if(!/\?noundo/.test(r.location.href)){f=new v(function(){a.refresh();if(l)l.setUndoRedoButtonStates()},o);this.textOperation=function(e){f.setCommandMode();e();s.refreshPreview()}}l=new y(t,o,f,a,u,n);l.setUndoRedoButtonStates();var c=s.refreshPreview=function(){a.refresh(true)};c()}};p.prototype.findTags=function(t,n){var r=this;var i;if(t){i=e.extendRegExp(t,"","$");this.before=this.before.replace(i,function(e){r.startTag=r.startTag+e;return""});i=e.extendRegExp(t,"^","");this.selection=this.selection.replace(i,function(e){r.startTag=r.startTag+e;return""})}if(n){i=e.extendRegExp(n,"","$");this.selection=this.selection.replace(i,function(e){r.endTag=e+r.endTag;return""});i=e.extendRegExp(n,"^","");this.after=this.after.replace(i,function(e){r.endTag=e+r.endTag;return""})}};p.prototype.trimWhitespace=function(e){var t,n,r=this;if(e){t=n=""}else{t=function(e){r.before+=e;return""};n=function(e){r.after=e+r.after;return""}}this.selection=this.selection.replace(/^(\s*)/,t).replace(/(\s*)$/,n)};p.prototype.skipLines=function(e,t,n){if(e===undefined){e=1}if(t===undefined){t=1}e++;t++;var r;var s;if(navigator.userAgent.match(/Chrome/)){"X".match(/()./)}this.selection=this.selection.replace(/(^\n*)/,"");this.startTag=this.startTag+i.$1;this.selection=this.selection.replace(/(\n*$)/,"");this.endTag=this.endTag+i.$1;this.startTag=this.startTag.replace(/(^\n*)/,"");this.before=this.before+i.$1;this.endTag=this.endTag.replace(/(\n*$)/,"");this.after=this.after+i.$1;if(this.before){r=s="";while(e--){r+="\\n?";s+="\n"}if(n){r="\\n*"}this.before=this.before.replace(new i(r+"$",""),s)}if(this.after){r=s="";while(t--){r+="\\n?";s+="\n"}if(n){r="\\n*"}this.after=this.after.replace(new i(r,""),s)}};e.isVisible=function(e){if(window.getComputedStyle){return window.getComputedStyle(e,null).getPropertyValue("display")!=="none"}else if(e.currentStyle){return e.currentStyle["display"]!=="none"}};e.addEvent=function(e,t,n){if(e.attachEvent){e.attachEvent("on"+t,n)}else{e.addEventListener(t,n,false)}};e.removeEvent=function(e,t,n){if(e.detachEvent){e.detachEvent("on"+t,n)}else{e.removeEventListener(t,n,false)}};e.fixEolChars=function(e){e=e.replace(/\r\n/g,"\n");e=e.replace(/\r/g,"\n");return e};e.extendRegExp=function(e,t,n){if(t===null||t===undefined){t=""}if(n===null||n===undefined){n=""}var r=e.toString();var s;r=r.replace(/\/([gim]*)$/,function(e,t){s=t;return""});r=r.replace(/(^\/|\/$)/g,"");r=t+r+n;return new i(r,s)};t.getTop=function(e,t){var n=e.offsetTop;if(!t){while(e=e.offsetParent){n+=e.offsetTop}}return n};t.getHeight=function(e){return e.offsetHeight||e.scrollHeight};t.getWidth=function(e){return e.offsetWidth||e.scrollWidth};t.getPageSize=function(){var e,t;var n,i;if(self.innerHeight&&self.scrollMaxY){e=r.body.scrollWidth;t=self.innerHeight+self.scrollMaxY}else if(r.body.scrollHeight>r.body.offsetHeight){e=r.body.scrollWidth;t=r.body.scrollHeight}else{e=r.body.offsetWidth;t=r.body.offsetHeight}if(self.innerHeight){n=self.innerWidth;i=self.innerHeight}else if(r.documentElement&&r.documentElement.clientHeight){n=r.documentElement.clientWidth;i=r.documentElement.clientHeight}else if(r.body){n=r.body.clientWidth;i=r.body.clientHeight}var s=Math.max(e,n);var o=Math.max(t,i);return[s,o,n,i]};n.prompt=function(t,n,i,s){var o;var u;if(i===undefined){i=""}var a=function(e){var t=e.charCode||e.keyCode;if(t===27){f(true)}};var f=function(t){e.removeEvent(r.body,"keydown",a);var n=u.value;if(t){n=null}else{n=n.replace(/^http:\/\/(https?|ftp):\/\//,"$1://");if(!/^(?:https?|ftp):\/\//.test(n))n="http://"+n}$(o).modal("hide");s(n);return false};var l=function(){o=r.createElement("div");o.className="modal fade";var s=r.createElement("div");s.className="modal-dialog";o.appendChild(s);var l=r.createElement("div");l.className="modal-content";s.appendChild(l);var c=r.createElement("div");c.className="modal-header";c.innerHTML='<a class="close" data-dismiss="modal">×</a> <h3 class="modal-title">'+t+"</h3>";l.appendChild(c);var h=r.createElement("div");h.className="modal-body";l.appendChild(h);var p=r.createElement("div");p.className="modal-footer";l.appendChild(p);var d=r.createElement("p");d.innerHTML=n;d.style.padding="5px";h.appendChild(d);var v=r.createElement("form"),m=v.style;v.onsubmit=function(){return f(false)};m.padding="0";m.margin="0";h.appendChild(v);u=r.createElement("input");u.type="text";u.value=i;u.className="form-control";m=u.style;m.display="block";m.width="80%";m.marginLeft=m.marginRight="auto";v.appendChild(u);var g=r.createElement("button");g.className="btn btn-primary";g.type="button";g.onclick=function(){return f(false)};g.innerHTML="OK";var y=r.createElement("button");y.className="btn btn-danger";y.type="button";y.onclick=function(){return f(true)};y.innerHTML="Cancel";p.appendChild(g);p.appendChild(y);e.addEvent(r.body,"keydown",a);r.body.appendChild(o)};setTimeout(function(){l();var e=i.length;if(u.selectionStart!==undefined){u.selectionStart=0;u.selectionEnd=e}else if(u.createTextRange){var t=u.createTextRange();t.collapse(false);t.moveStart("character",-e);t.moveEnd("character",e);t.select()}$(o).on("shown",function(){u.focus()});$(o).on("hidden",function(){o.parentNode.removeChild(o)});$(o).modal()},0)};var w=b.prototype;w.prefixes="(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)";w.unwrap=function(e){var t=new i("([^\\n])\\n(?!(\\n|"+this.prefixes+"))","g");e.selection=e.selection.replace(t,"$1 $2")};w.wrap=function(e,t){this.unwrap(e);var n=new i("(.{1,"+t+"})( +|$\\n?)","gm"),r=this;e.selection=e.selection.replace(n,function(e,t){if((new i("^"+r.prefixes,"")).test(e)){return e}return t+"\n"});e.selection=e.selection.replace(/\s+$/,"")};w.doBold=function(e,t){return this.doBorI(e,t,2,"strong text")};w.doItalic=function(e,t){return this.doBorI(e,t,1,"emphasized text")};w.doBorI=function(e,t,n,r){e.trimWhitespace();e.selection=e.selection.replace(/\n{2,}/g,"\n");var s=/(\**$)/.exec(e.before)[0];var o=/(^\**)/.exec(e.after)[0];var u=Math.min(s.length,o.length);if(u>=n&&(u!=2||n!=1)){e.before=e.before.replace(i("[*]{"+n+"}$",""),"");e.after=e.after.replace(i("^[*]{"+n+"}",""),"")}else if(!e.selection&&o){e.after=e.after.replace(/^([*_]*)/,"");e.before=e.before.replace(/(\s?)$/,"");var a=i.$1;e.before=e.before+o+a}else{if(!e.selection&&!o){e.selection=r}var f=n<=1?"*":"**";e.before=e.before+f;e.after=f+e.after}return};w.stripLinkDefs=function(e,t){e=e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm,function(e,n,r,i,s){t[n]=e.replace(/\s*$/,"");if(i){t[n]=e.replace(/["(](.+?)[")]$/,"");return i+s}return""});return e};w.addLinkDef=function(e,t){var n=0;var r={};e.before=this.stripLinkDefs(e.before,r);e.selection=this.stripLinkDefs(e.selection,r);e.after=this.stripLinkDefs(e.after,r);var i="";var s=/(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g;var o=function(e){n++;e=e.replace(/^[ ]{0,3}\[(\d+)\]:/,"  ["+n+"]:");i+="\n"+e};var u=function(e,t,i,a,f,l){i=i.replace(s,u);if(r[f]){o(r[f]);return t+i+a+n+l}return e};e.before=e.before.replace(s,u);if(t){o(t)}else{e.selection=e.selection.replace(s,u)}var a=n;e.after=e.after.replace(s,u);if(e.after){e.after=e.after.replace(/\n*$/,"")}if(!e.after){e.selection=e.selection.replace(/\n*$/,"")}e.after+="\n\n"+i;return a};w.doLinkOrImage=function(e,t,r){e.trimWhitespace();e.findTags(/\s*!?\[/,/\][ ]?(?:\n[ ]*)?(\[.*?\])?/);var i;if(e.endTag.length>1&&e.startTag.length>0){e.startTag=e.startTag.replace(/!?\[/,"");e.endTag="";this.addLinkDef(e,null)}else{e.selection=e.startTag+e.selection+e.endTag;e.startTag=e.endTag="";if(/\n\n/.test(e.selection)){this.addLinkDef(e,null);return}var s=this;var o=function(n){if(n!==null){e.selection=(" "+e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g,"$1\\").substr(1);var i=" [999]: "+E(n);var o=s.addLinkDef(e,i);e.startTag=r?"![":"[";e.endTag="]["+o+"]";if(!e.selection){if(r){e.selection="enter image description here"}else{e.selection="enter link description here"}}}t()};if(r){if(!this.hooks.insertImageDialog(o))n.prompt("Insert Image",f,l,o)}else{n.prompt("Insert Link",a,c,o)}return true}};w.doAutoindent=function(e,t){var n=this,r=false;e.before=e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/,"\n\n");e.before=e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/,"\n\n");e.before=e.before.replace(/(\n|^)[ \t]+\n$/,"\n\n");if(!e.selection&&!/^[ \t]*(?:\n|$)/.test(e.after)){e.after=e.after.replace(/^[^\n]*/,function(t){e.selection=t;return""});r=true}if(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before)){if(n.doList){n.doList(e)}}if(/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before)){if(n.doBlockquote){n.doBlockquote(e)}}if(/(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before)){if(n.doCode){n.doCode(e)}}if(r){e.after=e.selection+e.after;e.selection=""}};w.doBlockquote=function(e,t){e.selection=e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/,function(t,n,r,i){e.before+=n;e.after=i+e.after;return r});e.before=e.before.replace(/(>[ \t]*)$/,function(t,n){e.selection=n+e.selection;return""});e.selection=e.selection.replace(/^(\s|>)+$/,"");e.selection=e.selection||"Blockquote";var n="",r="",i;if(e.before){var s=e.before.replace(/\n$/,"").split("\n");var u=false;for(var a=0;a<s.length;a++){var f=false;i=s[a];u=u&&i.length>0;if(/^>/.test(i)){f=true;if(!u&&i.length>1)u=true}else if(/^[ \t]*$/.test(i)){f=true}else{f=u}if(f){n+=i+"\n"}else{r+=n+i;n="\n"}}if(!/(^|\n)>/.test(n)){r+=n;n=""}}e.startTag=n;e.before=r;if(e.after){e.after=e.after.replace(/^\n?/,"\n")}e.after=e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/,function(t){e.endTag=t;return""});var l=function(t){var n=t?"> ":"";if(e.startTag){e.startTag=e.startTag.replace(/\n((>|\s)*)\n$/,function(e,t){return"\n"+t.replace(/^[ ]{0,3}>?[ \t]*$/gm,n)+"\n"})}if(e.endTag){e.endTag=e.endTag.replace(/^\n((>|\s)*)\n/,function(e,t){return"\n"+t.replace(/^[ ]{0,3}>?[ \t]*$/gm,n)+"\n"})}};if(/^(?![ ]{0,3}>)/m.test(e.selection)){this.wrap(e,o.lineLength-2);e.selection=e.selection.replace(/^/gm,"> ");l(true);e.skipLines()}else{e.selection=e.selection.replace(/^[ ]{0,3}> ?/gm,"");this.unwrap(e);l(false);if(!/^(\n|^)[ ]{0,3}>/.test(e.selection)&&e.startTag){e.startTag=e.startTag.replace(/\n{0,2}$/,"\n\n")}if(!/(\n|^)[ ]{0,3}>.*$/.test(e.selection)&&e.endTag){e.endTag=e.endTag.replace(/^\n{0,2}/,"\n\n")}}e.selection=this.hooks.postBlockquoteCreation(e.selection);if(!/\n/.test(e.selection)){e.selection=e.selection.replace(/^(> *)/,function(t,n){e.startTag+=n;return""})}};w.doCode=function(e,t){var n=/\S[ ]*$/.test(e.before);var r=/^[ ]*\S/.test(e.after);if(!r&&!n||/\n/.test(e.selection)){e.before=e.before.replace(/[ ]{4}$/,function(t){e.selection=t+e.selection;return""});var i=1;var s=1;if(/(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before)){i=0}if(/^\n(\t|[ ]{4,})/.test(e.after)){s=0}e.skipLines(i,s);if(!e.selection){e.startTag="    ";e.selection="enter code here"}else{if(/^[ ]{0,3}\S/m.test(e.selection)){if(/\n/.test(e.selection))e.selection=e.selection.replace(/^/gm,"    ");else e.before+="    "}else{e.selection=e.selection.replace(/^[ ]{4}/gm,"")}}}else{e.trimWhitespace();e.findTags(/`/,/`/);if(!e.startTag&&!e.endTag){e.startTag=e.endTag="`";if(!e.selection){e.selection="enter code here"}}else if(e.endTag&&!e.startTag){e.before+=e.endTag;e.endTag=""}else{e.startTag=e.endTag=""}}};w.doList=function(e,t,n){var r=/(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;var s=/^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;var u="-";var a=1;var f=function(){var e;if(n){e=" "+a+". ";a++}else{e=" "+u+" "}return e};var l=function(e){if(n===undefined){n=/^\s*\d/.test(e)}e=e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm,function(e){return f()});return e};e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/,null);if(e.before&&!/\n$/.test(e.before)&&!/^\n/.test(e.startTag)){e.before+=e.startTag;e.startTag=""}if(e.startTag){var c=/\d+[.]/.test(e.startTag);e.startTag="";e.selection=e.selection.replace(/\n[ ]{4}/g,"\n");this.unwrap(e);e.skipLines();if(c){e.after=e.after.replace(s,l)}if(n==c){return}}var h=1;e.before=e.before.replace(r,function(e){if(/^\s*([*+-])/.test(e)){u=i.$1}h=/[^\n]\n\n[^\n]/.test(e)?1:0;return l(e)});if(!e.selection){e.selection="List item"}var p=f();var d=1;e.after=e.after.replace(s,function(e){d=/[^\n]\n\n[^\n]/.test(e)?1:0;return l(e)});e.trimWhitespace(true);e.skipLines(h,d,true);e.startTag=p;var v=p.replace(/./g," ");this.wrap(e,o.lineLength-v.length);e.selection=e.selection.replace(/\n/g,"\n"+v)};w.doHeading=function(e,t){e.selection=e.selection.replace(/\s+/g," ");e.selection=e.selection.replace(/(^\s+|\s+$)/g,"");if(!e.selection){e.startTag="## ";e.selection="Heading";e.endTag=" ##";return}var n=0;e.findTags(/#+[ ]*/,/[ ]*#+/);if(/#+/.test(e.startTag)){n=i.lastMatch.length}e.startTag=e.endTag="";e.findTags(null,/\s?(-+|=+)/);if(/=+/.test(e.endTag)){n=1}if(/-+/.test(e.endTag)){n=2}e.startTag=e.endTag="";e.skipLines(1,1);var r=n==0?2:n-1;if(r>0){var s=r>=2?"-":"=";var u=e.selection.length;if(u>o.lineLength){u=o.lineLength}e.endTag="\n";while(u--){e.endTag+=s}}};w.doHorizontalRule=function(e,t){e.startTag="----------\n";e.selection="";e.skipLines(2,1,true)}})();(function(){function n(e){return e.replace(/<[^>]*>?/gi,u)}function u(e){if(e.match(r)||e.match(i)||e.match(s)||e.match(o))return e;else return""}function a(e){if(e=="")return"";var t=/<\/?\w+[^>]*(\s|$|>)/g;var n=e.toLowerCase().match(t);var r=(n||[]).length;if(r==0)return e;var i,s;var o="<p><img><br><li><hr>";var u;var a=[];var f=[];var l=false;for(var c=0;c<r;c++){i=n[c].replace(/<\/?(\w+).*/,"$1");if(a[c]||o.search("<"+i+">")>-1)continue;s=n[c];u=-1;if(!/^<\//.test(s)){for(var h=c+1;h<r;h++){if(!a[h]&&n[h]=="</"+i+">"){u=h;break}}}if(u==-1)l=f[c]=true;else a[u]=true}if(!l)return e;var c=0;e=e.replace(t,function(e){var t=f[c]?"":e;c++;return t});return e}var e,t;if(typeof exports==="object"&&typeof require==="function"){e=exports;t=require("./Markdown.Converter").Converter}else{e=window.Markdown;t=e.Converter}e.getSanitizingConverter=function(){var e=new t;e.hooks.chain("postConversion",n);e.hooks.chain("postConversion",a);return e};var r=/^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i;var i=/^(<a\shref="(https?:(\/\/|\/)|ftp:(\/\/|\/)|mailto:|magnet:)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i;var s=/^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i;var o=/^(<pre(\sclass="prettyprint linenums")?>|<\/pre>)$/i})();(function(e){e.fn.pagedownBootstrap=function(t){var n=e.extend({sanitize:true,help:null,hooks:Array()},t);return this.each(function(){var t=null;if(n.sanitize){t=Markdown.getSanitizingConverter()}else{t=new Markdown.Converter}for(var r in n.hooks){var i=n.hooks[r];if(typeof i!=="object"||typeof i.event==="undefined"||typeof i.callback!=="function"){continue}t.hooks.chain(i.event,i.callback)}var s="wmd-input";var o=0;while(e("#"+s+"-"+o.toString()).length>0){o++}e(this).attr("id",s+"-"+o.toString());e(this).wrap('<div class="wmd-panel" />');e(this).before('<div id="wmd-button-bar-'+o+'" class="wmd-button-bar" />');e(this).after('<div id="wmd-preview-'+o+'" class="wmd-preview" />');e(this).addClass("wmd-input");help=null;if(e.isFunction(n.help)){help={handler:n.help}}var u=new Markdown.Editor(t,"-"+o.toString(),help);u.run()})}})(jQuery)
;
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Arabic
 */


$.FroalaEditor.LANGUAGE['ar'] = {
  translation: {
    // Place holder
    "Type something": "\u0627\u0643\u062a\u0628 \u0634\u064a\u0626\u0627",

    // Basic formatting
    "Bold": "\u063a\u0627\u0645\u0642",
    "Italic": "\u0645\u0627\u0626\u0644",
    "Underline": "\u062a\u0633\u0637\u064a\u0631",
    "Strikethrough": "\u064a\u062a\u0648\u0633\u0637 \u062e\u0637",

    // Main buttons
    "Insert": "\u0625\u062f\u0631\u0627\u062c",
    "Delete": "\u062d\u0630\u0641",
    "Cancel": "\u0625\u0644\u063a\u0627\u0621",
    "OK": "\u0645\u0648\u0627\u0641\u0642",
    "Back": "\u0638\u0647\u0631",
    "Remove": "\u0625\u0632\u0627\u0644\u0629",
    "More": "\u0623\u0643\u062b\u0631",
    "Update": "\u0627\u0644\u062a\u062d\u062f\u064a\u062b",
    "Style": "\u0623\u0633\u0644\u0648\u0628",

    // Font
    "Font Family": "\u0639\u0627\u0626\u0644\u0629 \u0627\u0644\u062e\u0637",
    "Font Size": "\u062d\u062c\u0645 \u0627\u0644\u062e\u0637",

    // Colors
    "Colors": "\u0627\u0644\u0623\u0644\u0648\u0627\u0646",
    "Background": "\u0627\u0644\u062e\u0644\u0641\u064a\u0629",
    "Text": "\u0627\u0644\u0646\u0635",

    // Paragraphs
    "Paragraph Format": "\u062a\u0646\u0633\u064a\u0642 \u0627\u0644\u0641\u0642\u0631\u0629",
    "Normal": "\u0637\u0628\u064a\u0639\u064a",
    "Code": "\u0643\u0648\u062f",
    "Heading 1": "\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 1",
    "Heading 2": "\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 2",
    "Heading 3": "\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 3",
    "Heading 4": "\u0627\u0644\u0639\u0646\u0627\u0648\u064a\u0646 4",

    // Style
    "Paragraph Style": "\u0646\u0645\u0637 \u0627\u0644\u0641\u0642\u0631\u0629",
    "Inline Style": "\u0627\u0644\u0646\u0645\u0637 \u0627\u0644\u0645\u0636\u0645\u0646",

    // Alignment
    "Align": "\u0645\u062d\u0627\u0630\u0627\u0629",
    "Align Left": "\u0645\u062d\u0627\u0630\u0627\u0629 \u0627\u0644\u0646\u0635 \u0644\u0644\u064a\u0633\u0627\u0631",
    "Align Center": "\u062a\u0648\u0633\u064a\u0637",
    "Align Right": "\u0645\u062d\u0627\u0630\u0627\u0629 \u0627\u0644\u0646\u0635 \u0644\u0644\u064a\u0645\u064a\u0646",
    "Align Justify": "\u0636\u0628\u0637",
    "None": "\u0644\u0627 \u0634\u064a\u0621",

    // Lists
    "Ordered List": "\u0642\u0627\u0626\u0645\u0629 \u0645\u0631\u062a\u0628\u0629",
    "Unordered List": "\u0642\u0627\u0626\u0645\u0629 \u063a\u064a\u0631 \u0645\u0631\u062a\u0628\u0629",

    // Indent
    "Decrease Indent": "\u0627\u0646\u062e\u0641\u0627\u0636 \u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0627\u0644\u0628\u0627\u062f\u0626\u0629",
    "Increase Indent": "\u0632\u064a\u0627\u062f\u0629 \u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0627\u0644\u0628\u0627\u062f\u0626\u0629",

    // Links
    "Insert Link": "\u0625\u062f\u0631\u0627\u062c \u0631\u0627\u0628\u0637",
    "Open in new tab": "\u0641\u062a\u062d \u0641\u064a \u0639\u0644\u0627\u0645\u0629 \u062a\u0628\u0648\u064a\u0628 \u062c\u062f\u064a\u062f\u0629",
    "Open Link": "\u0627\u0641\u062a\u062d \u0627\u0644\u0631\u0627\u0628\u0637",
    "Edit Link": "\u0627\u0631\u062a\u0628\u0627\u0637 \u062a\u062d\u0631\u064a\u0631",
    "Unlink": "\u062d\u0630\u0641 \u0627\u0644\u0631\u0627\u0628\u0637",
    "Choose Link": "\u0627\u062e\u062a\u064a\u0627\u0631 \u0635\u0644\u0629",

    // Images
    "Insert Image": "\u0625\u062f\u0631\u0627\u062c \u0635\u0648\u0631\u0629",
    "Upload Image": "\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629",
    "By URL": "\u0628\u0648\u0627\u0633\u0637\u0629 URL",
    "Browse": "\u062a\u0635\u0641\u062d",
    "Drop image": "\u0625\u0633\u0642\u0627\u0637 \u0635\u0648\u0631\u0629",
    "or click": "\u0623\u0648 \u0627\u0646\u0642\u0631 \u0641\u0648\u0642",
    "Manage Images": "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0635\u0648\u0631",
    "Loading": "\u062a\u062d\u0645\u064a\u0644",
    "Deleting": "\u062d\u0630\u0641",
    "Tags": "\u0627\u0644\u0643\u0644\u0645\u0627\u062a",
    "Are you sure? Image will be deleted.": "\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f\u061f \u0633\u064a\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629\u002e",
    "Replace": "\u0627\u0633\u062a\u0628\u062f\u0627\u0644",
    "Uploading": "\u062a\u062d\u0645\u064a\u0644",
    "Loading image": "\u0635\u0648\u0631\u0629 \u062a\u062d\u0645\u064a\u0644",
    "Display": "\u0639\u0631\u0636",
    "Inline": "\u0641\u064a \u062e\u0637",
    "Break Text": "\u0646\u0635 \u0627\u0633\u062a\u0631\u0627\u062d\u0629",
    "Alternate Text": "\u0646\u0635 \u0628\u062f\u064a\u0644",
    "Change Size": "\u062a\u063a\u064a\u064a\u0631 \u062d\u062c\u0645",
    "Width": "\u0639\u0631\u0636",
    "Height": "\u0627\u0631\u062a\u0641\u0627\u0639",
    "Something went wrong. Please try again.": ".\u062d\u062f\u062b \u062e\u0637\u0623 \u0645\u0627. \u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0627\u062e\u0631\u0649",

    // Video
    "Insert Video": "\u0625\u062f\u0631\u0627\u062c \u0641\u064a\u062f\u064a\u0648",
    "Embedded Code": "\u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0629 \u0627\u0644\u0645\u0636\u0645\u0646\u0629",

    // Tables
    "Insert Table": "\u0625\u062f\u0631\u0627\u062c \u062c\u062f\u0648\u0644",
    "Header": "\u0631\u0623\u0633",
    "Row": "\u0635\u0641",
    "Insert row above": "\u0625\u062f\u0631\u0627\u062c \u0635\u0641 \u0644\u0644\u0623\u0639\u0644\u0649",
    "Insert row below": "\u0625\u062f\u0631\u0627\u062c \u0635\u0641 \u0644\u0644\u0623\u0633\u0641\u0644",
    "Delete row": "\u062d\u0630\u0641 \u0635\u0641",
    "Column": "\u0639\u0645\u0648\u062f",
    "Insert column before": "\u0625\u062f\u0631\u0627\u062c \u0639\u0645\u0648\u062f \u0644\u0644\u064a\u0633\u0627\u0631",
    "Insert column after": "\u0625\u062f\u0631\u0627\u062c \u0639\u0645\u0648\u062f \u0644\u0644\u064a\u0645\u064a\u0646",
    "Delete column": "\u062d\u0630\u0641 \u0639\u0645\u0648\u062f",
    "Cell": "\u062e\u0644\u064a\u0629",
    "Merge cells": "\u062f\u0645\u062c \u062e\u0644\u0627\u064a\u0627",
    "Horizontal split": "\u0627\u0646\u0642\u0633\u0627\u0645 \u0623\u0641\u0642\u064a",
    "Vertical split": "\u0627\u0644\u0627\u0646\u0642\u0633\u0627\u0645 \u0627\u0644\u0639\u0645\u0648\u062f\u064a",
    "Cell Background": "\u062e\u0644\u0641\u064a\u0629 \u0627\u0644\u062e\u0644\u064a\u0629",
    "Vertical Align": "\u0645\u062d\u0627\u0630\u0627\u0629 \u0639\u0645\u0648\u062f\u064a\u0629",
    "Top": "\u0623\u0639\u0644\u0649",
    "Middle": "\u0648\u0633\u0637",
    "Bottom": "\u0623\u0633\u0641\u0644",
    "Align Top": "\u0645\u062d\u0627\u0630\u0627\u0629 \u0623\u0639\u0644\u0649",
    "Align Middle": "\u0645\u062d\u0627\u0630\u0627\u0629 \u0648\u0633\u0637",
    "Align Bottom": "\u0645\u062d\u0627\u0630\u0627\u0629 \u0627\u0644\u0623\u0633\u0641\u0644",
    "Cell Style": "\u0646\u0645\u0637 \u0627\u0644\u062e\u0644\u064a\u0629",

    // Files
    "Upload File": "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0645\u0644\u0641",
    "Drop file": "\u0627\u0646\u062e\u0641\u0627\u0636 \u0627\u0644\u0645\u0644\u0641",

    // Emoticons
    "Emoticons": "\u0627\u0644\u0645\u0634\u0627\u0639\u0631",
    "Grinning face": "\u064a\u0643\u0634\u0631 \u0648\u062c\u0647\u0647",
    "Grinning face with smiling eyes": "\u0645\u0628\u062a\u0633\u0645\u0627 \u0648\u062c\u0647 \u0645\u0639 \u064a\u0628\u062a\u0633\u0645 \u0627\u0644\u0639\u064a\u0646",
    "Face with tears of joy": "\u0648\u062c\u0647 \u0645\u0639 \u062f\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u062d",
    "Smiling face with open mouth": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645",
    "Smiling face with open mouth and smiling eyes": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645 \u0648\u0627\u0644\u0639\u064a\u0646\u064a\u0646 \u064a\u0628\u062a\u0633\u0645",
    "Smiling face with open mouth and cold sweat": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645 \u0648\u0627\u0644\u0639\u0631\u0642 \u0627\u0644\u0628\u0627\u0631\u062f",
    "Smiling face with open mouth and tightly-closed eyes": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645 \u0648\u0627\u0644\u0639\u064a\u0646\u064a\u0646 \u0645\u063a\u0644\u0642\u0629 \u0628\u0625\u062d\u0643\u0627\u0645",
    "Smiling face with halo": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0645\u0639 \u0647\u0627\u0644\u0629",
    "Smiling face with horns": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0628\u0642\u0631\u0648\u0646",
    "Winking face": "\u0627\u0644\u063a\u0645\u0632 \u0648\u062c\u0647",
    "Smiling face with smiling eyes": "\u064a\u0628\u062a\u0633\u0645 \u0648\u062c\u0647 \u0645\u0639 \u0639\u064a\u0648\u0646 \u062a\u0628\u062a\u0633\u0645",
    "Face savoring delicious food": "\u064a\u0648\u0627\u062c\u0647 \u0644\u0630\u064a\u0630 \u0627\u0644\u0645\u0630\u0627\u0642 \u0644\u0630\u064a\u0630 \u0627\u0644\u0637\u0639\u0627\u0645",
    "Relieved face": "\u0648\u062c\u0647 \u0628\u0627\u0644\u0627\u0631\u062a\u064a\u0627\u062d",
    "Smiling face with heart-shaped eyes": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0628\u0639\u064a\u0646\u064a\u0646 \u0639\u0644\u0649 \u0634\u0643\u0644 \u0642\u0644\u0628",
    "Smiling face with sunglasses": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0628\u062a\u0633\u0645 \u0645\u0639 \u0627\u0644\u0646\u0638\u0627\u0631\u0627\u062a \u0627\u0644\u0634\u0645\u0633\u064a\u0629",
    "Smirking face": "\u0633\u0645\u064a\u0631\u0643\u064a\u0646\u062c \u0627\u0644\u0648\u062c\u0647",
    "Neutral face": "\u0645\u062d\u0627\u064a\u062f \u0627\u0644\u0648\u062c\u0647",
    "Expressionless face": "\u0648\u062c\u0647 \u0627\u0644\u062a\u0639\u0627\u0628\u064a\u0631",
    "Unamused face": "\u0644\u0627 \u0645\u0633\u0644\u064a\u0627 \u0627\u0644\u0648\u062c\u0647",
    "Face with cold sweat": "\u0648\u062c\u0647 \u0645\u0639 \u0639\u0631\u0642 \u0628\u0627\u0631\u062f",
    "Pensive face": "\u0648\u062c\u0647 \u0645\u062a\u0623\u0645\u0644",
    "Confused face": "\u0648\u062c\u0647 \u0627\u0644\u062e\u0644\u0637",
    "Confounded face": "\u0648\u062c\u0647 \u0645\u0631\u062a\u0628\u0643",
    "Kissing face": "\u062a\u0642\u0628\u064a\u0644 \u0627\u0644\u0648\u062c\u0647",
    "Face throwing a kiss": "\u0645\u0648\u0627\u062c\u0647\u0629 \u0631\u0645\u064a \u0642\u0628\u0644\u0629",
    "Kissing face with smiling eyes": "\u062a\u0642\u0628\u064a\u0644 \u0648\u062c\u0647 \u0645\u0639 \u0639\u064a\u0648\u0646 \u062a\u0628\u062a\u0633\u0645",
    "Kissing face with closed eyes": "\u062a\u0642\u0628\u064a\u0644 \u0648\u062c\u0647 \u0645\u0639 \u0639\u064a\u0648\u0646 \u0645\u063a\u0644\u0642\u0629",
    "Face with stuck out tongue": "\u0627\u0644\u0648\u062c\u0647 \u0645\u0639 \u062a\u0645\u0633\u0643 \u0628\u0647\u0627 \u0627\u0644\u0644\u0633\u0627\u0646",
    "Face with stuck out tongue and winking eye": "\u0627\u0644\u0648\u062c\u0647 \u0645\u0639 \u062a\u0645\u0633\u0643 \u0628\u0647\u0627 \u0627\u0644\u0644\u0633\u0627\u0646 \u0648\u0627\u0644\u0639\u064a\u0646 \u0627\u0644\u062a\u063a\u0627\u0636\u064a",
    "Face with stuck out tongue and tightly-closed eyes": "\u0627\u0644\u0648\u062c\u0647 \u0645\u0639 \u062a\u0645\u0633\u0643 \u0628\u0647\u0627 \u0627\u0644\u0644\u0633\u0627\u0646 \u0648\u0627\u0644\u0639\u064a\u0648\u0646 \u0645\u063a\u0644\u0642\u0629 \u0628\u0623\u062d\u0643\u0627\u0645\u002d",
    "Disappointed face": "\u0648\u062c\u0647\u0627 \u062e\u064a\u0628\u0629 \u0623\u0645\u0644",
    "Worried face": "\u0648\u062c\u0647\u0627 \u0627\u0644\u0642\u0644\u0642\u0648\u0646",
    "Angry face": "\u0648\u062c\u0647 \u063a\u0627\u0636\u0628",
    "Pouting face": "\u0627\u0644\u0639\u0628\u0648\u0633 \u0648\u062c\u0647",
    "Crying face": "\u0627\u0644\u0628\u0643\u0627\u0621 \u0627\u0644\u0648\u062c\u0647",
    "Persevering face": "\u0627\u0644\u0645\u062b\u0627\u0628\u0631\u0629 \u0648\u062c\u0647\u0647",
    "Face with look of triumph": "\u0648\u0627\u062c\u0647 \u0645\u0639 \u0646\u0638\u0631\u0629 \u0627\u0646\u062a\u0635\u0627\u0631",
    "Disappointed but relieved face": "\u0628\u062e\u064a\u0628\u0629 \u0623\u0645\u0644 \u0648\u0644\u0643\u0646 \u064a\u0639\u0641\u0649 \u0648\u062c\u0647",
    "Frowning face with open mouth": "\u0645\u0642\u0637\u0628 \u0627\u0644\u0648\u062c\u0647 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645",
    "Anguished face": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u0624\u0644\u0645",
    "Fearful face": "\u0627\u0644\u0648\u062c\u0647 \u0627\u0644\u0645\u062e\u064a\u0641",
    "Weary face": "\u0648\u062c\u0647\u0627 \u0628\u0627\u0644\u0636\u062c\u0631",
    "Sleepy face": "\u0648\u062c\u0647 \u0646\u0639\u0633\u0627\u0646",
    "Tired face": "\u0648\u062c\u0647 \u0645\u062a\u0639\u0628",
    "Grimacing face": "\u0648\u062e\u0631\u062c \u0633\u064a\u0633 \u0627\u0644\u0648\u062c\u0647",
    "Loudly crying face": "\u0627\u0644\u0628\u0643\u0627\u0621 \u0628\u0635\u0648\u062a \u0639\u0627\u0644 \u0648\u062c\u0647\u0647",
    "Face with open mouth": "\u0648\u0627\u062c\u0647 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645",
    "Hushed face": "\u0648\u062c\u0647\u0627 \u0627\u0644\u062a\u0643\u062a\u0645",
    "Face with open mouth and cold sweat": "\u0648\u0627\u062c\u0647 \u0645\u0639 \u0641\u062a\u062d \u0627\u0644\u0641\u0645 \u0648\u0627\u0644\u0639\u0631\u0642 \u0627\u0644\u0628\u0627\u0631\u062f",
    "Face screaming in fear": "\u0648\u0627\u062c\u0647 \u064a\u0635\u0631\u062e \u0641\u064a \u062e\u0648\u0641",
    "Astonished face": "\u0648\u062c\u0647\u0627 \u062f\u0647\u0634",
    "Flushed face": "\u0627\u062d\u0645\u0631\u0627\u0631 \u0627\u0644\u0648\u062c\u0647",
    "Sleeping face": "\u0627\u0644\u0646\u0648\u0645 \u0627\u0644\u0648\u062c\u0647",
    "Dizzy face": "\u0648\u062c\u0647\u0627 \u0628\u0627\u0644\u062f\u0648\u0627\u0631",
    "Face without mouth": "\u0648\u0627\u062c\u0647 \u062f\u0648\u0646 \u0627\u0644\u0641\u0645",
    "Face with medical mask": "\u0648\u0627\u062c\u0647 \u0645\u0639 \u0642\u0646\u0627\u0639 \u0627\u0644\u0637\u0628\u064a\u0629",

    // Line breaker
    "Break": "\u0627\u0644\u0627\u0646\u0642\u0633\u0627\u0645",

    // Math
    "Subscript": "\u0645\u0646\u062e\u0641\u0636",
    "Superscript": "\u062d\u0631\u0641 \u0641\u0648\u0642\u064a",

    // Full screen
    "Fullscreen": "\u0643\u0627\u0645\u0644 \u0627\u0644\u0634\u0627\u0634\u0629",

    // Horizontal line
    "Insert Horizontal Line": "\u0625\u062f\u0631\u0627\u062c \u062e\u0637 \u0623\u0641\u0642\u064a",

    // Clear formatting
    "Clear Formatting": "\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062a\u0646\u0633\u064a\u0642",

    // Undo, redo
    "Undo": "\u062a\u0631\u0627\u062c\u0639",
    "Redo": "\u0625\u0639\u0627\u062f\u0629",

    // Select all
    "Select All": "\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u0643\u0644",

    // Code view
    "Code View": "\u0639\u0631\u0636 \u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0629",

    // Quote
    "Quote": "\u0627\u0642\u062a\u0628\u0633",
    "Increase": "\u0632\u064a\u0627\u062f\u0629",
    "Decrease": "\u0627\u0646\u062e\u0641\u0627\u0636"
  },
  direction: "rtl"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Bosnian
 */


$.FroalaEditor.LANGUAGE['bs'] = {
  translation: {
    // Place holder
    "Type something": "Ukucajte ne\u0161tp",

    // Basic formatting
    "Bold": "Bold",
    "Italic": "Italic",
    "Underline": "Podvu\u010deno",
    "Strikethrough": "Precrtano",

    // Main buttons
    "Insert": "Umetni",
    "Delete": "Obri\u0161i",
    "Cancel": "Otka\u017ei",
    "OK": "U redu",
    "Back": "Natrag",
    "Remove": "Ukloni",
    "More": "Vi\u0161e",
    "Update": "A\u017euriranje",
    "Style": "Stil",

    // Font
    "Font Family": "Odaberi font",
    "Font Size": "Veli\u010dina fonta",

    // Colors
    "Colors": "Boje",
    "Background": "Pozadine",
    "Text": "Teksta",

    // Paragraphs
    "Paragraph Format": "Paragraf formatu",
    "Normal": "Normalno",
    "Code": "Izvorni kod",
    "Heading 1": "Naslov 1",
    "Heading 2": "Naslov 2",
    "Heading 3": "Naslov 3",
    "Heading 4": "Naslov 4",

    // Style
    "Paragraph Style": "Paragraf stil",
    "Inline Style": "Inline stil",

    // Alignment
    "Alignment": "Poravnanje",
    "Align Left": "Poravnaj lijevo",
    "Align Center": "Poravnaj po sredini",
    "Align Right": "Poravnaj desno",
    "Align Justify": "Obostrano poravnanje",
    "None": "Nijedan",

    // Lists
    "Ordered List": "Ure\u0111ena lista",
    "Unordered List": "Nesre\u0111ene lista",

    // Indent
    "Decrease Indent": "Smanjenje alineja",
    "Increase Indent": "Pove\u0107anje alineja",

    // Links
    "Insert Link": "Umetni link",
    "Open in new tab": "Otvori u novom prozoru",
    "Open Link": "Otvori link",
    "Edit Link": "Uredi link",
    "Unlink": "Ukloni link",
    "Choose Link": "Izabrati link",

    // Images
    "Insert Image": "Umetni sliku",
    "Upload Image": "Upload sliku",
    "By URL": "Preko URL",
    "Browse": "Pregledaj",
    "Drop image": "Izbaci sliku",
    "or click": "ili odaberi",
    "Manage Images": "Upravljanje ilustracijama",
    "Loading": "Koji tovari",
    "Deleting": "Brisanje",
    "Tags": "Oznake",
    "Are you sure? Image will be deleted.": "Da li ste sigurni da \u017eelite da obri\u0161ete ovu ilustraciju?",
    "Replace": "Zamijenite",
    "Uploading": "Uploading",
    "Loading image": "Koji tovari sliku",
    "Display": "Prikaz",
    "Inline": "Inline",
    "Break Text": "Break tekst",
    "Alternate Text": "Alternativna tekst",
    "Change Size": "Promijeni veli\u010dinu",
    "Width": "\u0161irina",
    "Height": "Visina",
    "Something went wrong. Please try again.": "Ne\u0161to je po\u0161lo po zlu. Molimo vas da poku\u0161ate ponovo.",

    // Video
    "Insert Video": "Umetni video",
    "Embedded Code": "Embedded kod",

    // Tables
    "Insert Table": "Umetni tabelu",
    "Header": "Zaglavlje",
    "Row": "Red",
    "Insert row above": "Umetni red iznad",
    "Insert row below": "Umetni red ispod",
    "Delete row": "Obri\u0161i red",
    "Column": "Kolona",
    "Insert column before": "Umetni kolonu prije",
    "Insert column after": "Umetni kolonu poslije",
    "Delete column": "Obri\u0161i kolonu",
    "Cell": "\u0106elija",
    "Merge cells": "Spoji \u0107elija",
    "Horizontal split": "Horizontalno razdvajanje polja",
    "Vertical split": "Vertikalno razdvajanje polja",
    "Cell Background": "\u0106elija pozadini",
    "Vertical Align": "Vertikalni poravnaj",
    "Top": "Vrh",
    "Middle": "Srednji",
    "Bottom": "Dno",
    "Align Top": "Poravnaj vrh",
    "Align Middle": "Poravnaj srednji",
    "Align Bottom": "Poravnaj dno",
    "Cell Style": "\u0106elija stil",

    // Files
    "Upload File": "Upload datoteke",
    "Drop file": "Drop datoteke",

    // Emoticons
    "Emoticons": "Emotikona",
    "Grinning face": "Cere\u0107i lice",
    "Grinning face with smiling eyes": "Cere\u0107i lice nasmijana o\u010dima",
    "Face with tears of joy": "Lice sa suze radosnice",
    "Smiling face with open mouth": "Nasmijana lica s otvorenih usta",
    "Smiling face with open mouth and smiling eyes": "Nasmijana lica s otvorenih usta i nasmijana o\u010di",
    "Smiling face with open mouth and cold sweat": "Nasmijana lica s otvorenih usta i hladan znoj",
    "Smiling face with open mouth and tightly-closed eyes": "Nasmijana lica s otvorenih usta i \u010dvrsto-zatvorenih o\u010diju",
    "Smiling face with halo": "Nasmijana lica sa halo",
    "Smiling face with horns": "Nasmijana lica s rogovima",
    "Winking face": "Namigivanje lice",
    "Smiling face with smiling eyes": "Nasmijana lica sa nasmijana o\u010dima",
    "Face savoring delicious food": "Suo\u010davaju u\u017eivaju\u0107i ukusna hrana",
    "Relieved face": "Laknulo lice",
    "Smiling face with heart-shaped eyes": "Nasmijana lica sa obliku srca o\u010di",
    "Smiling face with sunglasses": "Nasmijana lica sa sun\u010dane nao\u010dare",
    "Smirking face": "Namr\u0161tena lica",
    "Neutral face": "Neutral lice",
    "Expressionless face": "Bezizra\u017eajno lice",
    "Unamused face": "Nije zabavno lice",
    "Face with cold sweat": "Lice s hladnim znojem",
    "Pensive face": "Zami\u0161ljen lice",
    "Confused face": "Zbunjen lice",
    "Confounded face": "Uzbu\u0111en lice",
    "Kissing face": "Ljubakanje lice",
    "Face throwing a kiss": "Suo\u010davaju bacanje poljubac",
    "Kissing face with smiling eyes": "Ljubljenje lice nasmijana o\u010dima",
    "Kissing face with closed eyes": "Ljubljenje lice sa zatvorenim o\u010dima",
    "Face with stuck out tongue": "Lice sa ispru\u017eio jezik",
    "Face with stuck out tongue and winking eye": "Lice sa ispru\u017eio jezik i trep\u0107u\u0107e \u0107e oko",
    "Face with stuck out tongue and tightly-closed eyes": "Lice sa ispru\u017eio jezik i \u010dvrsto zatvorene o\u010di",
    "Disappointed face": "Razo\u010daran lice",
    "Worried face": "Zabrinuti lice",
    "Angry face": "Ljut lice",
    "Pouting face": "Napu\u0107enim lice",
    "Crying face": "Plakanje lice",
    "Persevering face": "Istrajan lice",
    "Face with look of triumph": "Lice s pogledom trijumfa",
    "Disappointed but relieved face": "Razo\u010daran, ali olak\u0161anje lice",
    "Frowning face with open mouth": "Namr\u0161tiv\u0161i lice s otvorenih usta",
    "Anguished face": "Bolnom lice",
    "Fearful face": "Pla\u0161ljiv lice",
    "Weary face": "Umoran lice",
    "Sleepy face": "Pospan lice",
    "Tired face": "Umorno lice",
    "Grimacing face": "Grimase lice",
    "Loudly crying face": "Glasno pla\u010de lice",
    "Face with open mouth": "Lice s otvorenih usta",
    "Hushed face": "Smiren lice",
    "Face with open mouth and cold sweat": "Lice s otvorenih usta i hladan znoj",
    "Face screaming in fear": "Suo\u010davaju vri\u0161ti u strahu",
    "Astonished face": "Zapanjen lice",
    "Flushed face": "Rumeno lice",
    "Sleeping face": "Usnulo lice",
    "Dizzy face": "O\u0161amu\u0107en lice",
    "Face without mouth": "Lice bez usta",
    "Face with medical mask": "Lice sa medicinskom maskom",

    // Line breaker
    "Break": "Slomiti",

    // Math
    "Subscript": "Potpisan",
    "Superscript": "Natpis",

    // Full screen
    "Fullscreen": "Preko cijelog zaslona",

    // Horizontal line
    "Insert Horizontal Line": "Umetni vodoravna liniju",

    // Clear formatting
    "Clear Formatting": "Izbrisati formatiranje",

    // Undo, redo
    "Undo": "Korak nazad",
    "Redo": "Korak naprijed",

    // Select all
    "Select All": "Ozna\u010di sve",

    // Code view
    "Code View": "Kod pogled",

    // Quote
    "Quote": "Citat",
    "Increase": "Pove\u0107ati",
    "Decrease": "Smanjenje"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Czech
 */


$.FroalaEditor.LANGUAGE['cs'] = {
  translation: {
    // Place holder
    "Type something": "Napi\u0161te n\u011bco",

    // Basic formatting
    "Bold": "Tu\u010dn\u00e9",
    "Italic": "Kurz\u00edva",
    "Underline": "Podtr\u017een\u00e9",
    "Strikethrough": "P\u0159e\u0161krtnut\u00e9",

    // Main buttons
    "Insert": "Vlo\u017eit",
    "Delete": "Vymazat",
    "Cancel": "Zru\u0161it",
    "OK": "OK",
    "Back": "Zp\u011bt",
    "Remove": "Odstranit",
    "More": "V\u00edce",
    "Update": "Aktualizovat",
    "Style": "Styl",

    // Font
    "Font Family": "Typ p\u00edsma",
    "Font Size": "Velikost p\u00edsma",

    // Colors
    "Colors": "Barvy",
    "Background": "Pozad\u00ed",
    "Text": "P\u00edsmo",

    // Paragraphs
    "Paragraph Format": "Form\u00e1t odstavec",
    "Normal": "Norm\u00e1ln\u00ed",
    "Code": "K\u00f3d",
    "Heading 1": "Nadpis 1",
    "Heading 2": "Nadpis 2",
    "Heading 3": "Nadpis 3",
    "Heading 4": "Nadpis 4",

    // Style
    "Paragraph Style": "Odstavec styl",
    "Inline Style": "Inline styl",

    // Alignment
    "Align": "Zarovn\u00e1n\u00ed",
    "Align Left": "Zarovnat vlevo",
    "Align Center": "Zarovnat na st\u0159ed",
    "Align Right": "Zarovnat vpravo",
    "Align Justify": "Zarovnat do bloku",
    "None": "Nikdo",

    // Lists
    "Ordered List": "\u010c\u00edslovan\u00fd seznam",
    "Unordered List": "Ne\u010d\u00edslovan\u00fd seznam",

    // Indent
    "Decrease Indent": "Zmen\u0161it odsazen\u00ed",
    "Increase Indent": "Zv\u011bt\u0161it odsazen\u00ed",

    // Links
    "Insert Link": "Vlo\u017eit odkaz",
    "Open in new tab": "Otev\u0159\u00edt v nov\u00e9 z\u00e1lo\u017ece",
    "Open Link": "Otev\u0159\u00edt odkaz",
    "Edit Link": "Upravit odkaz",
    "Unlink": "Odstranit odkaz",
    "Choose Link": "Zvolte odkaz",

    // Images
    "Insert Image": "Vlo\u017eit obr\u00e1zek",
    "Upload Image": "Nahr\u00e1t obr\u00e1zek",
    "By URL": "Podle URL",
    "Browse": "Proch\u00e1zet",
    "Drop image": "P\u0159et\u00e1hn\u011bte sem obr\u00e1zek",
    "or click": "nebo zde klepn\u011bte",
    "Manage Images": "Spr\u00e1va obr\u00e1zk\u016f",
    "Loading": "Nakl\u00e1d\u00e1n\u00ed",
    "Deleting": "Odstran\u011bn\u00ed",
    "Tags": "Zna\u010dky",
    "Are you sure? Image will be deleted.": "Ur\u010dit\u011b? Obr\u00e1zek bude smaz\u00e1n.",
    "Replace": "Nahradit",
    "Uploading": "Nahr\u00e1v\u00e1n\u00ed",
    "Loading image": "Obr\u00e1zek se na\u010d\u00edt\u00e1",
    "Display": "Zobrazit",
    "Inline": "Inline",
    "Break Text": "P\u0159est\u00e1vka textu",
    "Alternate Text": "Alternativn\u00ed textu",
    "Change Size": "Zm\u011bnit velikost",
    "Width": "\u0160\u00ed\u0159ka",
    "Height": "V\u00fd\u0161ka",
    "Something went wrong. Please try again.": "N\u011bco se pokazilo. Pros\u00edm zkuste to znovu.",

    // Video
    "Insert Video": "Vlo\u017eit video",
    "Embedded Code": "Vlo\u017een\u00fd k\u00f3d",

    // Tables
    "Insert Table": "Vlo\u017eit tabulku",
    "Header": "Hlavi\u010dka",
    "Row": "\u0158\u00e1dek",
    "Insert row above": "Vlo\u017eit \u0159\u00e1dek nad",
    "Insert row below": "Vlo\u017eit \u0159\u00e1dek pod",
    "Delete row": "Smazat \u0159\u00e1dek",
    "Column": "Sloupec",
    "Insert column before": "Vlo\u017eit sloupec vlevo",
    "Insert column after": "Vlo\u017eit sloupec vpravo",
    "Delete column": "Smazat sloupec",
    "Cell": "Bu\u0148ka",
    "Merge cells": "Slou\u010dit bu\u0148ky",
    "Horizontal split": "Horizont\u00e1ln\u00ed rozd\u011blen\u00ed",
    "Vertical split": "Vertik\u00e1ln\u00ed rozd\u011blen\u00ed",
    "Cell Background": "Bu\u0148ka pozad\u00ed",
    "Vertical Align": "Vertik\u00e1ln\u00ed zarovn\u00e1n\u00ed",
    "Top": "Vrchol",
    "Middle": "St\u0159ed",
    "Bottom": "Spodn\u00ed",
    "Align Top": "Zarovnat vrchol",
    "Align Middle": "Zarovnat st\u0159ed",
    "Align Bottom": "Zarovnat spodn\u00ed",
    "Cell Style": "Styl bu\u0148ky",

    // Files
    "Upload File": "Nahr\u00e1t soubor",
    "Drop file": "P\u0159et\u00e1hn\u011bte sem soubor",

    // Emoticons
    "Emoticons": "Emotikony",
    "Grinning face": "S \u00fasm\u011bvem tv\u00e1\u0159",
    "Grinning face with smiling eyes": "S \u00fasm\u011bvem obli\u010dej s o\u010dima s \u00fasm\u011bvem",
    "Face with tears of joy": "tv\u00e1\u0159 se slzami radosti",
    "Smiling face with open mouth": "Usm\u00edvaj\u00edc\u00ed se obli\u010dej s otev\u0159en\u00fdmi \u00fasty",
    "Smiling face with open mouth and smiling eyes": "Usm\u00edvaj\u00edc\u00ed se obli\u010dej s otev\u0159en\u00fdmi \u00fasty a o\u010dima s \u00fasm\u011bvem",
    "Smiling face with open mouth and cold sweat": "Usm\u00edvaj\u00edc\u00ed se tv\u00e1\u0159 s otev\u0159en\u00fdmi \u00fasty a studen\u00fd pot",
    "Smiling face with open mouth and tightly-closed eyes": "Usm\u00edvaj\u00edc\u00ed se tv\u00e1\u0159 s otev\u0159en\u00fdmi \u00fasty a t\u011bsn\u011b zav\u0159en\u00e9 o\u010di",
    "Smiling face with halo": "Usm\u00edvaj\u00edc\u00ed se obli\u010dej s halo",
    "Smiling face with horns": "Usm\u00edvaj\u00edc\u00ed se obli\u010dej s  rohy",
    "Winking face": "Mrk\u00e1n\u00ed tv\u00e1\u0159",
    "Smiling face with smiling eyes": "Usm\u00edvaj\u00edc\u00ed se obli\u010dej s  o\u010dima s \u00fasm\u011bvem",
    "Face savoring delicious food": "Tv\u00e1\u0159 vychutn\u00e1val chutn\u00e9 j\u00eddlo",
    "Relieved face": "Ulevilo tv\u00e1\u0159",
    "Smiling face with heart-shaped eyes": "Usm\u00edvaj\u00edc\u00ed se tv\u00e1\u0159 ve tvaru srdce o\u010dima",
    "Smiling face with sunglasses": "Usm\u00edvaj\u00edc\u00ed se tv\u00e1\u0159 se slune\u010dn\u00edmi br\u00fdlemi",
    "Smirking face": "Uculoval tv\u00e1\u0159",
    "Neutral face": "Neutr\u00e1ln\u00ed tv\u00e1\u0159",
    "Expressionless face": "Bezv\u00fdrazn\u00fd obli\u010dej",
    "Unamused face": "Ne pobaven\u00fd tv\u00e1\u0159",
    "Face with cold sweat": "Tv\u00e1\u0159 se studen\u00fdm potem",
    "Pensive face": "Zamy\u0161len\u00fd obli\u010dej",
    "Confused face": "Zmaten\u00fd tv\u00e1\u0159",
    "Confounded face": "Na\u0161tvan\u00fd tv\u00e1\u0159",
    "Kissing face": "L\u00edb\u00e1n\u00ed tv\u00e1\u0159",
    "Face throwing a kiss": "Tv\u00e1\u0159 h\u00e1zet polibek",
    "Kissing face with smiling eyes": "L\u00edb\u00e1n\u00ed obli\u010dej s o\u010dima s \u00fasm\u011bvem",
    "Kissing face with closed eyes": "L\u00edb\u00e1n\u00ed tv\u00e1\u0159 se zav\u0159en\u00fdma o\u010dima",
    "Face with stuck out tongue": "Tv\u00e1\u0159 s tr\u010dely jazyk",
    "Face with stuck out tongue and winking eye": "Tv\u00e1\u0159 s tr\u010dely jazykem a mrkat o\u010dima",
    "Face with stuck out tongue and tightly-closed eyes": "Suo\u010diti s tr\u010dely jazykem t\u011bsn\u011b zav\u0159en\u00e9 vidikovce",
    "Disappointed face": "Zklaman\u00fd tv\u00e1\u0159",
    "Worried face": "Boj\u00ed\u0161 se tv\u00e1\u0159",
    "Angry face": "Rozzloben\u00fd tv\u00e1\u0159",
    "Pouting face": "Na\u0161pulen\u00e9 tv\u00e1\u0159",
    "Crying face": "Pl\u00e1\u010d tv\u00e1\u0159",
    "Persevering face": "Vytrval\u00fdm tv\u00e1\u0159",
    "Face with look of triumph": "Tv\u00e1\u0159 s v\u00fdrazem triumfu",
    "Disappointed but relieved face": "Zklaman\u00fd ale ulevilo tv\u00e1\u0159",
    "Frowning face with open mouth": "Zamra\u010dil se obli\u010dej s otev\u0159en\u00fdmi \u00fasty",
    "Anguished face": "\u00fazkostn\u00e9 tv\u00e1\u0159",
    "Fearful face": "Stra\u0161n\u00fd tv\u00e1\u0159",
    "Weary face": "Unaven\u00fd tv\u00e1\u0159",
    "Sleepy face": "Ospal\u00fd tv\u00e1\u0159",
    "Tired face": "Unaven\u00fd tv\u00e1\u0159",
    "Grimacing face": "\u0161klebil tv\u00e1\u0159",
    "Loudly crying face": "Hlasit\u011b pl\u00e1\u010de tv\u00e1\u0159",
    "Face with open mouth": "Obli\u010dej s otev\u0159en\u00fdmi \u00fasty",
    "Hushed face": "Tlumen\u00fd tv\u00e1\u0159",
    "Face with open mouth and cold sweat": "Obli\u010dej s otev\u0159en\u00fdmi \u00fasty a studen\u00fd pot",
    "Face screaming in fear": "Tv\u00e1\u0159 k\u0159i\u010d\u00ed ve strachu",
    "Astonished face": "V \u00fa\u017easu tv\u00e1\u0159",
    "Flushed face": "Zarudnut\u00ed v obli\u010deji",
    "Sleeping face": "Sp\u00edc\u00ed tv\u00e1\u0159",
    "Dizzy face": "Z\u00e1vrat\u011b tv\u00e1\u0159",
    "Face without mouth": "Tv\u00e1\u0159 bez \u00fast",
    "Face with medical mask": "Tv\u00e1\u0159 s l\u00e9ka\u0159sk\u00fdm maskou",

    // Line breaker
    "Break": "P\u0159eru\u0161en\u00ed",

    // Math
    "Subscript": "Doln\u00ed index",
    "Superscript": "Horn\u00ed index",

    // Full screen
    "Fullscreen": "Cel\u00e1 obrazovka",

    // Horizontal line
    "Insert Horizontal Line": "Vlo\u017eit vodorovnou \u010d\u00e1ru",

    // Clear formatting
    "Clear Formatting": "Vymazat form\u00e1tov\u00e1n\u00ed",

    // Undo, redo
    "Undo": "Zp\u011bt",
    "Redo": "Znovu",

    // Select all
    "Select All": "Vybrat v\u0161e",

    // Code view
    "Code View": "Zobrazen\u00ed k\u00f3d",

    // Quote
    "Quote": "Cit\u00e1t",
    "Increase": "Nav\u00fd\u0161it",
    "Decrease": "Sn\u00ed\u017een\u00ed"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Danish
 */


$.FroalaEditor.LANGUAGE['da'] = {
  translation: {
    // Place holder
    "Type something": "Skriv noget",

    // Basic formatting
    "Bold": "Fed",
    "Italic": "Kursiv",
    "Underline": "Understreg",
    "Strikethrough": "Gennemstreg",

    // Main buttons
    "Insert": "Inds\u00e6t",
    "Delete": "Slet",
    "Cancel": "Fortryd",
    "OK": "Ok",
    "Back": "Tilbage",
    "Remove": "Fjern",
    "More": "Mere",
    "Update": "Opdatering",
    "Style": "Stil",

    // Font
    "Font Family": "Skrifttype",
    "Font Size": "Skriftst\u00f8rrelse",

    // Colors
    "Colors": "Farver",
    "Background": "Baggrunds",
    "Text": "Tekst",

    // Paragraphs
    "Paragraph Format": "S\u00e6tning format",
    "Normal": "Normal",
    "Code": "Code",
    "Heading 1": "Overskrift 1",
    "Heading 2": "Overskrift 2",
    "Heading 3": "Overskrift 3",
    "Heading 4": "Overskrift 4",

    // Style
    "Paragraph Style": "S\u00e6tning stil",
    "Inline Style": "Inline stil",

    // Alignment
    "Align": "Tilpasning",
    "Align Left": "Venstrejusteret",
    "Align Center": "Centreret",
    "Align Right": "H\u00f8jrejusteret",
    "Align Justify": "Justering",
    "None": "Intet",

    // Lists
    "Ordered List": "Ordnet liste",
    "Unordered List": "Uordnet liste",

    // Indent
    "Decrease Indent": "Mindske indrykning",
    "Increase Indent": "For\u00f8ge indrykning",

    // Links
    "Insert Link": "Inds\u00e6t link",
    "Open in new tab": "\u00c5bn i ny fane",
    "Open Link": "\u00c5bn link",
    "Edit Link": "Rediger link",
    "Unlink": "Fjern link",
    "Choose Link": "V\u00e6lg link",

    // Images
    "Insert Image": "Inds\u00e6t billede",
    "Upload Image": "Upload billede",
    "By URL": "Af URL",
    "Browse": "Gennemse",
    "Drop image": "Tr\u00e6k billedet herind",
    "or click": "eller klik",
    "Manage Images": "Administrer billeder",
    "Loading": "Lastning",
    "Deleting": "Sletning",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "Er du sikker? Billede vil blive slettet.",
    "Replace": "Udskift",
    "Uploading": "Upload",
    "Loading image": "Lastning billede",
    "Display": "Udstilling",
    "Inline": "Inline",
    "Break Text": "Afbrydelse tekst",
    "Alternate Text": "Suppleant tekst",
    "Change Size": "Skift st\u00f8rrelse",
    "Width": "Bredde",
    "Height": "H\u00f8jde",
    "Something went wrong. Please try again.": "Noget gik galt. Pr\u00f8v igen.",

    // Video
    "Insert Video": "Inds\u00e6t video",
    "Embedded Code": "Embedded kode",

    // Tables
    "Insert Table": "Inds\u00e6t tabel",
    "Header": "Header",
    "Row": "R\u00e6kke",
    "Insert row above": "Inds\u00e6t r\u00e6kke over",
    "Insert row below": "Inds\u00e6t r\u00e6kke under",
    "Delete row": "Slet r\u00e6kke",
    "Column": "Kolonne",
    "Insert column before": "Inds\u00e6t kolonne f\u00f8r",
    "Insert column after": "Inds\u00e6t kolonne efter",
    "Delete column": "Slet kolonne",
    "Cell": "Celle",
    "Merge cells": "Flet celler",
    "Horizontal split": "Vandret split",
    "Vertical split": "Lodret split",
    "Cell Background": "Celle baggrund",
    "Vertical Align": "Lodret tilpasning",
    "Top": "Top",
    "Middle": "Midten",
    "Bottom": "Bund",
    "Align Top": "Tilpasse top",
    "Align Middle": "Tilpasse midten",
    "Align Bottom": "Tilpasse bund",
    "Cell Style": "Celle stil",

    // Files
    "Upload File": "Upload fil",
    "Drop file": "Drop fil",

    // Emoticons
    "Emoticons": "Hum\u00f8rikoner",
    "Grinning face": "Grinende ansigt",
    "Grinning face with smiling eyes": "Grinende ansigt med smilende \u00f8jne",
    "Face with tears of joy": "Ansigt med gl\u00e6dest\u00e5rer",
    "Smiling face with open mouth": "Smilende ansigt med \u00e5ben mund",
    "Smiling face with open mouth and smiling eyes": "Smilende ansigt med \u00e5ben mund og smilende \u00f8jne",
    "Smiling face with open mouth and cold sweat": "Smilende ansigt med \u00e5ben mund og koldsved",
    "Smiling face with open mouth and tightly-closed eyes": "Smilende ansigt med \u00e5ben mund og stramt-lukkede \u00f8jne",
    "Smiling face with halo": "Smilende ansigt med halo",
    "Smiling face with horns": "Smilende ansigt med horn",
    "Winking face": "Blinkede ansigt",
    "Smiling face with smiling eyes": "Smilende ansigt med smilende \u00f8jne",
    "Face savoring delicious food": "Ansigt savoring l\u00e6kker mad",
    "Relieved face": "Lettet ansigt",
    "Smiling face with heart-shaped eyes": "Smilende ansigt med hjerteformede \u00f8jne",
    "Smiling face with sunglasses": "Smilende ansigt med solbriller",
    "Smirking face": "Smilende ansigt",
    "Neutral face": "Neutral ansigt",
    "Expressionless face": "Udtryksl\u00f8se ansigt",
    "Unamused face": "Ikke morede ansigt",
    "Face with cold sweat": "Ansigt med koldsved",
    "Pensive face": "Eftert\u00e6nksom ansigt",
    "Confused face": "Forvirret ansigt",
    "Confounded face": "Forvirrede ansigt",
    "Kissing face": "Kysse ansigt",
    "Face throwing a kiss": "Ansigt smide et kys",
    "Kissing face with smiling eyes": "Kysse ansigt med smilende \u00f8jne",
    "Kissing face with closed eyes": "Kysse ansigt med lukkede \u00f8jne",
    "Face with stuck out tongue": "Ansigt med stak ud tungen",
    "Face with stuck out tongue and winking eye": "Ansigt med stak ud tungen og blinkede \u00f8je",
    "Face with stuck out tongue and tightly-closed eyes": "Ansigt med stak ud tungen og stramt lukkede \u00f8jne",
    "Disappointed face": "Skuffet ansigt",
    "Worried face": "Bekymret ansigt",
    "Angry face": "Vred ansigt",
    "Pouting face": "Sk\u00e6gtorsk ansigt",
    "Crying face": "Gr\u00e6der ansigt",
    "Persevering face": "Udholdende ansigt",
    "Face with look of triumph": "Ansigt med udseendet af triumf",
    "Disappointed but relieved face": "Skuffet, men lettet ansigt",
    "Frowning face with open mouth": "Rynkede panden ansigt med \u00e5ben mund",
    "Anguished face": "Forpinte ansigt",
    "Fearful face": "Frygt ansigt",
    "Weary face": "Tr\u00e6tte ansigt",
    "Sleepy face": "S\u00f8vnig ansigt",
    "Tired face": "Tr\u00e6t ansigt",
    "Grimacing face": "Grimasser ansigt",
    "Loudly crying face": "H\u00f8jlydt grædende ansigt",
    "Face with open mouth": "Ansigt med \u00e5ben mund",
    "Hushed face": "Tyst ansigt",
    "Face with open mouth and cold sweat": "Ansigt med \u00e5ben mund og koldsved",
    "Face screaming in fear": "Ansigt skrigende i fryg",
    "Astonished face": "Forundret ansigt",
    "Flushed face": "Blussende ansigt",
    "Sleeping face": "Sovende ansigt",
    "Dizzy face": "Svimmel ansigt",
    "Face without mouth": "Ansigt uden mund",
    "Face with medical mask": "Ansigt med medicinsk maske",

    // Line breaker
    "Break": "Afbrydelse",

    // Math
    "Subscript": "S\u00e6nket skrift",
    "Superscript": "H\u00e6vet skrift",

    // Full screen
    "Fullscreen": "Fuld sk\u00e6rm",

    // Horizontal line
    "Insert Horizontal Line": "Inds\u00e6t vandret linie",

    // Clear formatting
    "Clear Formatting": "Fjern formatering",

    // Undo, redo
    "Undo": "Fortryd",
    "Redo": "Genopret",

    // Select all
    "Select All": "V\u00e6lg alle",

    // Code view
    "Code View": "Kode visning",

    // Quote
    "Quote": "Citat",
    "Increase": "For\u00f8ge",
    "Decrease": "Mindsk"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * German
 */


$.FroalaEditor.LANGUAGE['de'] = {
  translation: {
    // Place holder
    "Type something": "Schreiben Sie etwas",

    // Basic formatting
    "Bold": "Fett",
    "Italic": "Kursiv",
    "Underline": "Unterstrichen",
    "Strikethrough": "Durchgestrichen",

    // Main buttons
    "Insert": "Einf\u00fcgen",
    "Delete": "L\u00f6schen",
    "Cancel": "Abbrechen",
    "OK": "Ok",
    "Back": "Zur\u00fcck",
    "Remove": "Entfernen",
    "More": "Mehr",
    "Update": "Aktualisierung",
    "Style": "Stil",

    // Font
    "Font Family": "Schriftart",
    "Font Size": "Schriftgr\u00f6\u00dfe",

    // Colors
    "Colors": "Farben",
    "Background": "Hintergrund",
    "Text": "Text",

    // Paragraphs
    "Paragraph Format": "Formate",
    "Normal": "Normal",
    "Code": "Quelltext",
    "Heading 1": "\u00dcberschrift 1",
    "Heading 2": "\u00dcberschrift 2",
    "Heading 3": "\u00dcberschrift 3",
    "Heading 4": "\u00dcberschrift 4",

    // Style
    "Paragraph Style": "Absatz-Stil",
    "Inline Style": "Inline-Stil",

    // Alignment
    "Align": "Ausrichtung",
    "Align Left": "Linksb\u00fcndig ausrichten",
    "Align Center": "Zentriert ausrichten",
    "Align Right": "Rechtsb\u00fcndig ausrichten",
    "Align Justify": "Blocksatz",
    "None": "Keine",

    // Lists
    "Ordered List": "Geordnete Liste",
    "Unordered List": "Ungeordnete Liste",

    // Indent
    "Decrease Indent": "Einzug Verkleinern",
    "Increase Indent": "Einzug Vergr\u00f6\u00dfern",

    // Links
    "Insert Link": "Link einf\u00fcgen",
    "Open in new tab": "In neuem Tab \u00f6ffnen",
    "Open Link": "Link \u00d6ffnen",
    "Edit Link": "Link Bearbeiten",
    "Unlink": "Link entfernen",
    "Choose Link": "Einen Link ausw\u00e4hlen",

    // Images
    "Insert Image": "Bild Einf\u00fcgen",
    "Upload Image": "Bild Hochladen",
    "By URL": "Von URL",
    "Browse": "Ordner",
    "Drop image": "Ziehen Sie ein Bild hierhin",
    "or click": "oder klicken Sie hier",
    "Manage Images": "Bilder Verwalten",
    "Loading": "Laden",
    "Deleting": "L\u00f6schen",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "Sind Sie sicher? Das Bild wird gel\u00f6scht.",
    "Replace": "Ersetzen",
    "Uploading": "Hochladen",
    "Loading image": "Das Bild wird geladen",
    "Display": "Textausrichtung",
    "Inline": "Mit Text in einer Zeile",
    "Break Text": "Text umbrechen",
    "Alternate Text": "Alternativtext",
    "Change Size": "Gr\u00f6\u00dfe \u00e4ndern",
    "Width": "Breite",
    "Height": "H\u00f6he",
    "Something went wrong. Please try again.": "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.",

    // Video
    "Insert Video": "Video einf\u00fcgen",
    "Embedded Code": "Eingebetteter Code",

    // Tables
    "Insert Table": "Tabelle einf\u00fcgen",
    "Header": "Kopfzeile",
    "Row": "Zeile",
    "Insert row above": "Neue Zeile davor einf\u00fcgen",
    "Insert row below": "Neue Zeile danach einf\u00fcgen",
    "Delete row": "Zeile l\u00f6schen",
    "Column": "Spalte",
    "Insert column before": "Neue Spalte davor einf\u00fcgen",
    "Insert column after": "Neue Spalte danach einf\u00fcgen",
    "Delete column": "Spalte l\u00f6schen",
    "Cell": "Zelle",
    "Merge cells": "Zelle verschmelzen",
    "Horizontal split": "Horizontal teilen",
    "Vertical split": "Vertikal teilen",
    "Cell Background": "Zellenhintergrund",
    "Vertical Align": "Vertikale Ausrichtung",
    "Top": "Oben",
    "Middle": "Zentriert",
    "Bottom": "Unten",
    "Align Top": "Oben ausrichten",
    "Align Middle": "Zentriert ausrichten",
    "Align Bottom": "Unten ausrichten",
    "Cell Style": "Zellen-Stil",

    // Files
    "Upload File": "Datei Hochladen",
    "Drop file": "Ziehen Sie eine Datei hierhin",

    // Emoticons
    "Emoticons": "Emoticons",
    "Grinning face": "Grinsendes Gesicht",
    "Grinning face with smiling eyes": "Grinsend Gesicht mit l\u00e4chelnden Augen",
    "Face with tears of joy": "Gesicht mit Tr\u00e4nen der Freude",
    "Smiling face with open mouth": "L\u00e4chelndes Gesicht mit offenem Mund",
    "Smiling face with open mouth and smiling eyes": "L\u00e4chelndes Gesicht mit offenem Mund und l\u00e4chelnden Augen",
    "Smiling face with open mouth and cold sweat": "L\u00e4chelndes Gesicht mit offenem Mund und kaltem Schwei\u00df",
    "Smiling face with open mouth and tightly-closed eyes": "L\u00e4chelndes Gesicht mit offenem Mund und fest geschlossenen Augen",
    "Smiling face with halo": "L\u00e4cheln Gesicht mit Heiligenschein",
    "Smiling face with horns": "L\u00e4cheln Gesicht mit H\u00f6rnern",
    "Winking face": "Zwinkerndes Gesicht",
    "Smiling face with smiling eyes": "L\u00e4chelndes Gesicht mit l\u00e4chelnden Augen",
    "Face savoring delicious food": "Gesicht leckeres Essen genie\u00dfend",
    "Relieved face": "Erleichtertes Gesicht",
    "Smiling face with heart-shaped eyes": "L\u00e4chelndes Gesicht mit herzf\u00f6rmigen Augen",
    "Smiling face with sunglasses": "L\u00e4chelndes Gesicht mit Sonnenbrille",
    "Smirking face": "Grinsendes Gesicht",
    "Neutral face": "Neutrales Gesicht",
    "Expressionless face": "Ausdrucksloses Gesicht",
    "Unamused face": "Genervtes Gesicht",
    "Face with cold sweat": "Gesicht mit kaltem Schwei\u00df",
    "Pensive face": "Nachdenkliches Gesicht",
    "Confused face": "Verwirrtes Gesicht",
    "Confounded face": "Elendes Gesicht",
    "Kissing face": "K\u00fcssendes Gesicht",
    "Face throwing a kiss": "Gesicht wirft einen Kuss",
    "Kissing face with smiling eyes": "K\u00fcssendes Gesicht mit l\u00e4chelnden Augen",
    "Kissing face with closed eyes": "K\u00fcssendes Gesicht mit geschlossenen Augen",
    "Face with stuck out tongue": "Gesicht mit herausgestreckter Zunge",
    "Face with stuck out tongue and winking eye": "Gesicht mit herausgestreckter Zunge und zwinkerndem Auge",
    "Face with stuck out tongue and tightly-closed eyes": "Gesicht mit herausgestreckter Zunge und fest geschlossenen Augen",
    "Disappointed face": "Entt\u00e4uschtes Gesicht",
    "Worried face": "Besorgtes Gesicht",
    "Angry face": "Ver\u00e4rgertes Gesicht",
    "Pouting face": "Schmollendes Gesicht",
    "Crying face": "Weinendes Gesicht",
    "Persevering face": "Ausharrendes Gesicht",
    "Face with look of triumph": "Gesicht mit triumphierenden Blick",
    "Disappointed but relieved face": "Entt\u00e4uschtes, aber erleichtertes Gesicht",
    "Frowning face with open mouth": "Entsetztes Gesicht mit offenem Mund",
    "Anguished face": "Gequ\u00e4ltes Gesicht",
    "Fearful face": "Angstvolles Gesicht",
    "Weary face": "M\u00fcdes Gesicht",
    "Sleepy face": "Schl\u00e4friges Gesicht",
    "Tired face": "G\u00e4hnendes Gesicht",
    "Grimacing face": "Grimassenschneidendes Gesicht",
    "Loudly crying face": "Laut weinendes Gesicht",
    "Face with open mouth": "Gesicht mit offenem Mund",
    "Hushed face": "Besorgtes Gesicht mit offenem Mund",
    "Face with open mouth and cold sweat": "Gesicht mit offenem Mund und kaltem Schwei\u00df",
    "Face screaming in fear": "Vor Angst schreiendes Gesicht",
    "Astonished face": "Erstauntes Gesicht",
    "Flushed face": "Ger\u00f6tetes Gesicht",
    "Sleeping face": "Schlafendes Gesicht",
    "Dizzy face": "Schwindliges Gesicht",
    "Face without mouth": "Gesicht ohne Mund",
    "Face with medical mask": "Gesicht mit Mundschutz",

    // Line breaker
    "Break": "Zeilenumbruch",

    // Math
    "Subscript": "Tiefgestellt",
    "Superscript": "Hochgestellt",

    // Full screen
    "Fullscreen": "Vollbild",

    // Horizontal line
    "Insert Horizontal Line": "Horizontale Linie Einf\u00fcgen",

    // Clear formatting
    "Clear Formatting": "Formatierung L\u00f6schen",

    // Undo, redo
    "Undo": "R\u00fcckg\u00e4ngig",
    "Redo": "Wiederholen",

    // Select all
    "Select All": "Alles ausw\u00e4hlen",

    // Code view
    "Code View": "Code-Ansicht",

    // Quote
    "Quote": "Zitieren",
    "Increase": "Vergr\u00f6\u00dfern",
    "Decrease": "Verkleinern"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * English spoken in Canada
 */


$.FroalaEditor.LANGUAGE['en_ca'] = {
  translation: {
    // Place holder
    "Type something": "Type something",

    // Basic formatting
    "Bold": "Bold",
    "Italic": "Italic",
    "Underline": "Underline",
    "Strikethrough": "Strikethrough",

    // Main buttons
    "Insert": "Insert",
    "Delete": "Delete",
    "Cancel": "Cancel",
    "OK": "OK",
    "Back": "Back",
    "Remove": "Remove",
    "More": "More",
    "Update": "Update",
    "Style": "Style",

    // Font
    "Font Family": "Font Family",
    "Font Size": "Font Size",

    // Colors
    "Colors": "Colours",
    "Background": "Background",
    "Text": "Text",

    // Paragraphs
    "Paragraph Format": "Paragraph Format",
    "Normal": "Normal",
    "Code": "Code",
    "Heading 1": "Heading 1",
    "Heading 2": "Heading 2",
    "Heading 3": "Heading 3",
    "Heading 4": "Heading 4",

    // Style
    "Paragraph Style": "Paragraph Style",
    "Inline Style": "Inline Style",

    // Alignment
    "Align": "Align",
    "Align Left": "Align Left",
    "Align Center": "Align Centre",
    "Align Right": "Alight Right",
    "Align Justify": "Align Justify",
    "None": "None",

    // Lists
    "Ordered List": "Ordered List",
    "Unordered List": "Unordered List",

    // Indent
    "Decrease Indent": "Decrease Indent",
    "Increase Indent": "Increase Indent",

    // Links
    "Insert Link": "Insert Link",
    "Open in new tab": "Open in new tab",
    "Open Link": "Open Link",
    "Edit Link": "Edit Link",
    "Unlink": "Unlink",
    "Choose Link": "Choose Link",

    // Images
    "Insert Image": "Insert Image",
    "Upload Image": "Upload Image",
    "By URL": "By URL",
    "Browse": "Browse",
    "Drop image": "Drop image",
    "or click": "or click",
    "Manage Images": "Manage Images",
    "Loading": "Loading",
    "Deleting": "Deleting",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "Are you sure? Image will be deleted.",
    "Replace": "Replace",
    "Uploading": "Uploading",
    "Loading image": "Loading image",
    "Display": "Display",
    "Inline": "Inline",
    "Break Text": "Break Text",
    "Alternate Text": "Alternate Text",
    "Change Size": "Change Size",
    "Width": "Width",
    "Height": "Height",
    "Something went wrong. Please try again.": "Something went wrong. Please try again.",

    // Video
    "Insert Video": "Insert Video",
    "Embedded Code": "Embedded Code",

    // Tables
    "Insert Table": "Insert Table",
    "Header": "Header",
    "Row": "Row",
    "Insert row above": "Insert row above",
    "Insert row below": "Insert row below",
    "Delete row": "Delete row",
    "Column": "Column",
    "Insert column before": "Insert column before",
    "Insert column after": "Insert column after",
    "Delete column": "Delete column",
    "Cell": "Cell",
    "Merge cells": "Merge cells",
    "Horizontal split": "Horizontal split",
    "Vertical split": "Vertical split",
    "Cell Background": "Cell Background",
    "Vertical Align": "Vertical Align",
    "Top": "Top",
    "Middle": "Middle",
    "Bottom": "Bottom",
    "Align Top": "Align Top",
    "Align Middle": "Align Middle",
    "Align Bottom": "Align Bottom",
    "Cell Style": "Cell Style",

    // Files
    "Upload File": "Upload File",
    "Drop file": "Drop file",

    // Emoticons
    "Emoticons": "Emoticons",

    // Line breaker
    "Break": "Break",

    // Math
    "Subscript": "Subscript",
    "Superscript": "Superscript",

    // Full screen
    "Fullscreen": "Fullscreen",

    // Horizontal line
    "Insert Horizontal Line": "Insert Horizontal Line",

    // Clear formatting
    "Clear Formatting": "Cell Formatting",

    // Undo, redo
    "Undo": "Undo",
    "Redo": "Redo",

    // Select all
    "Select All": "Select All",

    // Code view
    "Code View": "Code View",

    // Quote
    "Quote": "Quote",
    "Increase": "Increase",
    "Decrease": "Decrease"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * English spoken in Great Britain
 */


$.FroalaEditor.LANGUAGE['en_gb'] = {
  translation: {
    // Place holder
    "Type something": "Type something",

    // Basic formatting
    "Bold": "Bold",
    "Italic": "Italic",
    "Underline": "Underline",
    "Strikethrough": "Strikethrough",

    // Main buttons
    "Insert": "Insert",
    "Delete": "Delete",
    "Cancel": "Cancel",
    "OK": "OK",
    "Back": "Back",
    "Remove": "Remove",
    "More": "More",
    "Update": "Update",
    "Style": "Style",

    // Font
    "Font Family": "Font Family",
    "Font Size": "Font Size",

    // Colors
    "Colors": "Colours",
    "Background": "Background",
    "Text": "Text",

    // Paragraphs
    "Paragraph Format": "Paragraph Format",
    "Normal": "Normal",
    "Code": "Code",
    "Heading 1": "Heading 1",
    "Heading 2": "Heading 2",
    "Heading 3": "Heading 3",
    "Heading 4": "Heading 4",

    // Style
    "Paragraph Style": "Paragraph Style",
    "Inline Style": "Inline Style",

    // Alignment
    "Align": "Align",
    "Align Left": "Align Left",
    "Align Center": "Align Centre",
    "Align Right": "Alight Right",
    "Align Justify": "Align Justify",
    "None": "None",

    // Lists
    "Ordered List": "Ordered List",
    "Unordered List": "Unordered List",

    // Indent
    "Decrease Indent": "Decrease Indent",
    "Increase Indent": "Increase Indent",

    // Links
    "Insert Link": "Insert Link",
    "Open in new tab": "Open in new tab",
    "Open Link": "Open Link",
    "Edit Link": "Edit Link",
    "Unlink": "Unlink",
    "Choose Link": "Choose Link",

    // Images
    "Insert Image": "Insert Image",
    "Upload Image": "Upload Image",
    "By URL": "By URL",
    "Browse": "Browse",
    "Drop image": "Drop image",
    "or click": "or click",
    "Manage Images": "Manage Images",
    "Loading": "Loading",
    "Deleting": "Deleting",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "Are you sure? Image will be deleted.",
    "Replace": "Replace",
    "Uploading": "Uploading",
    "Loading image": "Loading image",
    "Display": "Display",
    "Inline": "Inline",
    "Break Text": "Break Text",
    "Alternate Text": "Alternate Text",
    "Change Size": "Change Size",
    "Width": "Width",
    "Height": "Height",
    "Something went wrong. Please try again.": "Something went wrong. Please try again.",

    // Video
    "Insert Video": "Insert Video",
    "Embedded Code": "Embedded Code",

    // Tables
    "Insert Table": "Insert Table",
    "Header": "Header",
    "Row": "Row",
    "Insert row above": "Insert row above",
    "Insert row below": "Insert row below",
    "Delete row": "Delete row",
    "Column": "Column",
    "Insert column before": "Insert column before",
    "Insert column after": "Insert column after",
    "Delete column": "Delete column",
    "Cell": "Cell",
    "Merge cells": "Merge cells",
    "Horizontal split": "Horizontal split",
    "Vertical split": "Vertical split",
    "Cell Background": "Cell Background",
    "Vertical Align": "Vertical Align",
    "Top": "Top",
    "Middle": "Middle",
    "Bottom": "Bottom",
    "Align Top": "Align Top",
    "Align Middle": "Align Middle",
    "Align Bottom": "Align Bottom",
    "Cell Style": "Cell Style",

    // Files
    "Upload File": "Upload File",
    "Drop file": "Drop file",

    // Emoticons
    "Emoticons": "Emoticons",

    // Line breaker
    "Break": "Break",

    // Math
    "Subscript": "Subscript",
    "Superscript": "Superscript",

    // Full screen
    "Fullscreen": "Fullscreen",

    // Horizontal line
    "Insert Horizontal Line": "Insert Horizontal Line",

    // Clear formatting
    "Clear Formatting": "Cell Formatting",

    // Undo, redo
    "Undo": "Undo",
    "Redo": "Redo",

    // Select all
    "Select All": "Select All",

    // Code view
    "Code View": "Code View",

    // Quote
    "Quote": "Quote",
    "Increase": "Increase",
    "Decrease": "Decrease"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Spanish
 */


$.FroalaEditor.LANGUAGE['es'] = {
  translation: {
    // Place holder
    "Type something": "Escriba algo",

    // Basic formatting
    "Bold": "Negrita",
    "Italic": "It\u00e1lica",
    "Underline": "Subrayado",
    "Strikethrough": "Tachado",

    // Main buttons
    "Insert": "Insertar",
    "Delete": "Borrar",
    "Cancel": "Cancelar",
    "OK": "Ok",
    "Back": "Atr\u00e1s",
    "Remove": "Quitar",
    "More": "M\u00e1s",
    "Update": "Actualizaci\u00f3n",
    "Style": "",

    // Font
    "Font Family": "Familia de fuentes",
    "Font Size": "Tama\u00f1o de fuente",

    // Colors
    "Colors": "Colores",
    "Background": "Fondo",
    "Text": "Texto",

    // Paragraphs
    "Paragraph Format": "Formato de p\u00e1rrafo",
    "Normal": "Normal",
    "Code": "C\u00f3digo",
    "Heading 1": "Encabezado 1",
    "Heading 2": "Encabezado 2",
    "Heading 3": "Encabezado 3",
    "Heading 4": "Encabezado 4",

    // Style
    "Paragraph Style": "Estilo de p\u00e1rrafo",
    "Inline Style": "Estilo en l\u00ednea",

    // Alignment
    "Align": "Alinear",
    "Align Left": "Alinear a la izquierda",
    "Align Center": "Alinear al centro",
    "Align Right": "Alinear a la derecha",
    "Align Justify": "Justificar",
    "None": "Ninguno",

    // Lists
    "Ordered List": "Lista ordenada",
    "Unordered List": "Lista desordenada",

    // Indent
    "Decrease Indent": "Reducir sangr\u00eda",
    "Increase Indent": "Aumentar sangr\u00eda",

    // Links
    "Insert Link": "Insertar enlace",
    "Open in new tab": "Abrir en una nueva pesta\u00F1a",
    "Open Link": "Abrir enlace",
    "Edit Link": "Editar enlace",
    "Unlink": "Quitar enlace",
    "Choose Link": "Elegir enlace",

    // Images
    "Insert Image": "Insertar imagen",
    "Upload Image": "Cargar imagen",
    "By URL": "Por URL",
    "Browse": "Examinar",
    "Drop image": "Soltar la imagen",
    "or click": "o haga clic en",
    "Manage Images": "Administrar im\u00e1genes",
    "Loading": "Cargando",
    "Deleting": "Borrado",
    "Tags": "Etiquetas",
    "Are you sure? Image will be deleted.": "\u00bfEst\u00e1 seguro? Imagen ser\u00e1 borrada.",
    "Replace": "Reemplazar",
    "Uploading": "Carga",
    "Loading image": "Cargando imagen",
    "Display": "Mostrar",
    "Inline": "En l\u00ednea",
    "Break Text": "Romper texto",
    "Alternate Text": "Texto alternativo",
    "Change Size": "Cambiar tama\u00f1o",
    "Width": "Ancho",
    "Height": "Altura",
    "Something went wrong. Please try again.": "Algo sali\u00f3 mal. Por favor, vuelva a intentarlo.",

    // Video
    "Insert Video": "Insertar video",
    "Embedded Code": "C\u00f3digo incrustado",

    // Tables
    "Insert Table": "Insertar tabla",
    "Header": "Encabezamiento",
    "Row": "Fila",
    "Insert row above": "Insertar fila antes",
    "Insert row below": "Insertar fila despu\u00e9s",
    "Delete row": "Eliminar fila",
    "Column": "Columna",
    "Insert column before": "Insertar columna antes",
    "Insert column after": "Insertar columna despu\u00e9s",
    "Delete column": "Eliminar columna",
    "Cell": "Celda",
    "Merge cells": "Combinar celdas",
    "Horizontal split": "Divisi\u00f3n horizontal",
    "Vertical split": "Divisi\u00f3n vertical",
    "Cell Background": "Fondo de la celda",
    "Vertical Align": "Alinear Vertical",
    "Top": "Cima",
    "Middle": "Medio",
    "Bottom": "Del fondo",
    "Align Top": "Alinear a la parte superior",
    "Align Middle": "Alinear media",
    "Align Bottom": "Alinear abajo",
    "Cell Style": "Estilo de celda",

    // Files
    "Upload File": "Subir archivo",
    "Drop file": "Soltar archivo",

    // Emoticons
    "Emoticons": "Emoticones",
    "Grinning face": "Sonriendo cara",
    "Grinning face with smiling eyes": "Sonriendo cara con ojos sonrientes",
    "Face with tears of joy": "Cara con l\u00e1grimas de alegr\u00eda",
    "Smiling face with open mouth": "Cara sonriente con la boca abierta",
    "Smiling face with open mouth and smiling eyes": "Cara sonriente con la boca abierta y los ojos sonrientes",
    "Smiling face with open mouth and cold sweat": "Cara sonriente con la boca abierta y el sudor fr\u00edo",
    "Smiling face with open mouth and tightly-closed eyes": "Cara sonriente con la boca abierta y los ojos fuertemente cerrados",
    "Smiling face with halo": "Cara sonriente con halo",
    "Smiling face with horns": "Cara sonriente con cuernos",
    "Winking face": "Gui\u00f1o de la cara",
    "Smiling face with smiling eyes": "Cara sonriente con ojos sonrientes",
    "Face savoring delicious food": "Care saborear una deliciosa comida",
    "Relieved face": "Cara Aliviado",
    "Smiling face with heart-shaped eyes": "Cara sonriente con los ojos en forma de coraz\u00f3n",
    "Smiling face with sunglasses": "Cara sonriente con gafas de sol",
    "Smirking face": "Sonriendo cara",
    "Neutral face": "Cara neutral",
    "Expressionless face": "Rostro inexpresivo",
    "Unamused face": "Cara no divertido",
    "Face with cold sweat": "Cara con sudor fr\u00edo",
    "Pensive face": "Rostro pensativo",
    "Confused face": "Cara confusa",
    "Confounded face": "Cara Averg\u00fc\u00e9ncense",
    "Kissing face": "Besar la cara",
    "Face throwing a kiss": "Cara lanzando un beso",
    "Kissing face with smiling eyes": "Besar a cara con ojos sonrientes",
    "Kissing face with closed eyes": "Besar a cara con los ojos cerrados",
    "Face with stuck out tongue": "Cara con la lengua pegada",
    "Face with stuck out tongue and winking eye": "Cara con pegado a la lengua y los ojos gui\u00f1o",
    "Face with stuck out tongue and tightly-closed eyes": "Cara con la lengua pegada a y los ojos fuertemente cerrados",
    "Disappointed face": "Cara decepcionado",
    "Worried face": "Cara de preocupaci\u00f3n",
    "Angry face": "Cara enojada",
    "Pouting face": "Que pone mala cara",
    "Crying face": "Cara llorando",
    "Persevering face": "Perseverar cara",
    "Face with look of triumph": "Cara con expresi\u00f3n de triunfo",
    "Disappointed but relieved face": "Decepcionado pero el rostro aliviado",
    "Frowning face with open mouth": "Con el ce\u00f1o fruncido la cara con la boca abierta",
    "Anguished face": "Rostro angustiado",
    "Fearful face": "Cara Temeroso",
    "Weary face": "Rostro cansado",
    "Sleepy face": "Rostro so\u00f1oliento",
    "Tired face": "Rostro cansado",
    "Grimacing face": "Haciendo una mueca cara",
    "Loudly crying face": "Llorando en voz alta la cara",
    "Face with open mouth": "Cara con la boca abierta",
    "Hushed face": "Cara callada",
    "Face with open mouth and cold sweat": "Cara con la boca abierta y el sudor frío",
    "Face screaming in fear": "Cara gritando de miedo",
    "Astonished face": "Cara asombrosa",
    "Flushed face": "Cara enrojecida",
    "Sleeping face": "Rostro dormido",
    "Dizzy face": "Cara Mareado",
    "Face without mouth": "Cara sin boca",
    "Face with medical mask": "Cara con la m\u00e1scara m\u00e9dica",

    // Line breaker
    "Break": "Romper",

    // Math
    "Subscript": "Sub\u00edndice",
    "Superscript": "Super\u00edndice",

    // Full screen
    "Fullscreen": "Pantalla completa",

    // Horizontal line
    "Insert Horizontal Line": "Insertar l\u00ednea horizontal",

    // Clear formatting
    "Clear Formatting": "Quitar el formato",

    // Undo, redo
    "Undo": "Deshacer",
    "Redo": "Rehacer",

    // Select all
    "Select All": "Seleccionar todo",

    // Code view
    "Code View": "Vista de c\u00f3digo",

    // Quote
    "Quote": "Cita",
    "Increase": "Aumentar",
    "Decrease": "Disminuci\u00f3n"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Estonian
 */


$.FroalaEditor.LANGUAGE['et'] = {
  translation: {
    // Place holder
    "Type something": "Kirjuta midagi",

    // Basic formatting
    "Bold": "Rasvane",
    "Italic": "Kursiiv",
    "Underline": "Allajoonitud",
    "Strikethrough": "L\u00e4bikriipsutatud",

    // Main buttons
    "Insert": "Lisa",
    "Delete": "Kustuta",
    "Cancel": "T\u00fchista",
    "OK": "OK",
    "Back": "Tagasi",
    "Remove": "Eemaldama",
    "More": "Rohkem",
    "Update": "Ajakohastama",
    "Style": "Stiil",

    // Font
    "Font Family": "Fondi perekond",
    "Font Size": "Fondi suurus",

    // Colors
    "Colors": "V\u00e4rvid",
    "Background": "Taust",
    "Text": "Tekst",

    // Paragraphs
    "Paragraph Format": "Paragrahv formaat",
    "Normal": "Normaalne",
    "Code": "Kood",
    "Heading 1": "P\u00e4is 1",
    "Heading 2": "P\u00e4is 2",
    "Heading 3": "P\u00e4is 3",
    "Heading 4": "P\u00e4is 4",

    // Style
    "Paragraph Style": "Paragrahv stiil",
    "Inline Style": "J\u00e4rjekorras stiil",

    // Alignment
    "Align": "Joonda",
    "Align Left": "Joonda vasakule",
    "Align Center": "Joonda keskele",
    "Align Right": "Joonda paremale",
    "Align Justify": "R\u00f6\u00f6pjoondus",
    "None": "Mitte \u00fckski",

    // Lists
    "Ordered List": "Tellitud nimekirja",
    "Unordered List": "Tavalise nimekirja",

    // Indent
    "Decrease Indent": "V\u00e4henemine taane",
    "Increase Indent": "Suurenda taanet",

    // Links
    "Insert Link": "Lisa link",
    "Open in new tab": "Ava uues sakis",
    "Open Link": "Avatud link",
    "Edit Link": "Muuda link",
    "Unlink": "Eemalda link",
    "Choose Link": "Vali link",

    // Images
    "Insert Image": "Lisa pilt",
    "Upload Image": "Laadige pilt",
    "By URL": "Poolt URL",
    "Browse": "sirvida",
    "Drop image": "Aseta pilt",
    "or click": "v\u00f5i kliki",
    "Manage Images": "Halda pilte",
    "Loading": "Laadimine",
    "Deleting": "Kustutamine",
    "Tags": "Sildid",
    "Are you sure? Image will be deleted.": "Oled sa kindel? Pilt kustutatakse.",
    "Replace": "Asendama",
    "Uploading": "Laadimise pilti",
    "Loading image": "Laadimise pilti",
    "Display": "Kuvama",
    "Inline": "J\u00e4rjekorras",
    "Break Text": "Murdma teksti",
    "Alternate Text": "Asendusliikme teksti",
    "Change Size": "Muuda suurust",
    "Width": "Laius",
    "Height": "K\u00f5rgus",
    "Something went wrong. Please try again.": "Midagi l\u00e4ks valesti. Palun proovi uuesti.",

    // Video
    "Insert Video": "Lisa video",
    "Embedded Code": "Varjatud koodi",

    // Tables
    "Insert Table": "Sisesta tabel",
    "Header": "P\u00e4ise kaudu",
    "Row": "Rida",
    "Insert row above": "Sisesta rida \u00fcles",
    "Insert row below": "Sisesta rida alla",
    "Delete row": "Kustuta rida",
    "Column": "Veerg",
    "Insert column before": "Sisesta veerg ette",
    "Insert column after": "Sisesta veerg j\u00e4rele",
    "Delete column": "Kustuta veerg",
    "Cell": "Lahter",
    "Merge cells": "\u00fchenda lahtrid",
    "Horizontal split": "Poolita horisontaalselt",
    "Vertical split": "Poolita vertikaalselt",
    "Cell Background": "Lahter tausta",
    "Vertical Align": "Vertikaalne joonda",
    "Top": "\u00fclemine",
    "Middle": "Keskmine",
    "Bottom": "P\u00f5hi",
    "Align Top": "Joonda \u00fclemine",
    "Align Middle": "Joonda keskmine",
    "Align Bottom": "Joonda P\u00f5hi",
    "Cell Style": "Lahter stiili",

    // Files
    "Upload File": "Lae fail \u00fcles",
    "Drop file": "Aseta fail",

    // Emoticons
    "Emoticons": "Emotikonid",
    "Grinning face": "Irvitas n\u00e4kku",
    "Grinning face with smiling eyes": "Irvitas n\u00e4kku naeratavad silmad",
    "Face with tears of joy": "N\u00e4gu r\u00f5\u00f5mupisaratega",
    "Smiling face with open mouth": "Naeratav n\u00e4gu avatud suuga",
    "Smiling face with open mouth and smiling eyes": "Naeratav n\u00e4gu avatud suu ja naeratavad silmad",
    "Smiling face with open mouth and cold sweat": "Naeratav n\u00e4gu avatud suu ja k\u00fclm higi",
    "Smiling face with open mouth and tightly-closed eyes": "Naeratav n\u00e4gu avatud suu ja tihedalt suletud silmad",
    "Smiling face with halo": "Naeratav n\u00e4gu halo",
    "Smiling face with horns": "Naeratav n\u00e4gu sarved",
    "Winking face": "Pilgutab n\u00e4gu",
    "Smiling face with smiling eyes": "Naeratav n\u00e4gu naeratab silmad",
    "Face savoring delicious food": "N\u00e4gu nautides maitsvat toitu",
    "Relieved face": "P\u00e4\u00e4stetud n\u00e4gu",
    "Smiling face with heart-shaped eyes": "Naeratav n\u00e4gu s\u00fcdajas silmad",
    "Smiling face with sunglasses": "Naeratav n\u00e4gu p\u00e4ikeseprillid",
    "Smirking face": "Muigama n\u00e4gu ",
    "Neutral face": "Neutraalne n\u00e4gu",
    "Expressionless face": "Ilmetu n\u00e4gu",
    "Unamused face": "Morn n\u00e4gu",
    "Face with cold sweat": "N\u00e4gu k\u00fclma higiga",
    "Pensive face": "M\u00f5tlik n\u00e4gu",
    "Confused face": "Segaduses n\u00e4gu",
    "Confounded face": "Segas n\u00e4gu",
    "Kissing face": "Suudlevad n\u00e4gu",
    "Face throwing a kiss": "N\u00e4gu viskamine suudlus",
    "Kissing face with smiling eyes": "Suudlevad n\u00e4gu naeratab silmad",
    "Kissing face with closed eyes": "Suudlevad n\u00e4gu, silmad kinni",
    "Face with stuck out tongue": "N\u00e4gu ummikus v\u00e4lja keele",
    "Face with stuck out tongue and winking eye": "N\u00e4gu ummikus v\u00e4lja keele ja silma pilgutav silma",
    "Face with stuck out tongue and tightly-closed eyes": "N\u00e4gu ummikus v\u00e4lja keele ja silmad tihedalt suletuna",
    "Disappointed face": "Pettunud n\u00e4gu",
    "Worried face": "Mures n\u00e4gu",
    "Angry face": "Vihane n\u00e4gu",
    "Pouting face": "Tursik n\u00e4gu",
    "Crying face": "Nutt n\u00e4gu",
    "Persevering face": "Püsiv n\u00e4gu",
    "Face with look of triumph": "N\u00e4gu ilme triumf",
    "Disappointed but relieved face": "Pettunud kuid vabastati n\u00e4gu",
    "Frowning face with open mouth": "Kulmukortsutav n\u00e4gu avatud suuga",
    "Anguished face": "Ahastavad n\u00e4gu",
    "Fearful face": "Hirmunult n\u00e4gu",
    "Weary face": "Grimasse",
    "Sleepy face": "Unine n\u00e4gu",
    "Tired face": "V\u00e4sinud n\u00e4gu",
    "Grimacing face": "Grimassitavaks n\u00e4gu",
    "Loudly crying face": "Valjusti nutma n\u00e4gu",
    "Face with open mouth": "N\u00e4gu avatud suuga",
    "Hushed face": "Raskel n\u00e4gu",
    "Face with open mouth and cold sweat": "N\u00e4gu avatud suu ja k\u00fclm higi",
    "Face screaming in fear": "N\u00e4gu karjuvad hirm",
    "Astonished face": "Lummatud n\u00e4gu",
    "Flushed face": "Punetav n\u00e4gu",
    "Sleeping face": "Uinuv n\u00e4gu",
    "Dizzy face": "Uimane n\u00fcgu",
    "Face without mouth": "N\u00e4gu ilma suu",
    "Face with medical mask": "N\u00e4gu meditsiinilise mask",

    // Line breaker
    "Break": "Murdma",

    // Math
    "Subscript": "Allindeks",
    "Superscript": "\u00dclaindeks",

    // Full screen
    "Fullscreen": "T\u00e4isekraanil",

    // Horizontal line
    "Insert Horizontal Line": "Sisesta horisontaalne joon",

    // Clear formatting
    "Clear Formatting": "Eemalda formaatimine",

    // Undo, redo
    "Undo": "V\u00f5ta tagasi",
    "Redo": "Tee uuesti",

    // Select all
    "Select All": "Vali k\u00f5ik",

    // Code view
    "Code View": "Koodi vaadata",

    // Quote
    "Quote": "Tsitaat",
    "Increase": "Suurendama",
    "Decrease": "V\u00e4henda"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Persian
 */


$.FroalaEditor.LANGUAGE['fa'] = {
  translation: {
    // Place holder
    "Type something": "\u0686\u06cc\u0632\u06cc \u0628\u0646\u0648\u06cc\u0633\u06cc\u062f",

    // Basic formatting
    "Bold": "\u062f\u0631\u0634\u062a",
    "Italic": "\u062e\u0637 \u06a9\u062c",
    "Underline": "\u062e\u0637 \u0632\u06cc\u0631",
    "Strikethrough": "\u062e\u0637 \u062e\u0648\u0631\u062f\u0647",

    // Main buttons
    "Insert": "\u0627\u0636\u0627\u0641\u0647 \u06a9\u0631\u062f\u0646",
    "Delete": "\u062d\u0630\u0641 \u06a9\u0631\u062f\u0646",
    "Cancel": "\u0644\u063a\u0648",
    "OK": "\u0628\u0627\u0634\u0647",
    "Back": "\u0628\u0647 \u0639\u0642\u0628",
    "Remove": "\u0628\u0631\u062f\u0627\u0634\u062a\u0646",
    "More": "\u0628\u06cc\u0634\u062a\u0631",
    "Update": "\u0628\u0647 \u0631\u0648\u0632 \u0631\u0633\u0627\u0646\u06cc",
    "Style": "\u0633\u0628\u06a9",

    // Font
    "Font Family": "\u0641\u0648\u0646\u062a",
    "Font Size": "\u0627\u0646\u062f\u0627\u0632\u0647 \u0641\u0648\u0646\u062a",

    // Colors
    "Colors": "\u0631\u0646\u06af",
    "Background": "\u0632\u0645\u06cc\u0646\u0647 \u0645\u062a\u0646",
    "Text": "\u0645\u062a\u0646",

    // Paragraphs
    "Paragraph Format": "\u0642\u0627\u0644\u0628",
    "Normal": "\u0637\u0628\u06cc\u0639\u06cc - Normal",
    "Code": "\u062f\u0633\u062a\u0648\u0631\u0627\u0644\u0639\u0645\u0644\u0647\u0627 - Code",
    "Heading 1": "\u0633\u0631\u200c\u0635\u0641\u062d\u0647 1",
    "Heading 2": "\u0633\u0631\u200c\u0635\u0641\u062d\u0647 2",
    "Heading 3": "\u0633\u0631\u200c\u0635\u0641\u062d\u0647 3",
    "Heading 4": "\u0633\u0631\u200c\u0635\u0641\u062d\u0647 4",

    // Style
    "Paragraph Style": "\u067e\u0627\u0631\u0627\u06af\u0631\u0627\u0641 \u0633\u0628\u06a9",
    "Inline Style": "\u062e\u0637\u06cc \u0633\u0628\u06a9",

    // Alignment
    "Align": "\u0631\u062f\u06cc\u0641 \u0628\u0646\u062f\u06cc \u0646\u0648\u0634\u062a\u0647",
    "Align Left": "\u0686\u067e \u0686\u06cc\u0646",
    "Align Center": "\u0648\u0633\u0637 \u0686\u06cc\u0646",
    "Align Right": "\u0631\u0627\u0633\u062a \u0686\u06cc\u0646",
    "Align Justify": "\u0645\u0633\u0627\u0648\u06cc \u0627\u0632 \u0637\u0631\u0641\u06cc\u0646",
    "None": "\u0647\u06cc\u0686",

    // Lists
    "Ordered List": "\u0644\u06cc\u0633\u062a \u0634\u0645\u0627\u0631\u0647 \u0627\u06cc",
    "Unordered List": "\u0644\u06cc\u0633\u062a \u062f\u0627\u06cc\u0631\u0647 \u0627\u06cc",

    // Indent
    "Decrease Indent": "\u06a9\u0627\u0647\u0634 \u062a\u0648 \u0631\u0641\u062a\u06af\u06cc",
    "Increase Indent": "\u0627\u0641\u0632\u0627\u06cc\u0634 \u062a\u0648 \u0631\u0641\u062a\u06af\u06cc",

    // Links
    "Insert Link": "\u0627\u0636\u0627\u0641\u0647 \u06a9\u0631\u062f\u0646 \u0644\u06cc\u0646\u06a9",
    "Open in new tab": "\u0628\u0627\u0632 \u06a9\u0631\u062f\u0646 \u062f\u0631 \u0628\u0631\u06af\u0647 \u062c\u062f\u06cc\u062f",
    "Open Link": "\u0644\u06cc\u0646\u06a9 \u0647\u0627\u06cc \u0628\u0627\u0632",
    "Edit Link": "\u0644\u06cc\u0646\u06a9 \u0648\u06cc\u0631\u0627\u06cc\u0634",
    "Unlink": "\u062d\u0630\u0641 \u0644\u06cc\u0646\u06a9",
    "Choose Link": "\u0644\u06cc\u0646\u06a9 \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f",

    // Images
    "Insert Image": "\u0627\u0636\u0627\u0641\u0647 \u06a9\u0631\u062f\u0646 \u062a\u0635\u0648\u06cc\u0631",
    "Upload Image": "\u0622\u067e\u0644\u0648\u062f \u062a\u0635\u0648\u06cc\u0631",
    "By URL": "URL \u062a\u0648\u0633\u0637",
    "Browse": "\u0641\u0647\u0631\u0633\u062a",
    "Drop image": "\u0642\u0637\u0631\u0647 \u062a\u0635\u0648\u06cc\u0631",
    "or click": "\u06cc\u0627 \u06a9\u0644\u06cc\u06a9 \u06a9\u0646\u06cc\u062f",
    "Manage Images": "\u0645\u062f\u06cc\u0631\u06cc\u062a \u062a\u0635\u0627\u0648\u06cc\u0631",
    "Loading": "\u0628\u0627\u0631\u06af\u06cc\u0631\u06cc",
    "Deleting": "\u062d\u0630\u0641",
    "Tags": "\u0628\u0631\u0686\u0633\u0628 \u0647\u0627",
    "Are you sure? Image will be deleted.": ".\u0622\u06cc\u0627 \u0645\u0637\u0645\u0626\u0646 \u0647\u0633\u062a\u06cc\u062f\u061f \u062a\u0635\u0648\u06cc\u0631 \u062d\u0630\u0641 \u062e\u0648\u0627\u0647\u062f \u0634\u062f",
    "Replace": "\u062c\u0627\u06cc\u06af\u0632\u06cc\u0646 \u06a9\u0631\u062f\u0646",
    "Uploading": "\u0622\u067e\u0644\u0648\u062f",
    "Loading image": "\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u062a\u0635\u0648\u06cc\u0631",
    "Display": "\u0646\u0634\u0627\u0646 \u062f\u0627\u062f\u0646",
    "Inline": "\u062e\u0637\u06cc",
    "Break Text": "\u0634\u06a9\u0633\u062a\u0646 \u0627\u0633\u062a\u0631\u0627\u062d\u062a",
    "Alternate Text": "\u0645\u062a\u0646 \u062c\u0627\u06cc\u06af\u0632\u06cc\u0646",
    "Change Size": "\u062a\u063a\u06cc\u06cc\u0631 \u0627\u0646\u062f\u0627\u0632\u0647",
    "Width": "\u0639\u0631\u0636",
    "Height": "\u0627\u0631\u062a\u0641\u0627\u0639",
    "Something went wrong. Please try again.": "\u0686\u06cc\u0632\u06cc \u0631\u0627 \u0627\u0634\u062a\u0628\u0627\u0647 \u0631\u0641\u062a\u002e \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u062a\u0644\u0627\u0634 \u06a9\u0646\u06cc\u062f\u002e",

    // Video
    "Insert Video": "\u0627\u0636\u0627\u0641\u0647 \u06a9\u0631\u062f\u0646 \u0641\u0627\u06cc\u0644 \u062a\u0635\u0648\u06cc\u0631\u06cc",
    "Embedded Code": "\u06a9\u062f \u062c\u0627\u0633\u0627\u0632\u06cc \u0634\u062f\u0647",

    // Tables
    "Insert Table": "\u0627\u0636\u0627\u0641\u0647 \u06a9\u0631\u062f\u0646 \u062c\u062f\u0648\u0644",
    "Header": "\u0633\u0631\u0628\u0631\u06af",
    "Row": "\u0633\u0637\u0631",
    "Insert row above": "\u062f\u0631\u062c \u0631\u062f\u06cc\u0641 \u062f\u0631 \u0628\u0627\u0644\u0627",
    "Insert row below": "\u0633\u0637\u0631 \u0632\u06cc\u0631 \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f",
    "Delete row": "\u062d\u0630\u0641 \u0633\u0637\u0631",
    "Column": "\u0633\u062a\u0648\u0646",
    "Insert column before": "\u062f\u0631\u062c \u0633\u062a\u0648\u0646 \u0642\u0628\u0644",
    "Insert column after": "\u062f\u0631\u062c \u0633\u062a\u0648\u0646 \u0628\u0639\u062f",
    "Delete column": "\u062d\u0630\u0641 \u0633\u062a\u0648\u0646",
    "Cell": "\u0633\u0644\u0648\u0644",
    "Merge cells": "\u0627\u062f\u063a\u0627\u0645 \u0633\u0644\u0648\u0644\u200c\u0647\u0627",
    "Horizontal split": "\u062a\u0642\u0633\u06cc\u0645 \u0627\u0641\u0642\u06cc",
    "Vertical split": "\u062a\u0642\u0633\u06cc\u0645 \u0639\u0645\u0648\u062f\u06cc",
    "Cell Background": "\u067e\u0633 \u0632\u0645\u06cc\u0646\u0647 \u0647\u0645\u0631\u0627\u0647",
    "Vertical Align": "\u0631\u062f\u06cc\u0641 \u0639\u0645\u0648\u062f\u06cc",
    "Top": "\u0628\u0627\u0644\u0627",
    "Middle": "\u0645\u062a\u0648\u0633\u0637",
    "Bottom": "\u067e\u0627\u06cc\u06cc\u0646",
    "Align Top": "\u062a\u0631\u0627\u0632 \u0628\u0627\u0644\u0627\u06cc",
    "Align Middle": "\u062a\u0631\u0627\u0632 \u0648\u0633\u0637",
    "Align Bottom": "\u062a\u0631\u0627\u0632 \u067e\u0627\u06cc\u06cc\u0646",
    "Cell Style": "\u0633\u0628\u06a9 \u0647\u0627\u06cc \u0647\u0645\u0631\u0627\u0647",

    // Files
    "Upload File": "\u0622\u067e\u0644\u0648\u062f \u0641\u0627\u06cc\u0644",
    "Drop file": "\u0627\u0641\u062a \u0641\u0627\u06cc\u0644",

    // Emoticons
    "Emoticons": "\u0634\u06a9\u0644\u06a9 \u0647\u0627",
    "Grinning face": "\u0686\u0647\u0631\u0647 \u067e\u0648\u0632\u062e\u0646\u062f",
    "Grinning face with smiling eyes": "\u0686\u0647\u0631\u0647 \u067e\u0648\u0632\u062e\u0646\u062f \u0628\u0627 \u0686\u0634\u0645\u0627\u0646 \u062e\u0646\u062f\u0627\u0646",
    "Face with tears of joy": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0627\u0634\u06a9 \u0634\u0627\u062f\u06cc",
    "Smiling face with open mouth": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632",
    "Smiling face with open mouth and smiling eyes": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u062e\u0646\u062f\u0627\u0646 \u0686\u0634\u0645",
    "Smiling face with open mouth and cold sweat": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u0639\u0631\u0642 \u0633\u0631\u062f",
    "Smiling face with open mouth and tightly-closed eyes": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u0686\u0634\u0645 \u062f\u0631\u0628\u062f\u0627\u0631",
    "Smiling face with halo": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u0647\u0627\u0644\u0647",
    "Smiling face with horns": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u0634\u0627\u062e",
    "Winking face": "\u062d\u0631\u06a9\u062a \u067e\u0630\u06cc\u0631\u06cc",
    "Smiling face with smiling eyes": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u0686\u0634\u0645 \u0644\u0628\u062e\u0646\u062f",
    "Face savoring delicious food": "\u0686\u0647\u0631\u0647 \u0644\u0630\u06cc\u0630 \u063a\u0630\u0627\u06cc \u062e\u0648\u0634\u0645\u0632\u0647",
    "Relieved face": "\u0686\u0647\u0631\u0647 \u0631\u0647\u0627",
    "Smiling face with heart-shaped eyes": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u0686\u0634\u0645 \u0628\u0647 \u0634\u06a9\u0644 \u0642\u0644\u0628",
    "Smiling face with sunglasses": "\u0686\u0647\u0631\u0647 \u062e\u0646\u062f\u0627\u0646 \u0628\u0627 \u0639\u06cc\u0646\u06a9 \u0622\u0641\u062a\u0627\u0628\u06cc",
    "Smirking face": "\u067e\u0648\u0632\u062e\u0646\u062f \u0686\u0647\u0631\u0647",
    "Neutral face": "\u0686\u0647\u0631\u0647 \u0647\u0627\u06cc \u062e\u0646\u062b\u06cc",
    "Expressionless face": "\u0686\u0647\u0631\u0647 \u0646\u0627\u06af\u0648\u06cc\u0627",
    "Unamused face": "\u0686\u0647\u0631\u0647 \u062e\u0648\u0634\u062d\u0627\u0644 \u0646\u06cc\u0633\u062a",
    "Face with cold sweat": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0639\u0631\u0642 \u0633\u0631\u062f",
    "Pensive face": "\u0686\u0647\u0631\u0647 \u0627\u0641\u0633\u0631\u062f\u0647",
    "Confused face": "\u0686\u0647\u0631\u0647 \u0627\u0634\u062a\u0628\u0627\u0647",
    "Confounded face": "\u0686\u0647\u0631\u0647 \u0633\u0631 \u062f\u0631 \u06af\u0645",
    "Kissing face": "\u0628\u0648\u0633\u06cc\u062f\u0646 \u0635\u0648\u0631\u062a",
    "Face throwing a kiss": "\u0686\u0647\u0631\u0647 \u067e\u0631\u062a\u0627\u0628 \u06cc\u06a9 \u0628\u0648\u0633\u0647",
    "Kissing face with smiling eyes": "\u0628\u0648\u0633\u06cc\u062f\u0646 \u0686\u0647\u0631\u0647 \u0628\u0627 \u0686\u0634\u0645 \u0644\u0628\u062e\u0646\u062f",
    "Kissing face with closed eyes": "\u0628\u0648\u0633\u06cc\u062f\u0646 \u0635\u0648\u0631\u062a \u0628\u0627 \u0686\u0634\u0645\u0627\u0646 \u0628\u0633\u062a\u0647",
    "Face with stuck out tongue": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u06af\u06cc\u0631 \u06a9\u0631\u062f\u0646 \u0632\u0628\u0627\u0646",
    "Face with stuck out tongue and winking eye": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0632\u0628\u0627\u0646 \u06af\u06cc\u0631 \u06a9\u0631\u062f\u0646 \u0648 \u062d\u0631\u06a9\u062a \u0686\u0634\u0645",
    "Face with stuck out tongue and tightly-closed eyes": "\u0635\u0648\u0631\u062a \u0628\u0627 \u0632\u0628\u0627\u0646 \u06af\u06cc\u0631 \u06a9\u0631\u062f\u0646 \u0648 \u0686\u0634\u0645 \u0631\u0627 \u0645\u062d\u06a9\u0645 \u0628\u0633\u062a\u0647",
    "Disappointed face": "\u0686\u0647\u0631\u0647 \u0646\u0627 \u0627\u0645\u06cc\u062f",
    "Worried face": "\u0686\u0647\u0631\u0647 \u0646\u06af\u0631\u0627\u0646",
    "Angry face": "\u0686\u0647\u0631\u0647 \u0639\u0635\u0628\u0627\u0646\u06cc",
    "Pouting face": "\u0628\u063a \u0686\u0647\u0631\u0647",
    "Crying face": "\u06af\u0631\u06cc\u0647 \u0686\u0647\u0631\u0647",
    "Persevering face": "\u067e\u0627\u06cc\u062f\u0627\u0631\u06cc \u0686\u0647\u0631\u0647",
    "Face with look of triumph": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0646\u06af\u0627\u0647\u06cc \u0627\u0632 \u067e\u06cc\u0631\u0648\u0632\u06cc",
    "Disappointed but relieved face": "\u0646\u0627 \u0627\u0645\u06cc\u062f \u0627\u0645\u0627 \u0622\u0633\u0648\u062f\u0647 \u0686\u0647\u0631\u0647",
    "Frowning face with open mouth": "\u0627\u062e\u0645 \u0635\u0648\u0631\u062a \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632",
    "Anguished face": "\u0686\u0647\u0631\u0647 \u0646\u06af\u0631\u0627\u0646",
    "Fearful face": "\u0686\u0647\u0631\u0647 \u062a\u0631\u0633",
    "Weary face": "\u0686\u0647\u0631\u0647 \u062e\u0633\u062a\u0647",
    "Sleepy face": "\u0686\u0647\u0631\u0647 \u062e\u0648\u0627\u0628 \u0622\u0644\u0648\u062f",
    "Tired face": "\u0686\u0647\u0631\u0647 \u062e\u0633\u062a\u0647",
    "Grimacing face": "\u0627\u0634 \u0686\u0647\u0631\u0647",
    "Loudly crying face": "\u0646\u062f\u0627\u06cc\u06cc \u0631\u0633\u0627 \u06af\u0631\u06cc\u0647 \u0686\u0647\u0631\u0647",
    "Face with open mouth": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632",
    "Hushed face": "\u0686\u0647\u0631\u0647 \u0633\u06a9\u0648\u062a",
    "Face with open mouth and cold sweat": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u062f\u0647\u0627\u0646 \u0628\u0627\u0632 \u0648 \u0639\u0631\u0642 \u0633\u0631\u062f",
    "Face screaming in fear": "\u0686\u0647\u0631\u0647 \u062c\u06cc\u063a \u062f\u0631 \u062a\u0631\u0633",
    "Astonished face": "\u0686\u0647\u0631\u0647 \u0634\u06af\u0641\u062a \u0632\u062f\u0647",
    "Flushed face": "\u0686\u0647\u0631\u0647 \u0628\u0631\u0627\u0641\u0631\u0648\u062e\u062a\u0647",
    "Sleeping face": "\u062e\u0648\u0627\u0628 \u0686\u0647\u0631\u0647",
    "Dizzy face": "\u0686\u0647\u0631\u0647 \u062f\u06cc\u0632\u06cc",
    "Face without mouth": "\u0686\u0647\u0631\u0647 \u0628\u062f\u0648\u0646 \u062f\u0647\u0627\u0646",
    "Face with medical mask": "\u0686\u0647\u0631\u0647 \u0628\u0627 \u0645\u0627\u0633\u06a9 \u0647\u0627\u06cc \u067e\u0632\u0634\u06a9\u06cc",

    // Line breaker
    "Break": "\u0634\u06a9\u0633\u062a\u0646",

    // Math
    "Subscript": "\u067e\u0627\u064a\u064a\u0646 \u0646\u0648\u064a\u0633",
    "Superscript": "\u0628\u0627\u0644\u0627 \u0646\u06af\u0627\u0634\u062a",

    // Full screen
    "Fullscreen": "\u062a\u0645\u0627\u0645 \u0635\u0641\u062d\u0647",

    // Horizontal line
    "Insert Horizontal Line": "\u0642\u0631\u0627\u0631 \u062f\u0627\u062f\u0646 \u0627\u0641\u0642\u06cc \u062e\u0637",

    // Clear formatting
    "Clear Formatting": "\u062d\u0630\u0641 \u0642\u0627\u0644\u0628 \u0628\u0646\u062f\u06cc",

    // Undo, redo
    "Undo": "\u0628\u0627\u0637\u0644 \u06a9\u0631\u062f\u0646",
    "Redo": "\u0627\u0646\u062c\u0627\u0645 \u062f\u0648\u0628\u0627\u0631\u0647",

    // Select all
    "Select All": "\u0627\u0646\u062a\u062e\u0627\u0628 \u0647\u0645\u0647",

    // Code view
    "Code View": "\u0645\u0634\u0627\u0647\u062f\u0647 \u06a9\u062f",

    // Quote
    "Quote": "\u0646\u0642\u0644 \u0642\u0648\u0644",
    "Increase": "\u0627\u0641\u0632\u0627\u06cc\u0634 \u062f\u0627\u062f\u0646",
    "Decrease": "\u0646\u0632\u0648\u0644 \u06a9\u0631\u062f\u0646"
  },
  direction: "rtl"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Finnish
 */


$.FroalaEditor.LANGUAGE['fi'] = {
  translation: {
    // Place holder
    "Type something": "Kirjoita jotain",

    // Basic formatting
    "Bold": "Lihavointi",
    "Italic": "Kursivointi",
    "Underline": "Alleviivaus",
    "Strikethrough": "Yliviivaus",

    // Main buttons
    "Insert": "Lis\u00e4\u00e4",
    "Delete": "Poista",
    "Cancel": "Peruuta",
    "OK": "Ok",
    "Back": "Takaisin",
    "Remove": "Poista",
    "More": "Lis\u00e4\u00e4",
    "Update": "P\u00e4ivitys",
    "Style": "Tyyli",

    // Font
    "Font Family": "Fontti",
    "Font Size": "Fonttikoko",

    // Colors
    "Colors": "V\u00e4rit",
    "Background": "Taustan",
    "Text": "Tekstin",

    // Paragraphs
    "Paragraph Format": "Muotoilut",
    "Normal": "Normaali",
    "Code": "Koodi",
    "Heading 1": "Otsikko 1",
    "Heading 2": "Otsikko 2",
    "Heading 3": "Otsikko 3",
    "Heading 4": "Otsikko 4",

    // Style
    "Paragraph Style": "Kappaleen tyyli",
    "Inline Style": "Linjassa tyyli",

    // Alignment
    "Align": "Tasaa",
    "Align Left": "Tasaa vasemmalle",
    "Align Center": "Keskit\u00e4",
    "Align Right": "Tasaa oikealle",
    "Align Justify": "Tasaa",
    "None": "Ei mit\u00e4\u00e4n",

    // Lists
    "Ordered List": "J\u00e4rjestetty lista",
    "Unordered List": "J\u00e4rjest\u00e4m\u00e4t\u00f6n lista",

    // Indent
    "Decrease Indent": "Sisenn\u00e4",
    "Increase Indent": "Loitonna",

    // Links
    "Insert Link": "Lis\u00e4\u00e4 linkki",
    "Open in new tab": "Avaa uudessa v\u00e4lilehdess\u00e4",
    "Open Link": "Avaa linkki",
    "Edit Link": "Muokkaa linkki",
    "Unlink": "Poista linkki",
    "Choose Link": "Valitse linkki",

    // Images
    "Insert Image": "Lis\u00e4\u00e4 kuva",
    "Upload Image": "Lataa kuva",
    "By URL": "Mukaan URL",
    "Browse": "Selailla",
    "Drop image": "Pudota kuva",
    "or click": "tai napsauta",
    "Manage Images": "Hallitse kuvia",
    "Loading": "Lastaus",
    "Deleting": "Poistaminen",
    "Tags": "Tagit",
    "Are you sure? Image will be deleted.": "Oletko varma? Kuva poistetaan.",
    "Replace": "Vaihda",
    "Uploading": "Lataaminen",
    "Loading image": "Lastaus kuva",
    "Display": "N\u00e4ytt\u00e4",
    "Inline": "Linjassa",
    "Break Text": "Rikkoa teksti",
    "Alternate Text": "Vaihtoehtoinen teksti",
    "Change Size": "Muuta kokoa",
    "Width": "Leveys",
    "Height": "Korkeus",
    "Something went wrong. Please try again.": "Jotain meni pieleen. Yrit\u00e4 uudelleen.",

    // Video
    "Insert Video": "Lis\u00e4\u00e4 video",
    "Embedded Code": "Upotettu koodi",

    // Tables
    "Insert Table": "Lis\u00e4\u00e4 taulukko",
    "Header": "Yl\u00e4tunniste",
    "Row": "Rivi",
    "Insert row above": "Lis\u00e4\u00e4 rivi ennen",
    "Insert row below": "Lis\u00e4\u00e4 rivi j\u00e4lkeen",
    "Delete row": "Poista rivi",
    "Column": "Sarake",
    "Insert column before": "Lis\u00e4\u00e4 sarake ennen",
    "Insert column after": "Lis\u00e4\u00e4 sarake j\u00e4lkeen",
    "Delete column": "Poista sarake",
    "Cell": "Solu",
    "Merge cells": "Yhdist\u00e4 solut",
    "Horizontal split": "Jaa vaakasuora",
    "Vertical split": "Jaa pystysuora",
    "Cell Background": "Solun tausta",
    "Vertical Align": "Pystysuora tasaa",
    "Top": "Alku",
    "Middle": "Keskimm\u00e4inen",
    "Bottom": "Pohja",
    "Align Top": "Tasaa alkuun",
    "Align Middle": "Tasaa keskimm\u00e4inen",
    "Align Bottom": "Tasaa pohja",
    "Cell Style": "",

    // Files
    "Upload File": "Lataa tiedosto",
    "Drop file": "Pudota tiedosto",

    // Emoticons
    "Emoticons": "Hymi\u00f6it\u00e4",
    "Grinning face": "Virnisteli kasvot",
    "Grinning face with smiling eyes": "Virnisteli kasvot hymyilev\u00e4t silm\u00e4t",
    "Face with tears of joy": "Kasvot ilon kyyneleit\u00e4",
    "Smiling face with open mouth": "Hymyilev\u00e4 kasvot suu auki",
    "Smiling face with open mouth and smiling eyes": "Hymyilev\u00e4 kasvot suu auki ja hymyilee silm\u00e4t",
    "Smiling face with open mouth and cold sweat": "Hymyilev\u00e4 kasvot suu auki ja kylm\u00e4 hiki",
    "Smiling face with open mouth and tightly-closed eyes": "Hymyilev\u00e4 kasvot suu auki ja tiiviisti suljettu silm\u00e4t",
    "Smiling face with halo": "Hymyilev\u00e4 kasvot Halo",
    "Smiling face with horns": "Hymyilev\u00e4 kasvot sarvet",
    "Winking face": "Silm\u00e4niskut kasvot",
    "Smiling face with smiling eyes": "Hymyilev\u00e4 kasvot hymyilev\u00e4t silm\u00e4t",
    "Face savoring delicious food": "Kasvot maistella herkullista ruokaa",
    "Relieved face": "Vapautettu kasvot",
    "Smiling face with heart-shaped eyes": "Hymyilev\u00e4t kasvot syd\u00e4men muotoinen silm\u00e4t",
    "Smiling face with sunglasses": "Hymyilev\u00e4 kasvot aurinkolasit",
    "Smirking face": "Hym\u00e4t\u00e4\u00e4 kasvot",
    "Neutral face": "Neutraali kasvot",
    "Expressionless face": "Ilmeet\u00f6n kasvot",
    "Unamused face": "Ei huvittanut kasvo",
    "Face with cold sweat": "Kasvot kylm\u00e4 hiki",
    "Pensive face": "Mietteli\u00e4s kasvot",
    "Confused face": "Sekava kasvot",
    "Confounded face": "Sekoitti kasvot",
    "Kissing face": "Suudella kasvot",
    "Face throwing a kiss": "Kasvo heitt\u00e4\u00e4 suudelma",
    "Kissing face with smiling eyes": "Suudella kasvot hymyilev\u00e4t silm\u00e4t",
    "Kissing face with closed eyes": "Suudella kasvot silm\u00e4t ummessa",
    "Face with stuck out tongue": "Kasvot ojensi kieli",
    "Face with stuck out tongue and winking eye": "Kasvot on juuttunut pois kielen ja silm\u00e4niskuja silm\u00e4",
    "Face with stuck out tongue and tightly-closed eyes": "Kasvot on juuttunut pois kielen ja tiiviisti suljettuna silm\u00e4t",
    "Disappointed face": "Pettynyt kasvot",
    "Worried face": "Huolissaan kasvot",
    "Angry face": "Vihainen kasvot",
    "Pouting face": "Pouting kasvot",
    "Crying face": "Itku kasvot",
    "Persevering face": "Pitk\u00e4j\u00e4nteinen kasvot",
    "Face with look of triumph": "Kasvot ilme Triumph",
    "Disappointed but relieved face": "Pettynyt mutta helpottunut kasvot",
    "Frowning face with open mouth": "Frowning kasvot suu auki",
    "Anguished face": "Tuskainen kasvot",
    "Fearful face": "Pelokkuus kasvot",
    "Weary face": "V\u00e4synyt kasvot",
    "Sleepy face": "Unelias kasvot",
    "Tired face": "V\u00e4synyt kasvot",
    "Grimacing face": "Irvist\u00e4en kasvot",
    "Loudly crying face": "\u00e4\u00e4nekk\u00e4\u00e4sti itku kasvot",
    "Face with open mouth": "Kasvot suu auki",
    "Hushed face": "Hiljentynyt kasvot",
    "Face with open mouth and cold sweat": "Kasvot suu auki ja kylm\u00e4 hiki",
    "Face screaming in fear": "Kasvot huutaa pelosta",
    "Astonished face": "H\u00e4mm\u00e4stynyt kasvot",
    "Flushed face": "Kasvojen punoitus",
    "Sleeping face": "Nukkuva kasvot",
    "Dizzy face": "Huimausta kasvot",
    "Face without mouth": "Kasvot ilman suuhun",
    "Face with medical mask": "Kasvot l\u00e4\u00e4ketieteen naamio",

    // Line breaker
    "Break": "Rikkoa",

    // Math
    "Subscript": "Alaindeksi",
    "Superscript": "Yl\u00e4indeksi",

    // Full screen
    "Fullscreen": "Koko n\u00e4ytt\u00f6",

    // Horizontal line
    "Insert Horizontal Line": "Lis\u00e4\u00e4 vaakasuora viiva",

    // Clear formatting
    "Clear Formatting": "Poista muotoilu",

    // Undo, redo
    "Undo": "Peru",
    "Redo": "Tee uudelleen",

    // Select all
    "Select All": "Valitse kaikki",

    // Code view
    "Code View": "Koodi n\u00e4kym\u00e4",

    // Quote
    "Quote": "Lainaus",
    "Increase": "Lis\u00e4t\u00e4",
    "Decrease": "Pienenn\u00e4"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * French
 */


$.FroalaEditor.LANGUAGE['fr'] = {
  translation: {
    // Place holder
    "Type something": "Tapez quelque chose",

    // Basic formatting
    "Bold": "Gras",
    "Italic": "Italique",
    "Underline": "Soulign\u00e9",
    "Strikethrough": "Barr\u00e9",

    // Main buttons
    "Insert": "Ins\u00e9rer",
    "Delete": "Effacer",
    "Cancel": "Annuler",
    "OK": "Ok",
    "Back": "Ant\u00e9rieur",
    "Remove": "Enlever",
    "More": "Plus",
    "Update": "Actualiser",
    "Style": "Style",

    // Font
    "Font Family": "Polices de caract\u00e8res",
    "Font Size": "Taille de la police",

    // Colors
    "Colors": "Couleurs",
    "Background": "Arri\u00e8re-plan",
    "Text": "Texte",

    // Paragraphs
    "Paragraph Format": "Formats",
    "Normal": "Normal",
    "Code": "Code",
    "Heading 1": "Titre 1",
    "Heading 2": "Titre 2",
    "Heading 3": "Titre 3",
    "Heading 4": "Titre 4",

    // Style
    "Paragraph Style": "Style de paragraphe",
    "Inline Style": "Style en ligne",

    // Alignment
    "Align": "Aligner",
    "Align Left": "Aligner \u00e0 gauche",
    "Align Center": "Aligner au centre",
    "Align Right": "Aligner \u00e0 droite",
    "Align Justify": "Justifi\u00e9",
    "None": "Aucun",

    // Lists
    "Ordered List": "Liste ordonn\u00e9e",
    "Unordered List": "Liste non ordonn\u00e9e",

    // Indent
    "Decrease Indent": "Diminuer le retrait",
    "Increase Indent": "Augmenter le retrait",

    // Links
    "Insert Link": "Ins\u00e9rer un lien",
    "Open in new tab": "Ouvrir dans un nouvel onglet",
    "Open Link": "Ouvrir le lien",
    "Edit Link": "Modifier le lien",
    "Unlink": "Enlever le lien",
    "Choose Link": "Choisissez le lien",

    // Images
    "Insert Image": "Ins\u00e9rer une image",
    "Upload Image": "T\u00e9l\u00e9charger une image",
    "By URL": "Par URL",
    "Browse": "Feuilleter",
    "Drop image": "D\u00e9posez l'image",
    "or click": "ou cliquez",
    "Manage Images": "Gestion des images",
    "Loading": "En chargeant",
    "Deleting": "Suppression",
    "Tags": "\u00c9tiquettes",
    "Are you sure? Image will be deleted.": "Etes-vous s\u00fbr? Image sera supprim\u00e9e.",
    "Replace": "Remplacer",
    "Uploading": "De t\u00e9l\u00e9chargement d'images",
    "Loading image": "De t\u00e9l\u00e9chargement d'images",
    "Display": "Afficher",
    "Inline": "En ligne",
    "Break Text": "Texte scission",
    "Alternate Text": "Texte alternatif",
    "Change Size": "Changer la dimension",
    "Width": "Largeur",
    "Height": "Hauteur",
    "Something went wrong. Please try again.": "Quelque chose a mal tourn\u00e9. Veuillez r\u00e9essayer.",

    // Video
    "Insert Video": "Ins\u00e9rer une vid\u00e9o",
    "Embedded Code": "Code embarqu\u00e9",

    // Tables
    "Insert Table": "Ins\u00e9rer un tableau",
    "Header": "Ent\u00eate",
    "Row": "Ligne",
    "Insert row above": "Ins\u00e9rer une ligne avant",
    "Insert row below": "Ins\u00e9rer une ligne apr\u00e8s",
    "Delete row": "Effacer la ligne",
    "Column": "Colonne",
    "Insert column before": "Ins\u00e9rer une colonne avant",
    "Insert column after": "Ins\u00e9rer une colonne apr\u00e8s",
    "Delete column": "Effacer la colonne",
    "Cell": "Cellule",
    "Merge cells": "Fusionner les cellules",
    "Horizontal split": "Diviser horizontale",
    "Vertical split": "Diviser verticale",
    "Cell Background": "Fond de la cellule",
    "Vertical Align": "Aligner vertical",
    "Top": "En haut",
    "Middle": "Milieu",
    "Bottom": "En bas",
    "Align Top": "Aligner en haut",
    "Align Middle": "Aligner au milieu",
    "Align Bottom": "Aligner en bas",
    "Cell Style": "Style de cellule",

    // Files
    "Upload File": "T\u00e9l\u00e9charger le fichier",
    "Drop file": "D\u00e9posez le fichier",

    // Emoticons
    "Emoticons": "\u00c9motic\u00f4nes",
    "Grinning face": "Souriant visage",
    "Grinning face with smiling eyes": "Souriant visage aux yeux souriants",
    "Face with tears of joy": "Visage \u00e0 des larmes de joie",
    "Smiling face with open mouth": "Visage souriant avec la bouche ouverte",
    "Smiling face with open mouth and smiling eyes": "Visage souriant avec la bouche ouverte et les yeux en souriant",
    "Smiling face with open mouth and cold sweat": "Visage souriant avec la bouche ouverte et la sueur froide",
    "Smiling face with open mouth and tightly-closed eyes": "Visage souriant avec la bouche ouverte et les yeux herm\u00e9tiquement clos",
    "Smiling face with halo": "Sourire visage avec halo",
    "Smiling face with horns": "Visage souriant avec des cornes",
    "Winking face": "Clin d'oeil visage",
    "Smiling face with smiling eyes": "Sourire visage aux yeux souriants",
    "Face savoring delicious food": "Visage savourant de d\u00e9licieux plats",
    "Relieved face": "Soulag\u00e9 visage",
    "Smiling face with heart-shaped eyes": "Visage souriant avec des yeux en forme de coeur",
    "Smiling face with sunglasses": "Sourire visage avec des lunettes de soleil",
    "Smirking face": "Souriant visage",
    "Neutral face": "Visage neutre",
    "Expressionless face": "Visage sans expression",
    "Unamused face": "Visage pas amus\u00e9",
    "Face with cold sweat": "Face \u00e0 la sueur froide",
    "Pensive face": "pensif visage",
    "Confused face": "Visage confus",
    "Confounded face": "visage maudit",
    "Kissing face": "Embrasser le visage",
    "Face throwing a kiss": "Visage jetant un baiser",
    "Kissing face with smiling eyes": "Embrasser le visage avec les yeux souriants",
    "Kissing face with closed eyes": "Embrasser le visage avec les yeux ferm\u00e9s",
    "Face with stuck out tongue": "Visage avec sortait de la langue",
    "Face with stuck out tongue and winking eye": "Visage avec sortait de la langue et des yeux clignotante",
    "Face with stuck out tongue and tightly-closed eyes": "Visage avec sortait de la langue et les yeux ferm\u00e9s herm\u00e9tiquement",
    "Disappointed face": "Visage d\u00e9\u00e7u",
    "Worried face": "Visage inquiet",
    "Angry face": "Visage en col\u00e9re",
    "Pouting face": "Faire la moue face",
    "Crying face": "Pleurer visage",
    "Persevering face": "Pers\u00e9v\u00e9rer face",
    "Face with look of triumph": "Visage avec le regard de triomphe",
    "Disappointed but relieved face": "D\u00e9\u00e7u, mais le visage soulag\u00e9",
    "Frowning face with open mouth": "Les sourcils fronc\u00e9s visage avec la bouche ouverte",
    "Anguished face": "Visage angoiss\u00e9",
    "Fearful face": "Craignant visage",
    "Weary face": "Visage las",
    "Sleepy face": "Visage endormi",
    "Tired face": "Visage fatigu\u00e9",
    "Grimacing face": "Visage grima\u00e7ante",
    "Loudly crying face": "Pleurer bruyamment visage",
    "Face with open mouth": "Visage \u00e0 la bouche ouverte",
    "Hushed face": "Visage feutr\u00e9e",
    "Face with open mouth and cold sweat": "Visage \u00e0 la bouche ouverte et la sueur froide",
    "Face screaming in fear": "Visage hurlant de peur",
    "Astonished face": "Visage \u00e9tonn\u00e9",
    "Flushed face": "Visage congestionn\u00e9",
    "Sleeping face": "Visage au bois dormant",
    "Dizzy face": "Visage vertige",
    "Face without mouth": "Visage sans bouche",
    "Face with medical mask": "Visage avec un masque m\u00e9dical",

    // Line breaker
    "Break": "Rompre",

    // Math
    "Subscript": "Indice",
    "Superscript": "Exposant",

    // Full screen
    "Fullscreen": "Plein \u00e9cran",

    // Horizontal line
    "Insert Horizontal Line": "Ins\u00e9rez une ligne horizontale",

    // Clear formatting
    "Clear Formatting": "Effacer formatage",

    // Undo, redo
    "Undo": "Annuler",
    "Redo": "R\u00e9tablir",

    // Select all
    "Select All": "Tout s\u00e9lectionner",

    // Code view
    "Code View": "Vue de code",

    // Quote
    "Quote": "Citer",
    "Increase": "Augmentation",
    "Decrease": "Diminution"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Hebrew
 */


$.FroalaEditor.LANGUAGE['he'] = {
  translation: {
    // Place holder
    "Type something": "\u05d4\u05e7\u05dc\u05d3 \u05db\u05d0\u05df",

    // Basic formatting
    "Bold": "\u05de\u05d5\u05d3\u05d2\u05e9",
    "Italic": "\u05de\u05d5\u05d8\u05d4",
    "Underline": "\u05e7\u05d5 \u05ea\u05d7\u05ea\u05d9",
    "Strikethrough": "\u05e7\u05d5 \u05d0\u05de\u05e6\u05e2\u05d9",

    // Main buttons
    "Insert": "\u05d4\u05d5\u05e1\u05e4\u05ea",
    "Delete": "\u05de\u05d7\u05d9\u05e7\u05d4",
    "Cancel": "\u05d1\u05d9\u05d8\u05d5\u05dc",
    "OK": "\u05d1\u05e6\u05e2",
    "Back": "\u05d1\u05d7\u05d6\u05e8\u05d4",
    "Remove": "\u05d4\u05e1\u05e8",
    "More": "\u05d9\u05d5\u05ea\u05e8",
    "Update": "\u05e2\u05d3\u05db\u05d5\u05df",
    "Style": "\u05e1\u05d2\u05e0\u05d5\u05df",

    // Font
    "Font Family": "\u05d2\u05d5\u05e4\u05df",
    "Font Size": "\u05d2\u05d5\u05d3\u05dc \u05d4\u05d2\u05d5\u05e4\u05df",

    // Colors
    "Colors": "\u05e6\u05d1\u05e2\u05d9\u05dd",
    "Background": "\u05e8\u05e7\u05e2",
    "Text": "\u05d4\u05d8\u05e1\u05d8",

    // Paragraphs
    "Paragraph Format": "\u05e4\u05d5\u05e8\u05de\u05d8",
    "Normal": "\u05e8\u05d2\u05d9\u05dc",
    "Code": "\u05e7\u05d5\u05d3",
    "Heading 1": "1 \u05db\u05d5\u05ea\u05e8\u05ea",
    "Heading 2": "2 \u05db\u05d5\u05ea\u05e8\u05ea",
    "Heading 3": "3 \u05db\u05d5\u05ea\u05e8\u05ea",
    "Heading 4": "4 \u05db\u05d5\u05ea\u05e8\u05ea",

    // Style
    "Paragraph Style": "\u05e1\u05d2\u05e0\u05d5\u05df \u05e4\u05e1\u05e7\u05d4",
    "Inline Style": "\u05e1\u05d2\u05e0\u05d5\u05df \u05de\u05d5\u05d1\u05e0\u05d4",

    // Alignment
    "Align": "\u05d9\u05d9\u05e9\u05d5\u05e8",
    "Align Left": "\u05d9\u05d9\u05e9\u05d5\u05e8 \u05dc\u05e9\u05de\u05d0\u05dc",
    "Align Center": "\u05d9\u05d9\u05e9\u05d5\u05e8 \u05dc\u05de\u05e8\u05db\u05d6",
    "Align Right": "\u05d9\u05d9\u05e9\u05d5\u05e8 \u05dc\u05d9\u05de\u05d9\u05df",
    "Align Justify": "\u05d9\u05d9\u05e9\u05d5\u05e8 \u05de\u05dc\u05d0",
    "None": "\u05d0\u05e3 \u05d0\u05d7\u05d3",

    // Lists
    "Ordered List": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e8\u05e9\u05d9\u05de\u05d4 \u05de\u05de\u05d5\u05e1\u05e4\u05e8\u05ea",
    "Unordered List": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e8\u05e9\u05d9\u05de\u05d4",

    // Indent
    "Decrease Indent": "\u05d4\u05e7\u05d8\u05e0\u05ea \u05db\u05e0\u05d9\u05e1\u05d4",
    "Increase Indent": "\u05d4\u05d2\u05d3\u05dc\u05ea \u05db\u05e0\u05d9\u05e1\u05d4",

    // Links
    "Insert Link": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e7\u05d9\u05e9\u05d5\u05e8",
    "Open in new tab": "\u05dc\u05e4\u05ea\u05d5\u05d7 \u05d1\u05d8\u05d0\u05d1 \u05d7\u05d3\u05e9",
    "Open Link": "\u05e7\u05d9\u05e9\u05d5\u05e8 \u05e4\u05ea\u05d5\u05d7",
    "Edit Link": "\u05e7\u05d9\u05e9\u05d5\u05e8 \u05e2\u05e8\u05d9\u05db\u05d4",
    "Unlink": "\u05d4\u05e1\u05e8\u05ea \u05d4\u05e7\u05d9\u05e9\u05d5\u05e8",
    "Choose Link": "\u05dc\u05d1\u05d7\u05d5\u05e8 \u05e7\u05d9\u05e9\u05d5\u05e8",

    // Images
    "Insert Image": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05ea\u05de\u05d5\u05e0\u05d4",
    "Upload Image": "\u05ea\u05de\u05d5\u05e0\u05ea \u05d4\u05e2\u05dc\u05d0\u05d4",
    "By URL": "URL \u05e2\u05dc \u05d9\u05d3\u05d9",
    "Browse": "\u05dc\u05d2\u05dc\u05d5\u05e9",
    "Drop image": "\u05e9\u05d7\u05e8\u05e8 \u05d0\u05ea \u05d4\u05ea\u05de\u05d5\u05e0\u05d4 \u05db\u05d0\u05df",
    "or click": "\u05d0\u05d5 \u05dc\u05d7\u05e5",
    "Manage Images": "\u05e0\u05d9\u05d4\u05d5\u05dc \u05d4\u05ea\u05de\u05d5\u05e0\u05d5\u05ea",
    "Loading": "\u05d8\u05e2\u05d9\u05e0\u05d4",
    "Deleting": "\u05de\u05d7\u05d9\u05e7\u05d4",
    "Tags": "\u05ea\u05d2\u05d9\u05dd",
    "Are you sure? Image will be deleted.": "\u05d4\u05d0\u05dd \u05d0\u05ea\u05d4 \u05d1\u05d8\u05d5\u05d7\u003f \u05d4\u05ea\u05de\u05d5\u05e0\u05d4 \u05ea\u05de\u05d7\u05e7\u002e",
    "Replace": "\u05dc\u05d4\u05d7\u05dc\u05d9\u05e3",
    "Uploading": "\u05d4\u05e2\u05dc\u05d0\u05d4",
    "Loading image": "\u05ea\u05de\u05d5\u05e0\u05ea \u05d8\u05e2\u05d9\u05e0\u05d4",
    "Display": "\u05ea\u05e6\u05d5\u05d2\u05d4",
    "Inline": "\u05d1\u05e9\u05d5\u05e8\u05d4",
    "Break Text": "\u05d8\u05e7\u05e1\u05d8 \u05d4\u05e4\u05e1\u05e7\u05d4",
    "Alternate Text": "\u05d8\u05e7\u05e1\u05d8 \u05d7\u05dc\u05d5\u05e4\u05d9",
    "Change Size": "\u05d2\u05d5\u05d3\u05dc \u05e9\u05d9\u05e0\u05d5\u05d9",
    "Width": "\u05e8\u05d5\u05d7\u05d1",
    "Height": "\u05d2\u05d5\u05d1\u05d4",
    "Something went wrong. Please try again.": "\u05de\u05e9\u05d4\u05d5 \u05d4\u05e9\u05ea\u05d1\u05e9. \u05d1\u05d1\u05e7\u05e9\u05d4 \u05e0\u05e1\u05d4 \u05e9\u05d5\u05d1.",

    // Video
    "Insert Video": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05d5\u05d9\u05d3\u05d9\u05d0\u05d5",
    "Embedded Code": "\u05e7\u05d5\u05d3 \u05de\u05d5\u05d8\u05d1\u05e2",

    // Tables
    "Insert Table": "\u05d4\u05db\u05e0\u05e1 \u05d8\u05d1\u05dc\u05d4",
    "Header": "\u05db\u05d5\u05ea\u05e8\u05ea",
    "Row": "\u05e9\u05d5\u05e8\u05d4",
    "Insert row above": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e9\u05d5\u05e8\u05d4 \u05dc\u05e4\u05e0\u05d9",
    "Insert row below": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e9\u05d5\u05e8\u05d4 \u05d0\u05d7\u05e8\u05d9",
    "Delete row": "\u05de\u05d7\u05d9\u05e7\u05ea \u05e9\u05d5\u05e8\u05d4",
    "Column": "\u05d8\u05d5\u05e8",
    "Insert column before": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05d8\u05d5\u05e8 \u05dc\u05e4\u05e0\u05d9",
    "Insert column after": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05d8\u05d5\u05e8 \u05d0\u05d7\u05e8\u05d9",
    "Delete column": "\u05de\u05d7\u05d9\u05e7\u05ea \u05d8\u05d5\u05e8",
    "Cell": "\u05ea\u05d0",
    "Merge cells": "\u05de\u05d6\u05d2 \u05ea\u05d0\u05d9\u05dd",
    "Horizontal split": "\u05e4\u05e6\u05dc \u05d0\u05d5\u05e4\u05e7\u05d9",
    "Vertical split": "\u05e4\u05e6\u05dc \u05d0\u05e0\u05db\u05d9",
    "Cell Background": "\u05e8\u05e7\u05e2 \u05ea\u05d0",
    "Vertical Align": "\u05d9\u05d9\u05e9\u05d5\u05e8 \u05d0\u05e0\u05db\u05d9",
    "Top": "\u05e2\u05b6\u05dc\u05b4\u05d9\u05d5\u05b9\u05df",
    "Middle": "\u05ea\u05b4\u05d9\u05db\u05d5\u05b9\u05e0\u05b4\u05d9",
    "Bottom": "\u05ea\u05d7\u05ea\u05d5\u05df",
    "Align Top": "\u05dc\u05d9\u05d9\u05e9\u05e8 \u05e2\u05b6\u05dc\u05b4\u05d9\u05d5\u05b9\u05df",
    "Align Middle": "\u05dc\u05d9\u05d9\u05e9\u05e8 \u05ea\u05b4\u05d9\u05db\u05d5\u05b9\u05e0\u05b4\u05d9",
    "Align Bottom": "\u05dc\u05d9\u05d9\u05e9\u05e8 \u05ea\u05d7\u05ea\u05d5\u05df",
    "Cell Style": "\u05e1\u05d2\u05e0\u05d5\u05df \u05ea\u05d0",

    // Files
    "Upload File": "\u05d4\u05e2\u05dc\u05d0\u05ea \u05e7\u05d5\u05d1\u05e5",
    "Drop file": "\u05d6\u05e8\u05d5\u05e7 \u05e7\u05d5\u05d1\u05e5 \u05db\u05d0\u05df",

    // Emoticons
    "Emoticons": "\u05e1\u05de\u05d9\u05d9\u05dc\u05d9\u05dd",
    "Grinning face": "\u05d7\u05d9\u05d9\u05da \u05e4\u05e0\u05d9\u05dd",
    "Grinning face with smiling eyes": "\u05d7\u05d9\u05d9\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05de\u05d7\u05d9\u05d9\u05db\u05d5\u05ea",
    "Face with tears of joy": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05d3\u05de\u05e2\u05d5\u05ea \u05e9\u05dc \u05e9\u05de\u05d7\u05d4",
    "Smiling face with open mouth": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7",
    "Smiling face with open mouth and smiling eyes": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7 \u05d5\u05de\u05d7\u05d9\u05d9\u05da \u05e2\u05d9\u05e0\u05d9\u05d9\u05dd",
    "Smiling face with open mouth and cold sweat": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7 \u05d5\u05d6\u05d9\u05e2\u05d4 \u05e7\u05e8\u05d4",
    "Smiling face with open mouth and tightly-closed eyes": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7 \u05d5\u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05d1\u05d7\u05d5\u05d6\u05e7\u05d4\u002d\u05e1\u05d2\u05d5\u05e8\u05d5\u05ea",
    "Smiling face with halo": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05d4\u05d9\u05dc\u05d4",
    "Smiling face with horns": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e7\u05e8\u05e0\u05d5\u05ea",
    "Winking face": "\u05e7\u05e8\u05d9\u05e6\u05d4 \u05e4\u05e0\u05d9\u05dd",
    "Smiling face with smiling eyes": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05de\u05d7\u05d9\u05d9\u05db\u05d5\u05ea",
    "Face savoring delicious food": "\u05e4\u05e0\u05d9\u05dd \u05de\u05ea\u05e2\u05e0\u05d2 \u05d0\u05d5\u05db\u05dc \u05d8\u05e2\u05d9\u05dd",
    "Relieved face": "\u05e4\u05e0\u05d9\u05dd \u05e9\u05dc \u05d4\u05e7\u05dc\u05d4",
    "Smiling face with heart-shaped eyes": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05d1\u05e6\u05d5\u05e8\u05ea \u05dc\u05d1",
    "Smiling face with sunglasses": "\u05d7\u05d9\u05d5\u05da \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05de\u05e9\u05e7\u05e4\u05d9 \u05e9\u05de\u05e9",
    "Smirking face": "\u05d4\u05d9\u05d0 \u05d7\u05d9\u05d9\u05db\u05d4 \u05d7\u05d9\u05d5\u05da \u05e0\u05d1\u05d6\u05d4 \u05e4\u05e0\u05d9\u05dd",
    "Neutral face": "\u05e4\u05e0\u05d9\u05dd \u05e0\u05d9\u05d8\u05e8\u05dc\u05d9",
    "Expressionless face": "\u05d1\u05e4\u05e0\u05d9\u05dd \u05d7\u05ea\u05d5\u05dd",
    "Unamused face": "\u05e4\u05e0\u05d9\u05dd \u05dc\u05d0 \u05de\u05e9\u05d5\u05e2\u05e9\u05e2\u05d9\u05dd",
    "Face with cold sweat": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05d6\u05d9\u05e2\u05d4 \u05e7\u05e8\u05d4",
    "Pensive face": "\u05d1\u05e4\u05e0\u05d9\u05dd \u05de\u05d4\u05d5\u05e8\u05d4\u05e8",
    "Confused face": "\u05e4\u05e0\u05d9\u05dd \u05de\u05d1\u05d5\u05dc\u05d1\u05dc\u05d9\u05dd",
    "Confounded face": "\u05e4\u05e0\u05d9\u05dd \u05de\u05d1\u05d5\u05dc\u05d1\u05dc",
    "Kissing face": "\u05e0\u05e9\u05d9\u05e7\u05d5\u05ea \u05e4\u05e0\u05d9\u05dd",
    "Face throwing a kiss": "\u05e4\u05e0\u05d9\u05dd \u05dc\u05d6\u05e8\u05d5\u05e7 \u05e0\u05e9\u05d9\u05e7\u05d4",
    "Kissing face with smiling eyes": "\u05e0\u05e9\u05d9\u05e7\u05d5\u05ea \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05de\u05d7\u05d9\u05d9\u05db\u05d5\u05ea",
    "Kissing face with closed eyes": "\u05e0\u05e9\u05d9\u05e7\u05d5\u05ea \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05e1\u05d2\u05d5\u05e8\u05d5\u05ea",
    "Face with stuck out tongue": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05dc\u05e9\u05d5\u05df \u05d1\u05dc\u05d8\u05d5",
    "Face with stuck out tongue and winking eye": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05dc\u05e9\u05d5\u05df \u05ea\u05e7\u05d5\u05e2\u05d4 \u05d4\u05d7\u05d5\u05e6\u05d4 \u05d5\u05e2\u05d9\u05df \u05e7\u05d5\u05e8\u05e6\u05ea",
    "Face with stuck out tongue and tightly-closed eyes": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05dc\u05e9\u05d5\u05df \u05ea\u05e7\u05d5\u05e2\u05d4 \u05d4\u05d7\u05d5\u05e6\u05d4 \u05d5\u05e2\u05d9\u05e0\u05d9\u05d9\u05dd \u05d1\u05d7\u05d5\u05d6\u05e7\u05d4\u002d\u05e1\u05d2\u05d5\u05e8\u05d5\u05ea",
    "Disappointed face": "\u05e4\u05e0\u05d9\u05dd \u05de\u05d0\u05d5\u05db\u05d6\u05d1\u05d9\u05dd",
    "Worried face": "\u05e4\u05e0\u05d9\u05dd \u05de\u05d5\u05d3\u05d0\u05d2\u05d9\u05dd",
    "Angry face": "\u05e4\u05e0\u05d9\u05dd \u05db\u05d5\u05e2\u05e1\u05d9\u05dd",
    "Pouting face": "\u05de\u05e9\u05d5\u05e8\u05d1\u05d1 \u05e4\u05e0\u05d9\u05dd",
    "Crying face": "\u05d1\u05db\u05d9 \u05e4\u05e0\u05d9\u05dd",
    "Persevering face": "\u05d4\u05ea\u05de\u05d3\u05ea \u05e4\u05e0\u05d9\u05dd",
    "Face with look of triumph": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05de\u05d1\u05d8 \u05e9\u05dc \u05e0\u05e6\u05d7\u05d5\u05df",
    "Disappointed but relieved face": "\u05de\u05d0\u05d5\u05db\u05d6\u05d1 \u05d0\u05d1\u05dc \u05d4\u05d5\u05e7\u05dc \u05e4\u05e0\u05d9\u05dd",
    "Frowning face with open mouth": "\u05e7\u05de\u05d8 \u05d0\u05ea \u05de\u05e6\u05d7 \u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7",
    "Anguished face": "\u05e4\u05e0\u05d9\u05dd \u05de\u05d9\u05d5\u05e1\u05e8\u05d9\u05dd",
    "Fearful face": "\u05e4\u05e0\u05d9\u05dd \u05e9\u05d7\u05e9\u05e9\u05d5",
    "Weary face": "\u05e4\u05e0\u05d9\u05dd \u05d5\u05d9\u05e8\u05d9",
    "Sleepy face": "\u05e4\u05e0\u05d9\u05dd \u05e9\u05dc \u05e1\u05dc\u05d9\u05e4\u05d9",
    "Tired face": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05d9\u05d9\u05e4\u05d9\u05dd",
    "Grimacing face": "\u05d4\u05d5\u05d0 \u05d4\u05e2\u05d5\u05d5\u05d4 \u05d0\u05ea \u05e4\u05e0\u05d9 \u05e4\u05e0\u05d9\u05dd",
    "Loudly crying face": "\u05d1\u05e7\u05d5\u05dc \u05e8\u05dd \u05d1\u05d5\u05db\u05d4 \u05e4\u05e0\u05d9\u05dd",
    "Face with open mouth": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7",
    "Hushed face": "\u05e4\u05e0\u05d9\u05dd \u05e9\u05d5\u05e7\u05d8\u05d9\u05dd",
    "Face with open mouth and cold sweat": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05e4\u05d4 \u05e4\u05ea\u05d5\u05d7 \u05d5\u05d6\u05d9\u05e2\u05d4 \u05e7\u05e8\u05d4\u0022",
    "Face screaming in fear": "\u05e4\u05e0\u05d9\u05dd \u05e6\u05d5\u05e8\u05d7\u05d9\u05dd \u05d1\u05e4\u05d7\u05d3",
    "Astonished face": "\u05e4\u05e0\u05d9\u05d5 \u05e0\u05d3\u05d4\u05de\u05d5\u05ea",
    "Flushed face": "\u05e4\u05e0\u05d9\u05d5 \u05e1\u05de\u05d5\u05e7\u05d5\u05ea",
    "Sleeping face": "\u05e9\u05d9\u05e0\u05d4 \u05e4\u05e0\u05d9\u05dd",
    "Dizzy face": "\u05e4\u05e0\u05d9\u05dd \u05e9\u05dc \u05d3\u05d9\u05d6\u05d9",
    "Face without mouth": "\u05e4\u05e0\u05d9\u05dd \u05dc\u05dc\u05d0 \u05e4\u05d4",
    "Face with medical mask": "\u05e4\u05e0\u05d9\u05dd \u05e2\u05dd \u05de\u05e1\u05db\u05d4 \u05e8\u05e4\u05d5\u05d0\u05d9\u05ea",

    // Line breaker
    "Break": "\u05d4\u05e4\u05e1\u05e7\u05d4",

    // Math
    "Subscript": "\u05db\u05ea\u05d1 \u05ea\u05d7\u05ea\u05d9",
    "Superscript": "\u05e2\u05d9\u05dc\u05d9",

    // Full screen
    "Fullscreen": "\u05de\u05e1\u05da \u05de\u05dc\u05d0",

    // Horizontal line
    "Insert Horizontal Line": "\u05d4\u05d5\u05e1\u05e4\u05ea \u05e7\u05d5 \u05d0\u05d5\u05e4\u05e7\u05d9",

    // Clear formatting
    "Clear Formatting": "\u05dc\u05d4\u05e1\u05d9\u05e8 \u05e2\u05d9\u05e6\u05d5\u05d1",

    // Undo, redo
    "Undo": "\u05d1\u05d9\u05d8\u05d5\u05dc",
    "Redo": "\u05d1\u05e6\u05e2 \u05e9\u05d5\u05d1",

    // Select all
    "Select All": "\u05d1\u05d7\u05e8 \u05d4\u05db\u05dc",

    // Code view
    "Code View": "\u05ea\u05e6\u05d5\u05d2\u05ea \u05e7\u05d5\u05d3",

    // Quote
    "Quote": "\u05e6\u05d9\u05d8\u05d5\u05d8",
    "Increase": "\u05dc\u05d4\u05d2\u05d1\u05d9\u05e8",
    "Decrease": "\u05d9\u05e8\u05d9\u05d3\u05d4"
  },
  direction: "rtl"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Croatian
 */


$.FroalaEditor.LANGUAGE['hr'] = {
  translation: {
    // Place holder
    "Type something": "Napi\u0161i ne\u0161to",

    // Basic formatting
    "Bold": "Podebljaj",
    "Italic": "Kurziv",
    "Underline": "Podcrtano",
    "Strikethrough": "Precrtano",

    // Main buttons
    "Insert": "Umetni",
    "Delete": "Obri\u0161i",
    "Cancel": "Otka\u017ei",
    "OK": "U redu",
    "Back": "Natrag",
    "Remove": "Ukloni",
    "More": "Vi\u0161e",
    "Update": "A\u017euriraj",
    "Style": "Stil",

    // Font
    "Font Family": "Odaberi font",
    "Font Size": "Veli\u010dina fonta",

    // Colors
    "Colors": "Boje",
    "Background": "Pozadina",
    "Text": "Tekst",

    // Paragraphs
    "Paragraph Format": "Format odlomka",
    "Normal": "Normalno",
    "Code": "Izvorni kod",
    "Heading 1": "Naslov 1",
    "Heading 2": "Naslov 2",
    "Heading 3": "Naslov 3",
    "Heading 4": "Naslov 4",

    // Style
    "Paragraph Style": "Stil odlomka",
    "Inline Style": "Stil u liniji",

    // Alignment
    "Align": "Poravnaj",
    "Align Left": "Poravnaj lijevo",
    "Align Center": "Poravnaj po sredini",
    "Align Right": "Poravnaj desno",
    "Align Justify": "Obostrano poravnanje",
    "None": "Nijedan",

    // Lists
    "Ordered List": "Ure\u0111ena lista",
    "Unordered List": "Neure\u0111ena lista",

    // Indent
    "Decrease Indent": "Uvuci odlomak",
    "Increase Indent": "Izvuci odlomak",

    // Links
    "Insert Link": "Umetni link",
    "Open in new tab": "Otvori u novom prozoru",
    "Open Link": "Otvori link",
    "Edit Link": "Uredi link",
    "Unlink": "Ukloni link",
    "Choose Link": "Odaberi link",

    // Images
    "Insert Image": "Umetni sliku",
    "Upload Image": "Prijenos slike",
    "By URL": "Prema URL",
    "Browse": "Odabir",
    "Drop image": "Ispusti sliku",
    "or click": "ili odaberi",
    "Manage Images": "Upravljanje slikama",
    "Loading": "U\u010ditavanje",
    "Deleting": "Brisanje",
    "Tags": "Oznake",
    "Are you sure? Image will be deleted.": "Da li ste sigurni da \u017eelite obrisati ovu sliku?",
    "Replace": "Zamijeni",
    "Uploading": "Prijenos",
    "Loading image": "Otvaram sliku",
    "Display": "Prika\u017ei",
    "Inline": "U liniji",
    "Break Text": "Odvojeni tekst",
    "Alternate Text": "Alternativni tekst",
    "Change Size": "Promjena veli\u010dine",
    "Width": "\u0160irina",
    "Height": "Visina",
    "Something went wrong. Please try again.": "Ne\u0161to je po\u0161lo po zlu. Molimo poku\u0161ajte ponovno.",

    // Video
    "Insert Video": "Umetni video",
    "Embedded Code": "Ugra\u0111eni kod",

    // Tables
    "Insert Table": "Umetni tablicu",
    "Header": "Zaglavlje",
    "Row": "Red",
    "Insert row above": "Umetni red iznad",
    "Insert row below": "Umetni red ispod",
    "Delete row": "Obri\u0161i red",
    "Column": "Stupac",
    "Insert column before": "Umetni stupac prije",
    "Insert column after": "Umetni stupac poslije",
    "Delete column": "Obri\u0161i stupac",
    "Cell": "Polje",
    "Merge cells": "Spoji polja",
    "Horizontal split": "Horizontalno razdvajanje polja",
    "Vertical split": "Vertikalno razdvajanje polja",
    "Cell Background": "Polje pozadine",
    "Vertical Align": "Vertikalno poravnanje",
    "Top": "Vrh",
    "Middle": "Sredina",
    "Bottom": "Dno",
    "Align Top": "Poravnaj na vrh",
    "Align Middle": "Poravnaj po sredini",
    "Align Bottom": "Poravnaj na dno",
    "Cell Style": "Stil polja",
    "Table Header": "Zaglavlje tablice",
    "Remove Table": "Izbri\u0161i tablicu",

    // Files
    "Upload File": "Prijenos datoteke",
    "Drop file": "Ispusti datoteku",

    // Emoticons
    "Emoticons": "Emotikoni",
    "Grinning face": "Nacereno lice",
    "Grinning face with smiling eyes": "Nacereno lice s nasmije\u0161enim o\u010dima",
    "Face with tears of joy": "Lice sa suzama radosnicama",
    "Smiling face with open mouth": "Nasmijano lice s otvorenim ustima",
    "Smiling face with open mouth and smiling eyes": "Nasmijano lice s otvorenim ustima i nasmijanim o\u010dima",
    "Smiling face with open mouth and cold sweat": "Nasmijano lice s otvorenim ustima i hladnim znojem",
    "Smiling face with open mouth and tightly-closed eyes": "Nasmijano lice s otvorenim ustima i \u010dvrsto zatvorenih o\u010diju",
    "Smiling face with halo": "Nasmijano lice sa aureolom",
    "Smiling face with horns": "Nasmijano lice s rogovima",
    "Winking face": "Lice koje namiguje",
    "Smiling face with smiling eyes": "Nasmijano lice s nasmiješenim o\u010dima",
    "Face savoring delicious food": "Lice koje u\u017eiva ukusnu hranu",
    "Relieved face": "Lice s olak\u0161anjem",
    "Smiling face with heart-shaped eyes": "Nasmijano lice sa o\u010dima u obliku srca",
    "Smiling face with sunglasses": "Nasmijano lice sa sun\u010danim nao\u010dalama",
    "Smirking face": "Zlokobno nasmije\u0161eno lice",
    "Neutral face": "Neutralno lice",
    "Expressionless face": "Bezizra\u017eajno lice",
    "Unamused face": "Nezainteresirano lice",
    "Face with cold sweat": "Lice s hladnim znojem",
    "Pensive face": "Zami\u0161ljeno lice",
    "Confused face": "Zbunjeno lice",
    "Confounded face": "Zbunjeno lice",
    "Kissing face": "Lice s poljupcem",
    "Face throwing a kiss": "Lice koje baca poljubac",
    "Kissing face with smiling eyes": "Lice s poljupcem s nasmije\u0161enim o\u010dima",
    "Kissing face with closed eyes": "Lice s poljupcem zatvorenih o\u010diju",
    "Face with stuck out tongue": "Lice s ispru\u017eenim jezikom",
    "Face with stuck out tongue and winking eye": "Lice s ispru\u017eenim jezikom koje namiguje",
    "Face with stuck out tongue and tightly-closed eyes": "Lice s ispru\u017eenim jezikom i \u010dvrsto zatvorenih o\u010diju",
    "Disappointed face": "Razo\u010darano lice",
    "Worried face": "Zabrinuto lice",
    "Angry face": "Ljutito lice",
    "Pouting face": "Nadureno lice",
    "Crying face": "Uplakano lice",
    "Persevering face": "Lice s negodovanjem",
    "Face with look of triumph": "Trijumfalno lice",
    "Disappointed but relieved face": "Razo\u010darano ali olakšano lice",
    "Frowning face with open mouth": "Namrgo\u0111eno lice s otvorenim ustima",
    "Anguished face": "Tjeskobno lice",
    "Fearful face": "Prestra\u0161eno lice",
    "Weary face": "Umorno lice",
    "Sleepy face": "Pospano lice",
    "Tired face": "Umorno lice",
    "Grimacing face": "Lice sa grimasama",
    "Loudly crying face": "Glasno pla\u010du\u0107e lice",
    "Face with open mouth": "Lice s otvorenim ustima",
    "Hushed face": "Tiho lice",
    "Face with open mouth and cold sweat": "Lice s otvorenim ustima i hladnim znojem",
    "Face screaming in fear": "Lice koje vri\u0161ti u strahu",
    "Astonished face": "Zaprepa\u0161teno lice",
    "Flushed face": "Zajapureno lice",
    "Sleeping face": "Spava\u0107e lice",
    "Dizzy face": "Lice sa vrtoglavicom",
    "Face without mouth": "Lice bez usta",
    "Face with medical mask": "Lice s medicinskom maskom",

    // Line breaker
    "Break": "Odvojeno",

    // Math
    "Subscript": "Indeks",
    "Superscript": "Eksponent",

    // Full screen
    "Fullscreen": "Puni zaslon",

    // Horizontal line
    "Insert Horizontal Line": "Umetni liniju",

    // Clear formatting
    "Clear Formatting": "Ukloni oblikovanje",

    // Undo, redo
    "Undo": "Korak natrag",
    "Redo": "Korak naprijed",

    // Select all
    "Select All": "Odaberi sve",

    // Code view
    "Code View": "Pregled koda",

    // Quote
    "Quote": "Citat",
    "Increase": "Pove\u0107aj",
    "Decrease": "Smanji"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Hungarian
 */


$.FroalaEditor.LANGUAGE['hu'] = {
  translation: {
    // Place holder
    "Type something": "T\u00edpus valami",

    // Basic formatting
    "Bold": "F\u00e9lk\u00f6v\u00e9r",
    "Italic": "D\u0151lt",
    "Underline": "Al\u00e1h\u00fazott",
    "Strikethrough": "\u00c1th\u00fazott",

    // Main buttons
    "Insert": "Beilleszt\u00e9se",
    "Delete": "T\u00f6r\u00f6l",
    "Cancel": "M\u00e9gse",
    "OK": "Rendben",
    "Back": "Vissza",
    "Remove": "Elt\u00e1vol\u00edt\u00e1sa",
    "More": "T\u00f6bb",
    "Update": "Friss\u00edt\u00e9s",
    "Style": "St\u00edlus",

    // Font
    "Font Family": "Bet\u0171t\u00edpus",
    "Font Size": "Bet\u0171m\u00e9retek",

    // Colors
    "Colors": "Sz\u00ednek",
    "Background": "H\u00e1tt\u00e9r",
    "Text": "Sz\u00f6veg",

    // Paragraphs
    "Paragraph Format": "Form\u00e1tumok",
    "Normal": "Norm\u00e1l",
    "Code": "K\u00f3d",
    "Heading 1": "C\u00edmsor 1",
    "Heading 2": "C\u00edmsor 2",
    "Heading 3": "C\u00edmsor 3",
    "Heading 4": "C\u00edmsor 4",

    // Style
    "Paragraph Style": "Bekezd\u00e9s st\u00edlus\u00e1t",
    "Inline Style": "Helyi st\u00edlus",

    // Alignment
    "Align": "Igaz\u00edt\u00e1s",
    "Align Left": "Balra igaz\u00edt",
    "Align Center": "K\u00f6z\u00e9pre z\u00e1r",
    "Align Right": "Jobbra igaz\u00edt",
    "Align Justify": "Sorkiz\u00e1r\u00e1s",
    "None": "Egyik sem",

    // Lists
    "Ordered List": "Sz\u00e1moz\u00e1s",
    "Unordered List": "Felsorol\u00e1s",

    // Indent
    "Decrease Indent": "Beh\u00faz\u00e1s cs\u00f6kkent\u00e9se",
    "Increase Indent": "Beh\u00faz\u00e1s n\u00f6vel\u00e9se",

    // Links
    "Insert Link": "Link beilleszt\u00e9se",
    "Open in new tab": "Megnyit\u00e1s \u00faj lapon",
    "Open Link": "Link megnyit\u00e1sa",
    "Edit Link": "Szerkeszt\u00e9s linkre",
    "Unlink": "Hivatkoz\u00e1s t\u00f6rl\u00e9se",
    "Choose Link": "V\u00e1lasztani linket",

    // Images
    "Insert Image": "K\u00e9p besz\u00far\u00e1sa",
    "Upload Image": "Felt\u00f6lt\u00e9s k\u00e9p",
    "By URL": "\u00c1ltal URL",
    "Browse": "B\u00f6ng\u00e9sszen",
    "Drop image": "Dobd k\u00e9p",
    "or click": "vagy kattintson",
    "Manage Images": "K\u00e9pek kezel\u00e9se",
    "Loading": "Terhel\u00e9s",
    "Deleting": "T\u00f6rl\u00e9se",
    "Tags": "C\u00edmk\u00e9k",
    "Are you sure? Image will be deleted.": "Biztos vagy benne? K\u00e9p t\u00f6rl\u00e9sre ker\u00fcl.",
    "Replace": "Cser\u00e9je",
    "Uploading": "Felt\u00f6lt\u00e9s",
    "Loading image": "K\u00e9pfelt\u00f6lt\u00e9s",
    "Display": "Kijelz\u0151",
    "Inline": "Sorban",
    "Break Text": "T\u00f6r sz\u00f6veg",
    "Alternate Text": "Alternat\u00edv sz\u00f6veget",
    "Change Size": "M\u00e9ret\u00e9nek v\u00e1ltoz\u00e1sa",
    "Width": "Sz\u00e9less\u00e9g",
    "Height": "Magass\u00e1g",
    "Something went wrong. Please try again.": "Valami elromlott. K\u00e9rlek pr\u00f3b\u00e1ld \u00fajra.",

    // Video
    "Insert Video": "Vide\u00f3 beilleszt\u00e9se",
    "Embedded Code": "Be\u00e1gyazott k\u00f3dot",

    // Tables
    "Insert Table": "T\u00e1bl\u00e1zat beilleszt\u00e9se",
    "Header": "Fejl\u00e9c",
    "Row": "Sor",
    "Insert row above": "Sor besz\u00far\u00e1sa el\u00e9",
    "Insert row below": "Sor besz\u00far\u00e1sa m\u00f6g\u00e9",
    "Delete row": "Sor t\u00f6rl\u00e9se",
    "Column": "Oszlop",
    "Insert column before": "Oszlop besz\u00far\u00e1sa el\u00e9",
    "Insert column after": "Oszlop besz\u00far\u00e1sa m\u00f6g\u00e9",
    "Delete column": "Oszlop t\u00f6rl\u00e9se",
    "Cell": "Cella",
    "Merge cells": "Cell\u00e1k egyes\u00edt\u00e9se",
    "Horizontal split": "V\u00edzszintes osztott",
    "Vertical split": "F\u00fcgg\u0151leges osztott",
    "Cell Background": "Cella h\u00e1tt\u00e9r",
    "Vertical Align": "F\u00fcgg\u0151leges fej\u00e1ll\u00edt\u00e1s",
    "Top": "Fels\u0151",
    "Middle": "K\u00f6z\u00e9ps\u0151",
    "Bottom": "Als\u00f3",
    "Align Top": "Igaz\u00edtsa fels\u0151",
    "Align Middle": "Igaz\u00edtsa k\u00f6zep\u00e9n",
    "Align Bottom": "Igaz\u00edtsa alj\u00e1n",
    "Cell Style": "Cellast\u00edlust",

    // Files
    "Upload File": "F\u00e1jl felt\u00f6lt\u00e9se",
    "Drop file": "Csepp f\u00e1jl",

    // Emoticons
    "Emoticons": "Hangulatjelek",
    "Grinning face": "Vigyorg\u00f3",
    "Grinning face with smiling eyes": "Vigyorg\u00f3 arca mosolyg\u00f3 szemek",
    "Face with tears of joy": "Arc \u00e1t az \u00f6r\u00f6m k\u00f6nnyei",
    "Smiling face with open mouth": "Mosolyg\u00f3 arc t\u00e1tott sz\u00e1jjal",
    "Smiling face with open mouth and smiling eyes": "Mosolyg\u00f3 arc t\u00e1tott sz\u00e1jjal \u00e9s mosolyg\u00f3 szemek",
    "Smiling face with open mouth and cold sweat": "Mosolyg\u00f3 arc t\u00e1tott sz\u00e1jjal \u00e9s hideg ver\u00edt\u00e9k",
    "Smiling face with open mouth and tightly-closed eyes": "Mosolyg\u00f3 arc t\u00e1tott sz\u00e1jjal \u00e9s szorosan lehunyt szemmel",
    "Smiling face with halo": "Mosolyg\u00f3 arc halo",
    "Smiling face with horns": "Mosolyg\u00f3 arc szarvakkal",
    "Winking face": "Kacsintott arca",
    "Smiling face with smiling eyes": "Mosolyg\u00f3 arc mosolyg\u00f3 szemek",
    "Face savoring delicious food": "Arc \u00edzlelgette \u00edzletes \u00e9telek",
    "Relieved face": "Megk\u00f6nnyebb\u00fclt arccal",
    "Smiling face with heart-shaped eyes": "Mosolyg\u00f3 arc sz\u00edv alak\u00fa szemek",
    "Smiling face with sunglasses": "Mosolyg\u00f3 arc, napszem\u00fcveg",
    "Smirking face": "Vigyorg\u00f3 arca",
    "Neutral face": "Semleges arc",
    "Expressionless face": "Kifejez\u00e9stelen arc",
    "Unamused face": "Unott arc",
    "Face with cold sweat": "Arc\u00e1t hideg verejt\u00e9k",
    "Pensive face": "T\u00f6preng\u0151 arca",
    "Confused face": "Zavaros arca",
    "Confounded face": "R\u00e1c\u00e1folt arca",
    "Kissing face": "Cs\u00f3k arca",
    "Face throwing a kiss": "Arc dobott egy cs\u00f3kot",
    "Kissing face with smiling eyes": "Cs\u00f3kos arc\u00e1t mosolyg\u00f3 szemek",
    "Kissing face with closed eyes": "Cs\u00f3kos arc\u00e1t csukott szemmel",
    "Face with stuck out tongue": "Szembe kiny\u00fajtotta a nyelv\u00e9t",
    "Face with stuck out tongue and winking eye": "Szembe kiny\u00fajtotta a nyelv\u00e9t, \u00e9s kacsintott szem",
    "Face with stuck out tongue and tightly-closed eyes": "Arc kiny\u00fajtotta a nyelv\u00e9t, \u00e9s szorosan lehunyt szemmel",
    "Disappointed face": "Csal\u00f3dott arca",
    "Worried face": "Agg\u00f3d\u00f3 arc\u00e1t",
    "Angry face": "D\u00fch\u00f6s arc",
    "Pouting face": "Duzzogva arc",
    "Crying face": "S\u00edr\u00f3 arc",
    "Persevering face": "Kitart\u00f3 arca",
    "Face with look of triumph": "Arc\u00e1t diadalmas pillant\u00e1st",
    "Disappointed but relieved face": "Csal\u00f3dott, de megk\u00f6nnyebb\u00fclt arccal",
    "Frowning face with open mouth": "Komor arcb\u00f3l t\u00e1tott sz\u00e1jjal",
    "Anguished face": "Gy\u00f6tr\u0151d\u0151 arca",
    "Fearful face": "F\u00e9lelmetes arc",
    "Weary face": "F\u00e1radt arca",
    "Sleepy face": "\u00e1lmos arc",
    "Tired face": "F\u00e1radt arca",
    "Grimacing face": "Fintorogva arc",
    "Loudly crying face": "Hangosan s\u00edr\u00f3 arc",
    "Face with open mouth": "Arc t\u00e1tott sz\u00e1jjal",
    "Hushed face": "Csit\u00edtotta arca",
    "Face with open mouth and cold sweat": "Arc t\u00e1tott sz\u00e1jjal \u00e9s hideg ver\u00edt\u00e9k",
    "Face screaming in fear": "Arc sikoltozva f\u00e9lelem",
    "Astonished face": "Meglepett arca",
    "Flushed face": "Kipirult arc",
    "Sleeping face": "Alv\u00f3 arc\u00e1t",
    "Dizzy face": "sz\u00e1d\u00fcl arca",
    "Face without mouth": "Arc n\u00e9lkül sz\u00e1j",
    "Face with medical mask": "Arc\u00e1t orvosi maszk",

    // Line breaker
    "Break": "T\u00f6r",

    // Math
    "Subscript": "Als\u00f3 index",
    "Superscript": "Fels\u0151 index",

    // Full screen
    "Fullscreen": "Teljes k\u00e9perny\u0151s",

    // Horizontal line
    "Insert Horizontal Line": "Helyezze v\u00edzszintes vonal",

    // Clear formatting
    "Clear Formatting": "Form\u00e1z\u00e1s elt\u00e1vol\u00edt\u00e1sa",

    // Undo, redo
    "Undo": "Visszavon\u00e1s",
    "Redo": "Ism\u00e9t",

    // Select all
    "Select All": "Minden kijel\u00f6l\u00e9se",

    // Code view
    "Code View": "K\u00f3d n\u00e9zet",

    // Quote
    "Quote": "Id\u00e9zet",
    "Increase": "N\u00f6veked\u00e9s",
    "Decrease": "Cs\u00f6kkent"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Indonesian
 */


$.FroalaEditor.LANGUAGE['id'] = {
  translation: {
    // Place holder
    "Type something": "Ketik sesuatu",

    // Basic formatting
    "Bold": "Tebal",
    "Italic": "Miring",
    "Underline": "Garis bawah",
    "Strikethrough": "Coret",

    // Main buttons
    "Insert": "Memasukkan",
    "Delete": "Hapus",
    "Cancel": "Batal",
    "OK": "Ok",
    "Back": "Kembali",
    "Remove": "Hapus",
    "More": "Lebih",
    "Update": "Memperbarui",
    "Style": "Gaya",

    // Font
    "Font Family": "Jenis Huruf",
    "Font Size": "Ukuran leter",

    // Colors
    "Colors": "Warna",
    "Background": "Latar belakang",
    "Text": "Teks",

    // Paragraphs
    "Paragraph Format": "Format",
    "Normal": "Normal",
    "Code": "Kode",
    "Heading 1": "Header 1",
    "Heading 2": "Header 2",
    "Heading 3": "Header 3",
    "Heading 4": "Header 4",

    // Style
    "Paragraph Style": "Paragraf gaya",
    "Inline Style": "Di barisan gaya",

    // Alignment
    "Align": "Rate",
    "Align Left": "Rate kiri",
    "Align Center": "Rate tengah",
    "Align Right": "Rata kanan",
    "Align Justify": "Justifi",
    "None": "Tak satupun",

    // Lists
    "Ordered List": "List nomor",
    "Unordered List": "List simbol",

    // Indent
    "Decrease Indent": "Turunkan inden",
    "Increase Indent": "Tambah inden",

    // Links
    "Insert Link": "Memasukkan link",
    "Open in new tab": "Buka di tab baru",
    "Open Link": "Buka tautan",
    "Edit Link": "Mengedit link",
    "Unlink": "Menghapus link",
    "Choose Link": "Memilih link",

    // Images
    "Insert Image": "Memasukkan gambar",
    "Upload Image": "Meng-upload gambar",
    "By URL": "Oleh URL",
    "Browse": "Melihat-lihat",
    "Drop image": "Jatuhkan gambar",
    "or click": "atau klik",
    "Manage Images": "Mengelola gambar",
    "Loading": "Pemuatan",
    "Deleting": "Menghapus",
    "Tags": "Label",
    "Are you sure? Image will be deleted.": "Apakah Anda yakin? Gambar akan dihapus.",
    "Replace": "Mengganti",
    "Uploading": "Gambar upload",
    "Loading image": "Pemuatan gambar",
    "Display": "Pameran",
    "Inline": "Di barisan",
    "Break Text": "Memecah teks",
    "Alternate Text": "Teks alternatif",
    "Change Size": "Ukuran perubahan",
    "Width": "Lebar",
    "Height": "Tinggi",
    "Something went wrong. Please try again.": "Ada yang salah. Silakan coba lagi.",

    // Video
    "Insert Video": "Memasukkan video",
    "Embedded Code": "Kode tertanam",

    // Tables
    "Insert Table": "Sisipkan tabel",
    "Header": "Header",
    "Row": "Baris",
    "Insert row above": "Sisipkan baris di atas",
    "Insert row below": "Sisipkan baris di bawah",
    "Delete row": "Hapus baris",
    "Column": "Kolom",
    "Insert column before": "Sisipkan kolom sebelumSisipkan kolom sebelum",
    "Insert column after": "Sisipkan kolom setelah",
    "Delete column": "Hapus kolom",
    "Cell": "Sel",
    "Merge cells": "Menggabungkan sel",
    "Horizontal split": "Perpecahan horisontal",
    "Vertical split": "Perpecahan vertikal",
    "Cell Background": "Latar belakang sel",
    "Vertical Align": "Menyelaraskan vertikal",
    "Top": "Teratas",
    "Middle": "Tengah",
    "Bottom": "Bagian bawah",
    "Align Top": "Menyelaraskan atas",
    "Align Middle": "Menyelaraskan tengah",
    "Align Bottom": "Menyelaraskan bawah",
    "Cell Style": "Gaya sel",

    // Files
    "Upload File": "Meng-upload berkas",
    "Drop file": "Jatuhkan berkas",

    // Emoticons
    "Emoticons": "Emoticon",
    "Grinning face": "Sambil tersenyum wajah",
    "Grinning face with smiling eyes": "Sambil tersenyum wajah dengan mata tersenyum",
    "Face with tears of joy": "Hadapi dengan air mata sukacita",
    "Smiling face with open mouth": "Tersenyum wajah dengan mulut terbuka",
    "Smiling face with open mouth and smiling eyes": "Tersenyum wajah dengan mulut terbuka dan tersenyum mata",
    "Smiling face with open mouth and cold sweat": "Tersenyum wajah dengan mulut terbuka dan keringat dingin",
    "Smiling face with open mouth and tightly-closed eyes": "Tersenyum wajah dengan mulut terbuka dan mata tertutup rapat",
    "Smiling face with halo": "Tersenyum wajah dengan halo",
    "Smiling face with horns": "Tersenyum wajah dengan tanduk",
    "Winking face": "Mengedip wajah",
    "Smiling face with smiling eyes": "Tersenyum wajah dengan mata tersenyum",
    "Face savoring delicious food": "Wajah menikmati makanan lezat",
    "Relieved face": "Wajah Lega",
    "Smiling face with heart-shaped eyes": "Tersenyum wajah dengan mata berbentuk hati",
    "Smiling face with sunglasses": "Tersenyum wajah dengan kacamata hitam",
    "Smirking face": "Menyeringai wajah",
    "Neutral face": "Wajah Netral",
    "Expressionless face": "Wajah tanpa ekspresi",
    "Unamused face": "Wajah tidak senang",
    "Face with cold sweat": "Muka dengan keringat dingin",
    "Pensive face": "Wajah termenung",
    "Confused face": "Wajah Bingung",
    "Confounded face": "Wajah kesal",
    "Kissing face": "wajah mencium",
    "Face throwing a kiss": "Wajah melempar ciuman",
    "Kissing face with smiling eyes": "Berciuman wajah dengan mata tersenyum",
    "Kissing face with closed eyes": "Berciuman wajah dengan mata tertutup",
    "Face with stuck out tongue": "Muka dengan menjulurkan lidah",
    "Face with stuck out tongue and winking eye": "Muka dengan menjulurkan lidah dan mengedip mata",
    "Face with stuck out tongue and tightly-closed eyes": "Wajah dengan lidah terjebak dan mata erat-tertutup",
    "Disappointed face": "Wajah kecewa",
    "Worried face": "Wajah Khawatir",
    "Angry face": "Wajah Marah",
    "Pouting face": "Cemberut wajah",
    "Crying face": "Menangis wajah",
    "Persevering face": "Tekun wajah",
    "Face with look of triumph": "Hadapi dengan tampilan kemenangan",
    "Disappointed but relieved face": "Kecewa tapi lega wajah",
    "Frowning face with open mouth": "Sambil mengerutkan kening wajah dengan mulut terbuka",
    "Anguished face": "Wajah sedih",
    "Fearful face": "Wajah Takut",
    "Weary face": "Wajah lelah",
    "Sleepy face": "wajah mengantuk",
    "Tired face": "Wajah Lelah",
    "Grimacing face": "Sambil meringis wajah",
    "Loudly crying face": "Keras menangis wajah",
    "Face with open mouth": "Hadapi dengan mulut terbuka",
    "Hushed face": "Wajah dipetieskan",
    "Face with open mouth and cold sweat": "Hadapi dengan mulut terbuka dan keringat dingin",
    "Face screaming in fear": "Hadapi berteriak dalam ketakutan",
    "Astonished face": "Wajah Kaget",
    "Flushed face": "Wajah memerah",
    "Sleeping face": "Tidur face",
    "Dizzy face": "Wajah pusing",
    "Face without mouth": "Wajah tanpa mulut",
    "Face with medical mask": "Hadapi dengan masker medis",

    // Line breaker
    "Break": "Memecah",

    // Math
    "Subscript": "Subskrip",
    "Superscript": "Superskrip",

    // Full screen
    "Fullscreen": "Layar penuh",

    // Horizontal line
    "Insert Horizontal Line": "Sisipkan Garis Horizontal",

    // Clear formatting
    "Clear Formatting": "Menghapus format",

    // Undo, redo
    "Undo": "Batal",
    "Redo": "Ulang",

    // Select all
    "Select All": "Pilih semua",

    // Code view
    "Code View": "Melihat kode",

    // Quote
    "Quote": "Kutipan",
    "Increase": "Meningkat",
    "Decrease": "Penurunan"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Italian
 */


$.FroalaEditor.LANGUAGE['it'] = {
  translation: {
    // Place holder
    "Type something": "Digita qualcosa",

    // Basic formatting
    "Bold": "Grassetto",
    "Italic": "Corsivo",
    "Underline": "Sottolineato",
    "Strikethrough": "Barrato",

    // Main buttons
    "Insert": "Inserisci",
    "Delete": "Cancella",
    "Cancel": "Cancella",
    "OK": "Ok",
    "Back": "Indietro",
    "Remove": "Rimuovi",
    "More": "Di pi\u00f9",
    "Update": "Aggiornare",
    "Style": "Stile",

    // Font
    "Font Family": "Carattere",
    "Font Size": "Dimensione Carattere",

    // Colors
    "Colors": "Colori",
    "Background": "Sfondo",
    "Text": "Testo",

    // Paragraphs
    "Paragraph Format": "Formattazione",
    "Normal": "Normale",
    "Code": "Codice",
    "Heading 1": "Intestazione 1",
    "Heading 2": "Intestazione 2",
    "Heading 3": "Intestazione 3",
    "Heading 4": "Intestazione 4",

    // Style
    "Paragraph Style": "Stile di paragrafo",
    "Inline Style": "Stile in fila",

    // Alignment
    "Align": "Allinea",
    "Align Left": "Allinea a Sinistra",
    "Align Center": "Allinea al Cento",
    "Align Right": "Allinea a Destra",
    "Align Justify": "Giustifica",
    "None": "Nessuno",

    // Lists
    "Ordered List": "Elenchi ordinato",
    "Unordered List": "Elenchi non ordinata",

    // Indent
    "Decrease Indent": "Riduci Rientro",
    "Increase Indent": "Aumenta Rientro",

    // Links
    "Insert Link": "Inserisci Link",
    "Open in new tab": "Apri in nuova scheda",
    "Open Link": "Link aperto",
    "Edit Link": "Modifica link",
    "Unlink": "Rimuovi link",
    "Choose Link": "Scegli link",

    // Images
    "Insert Image": "Inserisci immagine",
    "Upload Image": "Carica immagine",
    "By URL": "Per URL",
    "Browse": "Sfogliare",
    "Drop image": "Rilascia Immagine",
    "or click": "oppure fai click su",
    "Manage Images": "Gestione immagini",
    "Loading": "Caricamento",
    "Deleting": "Eliminazione",
    "Tags": "Etichetta",
    "Are you sure? Image will be deleted.": "Sei sicuro? Immagine verr\u00e0 cancellata.",
    "Replace": "Sostituisci",
    "Uploading": "Caricamento",
    "Loading image": "Caricamento immagine",
    "Display": "Visualizzazione",
    "Inline": "In fila",
    "Break Text": "Testo di separazione",
    "Alternate Text": "Testo alternativo",
    "Change Size": "Cambio formato",
    "Width": "Larghezza",
    "Height": "Altezza",
    "Something went wrong. Please try again.": "Qualcosa \u00e8 andato storto. Riprova, per favore.",

    // Video
    "Insert Video": "Inserisci Video",
    "Embedded Code": "Codice incorporato",

    // Tables
    "Insert Table": "Inserisci Tabella",
    "Header": "Intestazione",
    "Row": "Riga",
    "Insert row above": "Inserisci una Riga Prima",
    "Insert row below": "Inserisci una Riga Dopo",
    "Delete row": "Cancella Riga",
    "Column": "Colonna",
    "Insert column before": "Inserisci una Colonna Prima",
    "Insert column after": "Inserisci una Colonna Dopo",
    "Delete column": "Cancella Colonna",
    "Cell": "Cella",
    "Merge cells": "Unisci Cella",
    "Horizontal split": "Divisione Orizzontale",
    "Vertical split": "Divisione Verticale",
    "Cell Background": "Sfondo della cella",
    "Vertical Align": "allineamento verticale",
    "Top": "Alto",
    "Middle": "Mezzo",
    "Bottom": "Fondo",
    "Align Top": "Allinea in alto",
    "Align Middle": "Allinea al centro",
    "Align Bottom": "Allinea in basso",
    "Cell Style": "Stile di cella",

    // Files
    "Upload File": "Carica File",
    "Drop file": "Rilascia File",

    // Emoticons
    "Emoticons": "Emoticon",
    "Grinning face": "Sorridendo volto",
    "Grinning face with smiling eyes": "Sorridendo faccia con gli occhi sorridenti",
    "Face with tears of joy": "Faccia con lacrime di gioia",
    "Smiling face with open mouth": "Volto sorridente con la bocca aperta",
    "Smiling face with open mouth and smiling eyes": "Volto sorridente con la bocca aperta e gli occhi sorridenti",
    "Smiling face with open mouth and cold sweat": "Volto sorridente con la bocca aperta e sudore freddo",
    "Smiling face with open mouth and tightly-closed eyes": "Volto sorridente con la bocca aperta e gli occhi ben chiusi",
    "Smiling face with halo": "Volto sorridente con alone",
    "Smiling face with horns": "Volto sorridente con le corna",
    "Winking face": "Fare l'occhiolino volto",
    "Smiling face with smiling eyes": "Volto sorridente con gli occhi sorridenti",
    "Face savoring delicious food": "Volto assaporando cibo delizioso",
    "Relieved face": "Volto Sollevata",
    "Smiling face with heart-shaped eyes": "Volto sorridente con gli occhi a forma di cuore",
    "Smiling face with sunglasses": "Volto sorridente con gli occhiali da sole",
    "Smirking face": "Compiaciuto affrontare",
    "Neutral face": "Volto Neutral",
    "Expressionless face": "Volto inespressivo",
    "Unamused face": "Faccia non divertito",
    "Face with cold sweat": "Faccia con sudore freddo",
    "Pensive face": "Volto pensieroso",
    "Confused face": "Volto confuso",
    "Confounded face": "Volto confusi",
    "Kissing face": "Baciare faccia",
    "Face throwing a kiss": "Volto lanciando un bacio",
    "Kissing face with smiling eyes": "Baciare faccia con gli occhi sorridenti",
    "Kissing face with closed eyes": "Baciare faccia con gli occhi chiusi",
    "Face with stuck out tongue": "Faccia con la lingua fuori bloccato",
    "Face with stuck out tongue and winking eye": "Faccia con la lingua fuori bloccato e ammiccante occhio",
    "Face with stuck out tongue and tightly-closed eyes": "Faccia con la lingua fuori bloccato e gli occhi ben chiusi",
    "Disappointed face": "Volto deluso",
    "Worried face": "Faccia preoccupata",
    "Angry face": "Faccia arrabbiata",
    "Pouting face": "Fare il muso volto",
    "Crying face": "Piangere volto",
    "Persevering face": "Perseverando volto",
    "Face with look of triumph": "Affrontare con sguardo di trionfo",
    "Disappointed but relieved face": "Siamo rimasti delusi ma sollevato la faccia",
    "Frowning face with open mouth": "Accigliandosi volto con la bocca aperta",
    "Anguished face": "Volto Angosciato",
    "Fearful face": "Volto Temendo",
    "Weary face": "Volto stanco",
    "Sleepy face": "Faccia assonnata",
    "Tired face": "Volto stanco",
    "Grimacing face": "Smorfie volto",
    "Loudly crying face": "Ad alta voce che grida volto",
    "Face with open mouth": "Volto con la bocca aperta",
    "Hushed face": "Faccia ovattata",
    "Face with open mouth and cold sweat": "Volto con la bocca aperta e sudore freddo",
    "Face screaming in fear": "Volto urlando nella paura",
    "Astonished face": "Volto Stupito",
    "Flushed face": "Viso rosso",
    "Sleeping face": "Viso addormentato",
    "Dizzy face": "Faccia vertigini",
    "Face without mouth": "Volto senza bocca",
    "Face with medical mask": "Volto con la mascherina medica",

    // Line breaker
    "Break": "Separazione",

    // Math
    "Subscript": "Pedice",
    "Superscript": "Apice",

    // Full screen
    "Fullscreen": "Schermo intero",

    // Horizontal line
    "Insert Horizontal Line": "Inserisci Divisore Orizzontale",

    // Clear formatting
    "Clear Formatting": "Cancella formattazione",

    // Undo, redo
    "Undo": "Annulla",
    "Redo": "Ripeti",

    // Select all
    "Select All": "Seleziona Tutto",

    // Code view
    "Code View": "Visualizzazione di codice",

    // Quote
    "Quote": "Citazione",
    "Increase": "Aumentare",
    "Decrease": "Diminuzione"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Japanese
 */


$.FroalaEditor.LANGUAGE['ja'] = {
  translation: {
    // Place holder
    "Type something": "\u4f55\u304b\u5165\u529b",

    // Basic formatting
    "Bold": "\u592a\u5b57",
    "Italic": "\u659c\u4f53",
    "Underline": "\u4e0b\u7dda",
    "Strikethrough": "\u53d6\u308a\u6d88\u3057\u7dda",

    // Main buttons
    "Insert": "\u30a4\u30f3\u30b5\u30fc\u30c8",
    "Delete": "\u524a\u9664",
    "Cancel": "\u30ad\u30e3\u30f3\u30bb\u30eb",
    "OK": "OK",
    "Back": "\u30d0\u30c3\u30af",
    "Remove": "\u524a\u9664\u3057\u307e\u3059",
    "More": "\u3082\u3063\u3068",
    "Update": "\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8",
    "Style": "\u30b9\u30bf\u30a4\u30eb",

    // Font
    "Font Family": "\u30d5\u30a9\u30f3\u30c8\u30d5\u30a1\u30df\u30ea\u30fc",
    "Font Size": "\u30d5\u30a9\u30f3\u30c8\u30b5\u30a4\u30ba",

    // Colors
    "Colors": "\u8272",
    "Background": "\u80cc\u666f",
    "Text": "\u30c6\u30ad\u30b9\u30c8",

    // Paragraphs
    "Paragraph Format": "\u6bb5\u843d\u306e\u66f8\u5f0f",
    "Normal": "\u30ce\u30fc\u30de\u30eb",
    "Code": "\u30b3\u30fc\u30c9",
    "Heading 1": "\u30d8\u30c3\u30c0\u30fc 1",
    "Heading 2": "\u30d8\u30c3\u30c0\u30fc 2",
    "Heading 3": "\u30d8\u30c3\u30c0\u30fc 3",
    "Heading 4": "\u30d8\u30c3\u30c0\u30fc 4",

    // Style
    "Paragraph Style": "\u6bb5\u843d\u30b9\u30bf\u30a4\u30eb",
    "Inline Style": "\u30a4\u30f3\u30e9\u30a4\u30f3\u30b9\u30bf\u30a4\u30eb",

    // Alignment
    "Align": "\u914d\u7f6e",
    "Align Left": "\u5de6\u5bc4\u305b",
    "Align Center": "\u4e2d\u592e\u63c3\u3048",
    "Align Right": "\u53f3\u5bc4\u305b",
    "Align Justify": "\u4e21\u7aef\u63c3\u3048",
    "None": "\u306a\u3057",

    // Lists
    "Ordered List": "\u756a\u53f7\u4ed8\u304d\u7b87\u6761\u66f8\u304d",
    "Unordered List": "\u7b87\u6761\u66f8\u304d",

    // Indent
    "Decrease Indent": "\u30a4\u30f3\u30c7\u30f3\u30c8\u3092\u6e1b\u3089\u3059",
    "Increase Indent": "\u30a4\u30f3\u30c7\u30f3\u30c8\u3092\u5897\u3084\u3059",

    // Links
    "Insert Link": "\u30ea\u30f3\u30af",
    "Open in new tab": "\u65b0\u3057\u3044\u30bf\u30d6\u3067\u958b\u304f",
    "Open Link": "\u30ea\u30f3\u30af\u3092\u958b\u304d\u307e\u3059",
    "Edit Link": "\u7de8\u96c6\u30ea\u30f3\u30af",
    "Unlink": "\u30ea\u30f3\u30af\u306e\u524a\u9664",
    "Choose Link": "\u30ea\u30f3\u30af\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044",

    // Images
    "Insert Image": "\u753b\u50cf\u306e\u633f\u5165",
    "Upload Image": "\u753b\u50cf\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9",
    "By URL": "URL \u306b\u3088\u3063\u3066",
    "Browse": "\u30d6\u30e9\u30a6\u30ba",
    "Drop image": "\u753b\u50cf\u3092\u30c9\u30ed\u30c3\u30d7",
    "or click": "\u307e\u305f\u306f\u30af\u30ea\u30c3\u30af",
    "Manage Images": "\u30a4\u30e1\u30fc\u30b8\u3092\u7ba1\u7406\u3059\u308b",
    "Loading": "\u30ed\u30fc\u30c7\u30a3\u30f3\u30b0",
    "Deleting": "\u524a\u9664",
    "Tags": "\u30bf\u30b0",
    "Are you sure? Image will be deleted.": "\u672c\u5f53\u306b\u524a\u9664\u3057\u307e\u3059\u304b\uff1f",
    "Replace": "\u4ea4\u63db\u3057\u307e\u3059",
    "Uploading": "\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9",
    "Loading image": "\u753b\u50cf\u8aad\u307f\u8fbc\u307f\u4e2d",
    "Display": "\u30c7\u30a3\u30b9\u30d7\u30ec\u30a4",
    "Inline": "\u5217\u3092\u306a\u3057\u3066",
    "Break Text": "\u30d6\u30ec\u30fc\u30af\u30c6\u30ad\u30b9\u30c8",
    "Alternate Text": "\u4ee3\u66ff\u30c6\u30ad\u30b9\u30c8",
    "Change Size": "\u30b5\u30a4\u30ba\u5909\u66f4",
    "Width": "\u5e45",
    "Height": "\u9ad8\u3055",
    "Something went wrong. Please try again.": "\u4f55\u304b\u304c\u9593\u9055\u3063\u3066\u3044\u307e\u3057\u305f\u3002\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002",

    // Video
    "Insert Video": "\u52d5\u753b\u306e\u633f\u5165",
    "Embedded Code": "\u57cb\u3081\u8fbc\u307f\u30b3\u30fc\u30c9",

    // Tables
    "Insert Table": "\u8868\u306e\u633f\u5165",
    "Header": "\u30d8\u30c3\u30c0",
    "Row": "\u884c",
    "Insert row above": "\u4e0a\u5074\u306b\u884c\u3092\u633f\u5165",
    "Insert row below": "\u4e0b\u5074\u306b\u884c\u3092\u633f\u5165",
    "Delete row": "\u884c\u306e\u524a\u9664",
    "Column": "\u5217",
    "Insert column before": "\u5de6\u5074\u306b\u5217\u3092\u633f\u5165",
    "Insert column after": "\u53f3\u5074\u306b\u5217\u3092\u633f\u5165",
    "Delete column": "\u5217\u306e\u524a\u9664",
    "Cell": "\u30bb\u30eb",
    "Merge cells": "\u30bb\u30eb\u306e\u7d50\u5408",
    "Horizontal split": "\u6c34\u5e73\u5206\u5272",
    "Vertical split": "\u5782\u76f4\u5206\u5272",
    "Cell Background": "\u30bb\u30eb\u306e\u80cc\u666f",
    "Vertical Align": "\u5782\u76f4\u6574\u5217",
    "Top": "\u4e0a",
    "Middle": "\u30df\u30c9\u30eb",
    "Bottom": "\u30dc\u30c8\u30e0",
    "Align Top": "\u30c8\u30c3\u30d7\u306e\u4f4d\u7f6e\u3092\u5408\u308f\u305b\u307e\u3059",
    "Align Middle": "\u4e2d\u592e\u3092\u5408\u308f\u305b\u307e\u3059",
    "Align Bottom": "\u30dc\u30c8\u30e0\u3092\u5408\u308f\u305b",
    "Cell Style": "\u30bb\u30eb\u30b9\u30bf\u30a4\u30eb",

    // Files
    "Upload File": "\u30d5\u30a1\u30a4\u30eb\u306e\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9",
    "Drop file": "\u30d5\u30a1\u30a4\u30eb\u3092\u30c9\u30ed\u30c3\u30d7",

    // Emoticons
    "Emoticons": "\u7d75\u6587\u5b57",
    "Grinning face": "\u300c\u9854\u3092\u306b\u3084\u306b\u3084",
    "Grinning face with smiling eyes": "\u300c\u7b11\u9854\u306e\u76ee\u3067\u9854\u3092\u30cb\u30e4\u30ea",
    "Face with tears of joy": "\u300c\u559c\u3073\u306e\u6d99\u3067\u9854\u300d",
    "Smiling face with open mouth": "\u300c\u53e3\u3092\u958b\u3051\u3066\u9854\u3092\u7b11\u9854",
    "Smiling face with open mouth and smiling eyes": "\u300c\u958b\u3044\u305f\u53e3\u3068\u9854\u3092\u7b11\u9854\u3068\u76ee\u3092\u7b11\u9854",
    "Smiling face with open mouth and cold sweat": "\u300c\u53e3\u3092\u958b\u3051\u3001\u51b7\u305f\u3044\u6c57\u3067\u9854\u3092\u7b11\u9854",
    "Smiling face with open mouth and tightly-closed eyes": "\u300c\u53e3\u3092\u958b\u3051\u3001\u3057\u3063\u304b\u308a\u3068\u9589\u3058\u305f\u76ee\u3067\u9854\u3092\u7b11\u9854",
    "Smiling face with halo": "\u300c\u30cf\u30ed\u3068\u9854\u3092\u7b11\u9854",
    "Smiling face with horns": "\u300c\u89d2\u3067\u9854\u3092\u7b11\u9854",
    "Winking face": "\u300c\u9854\u306e\u30a6\u30a3\u30f3\u30af",
    "Smiling face with smiling eyes": "\u300c\u7b11\u9854\u306e\u76ee\u3067\u9854\u3092\u7b11\u9854",
    "Face savoring delicious food": "\u300c\u7f8e\u5473\u3057\u3044\u6599\u7406\u3092\u5473\u308f\u3046\u9854\u300d",
    "Relieved face": "\u300c\u5b89\u5fc3\u3057\u305f\u9854",
    "Smiling face with heart-shaped eyes": "\u300c\u30cf\u30fc\u30c8\u578b\u306e\u76ee\u3067\u9854\u3092\u7b11\u9854",
    "Smiling face with sunglasses": "\u300c\u30b5\u30f3\u30b0\u30e9\u30b9\u3067\u9854\u3092\u7b11\u9854",
    "Smirking face": "\u300c\u9854\u3092\u30cb\u30e4\u30cb\u30e4\u7b11\u3044",
    "Neutral face": "\u300c\u30cb\u30e5\u30fc\u30c8\u30e9\u30eb\u9854",
    "Expressionless face": "\u300c\u7121\u8868\u60c5\u9854\u300d",
    "Unamused face": "\u300c\u3057\u3089\u3051\u305f\u9854",
    "Face with cold sweat": "\u51b7\u305f\u3044\u6c57\u3067\u9854",
    "Pensive face": "\u300c\u7269\u601d\u3044\u9854",
    "Confused face": "\u300c\u56f0\u60d1\u3057\u305f\u9854",
    "Confounded face": "\u300c\u3079\u3089\u307c\u3046\u9854",
    "Kissing face": "\u300c\u9854\u3092\u30ad\u30b9",
    "Face throwing a kiss": "\u30ad\u30b9\u3092\u6295\u3052\u308b\u9854\u300d",
    "Kissing face with smiling eyes": "\u300c\u7b11\u9854\u306e\u76ee\u3067\u9854\u3092\u30ad\u30b9",
    "Kissing face with closed eyes": "\u300c\u76ee\u3092\u9589\u3058\u9854\u3092\u30ad\u30b9",
    "Face with stuck out tongue": "\u7a81\u304d\u51fa\u3057\u820c\u3067\u9854",
    "Face with stuck out tongue and winking eye": "\u7a81\u304d\u51fa\u3057\u820c\u3068\u76ee\u3067\u30a6\u30a4\u30f3\u30af\u9854",
    "Face with stuck out tongue and tightly-closed eyes": "\u7a81\u304d\u51fa\u3057\u820c\u3001\u3057\u3063\u304b\u308a\u3068\u9589\u3058\u305f\u76ee\u3092\u6301\u3064\u9854",
    "Disappointed face": "\u304c\u3063\u304b\u308a\u3057\u305f\u9854",
    "Worried face": "\u300c\u5fc3\u914d\u9854",
    "Angry face": "\u300c\u6012\u3063\u3066\u3044\u308b\u9854",
    "Pouting face": "\u300c\u9854\u3092\u6012\u3063\u3066",
    "Crying face": "\u6ce3\u304d\u9854",
    "Persevering face": "\u300c\u9854\u306e\u7c98\u308a\u5f37\u3044\u3067\u3059",
    "Face with look of triumph": "\u300c\u52dd\u5229\u306e\u8868\u60c5\u3067\u9854\u300d",
    "Disappointed but relieved face": "\u5931\u671b\u3059\u308b\u304c\u9854\u3092\u5b89\u5fc3",
    "Frowning face with open mouth": "\u300c\u53e3\u3092\u958b\u3051\u3066\u9854\u3092\u3057\u304b\u3081\u3063\u9762",
    "Anguished face": "\u300c\u82e6\u60a9\u306b\u6e80\u3061\u305f\u9854",
    "Fearful face": "\u300c\u6050\u308d\u3057\u3044\u9854",
    "Weary face": "\u300c\u75b2\u308c\u305f\u9854",
    "Sleepy face": "\u300c\u7720\u3044\u9854",
    "Tired face": "\u300c\u75b2\u308c\u305f\u9854",
    "Grimacing face": "\u300c\u9854\u306e\u9854\u3092\u3086\u304c\u3081\u307e\u3059",
    "Loudly crying face": "\u300c\u5927\u58f0\u9854\u3092\u6ce3\u3044",
    "Face with open mouth": "\u300c\u53e3\u3092\u958b\u3051\u3066\u9854\u300d",
    "Hushed face": "\u300c\u9759\u304b\u9854",
    "Face with open mouth and cold sweat": "\u300c\u53e3\u3092\u958b\u3051\u3001\u51b7\u305f\u3044\u6c57\u3067\u9854\u300d",
    "Face screaming in fear": "\u6050\u6016\u306e\u4e2d\u3067\u53eb\u3093\u3067\u9854\u300d",
    "Astonished face": "\u300c\u3073\u3063\u304f\u308a\u3057\u305f\u9854",
    "Flushed face": "\u300c\u30d5\u30e9\u30c3\u30b7\u30e5\u9854",
    "Sleeping face": "\u300c\u9854\u306e\u7720\u308a\u307e\u3059",
    "Dizzy face": "\u300c\u30c7\u30a3\u30b8\u30fc\u9854",
    "Face without mouth": "\u300c\u53e3\u306a\u3057\u3067\u9854\u300d",
    "Face with medical mask": "\u300c\u533b\u7642\u7528\u30de\u30b9\u30af\u3067\u9854",

    // Line breaker
    "Break": "\u30d6\u30ec\u30fc\u30af",

    // Math
    "Subscript": "\u4e0b\u4ed8\u304d\u6587\u5b57",
    "Superscript": "\u4e0a\u4ed8\u304d\u6587\u5b57",

    // Full screen
    "Fullscreen": "\u5168\u753b\u9762\u8868\u793a",

    // Horizontal line
    "Insert Horizontal Line": "\u6c34\u5e73\u7dda\u306e\u633f\u5165",

    // Clear formatting
    "Clear Formatting": "\u66f8\u5f0f\u306e\u30af\u30ea\u30a2",

    // Undo, redo
    "Undo": "\u5143\u306b\u623b\u3059",
    "Redo": "\u3084\u308a\u76f4\u3059",

    // Select all
    "Select All": "\u5168\u3066\u3092\u9078\u629e",

    // Code view
    "Code View": "\u30b3\u30fc\u30c9\u30d3\u30e5\u30fc",

    // Quote
    "Quote": "\u5f15\u7528",
    "Increase": "\u5897\u52a0",
    "Decrease": "\u6e1b\u5c11"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Korean
 */


$.FroalaEditor.LANGUAGE['ko'] = {
  translation: {
    // Place holder
    "Type something": "\ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc138\uc694",

    // Basic formatting
    "Bold": "\uad75\uac8c",
    "Italic": "\uae30\uc6b8\uc784\uaf34",
    "Underline": "\ubc11\uc904",
    "Strikethrough": "\ucde8\uc18c\uc120",

    // Main buttons
    "Insert": "\uc0bd\uc785",
    "Delete": "\uc0ad\uc81c",
    "Cancel": "\ucde8\uc18c",
    "OK": "\uc2b9\uc778",
    "Back": "\ubc31",
    "Remove": "\uc81c\uac70",
    "More": "\ub354",
    "Update": "\uc5c5\ub370\uc774\ud2b8",
    "Style": "\uc2a4\ud0c0\uc77c",

    // Font
    "Font Family": "\uae00\uaf34",
    "Font Size": "\ud3f0\ud2b8 \ud06c\uae30",

    // Colors
    "Colors": "\uc0c9\uc0c1",
    "Background": "\ubc30\uacbd",
    "Text": "\ud14d\uc2a4\ud2b8",

    // Paragraphs
    "Paragraph Format": "\ub2e8\ub77d",
    "Normal": "\ud45c\uc900",
    "Code": "\ucf54\ub4dc",
    "Heading 1": "\uc81c\ubaa9 1",
    "Heading 2": "\uc81c\ubaa9 2",
    "Heading 3": "\uc81c\ubaa9 3",
    "Heading 4": "\uc81c\ubaa9 4",

    // Style
    "Paragraph Style": "\ub2e8\ub77d \uc2a4\ud0c0\uc77c",
    "Inline Style": "\uc778\ub77c\uc778 \uc2a4\ud0c0\uc77c",

    // Alignment
    "Align": "\uc815\ub82c",
    "Align Left": "\uc67c\ucabd\uc815\ub82c",
    "Align Center": "\uac00\uc6b4\ub370\uc815\ub82c",
    "Align Right": "\uc624\ub978\ucabd\uc815\ub82c",
    "Align Justify": "\uc591\ucabd\uc815\ub82c",
    "None": "\uc5c6\uc74c",

    // Lists
    "Ordered List": "\uc22b\uc790\ub9ac\uc2a4\ud2b8",
    "Unordered List": "\uc810 \ub9ac\uc2a4\ud2b8",

    // Indent
    "Decrease Indent": "\ub0b4\uc5b4\uc4f0\uae30",
    "Increase Indent": "\ub4e4\uc5ec\uc4f0\uae30",

    // Links
    "Insert Link": "\ub9c1\ud06c \uc0bd\uc785",
    "Open in new tab": "\uc0c8 \ud0ed\uc5d0\uc11c \uc5f4\uae30",
    "Open Link": "\ub9c1\ud06c \uc5f4\uae30",
    "Edit Link": "\ud3b8\uc9d1 \ub9c1\ud06c",
    "Unlink": "\ub9c1\ud06c\uc0ad\uc81c",
    "Choose Link": "\ub9c1\ud06c\ub97c \uc120\ud0dd",

    // Images
    "Insert Image": "\uc774\ubbf8\uc9c0 \uc0bd\uc785",
    "Upload Image": "\uc774\ubbf8\uc9c0 \uc5c5\ub85c\ub4dc",
    "By URL": "URL \ub85c",
    "Browse": "\uac80\uc0c9",
    "Drop image": "\uc774\ubbf8\uc9c0\ub97c \ub4dc\ub86d",
    "or click": "\ub610\ub294 \ud074\ub9ad",
    "Manage Images": "\uc774\ubbf8\uc9c0 \uad00\ub9ac",
    "Loading": "\ub85c\ub4dc",
    "Deleting": "\uc0ad\uc81c",
    "Tags": "\ud0dc\uadf8",
    "Are you sure? Image will be deleted.": "\ud655\uc2e4\ud55c\uac00\uc694? \uc774\ubbf8\uc9c0\uac00 \uc0ad\uc81c\ub429\ub2c8\ub2e4.",
    "Replace": "\uad50\uccb4",
    "Uploading": "\uc5c5\ub85c\ub4dc",
    "Loading image": "\ub85c\ub4dc \uc774\ubbf8\uc9c0",
    "Display": "\ub514\uc2a4\ud50c\ub808\uc774",
    "Inline": "\uc778\ub77c\uc778",
    "Break Text": "\uad6c\ubd84 \ud14d\uc2a4\ud2b8",
    "Alternate Text": "\ub300\uccb4 \ud14d\uc2a4\ud2b8",
    "Change Size": "\ud06c\uae30 \ubcc0\uacbd",
    "Width": "\ud3ed",
    "Height": "\uc2e0\uc7a5",
    "Something went wrong. Please try again.": "\ubb38\uc81c\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud558\uc2ed\uc2dc\uc624.",

    // Video
    "Insert Video": "\ube44\ub514\uc624 \uc0bd\uc785",
    "Embedded Code": "\uc784\ubca0\ub514\ub4dc \ucf54\ub4dc",

    // Tables
    "Insert Table": "\ud14c\uc774\ube14 \uc0bd\uc785",
    "Header": "\ud5e4\ub354",
    "Row": "\uc5f4",
    "Insert row above": "\uc55e\uc5d0 \uc5f4\uc744 \uc0bd\uc785",
    "Insert row below": "\ub4a4\uc5d0 \uc5f4\uc744 \uc0bd\uc785",
    "Delete row": "\uc5f4 \uc0ad\uc81c",
    "Column": "\ud589",
    "Insert column before": "\uc55e\uc5d0 \ud589\uc744 \uc0bd\uc785",
    "Insert column after": "\ub4a4\uc5d0 \ud589\uc744 \uc0bd\uc785",
    "Delete column": "\ud589 \uc0ad\uc81c",
    "Cell": "\uc140",
    "Merge cells": "\uc140 \ud569\uce58\uae30",
    "Horizontal split": "\uc218\ud3c9 \ubd84\ud560",
    "Vertical split": "\uc218\uc9c1 \ubd84\ud560",
    "Cell Background": "\uc140 \ubc30\uacbd",
    "Vertical Align": "\uc218\uc9c1 \uc815\ub82c",
    "Top": "\uc0c1\ub2e8",
    "Middle": "\uc911\uac04",
    "Bottom": "\ubc14\ub2e5",
    "Align Top": "\uc0c1\ub2e8\uc744 \ub9de \ucda5\ub2c8 \ub2e4",
    "Align Middle": "\uc911\uac04 \uc815\ub82c",
    "Align Bottom": "\ubc14\ub2e5\uc744 \ub9de \ucda5\ub2c8 \ub2e4",
    "Cell Style": "\uc140 \uc2a4\ud0c0\uc77c",

    // Files
    "Upload File": "\ud30c\uc77c \ucca8\ubd80",
    "Drop file": "\ud30c\uc77c\uc744 \ub4dc\ub86d",

    // Emoticons
    "Emoticons": "\uc774\ubaa8\ud2f0\ucf58",
    "Grinning face": "\uc5bc\uad74 \uc6c3\uae30\ub9cc",
    "Grinning face with smiling eyes": "\ubbf8\uc18c\ub294 \ub208\uc744 \uac00\uc9c4 \uc5bc\uad74 \uc6c3\uae30\ub9cc",
    "Face with tears of joy": "\uae30\uc068\uc758 \ub208\ubb3c\ub85c \uc5bc\uad74",
    "Smiling face with open mouth": "\uc624\ud508 \uc785\uc73c\ub85c \uc6c3\ub294 \uc5bc\uad74",
    "Smiling face with open mouth and smiling eyes": "\uc624\ud508 \uc785\uc73c\ub85c \uc6c3\ub294 \uc5bc\uad74\uacfc \ub208\uc744 \ubbf8\uc18c",
    "Smiling face with open mouth and cold sweat": "\uc785\uc744 \uc5f4\uace0 \uc2dd\uc740 \ub540\uacfc \ud568\uaed8 \uc6c3\ub294 \uc5bc\uad74",
    "Smiling face with open mouth and tightly-closed eyes": "\uc624\ud508 \uc785\uacfc \ubc00\uc811\ud558\uac8c \ub2eb\ud78c \ub41c \ub208\uc744 \uac00\uc9c4 \uc6c3\ub294 \uc5bc\uad74",
    "Smiling face with halo": "\ud6c4\uad11 \uc6c3\ub294 \uc5bc\uad74",
    "Smiling face with horns": "\ubfd4 \uc6c3\ub294 \uc5bc\uad74",
    "Winking face": "\uc5bc\uad74 \uc719\ud06c",
    "Smiling face with smiling eyes": "\uc6c3\ub294 \ub208\uc73c\ub85c \uc6c3\ub294 \uc5bc\uad74",
    "Face savoring delicious food": "\ub9db\uc788\ub294 \uc74c\uc2dd\uc744 \uc74c\ubbf8 \uc5bc\uad74",
    "Relieved face": "\uc548\ub3c4 \uc5bc\uad74",
    "Smiling face with heart-shaped eyes": "\ud558\ud2b8 \ubaa8\uc591\uc758 \ub208\uc73c\ub85c \uc6c3\ub294 \uc5bc\uad74",
    "Smiling face with sunglasses": "\uc120\uae00\ub77c\uc2a4 \uc6c3\ub294 \uc5bc\uad74",
    "Smirking face": "\ub3c8\uc744 \uc9c0\ubd88 \uc5bc\uad74",
    "Neutral face": "\uc911\ub9bd \uc5bc\uad74",
    "Expressionless face": "\ubb34\ud45c\uc815 \uc5bc\uad74",
    "Unamused face": "\uc990\uac81\uac8c\ud558\uc9c0 \uc5bc\uad74",
    "Face with cold sweat": "\uc2dd\uc740 \ub540\uacfc \uc5bc\uad74",
    "Pensive face": "\uc7a0\uaca8\uc788\ub294 \uc5bc\uad74",
    "Confused face": "\ud63c\ub780 \uc5bc\uad74",
    "Confounded face": "\ub9dd\ud560 \uac83 \uc5bc\uad74",
    "Kissing face": "\uc5bc\uad74\uc744 \ud0a4\uc2a4",
    "Face throwing a kiss": "\ud0a4\uc2a4\ub97c \ub358\uc9c0\uace0 \uc5bc\uad74",
    "Kissing face with smiling eyes": "\ubbf8\uc18c\ub294 \ub208\uc744 \uac00\uc9c4 \uc5bc\uad74\uc744 \ud0a4\uc2a4",
    "Kissing face with closed eyes": "\ub2eb\ud78c \ub41c \ub208\uc744 \uac00\uc9c4 \uc5bc\uad74\uc744 \ud0a4\uc2a4",
    "Face with stuck out tongue": "\ub0b4\ubc00 \ud600 \uc5bc\uad74",
    "Face with stuck out tongue and winking eye": "\ub0b4\ubc00 \ud600\uc640 \uc719\ud06c \ub208\uacfc \uc5bc\uad74",
    "Face with stuck out tongue and tightly-closed eyes": "\ubc16\uc73c\ub85c \ubd99\uc5b4 \ud600\uc640 \ubc00\uc811\ud558\uac8c \ub2eb\ud78c \ub41c \ub208\uc744 \uac00\uc9c4 \uc5bc\uad74",
    "Disappointed face": "\uc2e4\ub9dd \uc5bc\uad74",
    "Worried face": "\uac71\uc815 \uc5bc\uad74",
    "Angry face": "\uc131\ub09c \uc5bc\uad74",
    "Pouting face": "\uc5bc\uad74\uc744 \uc090",
    "Crying face": "\uc5bc\uad74 \uc6b0\ub294",
    "Persevering face": "\uc5bc\uad74\uc744 \uc778\ub0b4",
    "Face with look of triumph": "\uc2b9\ub9ac\uc758 \ud45c\uc815\uc73c\ub85c \uc5bc\uad74",
    "Disappointed but relieved face": "\uc2e4\ub9dd\ud558\uc9c0\ub9cc \uc5bc\uad74\uc744 \uc548\uc2ec",
    "Frowning face with open mouth": "\uc624\ud508 \uc785\uc73c\ub85c \uc5bc\uad74\uc744 \ucc21\uadf8\ub9bc",
    "Anguished face": "\uace0\ub1cc\uc758 \uc5bc\uad74",
    "Fearful face": "\ubb34\uc11c\uc6b4 \uc5bc\uad74",
    "Weary face": "\uc9c0\uce5c \uc5bc\uad74",
    "Sleepy face": "\uc2ac\ub9ac\ud53c \uc5bc\uad74",
    "Tired face": "\ud53c\uace4 \uc5bc\uad74",
    "Grimacing face": "\uc5bc\uad74\uc744 \ucc21\uadf8\ub9b0",
    "Loudly crying face": "\ud070 \uc18c\ub9ac\ub85c \uc5bc\uad74\uc744 \uc6b8\uace0",
    "Face with open mouth": "\uc624\ud508 \uc785\uc73c\ub85c \uc5bc\uad74",
    "Hushed face": "\uc870\uc6a9\ud55c \uc5bc\uad74",
    "Face with open mouth and cold sweat": "\uc785\uc744 \uc5f4\uace0 \uc2dd\uc740 \ub540\uc73c\ub85c \uc5bc\uad74",
    "Face screaming in fear": "\uacf5\ud3ec\uc5d0 \ube44\uba85 \uc5bc\uad74",
    "Astonished face": "\ub180\ub77c \uc5bc\uad74",
    "Flushed face": "\ud50c\ub7ec\uc2dc \uc5bc\uad74",
    "Sleeping face": "\uc5bc\uad74 \uc7a0\uc790\ub294",
    "Dizzy face": "\ub514\uc9c0 \uc5bc\uad74",
    "Face without mouth": "\uc785\uc5c6\uc774 \uc5bc\uad74",
    "Face with medical mask": "\uc758\ub8cc \ub9c8\uc2a4\ud06c\ub85c \uc5bc\uad74",

    // Line breaker
    "Break": "\ub2e8\uc808",

    // Math
    "Subscript": "\uc544\ub798 \ucca8\uc790",
    "Superscript": "\uc704 \ucca8\uc790",

    // Full screen
    "Fullscreen": "\uc804\uccb4 \ud654\uba74",

    // Horizontal line
    "Insert Horizontal Line": "\uc218\ud3c9\uc120\uc744 \uc0bd\uc785",

    // Clear formatting
    "Clear Formatting": "\uc11c\uc2dd \uc81c\uac70",

    // Undo, redo
    "Undo": "\uc2e4\ud589 \ucde8\uc18c",
    "Redo": "\ub418\ub3cc\ub9ac\uae30",

    // Select all
    "Select All": "\uc804\uccb4\uc120\ud0dd",

    // Code view
    "Code View": "\ucf54\ub4dc\ubcf4\uae30",

    // Quote
    "Quote": "\uc778\uc6a9",
    "Increase": "\uc99d\uac00",
    "Decrease": "\uac10\uc18c"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Montenegrin
 */


$.FroalaEditor.LANGUAGE['me'] = {
  translation: {
    // Place holder
    "Type something": "Ukucajte ne\u0161tp",

    // Basic formatting
    "Bold": "Bold",
    "Italic": "Italic",
    "Underline": "Podvu\u010deno",
    "Strikethrough": "Prekri\u017eano",

    // Main buttons
    "Insert": "Umetni",
    "Delete": "Obri\u0161i",
    "Cancel": "Otka\u017ei",
    "OK": "U redu",
    "Back": "Natrag",
    "Remove": "Ukloni",
    "More": "Vi\u0161e",
    "Update": "A\u017euriranje",
    "Style": "Stil",

    // Font
    "Font Family": "Odaberi font",
    "Font Size": "Veli\u010dina fonta",

    // Colors
    "Colors": "Boje",
    "Background": "Pozadine",
    "Text": "Teksta",

    // Paragraphs
    "Paragraph Format": "Paragraf formatu",
    "Normal": "Normalno",
    "Code": "Izvorni kod",
    "Heading 1": "Naslov 1",
    "Heading 2": "Naslov 2",
    "Heading 3": "Naslov 3",
    "Heading 4": "Naslov 4",

    // Style
    "Paragraph Style": "Paragraf stil",
    "Inline Style": "Inline stil",

    // Alignment
    "Align": "Poravnaj",
    "Align Left": "Poravnaj lijevo",
    "Align Center": "Poravnaj po sredini",
    "Align Right": "Poravnaj desno",
    "Align Justify": "Cjelokupno poravnanje",
    "None": "Nijedan",

    // Lists
    "Ordered List": "Ure\u0111ena lista",
    "Unordered List": "Nesre\u0111ene lista",

    // Indent
    "Decrease Indent": "Smanjenje alineja",
    "Increase Indent": "Pove\u0107anje alineja",

    // Links
    "Insert Link": "Umetni link",
    "Open in new tab": "Otvori u novom prozoru",
    "Open Link": "Otvori link",
    "Edit Link": "Uredi link",
    "Unlink": "Ukloni link",
    "Choose Link": "Izabrati link",

    // Images
    "Insert Image": "Umetni sliku",
    "Upload Image": "Upload sliku",
    "By URL": "Preko URL",
    "Browse": "Pregledaj",
    "Drop image": "Izbaci sliku",
    "or click": "ili odaberi",
    "Manage Images": "Upravljanje ilustracijama",
    "Loading": "Koji tovari",
    "Deleting": "Brisanje",
    "Tags": "Oznake",
    "Are you sure? Image will be deleted.": "Da li ste sigurni da \u017eelite da obri\u0161ete ovu ilustraciju?",
    "Replace": "Zamijenite",
    "Uploading": "Uploading",
    "Loading image": "Koji tovari sliku",
    "Display": "Prikaz",
    "Inline": "Inline",
    "Break Text": "Break tekst",
    "Alternate Text": "Alternativna tekst",
    "Change Size": "Promijeni veli\u010dinu",
    "Width": "\u0161irina",
    "Height": "Visina",
    "Something went wrong. Please try again.": "Ne\u0161to je po\u0161lo po zlu. Molimo vas da poku\u0161ate ponovo.",

    // Video
    "Insert Video": "Umetni video",
    "Embedded Code": "Embedded kod",

    // Tables
    "Insert Table": "Umetni tabelu",
    "Header": "Zaglavlje",
    "Row": "Red",
    "Insert row above": "Umetni red iznad",
    "Insert row below": "Umetni red ispod",
    "Delete row": "Obri\u0161i red",
    "Column": "Kolona",
    "Insert column before": "Umetni kolonu prije",
    "Insert column after": "Umetni kolonu poslije",
    "Delete column": "Obri\u0161i kolonu",
    "Cell": "\u0106elija",
    "Merge cells": "Spoji \u0107elija",
    "Horizontal split": "Horizontalno razdvajanje polja",
    "Vertical split": "Vertikalno razdvajanje polja",
    "Cell Background": "\u0106elija pozadini",
    "Vertical Align": "Vertikalni poravnaj",
    "Top": "Vrh",
    "Middle": "Srednji",
    "Bottom": "Dno",
    "Align Top": "Poravnaj vrh",
    "Align Middle": "Poravnaj srednji",
    "Align Bottom": "Poravnaj dno",
    "Cell Style": "\u0106elija stil",

    // Files
    "Upload File": "Upload datoteke",
    "Drop file": "Drop datoteke",

    // Emoticons
    "Emoticons": "Emotikona",
    "Grinning face": "Cere\u0107i lice",
    "Grinning face with smiling eyes": "Cere\u0107i lice nasmijana o\u010dima",
    "Face with tears of joy": "Lice sa suze radosnice",
    "Smiling face with open mouth": "Nasmijana lica s otvorenih usta",
    "Smiling face with open mouth and smiling eyes": "Nasmijana lica s otvorenih usta i nasmijana o\u010di",
    "Smiling face with open mouth and cold sweat": "Nasmijana lica s otvorenih usta i hladan znoj",
    "Smiling face with open mouth and tightly-closed eyes": "Nasmijana lica s otvorenih usta i \u010dvrsto-zatvorenih o\u010diju",
    "Smiling face with halo": "Nasmijana lica sa halo",
    "Smiling face with horns": "Nasmijana lica s rogovima",
    "Winking face": "Namigivanje lice",
    "Smiling face with smiling eyes": "Nasmijana lica sa nasmijana o\u010dima",
    "Face savoring delicious food": "Suo\u010davaju uživaju\u0107i ukusna hrana",
    "Relieved face": "Laknulo lice",
    "Smiling face with heart-shaped eyes": "Nasmijana lica sa obliku srca o\u010di",
    "Smiling face with sunglasses": "Nasmijana lica sa sun\u010dane nao\u010dare",
    "Smirking face": "Namr\u0161tena lica",
    "Neutral face": "Neutral lice",
    "Expressionless face": "Bezizra\u017eajno lice",
    "Unamused face": "Nije zabavno lice",
    "Face with cold sweat": "Lice s hladnim znojem",
    "Pensive face": "Zami\u0161ljen lice",
    "Confused face": "Zbunjen lice",
    "Confounded face": "Uzbu\u0111en lice",
    "Kissing face": "Ljubakanje lice",
    "Face throwing a kiss": "Suo\u010davaju bacanje poljubac",
    "Kissing face with smiling eyes": "Ljubljenje lice nasmijana o\u010dima",
    "Kissing face with closed eyes": "Ljubljenje lice sa zatvorenim o\u010dima",
    "Face with stuck out tongue": "Lice sa ispru\u017eio jezik",
    "Face with stuck out tongue and winking eye": "Lice sa ispru\u017eio jezik i trep\u0107u\u0107e \u0107e oko",
    "Face with stuck out tongue and tightly-closed eyes": "Lice sa ispru\u017eio jezik i \u010dvrsto zatvorene o\u010di",
    "Disappointed face": "Razo\u010daran lice",
    "Worried face": "Zabrinuti lice",
    "Angry face": "Ljut lice",
    "Pouting face": "Napu\u0107enim lice",
    "Crying face": "Plakanje lice",
    "Persevering face": "Istrajan lice",
    "Face with look of triumph": "Lice s pogledom trijumfa",
    "Disappointed but relieved face": "Razo\u010daran, ali olak\u0161anje lice",
    "Frowning face with open mouth": "Namr\u0161tiv\u0161i lice s otvorenih usta",
    "Anguished face": "Bolnom lice",
    "Fearful face": "Pla\u0161ljiv lice",
    "Weary face": "Umoran lice",
    "Sleepy face": "Pospan lice",
    "Tired face": "Umorno lice",
    "Grimacing face": "Grimase lice",
    "Loudly crying face": "Glasno pla\u010de lice",
    "Face with open mouth": "Lice s otvorenih usta",
    "Hushed face": "Smiren lice",
    "Face with open mouth and cold sweat": "Lice s otvorenih usta i hladan znoj",
    "Face screaming in fear": "Suo\u010davaju vri\u0161ti u strahu",
    "Astonished face": "Zapanjen lice",
    "Flushed face": "Rumeno lice",
    "Sleeping face": "Usnulo lice",
    "Dizzy face": "O\u0161amu\u0107en lice",
    "Face without mouth": "Lice bez usta",
    "Face with medical mask": "Lice sa medicinskom maskom",

    // Line breaker
    "Break": "Slomiti",

    // Math
    "Subscript": "Potpisan",
    "Superscript": "Natpis",

    // Full screen
    "Fullscreen": "Preko cijelog zaslona",

    // Horizontal line
    "Insert Horizontal Line": "Umetni vodoravna liniju",

    // Clear formatting
    "Clear Formatting": "Izbrisati formatiranje",

    // Undo, redo
    "Undo": "Korak nazad",
    "Redo": "Korak naprijed",

    // Select all
    "Select All": "Ozna\u010di sve",

    // Code view
    "Code View": "Kod pogled",

    // Quote
    "Quote": "Citat",
    "Increase": "Pove\u0107ati",
    "Decrease": "Smanjenje"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Norwegian
 */


$.FroalaEditor.LANGUAGE['nb'] = {
  translation: {
    // Place holder
    "Type something": "Skriv noe",

    // Basic formatting
    "Bold": "Fet",
    "Italic": "Kursiv",
    "Underline": "Understreket",
    "Strikethrough": "Gjennomstreket",

    // Main buttons
    "Insert": "Sett",
    "Delete": "Slett",
    "Cancel": "Avbryt",
    "OK": "OK",
    "Back": "Tilbake",
    "Remove": "Fjern",
    "More": "Mer",
    "Update": "Oppdatering",
    "Style": "Stil",

    // Font
    "Font Family": "Skriftsnitt",
    "Font Size": "St\u00f8rrelse",

    // Colors
    "Colors": "Farger",
    "Background": "Bakgrunn",
    "Text": "Tekst",

    // Paragraphs
    "Paragraph Format": "Stiler",
    "Normal": "Normal",
    "Code": "Kode",
    "Heading 1": "Overskrift 1",
    "Heading 2": "Overskrift 2",
    "Heading 3": "Overskrift 3",
    "Heading 4": "Overskrift 4",

    // Style
    "Paragraph Style": "Avsnittsstil",
    "Inline Style": "P\u00e5 linje stil",

    // Alignment
    "Align": "Justering",
    "Align Left": "Venstrejustert",
    "Align Center": "Midtstilt",
    "Align Right": "H\u00f8yrejustert",
    "Align Justify": "Juster alle linjer",
    "None": "None",

    // Lists
    "Ordered List": "Ordnet liste",
    "Unordered List": "Uordnet liste",

    // Indent
    "Decrease Indent": "Reduser innrykk",
    "Increase Indent": "\u00d8k innrykk",

    // Links
    "Insert Link": "Sett inn lenke",
    "Open in new tab": "\u00c5pne i ny fane",
    "Open Link": "\u00c5pne lenke",
    "Edit Link": "Rediger lenke",
    "Unlink": "Fjern lenke",
    "Choose Link": "Velge lenke",

    // Images
    "Insert Image": "Sett inn bilde",
    "Upload Image": "Last opp bilde",
    "By URL": "Ved URL",
    "Browse": "Bla",
    "Drop image": "Slippe bilde",
    "or click": "eller klikk",
    "Manage Images": "Bildebehandling",
    "Loading": "Lasting",
    "Deleting": "Slette",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "Er du sikker? Bildet vil bli slettet.",
    "Replace": "Erstatte",
    "Uploading": "Opplasting",
    "Loading image": "Lasting bilde",
    "Display": "Utstilling",
    "Inline": "P\u00e5 linje",
    "Break Text": "Brudd tekst",
    "Alternate Text": "Alternativ tekst",
    "Change Size": "Endre st\u00f8rrelse",
    "Width": "Bredde",
    "Height": "H\u00f8yde",
    "Something went wrong. Please try again.": "Noe gikk galt. V\u00e6r s\u00e5 snill, pr\u00f8v p\u00e5 nytt.",

    // Video
    "Insert Video": "Sett inn video",
    "Embedded Code": "Embedded kode",

    // Tables
    "Insert Table": "Sett inn tabell",
    "Header": "Header",
    "Row": "Rad",
    "Insert row above": "Sett inn rad f\u00f8r",
    "Insert row below": "Sett in rad etter",
    "Delete row": "Slett rad",
    "Column": "Kolonne",
    "Insert column before": "Sett inn kolonne f\u00f8r",
    "Insert column after": "Sett inn kolonne etter",
    "Delete column": "Slett kolonne",
    "Cell": "Celle",
    "Merge cells": "Sl\u00e5 sammen celler",
    "Horizontal split": "Horisontalt delt",
    "Vertical split": "Vertikal split",
    "Cell Background": "Celle bakgrunn",
    "Vertical Align": "Vertikal sluttar",
    "Top": "Topp",
    "Middle": "Midten",
    "Bottom": "Bunn",
    "Align Top": "Justere toppen",
    "Align Middle": "Justere midten",
    "Align Bottom": "Justere bunnen",
    "Cell Style": "Celle stil",

    // Files
    "Upload File": "Opplastingsfil",
    "Drop file": "Slippe fil",

    // Emoticons
    "Emoticons": "Emoticons",
    "Grinning face": "Flirer ansikt",
    "Grinning face with smiling eyes": "Flirer ansikt med smilende \u00f8yne",
    "Face with tears of joy": "Ansikt med t\u00e5rer av glede",
    "Smiling face with open mouth": "Smilende ansikt med \u00e5pen munn",
    "Smiling face with open mouth and smiling eyes": "Smilende ansikt med \u00e5pen munn og smilende \u00f8yne",
    "Smiling face with open mouth and cold sweat": "Smilende ansikt med \u00e5pen munn og kald svette",
    "Smiling face with open mouth and tightly-closed eyes": "Smilende ansikt med \u00e5pen munn og tett lukkede \u00f8yne",
    "Smiling face with halo": "Smilende ansikt med glorie",
    "Smiling face with horns": "Smilende ansikt med horn",
    "Winking face": "Blunk ansikt",
    "Smiling face with smiling eyes": "Smilende ansikt med smilende \u00f8yne",
    "Face savoring delicious food": "M\u00f8te nyter deilig mat",
    "Relieved face": "Lettet ansikt",
    "Smiling face with heart-shaped eyes": "Smilende ansikt med hjerteformede \u00f8yne",
    "Smiling face with sunglasses": "Smilende ansikt med solbriller",
    "Smirking face": "Tilfreds ansikt",
    "Neutral face": "N\u00f8ytral ansikt",
    "Expressionless face": "Uttrykksl\u00f8st ansikt",
    "Unamused face": "Ikke moret ansikt",
    "Face with cold sweat": "Ansikt med kald svette",
    "Pensive face": "Tankefull ansikt",
    "Confused face": "Forvirret ansikt",
    "Confounded face": "Skamme ansikt",
    "Kissing face": "Kyssing ansikt",
    "Face throwing a kiss": "Ansikt kaste et kyss",
    "Kissing face with smiling eyes": "Kyssing ansikt med smilende \u00f8yne",
    "Kissing face with closed eyes": "Kyssing ansiktet med lukkede \u00f8yne",
    "Face with stuck out tongue": "Ansikt med stakk ut tungen",
    "Face with stuck out tongue and winking eye": "Ansikt med stakk ut tungen og blunke \u00f8ye",
    "Face with stuck out tongue and tightly-closed eyes": "Ansikt med fast ut tungen og tett lukket \u00f8yne",
    "Disappointed face": "Skuffet ansikt",
    "Worried face": "Bekymret ansikt",
    "Angry face": "Sint ansikt",
    "Pouting face": "Trutmunn ansikt",
    "Crying face": "Gr\u00e5ter ansikt",
    "Persevering face": "Utholdende ansikt",
    "Face with look of triumph": "Ansikt med utseendet til triumf",
    "Disappointed but relieved face": "Skuffet men lettet ansikt",
    "Frowning face with open mouth": "Rynke ansikt med \u00e5pen munn",
    "Anguished face": "Forpint ansikt",
    "Fearful face": "Engstelig ansikt",
    "Weary face": "Slitne ansiktet",
    "Sleepy face": "S\u00f8vnig ansikt",
    "Tired face": "Tr\u00f8tt ansikt",
    "Grimacing face": "Griner ansikt",
    "Loudly crying face": "H\u00f8ylytt gr\u00e5tende ansikt",
    "Face with open mouth": "Ansikt med \u00e5pen munn",
    "Hushed face": "Lavm\u00e6lt ansikt",
    "Face with open mouth and cold sweat": "Ansikt med \u00e5pen munn og kald svette",
    "Face screaming in fear": "Ansikt skriker i frykt",
    "Astonished face": "Forbauset ansikt",
    "Flushed face": "Flushed ansikt",
    "Sleeping face": "Sovende ansikt",
    "Dizzy face": "Svimmel ansikt",
    "Face without mouth": "Ansikt uten munn",
    "Face with medical mask": "Ansikt med medisinsk maske",

    // Line breaker
    "Break": "Brudd",

    // Math
    "Subscript": "Senket skrift",
    "Superscript": "Hevet skrift",

    // Full screen
    "Fullscreen": "Full skjerm",

    // Horizontal line
    "Insert Horizontal Line": "Sett inn horisontal linje",

    // Clear formatting
    "Clear Formatting": "Fjerne formatering",

    // Undo, redo
    "Undo": "Angre",
    "Redo": "Utf\u00f8r likevel",

    // Select all
    "Select All": "Marker alt",

    // Code view
    "Code View": "Kodevisning",

    // Quote
    "Quote": "Sitat",
    "Increase": "\u00d8ke",
    "Decrease": "Nedgang"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Dutch
 */


$.FroalaEditor.LANGUAGE['nl'] = {
  translation: {
    // Place holder
    "Type something": "Typ iets",

    // Basic formatting
    "Bold": "Vet",
    "Italic": "Schuin",
    "Underline": "Onderstreept",
    "Strikethrough": "Doorhalen",

    // Main buttons
    "Insert": "Invoegen",
    "Delete": "Verwijder",
    "Cancel": "Annuleren",
    "OK": "Ok\u00e9",
    "Back": "Terug",
    "Remove": "Verwijderen",
    "More": "Meer",
    "Update": "Bijwerken",
    "Style": "Stijl",

    // Font
    "Font Family": "Lettertype",
    "Font Size": "Letter grootte",

    // Colors
    "Colors": "Kleuren",
    "Background": "Achtergrond",
    "Text": "Tekst",

    // Paragraphs
    "Paragraph Format": "Opmaak",
    "Normal": "Normaal",
    "Code": "Code",
    "Heading 1": "Kop 1",
    "Heading 2": "Kop 2",
    "Heading 3": "Kop 3",
    "Heading 4": "Kop 4",

    // Style
    "Paragraph Style": "Paragraaf stijl",
    "Inline Style": "In de rij stijl",

    // Alignment
    "Align": "Uitlijnen",
    "Align Left": "Links uitlijnen",
    "Align Center": "Centreren",
    "Align Right": "Rechts uitlijnen",
    "Align Justify": "Uitlijnen",
    "None": "Niets",

    // Lists
    "Ordered List": "Geordende lijst",
    "Unordered List": "Ongeordende lijst",

    // Indent
    "Decrease Indent": "Inspringen verkleinen",
    "Increase Indent": "Inspringen vergroten",

    // Links
    "Insert Link": "Hyperlink invoegen",
    "Open in new tab": "Openen in nieuw tabblad",
    "Open Link": "Open link",
    "Edit Link": "Link bewerken",
    "Unlink": "Link verwijderen",
    "Choose Link": "Kiezen koppeling",

    // Images
    "Insert Image": "Afbeelding invoegen",
    "Upload Image": "Afbeelding uploaden",
    "By URL": "Door URL",
    "Browse": "Blader",
    "Drop image": "Drop afbeelding",
    "or click": "of klik op",
    "Manage Images": "Beheren van beelden",
    "Loading": "Het laden",
    "Deleting": "Het verwijderen",
    "Tags": "Labels",
    "Are you sure? Image will be deleted.": "Weet je het zeker? Opname wordt verwijderd.",
    "Replace": "Vervangen",
    "Uploading": "Uploaden",
    "Loading image": "Afbeelding laden",
    "Display": "Tonen",
    "Inline": "In de rij",
    "Break Text": "Breken tekst",
    "Alternate Text": "Alternatieve tekst",
    "Change Size": "Grootte veranderen",
    "Width": "Breedte",
    "Height": "Hoogte",
    "Something went wrong. Please try again.": "Er is iets fout gegaan. Probeer opnieuw.",

    // Video
    "Insert Video": "Video invoegen",
    "Embedded Code": "Ingebedde code",

    // Tables
    "Insert Table": "Tabel invoegen",
    "Header": "Hoofd",
    "Row": "Rij",
    "Insert row above": "Voeg rij boven toe",
    "Insert row below": "Voeg rij onder toe",
    "Delete row": "Verwijder rij",
    "Column": "Kolom",
    "Insert column before": "Voeg kolom in voor",
    "Insert column after": "Voeg kolom in na",
    "Delete column": "Verwijder kolom",
    "Cell": "Cel",
    "Merge cells": "Cellen samenvoegen",
    "Horizontal split": "Horizontaal splitsen",
    "Vertical split": "Verticaal splitsen",
    "Cell Background": "Cel achtergrond",
    "Vertical Align": "Verticaal uitlijnen",
    "Top": "Top",
    "Middle": "Midden",
    "Bottom": "Bodem",
    "Align Top": "Uitlijnen top",
    "Align Middle": "Uitlijnen midden",
    "Align Bottom": "Onder uitlijnen",
    "Cell Style": "Celstijl",

    // Files
    "Upload File": "Upload bestand",
    "Drop file": "Drop bestand",

    // Emoticons
    "Emoticons": "Emoticons",
    "Grinning face": "Grijnzend gezicht",
    "Grinning face with smiling eyes": "Grijnzend gezicht met lachende ogen",
    "Face with tears of joy": "Geconfronteerd met tranen van vreugde",
    "Smiling face with open mouth": "Lachend gezicht met open mond",
    "Smiling face with open mouth and smiling eyes": "Lachend gezicht met open mond en lachende ogen",
    "Smiling face with open mouth and cold sweat": "Lachend gezicht met open mond en koud zweet",
    "Smiling face with open mouth and tightly-closed eyes": "Lachend gezicht met open mond en strak gesloten ogen",
    "Smiling face with halo": "Lachend gezicht met halo",
    "Smiling face with horns": "Lachend gezicht met hoorns",
    "Winking face": "Het knipogen gezicht",
    "Smiling face with smiling eyes": "Lachend gezicht met lachende ogen",
    "Face savoring delicious food": "Gezicht genieten van heerlijk eten",
    "Relieved face": "Opgelucht gezicht",
    "Smiling face with heart-shaped eyes": "Het glimlachen gezicht met hart-vormige ogen",
    "Smiling face with sunglasses": "Lachend gezicht met zonnebril",
    "Smirking face": "Grijnzende gezicht",
    "Neutral face": "Neutraal gezicht",
    "Expressionless face": "Wezenloos gezicht",
    "Unamused face": "Niet geamuseerd gezicht",
    "Face with cold sweat": "Gezicht met koud zweet",
    "Pensive face": "Peinzend gezicht",
    "Confused face": "Verward gezicht",
    "Confounded face": "Beschaamd gezicht",
    "Kissing face": "Zoenen gezicht",
    "Face throwing a kiss": "Geconfronteerd gooien van een kus",
    "Kissing face with smiling eyes": "Zoenen gezicht met lachende ogen",
    "Kissing face with closed eyes": "Zoenen gezicht met gesloten ogen",
    "Face with stuck out tongue": "Gezicht met stak tong",
    "Face with stuck out tongue and winking eye": "Gezicht met stak tong en ergens oog",
    "Face with stuck out tongue and tightly-closed eyes": "Gezicht met stak de tong en strak-gesloten ogen",
    "Disappointed face": "Teleurgesteld gezicht",
    "Worried face": "Bezorgd gezicht",
    "Angry face": "Boos gezicht",
    "Pouting face": "Het pruilen gezicht",
    "Crying face": "Huilen gezicht",
    "Persevering face": "Volhardend gezicht",
    "Face with look of triumph": "Geconfronteerd met blik van triomf",
    "Disappointed but relieved face": "Teleurgesteld, maar opgelucht gezicht",
    "Frowning face with open mouth": "Het fronsen gezicht met open mond",
    "Anguished face": "Gekweld gezicht",
    "Fearful face": "Angstig gezicht",
    "Weary face": "Vermoeide gezicht",
    "Sleepy face": "Slaperig gezicht",
    "Tired face": "Moe gezicht",
    "Grimacing face": "Het grimassen trekken gezicht",
    "Loudly crying face": "Luid schreeuwend gezicht",
    "Face with open mouth": "Geconfronteerd met open mond",
    "Hushed face": "Verstilde gezicht",
    "Face with open mouth and cold sweat": "Geconfronteerd met open mond en koud zweet",
    "Face screaming in fear": "Gezicht schreeuwen in angst",
    "Astonished face": "Verbaasd gezicht",
    "Flushed face": "Gespoeld gezicht",
    "Sleeping face": "Slapen face",
    "Dizzy face": "Duizelig gezicht",
    "Face without mouth": "Gezicht zonder mond",
    "Face with medical mask": "Geconfronteerd met medische masker",

    // Line breaker
    "Break": "Breken",

    // Math
    "Subscript": "Subscript",
    "Superscript": "Superscript",

    // Full screen
    "Fullscreen": "Volledig scherm",

    // Horizontal line
    "Insert Horizontal Line": "Plaats horizontale lijn",

    // Clear formatting
    "Clear Formatting": "Verwijder opmaak",

    // Undo, redo
    "Undo": "Ongedaan maken",
    "Redo": "Opnieuw",

    // Select all
    "Select All": "Alles selecteren",

    // Code view
    "Code View": "Codeweergave",

    // Quote
    "Quote": "Citaat",
    "Increase": "Toenemen",
    "Decrease": "Daling"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Polish
 */


$.FroalaEditor.LANGUAGE['pl'] = {
  translation: {
    // Place holder
    "Type something": "Wpisz co\u015b",

    // Basic formatting
    "Bold": "Pogrubienie",
    "Italic": "Kursywa",
    "Underline": "Podkre\u015blenie",
    "Strikethrough": "Przekre\u015blenie",

    // Main buttons
    "Insert": "Wstaw",
    "Delete": "Usun\u0105\u0107",
    "Cancel": "Anuluj",
    "OK": "Ok",
    "Back": "Plecy",
    "Remove": "Usun\u0105\u0107",
    "More": "Jeszcze",
    "Update": "Aktualizacja",
    "Style": "Styl",

    // Font
    "Font Family": "Kr\u00f3j czcionki",
    "Font Size": "Rozmiar czcionki",

    // Colors
    "Colors": "Kolory",
    "Background": "T\u0142o",
    "Text": "Tekstu",

    // Paragraphs
    "Paragraph Format": "Formaty",
    "Normal": "Normalny",
    "Code": "Kod \u017ar\u00f3d\u0142owy",
    "Heading 1": "Nag\u0142\u00f3wek 1",
    "Heading 2": "Nag\u0142\u00f3wek 2",
    "Heading 3": "Nag\u0142\u00f3wek 3",
    "Heading 4": "Nag\u0142\u00f3wek 4",

    // Style
    "Paragraph Style": "Styl akapitu",
    "Inline Style": "Stylu zgodna",

    // Alignment
    "Align": "Wyr\u00f3wnaj",
    "Align Left": "Wyr\u00f3wnaj do lewej",
    "Align Center": "Wyr\u00f3wnaj do \u015brodka",
    "Align Right": "Wyr\u00f3wnaj do prawej",
    "Align Justify": "Do lewej i prawej",
    "None": "\u017baden",

    // Lists
    "Ordered List": "Uporz\u0105dkowana lista",
    "Unordered List": "Lista nieuporz\u0105dkowana",

    // Indent
    "Decrease Indent": "Zmniejsz wci\u0119cie",
    "Increase Indent": "Zwi\u0119ksz wci\u0119cie",

    // Links
    "Insert Link": "Wstaw link",
    "Open in new tab": "Otw\u00f3rz w nowej karcie",
    "Open Link": "Otw\u00f3rz link",
    "Edit Link": "Link edytuj",
    "Unlink": "Usu\u0144 link",
    "Choose Link": "Wybierz link",

    // Images
    "Insert Image": "Wstaw obrazek",
    "Upload Image": "Za\u0142aduj obrazek",
    "By URL": "Przez URL",
    "Browse": "Przegl\u0105danie",
    "Drop image": "Upu\u015bci\u0107 obraz",
    "or click": "lub kliknij",
    "Manage Images": "Zarz\u0105dzanie zdj\u0119ciami",
    "Loading": "\u0141adowanie",
    "Deleting": "Usuwanie",
    "Tags": "Tagi",
    "Are you sure? Image will be deleted.": "Czy na pewno? Obraz zostanie skasowany.",
    "Replace": "Zast\u0105pi\u0107",
    "Uploading": "Zamieszczanie",
    "Loading image": "\u0141adowanie obrazek",
    "Display": "Wystawa",
    "Inline": "Zgodna",
    "Break Text": "Z\u0142ama\u0107 tekst",
    "Alternate Text": "Tekst alternatywny",
    "Change Size": "Zmie\u0144 rozmiar",
    "Width": "Szeroko\u015b\u0107",
    "Height": "Wysoko\u015b\u0107",
    "Something went wrong. Please try again.": "Co\u015b posz\u0142o nie tak. Prosz\u0119 spr\u00f3buj ponownie.",

    // Video
    "Insert Video": "Wstaw wideo",
    "Embedded Code": "Kod osadzone",

    // Tables
    "Insert Table": "Wstaw tabel\u0119",
    "Header": "Nag\u0142\u00f3wek",
    "Row": "Wiersz",
    "Insert row above": "Wstaw wiersz przed",
    "Insert row below": "Wstaw wiersz po",
    "Delete row": "Usu\u0144 wiersz",
    "Column": "Kolumna",
    "Insert column before": "Wstaw kolumn\u0119 przed",
    "Insert column after": "Wstaw kolumn\u0119 po",
    "Delete column": "Usu\u0144 kolumn\u0119",
    "Cell": "Kom\u00f3rka",
    "Merge cells": "\u0141\u0105cz kom\u00f3rki",
    "Horizontal split": "Podzia\u0142 poziomy",
    "Vertical split": "Podzia\u0142 pionowy",
    "Cell Background": "T\u0142a kom\u00f3rek",
    "Vertical Align": "Pionowe wyr\u00f3wnanie",
    "Top": "Top",
    "Middle": "\u015arodkowy",
    "Bottom": "Dno",
    "Align Top": "Wyr\u00f3wnaj do g\u00f3ry",
    "Align Middle": "Wyr\u00f3wnaj \u015brodku",
    "Align Bottom": "Wyr\u00f3wnaj do do\u0142u",
    "Cell Style": "Styl kom\u00f3rki",

    // Files
    "Upload File": "Prze\u015blij plik",
    "Drop file": "Upu\u015bci\u0107 plik",

    // Emoticons
    "Emoticons": "Emotikony",
    "Grinning face": "Z u\u015bmiechem twarz",
    "Grinning face with smiling eyes": "Z u\u015bmiechem twarz z u\u015bmiechni\u0119tymi oczami",
    "Face with tears of joy": "Twarz ze \u0142zami rado\u015bci",
    "Smiling face with open mouth": "U\u015bmiechni\u0119ta twarz z otwartymi ustami",
    "Smiling face with open mouth and smiling eyes": "U\u015bmiechni\u0119ta twarz z otwartymi ustami i u\u015bmiechni\u0119te oczy",
    "Smiling face with open mouth and cold sweat": "U\u015bmiechni\u0119ta twarz z otwartymi ustami i zimny pot",
    "Smiling face with open mouth and tightly-closed eyes": "U\u015bmiechni\u0119ta twarz z otwartymi ustami i szczelnie zamkni\u0119tych oczu",
    "Smiling face with halo": "U\u015bmiechni\u0119ta twarz z halo",
    "Smiling face with horns": "U\u015bmiechni\u0119ta twarz z rogami",
    "Winking face": "Mrugaj\u0105ca twarz",
    "Smiling face with smiling eyes": "U\u015bmiechni\u0119ta twarz z u\u015bmiechni\u0119tymi oczami",
    "Face savoring delicious food": "Twarz smakuj\u0105 c pyszne jedzenie",
    "Relieved face": "Z ulg\u0105  twarz",
    "Smiling face with heart-shaped eyes": "U\u015bmiechni\u0119ta twarz z oczami w kszta\u0142cie serca",
    "Smiling face with sunglasses": "U\u015bmiechni\u0119ta twarz z okulary",
    "Smirking face": "Zadowolony z siebie twarz",
    "Neutral face": "Neutralny twarzy",
    "Expressionless face": "Bezwyrazowy twarzy",
    "Unamused face": "Nie rozbawiony twarzy",
    "Face with cold sweat": "Zimny pot z twarzy",
    "Pensive face": "Zamy\u015blona twarz",
    "Confused face": "Myli\u0107 twarzy",
    "Confounded face": "Ha\u0144ba twarz",
    "Kissing face": "Ca\u0142owanie twarz",
    "Face throwing a kiss": "Twarz rzucaj\u0105c poca\u0142unek",
    "Kissing face with smiling eyes": "Ca\u0142owanie twarz z u\u015bmiechni\u0119tymi oczami",
    "Kissing face with closed eyes": "Ca\u0142owanie twarz z zamkni\u0119tymi oczami",
    "Face with stuck out tongue": "Twarz z j\u0119zyka stercza\u0142y",
    "Face with stuck out tongue and winking eye": "Twarz z stercza\u0142y j\u0119zyka i mrugaj\u0105c okiem",
    "Face with stuck out tongue and tightly-closed eyes": "Twarz z stercza\u0142y j\u0119zyka i szczelnie zamkni\u0119tych oczu",
    "Disappointed face": "Rozczarowany twarzy",
    "Worried face": "Martwi twarzy",
    "Angry face": "Gniewnych twarzy",
    "Pouting face": "D\u0105sy twarzy",
    "Crying face": "P\u0142acz\u0105cy",
    "Persevering face": "Wytrwa\u0142a twarz",
    "Face with look of triumph": "Twarz z wyrazem triumfu",
    "Disappointed but relieved face": "Rozczarowany ale ulg\u0119 twarz",
    "Frowning face with open mouth": "Krzywi\u0105c twarz z otwartymi ustami",
    "Anguished face": "Bolesna twarz",
    "Fearful face": "W obawie twarzy",
    "Weary face": "Zm\u0119czona twarz",
    "Sleepy face": "Je\u017adziec bez twarzy",
    "Tired face": "Zm\u0119czonej twarzy",
    "Grimacing face": "Skrzywi\u0142 twarz",
    "Loudly crying face": "G\u0142o\u015bno p\u0142aka\u0107 twarz",
    "Face with open mouth": "twarz z otwartymi ustami",
    "Hushed face": "Uciszy\u0142 twarzy",
    "Face with open mouth and cold sweat": "Twarz z otwartymi ustami i zimny pot",
    "Face screaming in fear": "Twarz z krzykiem w strachu",
    "Astonished face": "Zdziwienie twarzy",
    "Flushed face": "Zaczerwienienie twarzy",
    "Sleeping face": "\u015api\u0105ca twarz",
    "Dizzy face": "Zawroty g\u0142owy twarzy",
    "Face without mouth": "Twarz bez usta",
    "Face with medical mask": "Twarz\u0105 w medycznych maski",

    // Line breaker
    "Break": "Z\u0142ama\u0107",

    // Math
    "Subscript": "Indeks dolny",
    "Superscript": "Indeks g\u00f3rny",

    // Full screen
    "Fullscreen": "Pe\u0142ny ekran",

    // Horizontal line
    "Insert Horizontal Line": "Wstaw lini\u0119 poziom\u0105",

    // Clear formatting
    "Clear Formatting": "Usu\u0144 formatowanie",

    // Undo, redo
    "Undo": "Cofnij",
    "Redo": "Pon\u00f3w",

    // Select all
    "Select All": "Zaznacz wszystko",

    // Code view
    "Code View": "Widok kod",

    // Quote
    "Quote": "Cytat",
    "Increase": "Wzrost",
    "Decrease": "Zmniejszenie"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Portuguese spoken in Brazil
 */


$.FroalaEditor.LANGUAGE['pt_br'] = {
  translation: {
    // Place holder
    "Type something": "Digite algo",

    // Basic formatting
    "Bold": "Negrito",
    "Italic": "It\u00e1lico",
    "Underline": "Sublinhar",
    "Strikethrough": "Riscar",

    // Main buttons
    "Insert": "Inserir",
    "Delete": "Apagar",
    "Cancel": "Cancelar",
    "OK": "Ok",
    "Back": "Costas",
    "Remove": "Remover",
    "More": "Mais",
    "Update": "Atualizar",
    "Style": "Estilo",

    // Font
    "Font Family": "Fonte",
    "Font Size": "Tamanho",

    // Colors
    "Colors": "Cores",
    "Background": "Fundo",
    "Text": "Texto",

    // Paragraphs
    "Paragraph Format": "Formatos",
    "Normal": "Normal",
    "Code": "C\u00f3digo",
    "Heading 1": "Cabe\u00e7alho 1",
    "Heading 2": "Cabe\u00e7alho 2",
    "Heading 3": "Cabe\u00e7alho 3",
    "Heading 4": "Cabe\u00e7alho 4",

    // Style
    "Paragraph Style": "Estilo de par\u00e1grafo",
    "Inline Style": "Estilo embutido",

    // Alignment
    "Align": "Alinhar",
    "Align Left": "Alinhar \u00e0 esquerda",
    "Align Center": "Centralizar",
    "Align Right": "Alinhar \u00e0 direita",
    "Align Justify": "Justificar",
    "None": "Nenhum",

    // Lists
    "Ordered List": "Lista ordenada",
    "Unordered List": "Lista n\u00e3o ordenada",

    // Indent
    "Decrease Indent": "Diminuir recuo",
    "Increase Indent": "Aumentar recuo",

    // Links
    "Insert Link": "Inserir link",
    "Open in new tab": "Abrir em uma nova aba",
    "Open Link": "Abrir link",
    "Edit Link": "Editar link",
    "Unlink": "Remover link",
    "Choose Link": "Escolha o link",

    // Images
    "Insert Image": "Inserir imagem",
    "Upload Image": "Carregar imagem",
    "By URL": "Por URL",
    "Browse": "Procurar",
    "Drop image": "Arraste sua imagem aqui",
    "or click": "ou clique aqui",
    "Manage Images": "Gerenciar imagens",
    "Loading": "Carregando",
    "Deleting": "Excluindo",
    "Tags": "Etiquetas",
    "Are you sure? Image will be deleted.": "Voc\u00ea tem certeza? Imagem ser\u00e1 apagada.",
    "Replace": "Substituir",
    "Uploading": "Carregar imagem",
    "Loading image": "Carregar imagem",
    "Display": "Exibir",
    "Inline": "Em linha",
    "Break Text": "Texto de quebra",
    "Alternate Text": "Texto alternativo",
    "Change Size": "Alterar tamanho",
    "Width": "Largura",
    "Height": "Altura",
    "Something went wrong. Please try again.": "Algo deu errado. Por favor, tente novamente.",

    // Video
    "Insert Video": "Inserir v\u00eddeo",
    "Embedded Code": "C\u00f3digo embutido",

    // Tables
    "Insert Table": "Inserir tabela",
    "Header": "Cabe\u00e7alho",
    "Row": "Linha",
    "Insert row above": "Inserir linha antes",
    "Insert row below": "Inserir linha depois",
    "Delete row": "Excluir linha",
    "Column": "Coluna",
    "Insert column before": "Inserir coluna antes",
    "Insert column after": "Inserir coluna depois",
    "Delete column": "Excluir coluna",
    "Cell": "C\u00e9lula",
    "Merge cells": "Agrupar c\u00e9lulas",
    "Horizontal split": "Divis\u00e3o horizontal",
    "Vertical split": "Divis\u00e3o vertical",
    "Cell Background": "Fundo da c\u00e9lula",
    "Vertical Align": "Alinhar vertical",
    "Top": "Topo",
    "Middle": "Meio",
    "Bottom": "Fundo",
    "Align Top": "Alinhar topo",
    "Align Middle": "Alinhar meio",
    "Align Bottom": "Alinhar fundo",
    "Cell Style": "Estilo de c\u00e9lula",

    // Files
    "Upload File": "Upload de arquivo",
    "Drop file": "Arraste seu arquivo aqui",

    // Emoticons
    "Emoticons": "Emoticons",
    "Grinning face": "Sorrindo a cara",
    "Grinning face with smiling eyes": "Sorrindo rosto com olhos sorridentes",
    "Face with tears of joy": "Rosto com l\u00e1grimas de alegria",
    "Smiling face with open mouth": "Rosto de sorriso com a boca aberta",
    "Smiling face with open mouth and smiling eyes": "Rosto de sorriso com a boca aberta e olhos sorridentes",
    "Smiling face with open mouth and cold sweat": "Rosto de sorriso com a boca aberta e suor frio",
    "Smiling face with open mouth and tightly-closed eyes": "Rosto de sorriso com a boca aberta e os olhos bem fechados",
    "Smiling face with halo": "Rosto de sorriso com halo",
    "Smiling face with horns": "Rosto de sorriso com chifres",
    "Winking face": "Pisc a rosto",
    "Smiling face with smiling eyes": "Rosto de sorriso com olhos sorridentes",
    "Face savoring delicious food": "Rosto saboreando uma deliciosa comida",
    "Relieved face": "Rosto aliviado",
    "Smiling face with heart-shaped eyes": "Rosto de sorriso com os olhos em forma de cora\u00e7\u00e3o",
    "Smiling face with sunglasses": "Rosto de sorriso com \u00f3culos de sol",
    "Smirking face": "Rosto sorridente",
    "Neutral face": "Rosto neutra",
    "Expressionless face": "Rosto inexpressivo",
    "Unamused face": "O rosto n\u00e3o divertido",
    "Face with cold sweat": "Rosto com suor frio",
    "Pensive face": "O rosto pensativo",
    "Confused face": "Cara confusa",
    "Confounded face": "Rosto at\u00f4nito",
    "Kissing face": "Beijar Rosto",
    "Face throwing a kiss": "Rosto jogando um beijo",
    "Kissing face with smiling eyes": "Beijar rosto com olhos sorridentes",
    "Kissing face with closed eyes": "Beijando a cara com os olhos fechados",
    "Face with stuck out tongue": "Preso de cara com a l\u00edngua para fora",
    "Face with stuck out tongue and winking eye": "Rosto com estendeu a l\u00edngua e olho piscando",
    "Face with stuck out tongue and tightly-closed eyes": "Rosto com estendeu a língua e os olhos bem fechados",
    "Disappointed face": "Rosto decepcionado",
    "Worried face": "O rosto preocupado",
    "Angry face": "Rosto irritado",
    "Pouting face": "Beicinho Rosto",
    "Crying face": "Cara de choro",
    "Persevering face": "Perseverar Rosto",
    "Face with look of triumph": "Rosto com olhar de triunfo",
    "Disappointed but relieved face": "Fiquei Desapontado mas aliviado Rosto",
    "Frowning face with open mouth": "Sobrancelhas franzidas rosto com a boca aberta",
    "Anguished face": "O rosto angustiado",
    "Fearful face": "Cara com medo",
    "Weary face": "Rosto cansado",
    "Sleepy face": "Cara de sono",
    "Tired face": "Rosto cansado",
    "Grimacing face": "Fazendo caretas face",
    "Loudly crying face": "Alto chorando rosto",
    "Face with open mouth": "Enfrentar com a boca aberta",
    "Hushed face": "Flagrantes de rosto",
    "Face with open mouth and cold sweat": "Enfrentar com a boca aberta e suor frio",
    "Face screaming in fear": "Cara gritando de medo",
    "Astonished face": "Cara de surpresa",
    "Flushed face": "Rosto vermelho",
    "Sleeping face": "O rosto de sono",
    "Dizzy face": "Cara tonto",
    "Face without mouth": "Rosto sem boca",
    "Face with medical mask": "Rosto com m\u00e1scara m\u00e9dica",

    // Line breaker
    "Break": "Quebrar",

    // Math
    "Subscript": "Subscrito",
    "Superscript": "Sobrescrito",

    // Full screen
    "Fullscreen": "Tela cheia",

    // Horizontal line
    "Insert Horizontal Line": "Inserir linha horizontal",

    // Clear formatting
    "Clear Formatting": "Remover formata\u00e7\u00e3o",

    // Undo, redo
    "Undo": "Desfazer",
    "Redo": "Refazer",

    // Select all
    "Select All": "Selecionar tudo",

    // Code view
    "Code View": "Exibi\u00e7\u00e3o de c\u00f3digo",

    // Quote
    "Quote": "Cita\u00e7\u00e3o",
    "Increase": "Aumentar",
    "Decrease": "Diminuir"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Portuguese spoken in Portugal
 */


$.FroalaEditor.LANGUAGE['pt_pt'] = {
  translation: {
    // Place holder
    "Type something": "Digite algo",

    // Basic formatting
    "Bold": "Negrito",
    "Italic": "It\u00e1lico",
    "Underline": "Sublinhado",
    "Strikethrough": "Rasurado",

    // Main buttons
    "Insert": "Inserir",
    "Delete": "Apagar",
    "Cancel": "Cancelar",
    "OK": "Ok",
    "Back": "Costas",
    "Remove": "Remover",
    "More": "Mais",
    "Update": "Atualizar",
    "Style": "Estilo",

    // Font
    "Font Family": "Fonte",
    "Font Size": "Tamanho da fonte",

    // Colors
    "Colors": "Cores",
    "Background": "Fundo",
    "Text": "Texto",

    // Paragraphs
    "Paragraph Format": "Formatos",
    "Normal": "Normal",
    "Code": "C\u00f3digo",
    "Heading 1": "Cabe\u00e7alho 1",
    "Heading 2": "Cabe\u00e7alho 2",
    "Heading 3": "Cabe\u00e7alho 3",
    "Heading 4": "Cabe\u00e7alho 4",

    // Style
    "Paragraph Style": "Estilo de par\u00e1grafo",
    "Inline Style": "Estilo embutido",

    // Alignment
    "Align": "Alinhar",
    "Align Left": "Alinhar \u00e0 esquerda",
    "Align Center": "Alinhar ao centro",
    "Align Right": "Alinhar \u00e0 direita",
    "Align Justify": "Justificado",
    "None": "Nenhum",

    // Lists
    "Ordered List": "Lista ordenada",
    "Unordered List": "Lista n\u00e3o ordenada",

    // Indent
    "Decrease Indent": "Diminuir avan\u00e7o",
    "Increase Indent": "Aumentar avan\u00e7o",

    // Links
    "Insert Link": "Inserir link",
    "Open in new tab": "Abrir em uma nova aba",
    "Open Link": "Abrir link",
    "Edit Link": "Editar link",
    "Unlink": "Remover link",
    "Choose Link": "Escolha o link",

    // Images
    "Insert Image": "Inserir imagem",
    "Upload Image": "Carregar imagem",
    "By URL": "Por URL",
    "Browse": "Procurar",
    "Drop image": "Largue imagem",
    "or click": "ou clique em",
    "Manage Images": "Gerenciar as imagens",
    "Loading": "Carregando",
    "Deleting": "Excluindo",
    "Tags": "Etiquetas",
    "Are you sure? Image will be deleted.": "Voc\u00ea tem certeza? Imagem ser\u00e1 apagada.",
    "Replace": "Substituir",
    "Uploading": "Carregar imagem",
    "Loading image": "Carregar imagem",
    "Display": "Exibir",
    "Inline": "Em linha",
    "Break Text": "Texto de quebra",
    "Alternate Text": "Texto alternativo",
    "Change Size": "Alterar tamanho",
    "Width": "Largura",
    "Height": "Altura",
    "Something went wrong. Please try again.": "Algo deu errado. Por favor, tente novamente.",

    // Video
    "Insert Video": "Inserir v\u00eddeo",
    "Embedded Code": "C\u00f3digo embutido",

    // Tables
    "Insert Table": "Inserir tabela",
    "Header": "Cabe\u00e7alho",
    "Row": "Linha",
    "Insert row above": "Inserir linha antes",
    "Insert row below": "Inserir linha depois",
    "Delete row": "Eliminar linha",
    "Column": "Coluna",
    "Insert column before": "Inserir coluna antes",
    "Insert column after": "Inserir coluna depois",
    "Delete column": "Eliminar coluna",
    "Cell": "C\u00e9lula",
    "Merge cells": "Unir c\u00e9lulas",
    "Horizontal split": "Divis\u00e3o horizontal",
    "Vertical split": "Divis\u00e3o vertical",
    "Cell Background": "Fundo da c\u00e9lula",
    "Vertical Align": "Alinhar vertical",
    "Top": "Topo",
    "Middle": "Meio",
    "Bottom": "Fundo",
    "Align Top": "Alinhar topo",
    "Align Middle": "Alinhar meio",
    "Align Bottom": "Alinhar fundo",
    "Cell Style": "Estilo de c\u00e9lula",

    // Files
    "Upload File": "Upload de arquivo",
    "Drop file": "Largar arquivo",

    // Emoticons
    "Emoticons": "Emoticons",
    "Grinning face": "Sorrindo a cara",
    "Grinning face with smiling eyes": "Sorrindo rosto com olhos sorridentes",
    "Face with tears of joy": "Rosto com l\u00e1grimas de alegria",
    "Smiling face with open mouth": "Rosto de sorriso com a boca aberta",
    "Smiling face with open mouth and smiling eyes": "Rosto de sorriso com a boca aberta e olhos sorridentes",
    "Smiling face with open mouth and cold sweat": "Rosto de sorriso com a boca aberta e suor frio",
    "Smiling face with open mouth and tightly-closed eyes": "Rosto de sorriso com a boca aberta e os olhos bem fechados",
    "Smiling face with halo": "Rosto de sorriso com halo",
    "Smiling face with horns": "Rosto de sorriso com chifres",
    "Winking face": "Pisc a rosto",
    "Smiling face with smiling eyes": "Rosto de sorriso com olhos sorridentes",
    "Face savoring delicious food": "Rosto saboreando uma deliciosa comida",
    "Relieved face": "Rosto aliviado",
    "Smiling face with heart-shaped eyes": "Rosto de sorriso com os olhos em forma de cora\u00e7\u00e3o",
    "Smiling face with sunglasses": "Rosto de sorriso com \u00f3culos de sol",
    "Smirking face": "Rosto sorridente",
    "Neutral face": "Rosto neutra",
    "Expressionless face": "Rosto inexpressivo",
    "Unamused face": "O rosto n\u00e3o divertido",
    "Face with cold sweat": "Rosto com suor frio",
    "Pensive face": "O rosto pensativo",
    "Confused face": "Cara confusa",
    "Confounded face": "Rosto at\u00f4nito",
    "Kissing face": "Beijar Rosto",
    "Face throwing a kiss": "Rosto jogando um beijo",
    "Kissing face with smiling eyes": "Beijar rosto com olhos sorridentes",
    "Kissing face with closed eyes": "Beijando a cara com os olhos fechados",
    "Face with stuck out tongue": "Preso de cara com a l\u00edngua para fora",
    "Face with stuck out tongue and winking eye": "Rosto com estendeu a l\u00edngua e olho piscando",
    "Face with stuck out tongue and tightly-closed eyes": "Rosto com estendeu a língua e os olhos bem fechados",
    "Disappointed face": "Rosto decepcionado",
    "Worried face": "O rosto preocupado",
    "Angry face": "Rosto irritado",
    "Pouting face": "Beicinho Rosto",
    "Crying face": "Cara de choro",
    "Persevering face": "Perseverar Rosto",
    "Face with look of triumph": "Rosto com olhar de triunfo",
    "Disappointed but relieved face": "Fiquei Desapontado mas aliviado Rosto",
    "Frowning face with open mouth": "Sobrancelhas franzidas rosto com a boca aberta",
    "Anguished face": "O rosto angustiado",
    "Fearful face": "Cara com medo",
    "Weary face": "Rosto cansado",
    "Sleepy face": "Cara de sono",
    "Tired face": "Rosto cansado",
    "Grimacing face": "Fazendo caretas face",
    "Loudly crying face": "Alto chorando rosto",
    "Face with open mouth": "Enfrentar com a boca aberta",
    "Hushed face": "Flagrantes de rosto",
    "Face with open mouth and cold sweat": "Enfrentar com a boca aberta e suor frio",
    "Face screaming in fear": "Cara gritando de medo",
    "Astonished face": "Cara de surpresa",
    "Flushed face": "Rosto vermelho",
    "Sleeping face": "O rosto de sono",
    "Dizzy face": "Cara tonto",
    "Face without mouth": "Rosto sem boca",
    "Face with medical mask": "Rosto com m\u00e1scara m\u00e9dica",

    // Line breaker
    "Break": "Partir",

    // Math
    "Subscript": "Subscrito",
    "Superscript": "Sobrescrito",

    // Full screen
    "Fullscreen": "Tela cheia",

    // Horizontal line
    "Insert Horizontal Line": "Inserir linha horizontal",

    // Clear formatting
    "Clear Formatting": "Remover formata\u00e7\u00e3o",

    // Undo, redo
    "Undo": "Anular",
    "Redo": "Restaurar",

    // Select all
    "Select All": "Seleccionar tudo",

    // Code view
    "Code View": "Exibi\u00e7\u00e3o de c\u00f3digo",

    // Quote
    "Quote": "Cita\u00e7\u00e3o",
    "Increase": "Aumentar",
    "Decrease": "Diminuir"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Romanian
 */


$.FroalaEditor.LANGUAGE['ro'] = {
  translation: {
    // Place holder
    "Type something": "Tasteaz\u0103 ceva",

    // Basic formatting
    "Bold": "\u00cengro\u015fat",
    "Italic": "Cursiv",
    "Underline": "Subliniat",
    "Strikethrough": "T\u0103iat",

    // Main buttons
    "Insert": "Insereaz\u0103",
    "Delete": "\u015eterge",
    "Cancel": "Anuleaz\u0103",
    "OK": "Ok",
    "Back": "\u00cenapoi",
    "Remove": "\u0218terge",
    "More": "Mai mult",
    "Update": "Actualizeaz\u0103",
    "Style": "Stil",

    // Font
    "Font Family": "Font",
    "Font Size": "Dimensiune font",

    // Colors
    "Colors": "Culoare",
    "Background": "Fundal",
    "Text": "Text",

    // Paragraphs
    "Paragraph Format": "Format paragraf",
    "Normal": "Normal",
    "Code": "Cod",
    "Heading 1": "Antet 1",
    "Heading 2": "Antet 2",
    "Heading 3": "Antet 3",
    "Heading 4": "Antet 4",

    // Style
    "Paragraph Style": "Stil paragraf",
    "Inline Style": "Stil \u00een linie",

    // Alignment
    "Align": "Aliniere",
    "Align Left": "Aliniere la st\u00e2nga",
    "Align Center": "Aliniere la centru",
    "Align Right": "Aliniere la dreapta",
    "Align Justify": "Aliniere pe toat\u0103 l\u0103\u021bimea",
    "None": "Niciunul",

    // Lists
    "Ordered List": "List\u0103 ordonat\u0103",
    "Unordered List": "List\u0103 neordonat\u0103",

    // Indent
    "Decrease Indent": "De-indenteaz\u0103",
    "Increase Indent": "Indenteaz\u0103",

    // Links
    "Insert Link": "Inserare link",
    "Open in new tab": "Deschide \u00EEn tab nou",
    "Open Link": "Deschide link",
    "Edit Link": "Editare link",
    "Unlink": "\u0218terge link-ul",
    "Choose Link": "Alege link",

    // Images
    "Insert Image": "Inserare imagine",
    "Upload Image": "\u00cencarc\u0103 imagine",
    "By URL": "Dup\u0103 URL",
    "Browse": "R\u0103sfoie\u0219te",
    "Drop image": "Trage imagine",
    "or click": "sau f\u0103 click",
    "Manage Images": "Gestionare imagini",
    "Loading": "Se \u00eencarc\u0103",
    "Deleting": "",
    "Deleting": "Se \u0219terge",
    "Tags": "Etichete",
    "Are you sure? Image will be deleted.": "Sunte\u021bi sigur? Imaginea va fi \u015ftears\u0103.",
    "Replace": "\u00cenlocuire",
    "Uploading": "Imaginea se \u00eencarc\u0103",
    "Loading image": "Imaginea se \u00eencarc\u0103",
    "Display": "Afi\u0219are",
    "Inline": "\u00cen linie",
    "Break Text": "Sparge text",
    "Alternate Text": "Text alternativ",
    "Change Size": "Modificare dimensiuni",
    "Width": "L\u0103\u021bime",
    "Height": "\u00cen\u0103l\u021bime",
    "Something went wrong. Please try again.": "Ceva n-a mers bine. V\u0103 rug\u0103m s\u0103 \u00eencerca\u021bi din nou.",

    // Video
    "Insert Video": "Inserare video",
    "Embedded Code": "Cod embedded",

    // Tables
    "Insert Table": "Inserare tabel",
    "Header": "Antet",
    "Row": "Linie",
    "Insert row above": "Insereaz\u0103 linie \u00eenainte",
    "Insert row below": "Insereaz\u0103 linie dup\u0103",
    "Delete row": "\u015eterge linia",
    "Column": "Coloan\u0103",
    "Insert column before": "Insereaz\u0103 coloan\u0103 \u00eenainte",
    "Insert column after": "Insereaz\u0103 coloan\u0103 dup\u0103",
    "Delete column": "\u015eterge coloana",
    "Cell": "Celula",
    "Merge cells": "Une\u015fte celulele",
    "Horizontal split": "\u00cemparte orizontal",
    "Vertical split": "\u00cemparte vertical",
    "Cell Background": "Fundal celul\u0103",
    "Vertical Align": "Aliniere verticl\u0103",
    "Top": "Sus",
    "Middle": "Mijloc",
    "Bottom": "Jos",
    "Align Top": "Aliniere sus",
    "Align Middle": "Aliniere la mijloc",
    "Align Bottom": "Aliniere jos",
    "Cell Style": "Stil celul\u0103",

    // Files
    "Upload File": "\u00cenc\u0103rca\u021bi fi\u0219ier",
    "Drop file": "Trage fi\u0219ier",

    // Emoticons
    "Emoticons": "Emoticoane",
    "Grinning face": "Fa\u021b\u0103 r\u00e2njind",
    "Grinning face with smiling eyes": "Fa\u021b\u0103 r\u00e2njind cu ochi z\u00e2mbitori",
    "Face with tears of joy": "Fa\u021b\u0103 cu lacrimi de bucurie",
    "Smiling face with open mouth": "Fa\u021b\u0103 z\u00e2mbitoare cu gura deschis\u0103",
    "Smiling face with open mouth and smiling eyes": "Fa\u021b\u0103 z\u00e2mbitoare cu gura deschis\u0103 \u0219i ochi z\u00e2mbitori",
    "Smiling face with open mouth and cold sweat": "Fa\u021b\u0103 z\u00e2mbitoare cu gura deschis\u0103 şi sudoare rece",
    "Smiling face with open mouth and tightly-closed eyes": "Fa\u021b\u0103 z\u00e2mbitoare cu gura deschis\u0103 şi ochii ferm \u00eenchi\u0219i",
    "Smiling face with halo": "Fa\u021b\u0103 z\u00e2mbitoare cu aur\u0103",
    "Smiling face with horns": "Fa\u021b\u0103 z\u00e2mbitoare cu coarne",
    "Winking face": "Fa\u021b\u0103 clipind",
    "Smiling face with smiling eyes": "Fa\u021b\u0103 z\u00e2mbitoare cu ochi z\u00e2mbitori",
    "Face savoring delicious food": "Fa\u021b\u0103 savur\u00e2nd preparate delicioase",
    "Relieved face": "Fa\u021b\u0103 u\u0219urat\u0103",
    "Smiling face with heart-shaped eyes": "Fa\u021b\u0103 z\u00e2mbitoare cu ochi in forma de inim\u0103",
    "Smiling face with sunglasses": "Fa\u021b\u0103 z\u00e2mbitoare cu ochelari de soare",
    "Smirking face": "Fa\u021b\u0103 cu sur\u00e2s afectat",
    "Neutral face": "Fa\u021b\u0103 neutr\u0103",
    "Expressionless face": "Fa\u021b\u0103 f\u0103r\u0103 expresie",
    "Unamused face": "Fa\u021b\u0103 neamuzat\u0103",
    "Face with cold sweat": "Fa\u021b\u0103 cu sudoare rece",
    "Pensive face": "Fa\u021b\u0103 medit\u00e2nd",
    "Confused face": "Fa\u021b\u0103 confuz\u0103",
    "Confounded face": "Fa\u021b\u0103 z\u0103p\u0103cit\u0103",
    "Kissing face": "Fa\u021b\u0103 s\u0103rut\u00e2nd",
    "Face throwing a kiss": "Fa\u021b\u0103 arunc\u00e2nd un s\u0103rut",
    "Kissing face with smiling eyes": "Fa\u021b\u0103 s\u0103rut\u00e2nd cu ochi z\u00e2mbitori",
    "Kissing face with closed eyes": "Fa\u021b\u0103 s\u0103rut\u00e2nd cu ochii \u00eenchi\u0219i",
    "Face with stuck out tongue": "Fa\u021b\u0103 cu limba afar\u0103",
    "Face with stuck out tongue and winking eye": "Fa\u021b\u0103 cu limba scoas\u0103 clipind",
    "Face with stuck out tongue and tightly-closed eyes": "Fa\u021b\u0103 cu limba scoas\u0103 \u0219i ochii ferm \u00eenchi\u0219i",
    "Disappointed face": "Fa\u021b\u0103 dezam\u0103git\u0103",
    "Worried face": "Fa\u021b\u0103 \u00eengrijorat\u0103",
    "Angry face": "Fa\u021b\u0103 nervoas\u0103",
    "Pouting face": "Fa\u021b\u0103 fierb\u00e2nd",
    "Crying face": "Fa\u021b\u0103 pl\u00e2ng\u00e2nd",
    "Persevering face": "Fa\u021b\u0103 perseverent\u0103",
    "Face with look of triumph": "Fa\u021b\u0103 triumf\u0103toare",
    "Disappointed but relieved face": "Fa\u021b\u0103 dezam\u0103git\u0103 dar u\u0219urat\u0103",
    "Frowning face with open mouth": "Fa\u021b\u0103 \u00eencruntat\u0103 cu gura deschis\u0103",
    "Anguished face": "Fa\u021b\u0103 \u00eendurerat\u0103",
    "Fearful face": "Fa\u021b\u0103 tem\u0103toare",
    "Weary face": "Fa\u021b\u0103 \u00eengrijorat\u0103",
    "Sleepy face": "Fa\u021b\u0103 adormit\u0103",
    "Tired face": "Fa\u021b\u0103 obosit\u0103",
    "Grimacing face": "Fa\u021b\u0103 cu grimas\u0103",
    "Loudly crying face": "Fa\u021b\u0103 pl\u00e2ng\u00e2nd zgomotos",
    "Face with open mouth": "Fa\u021b\u0103 cu gura deschis\u0103",
    "Hushed face": "Fa\u021b\u0103 discret\u0103",
    "Face with open mouth and cold sweat": "Fa\u021b\u0103 cu gura deschis\u0103 si sudoare rece",
    "Face screaming in fear": "Fa\u021b\u0103 \u021bip\u00e2nd de fric\u0103",
    "Astonished face": "Fa\u021b\u0103 uimit\u0103",
    "Flushed face": "Fa\u021b\u0103 sp\u0103lat\u0103",
    "Sleeping face": "Fa\u021b\u0103 adormit\u0103",
    "Dizzy face": "Fa\u021b\u0103 ame\u021bit\u0103",
    "Face without mouth": "Fa\u021b\u0103 f\u0103r\u0103 gur\u0103",
    "Face with medical mask": "Fa\u021b\u0103 cu masc\u0103 medical\u0103",

    // Line breaker
    "Break": "Desparte",

    // Horizontal line
    "Insert Horizontal Line": "Inserare linie orizontal\u0103",

    // Math
    "Subscript": "Indice",
    "Superscript": "Exponent",

    // Full screen
    "Fullscreen": "Ecran complet",

    // Clear formatting
    "Clear Formatting": "Elimina\u021bi formatarea",

    // Undo, redo
    "Undo": "Reexecut\u0103",
    "Redo": "Dezexecut\u0103",

    // Select all
    "Select All": "Selecteaz\u0103 tot",

    // Code view
    "Code View": "Vizualizare cod",

    // Quote
    "Quote": "Citat",
    "Increase": "Indenteaz\u0103",
    "Decrease": "De-indenteaz\u0103"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Russian
 */


$.FroalaEditor.LANGUAGE['ru'] = {
  translation: {
    // Place holder
    "Type something": "\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0447\u0442\u043e\u002d\u043d\u0438\u0431\u0443\u0434\u044c",

    // Basic formatting
    "Bold": "\u0416\u0438\u0440\u043d\u044b\u0439",
    "Italic": "\u041a\u0443\u0440\u0441\u0438\u0432",
    "Underline": "\u041f\u043e\u0434\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439",
    "Strikethrough": "\u0417\u0430\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439",

    // Main buttons
    "Insert": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c",
    "Delete": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    "Cancel": "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c",
    "OK": "OK",
    "Back": "\u043d\u0430\u0437\u0430\u0434",
    "Remove": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    "More": "\u0411\u043e\u043b\u044c\u0448\u0435",
    "Update": "\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435",
    "Style": "\u0421\u0442\u0438\u043b\u044c",

    // Font
    "Font Family": "\u0428\u0440\u0438\u0444\u0442",
    "Font Size": "\u0420\u0430\u0437\u043c\u0435\u0440 \u0448\u0440\u0438\u0444\u0442\u0430",

    // Colors
    "Colors": "\u0446\u0432\u0435\u0442\u0430",
    "Background": "\u0424\u043e\u043d",
    "Text": "\u0442\u0435\u043a\u0441\u0442",

    // Paragraphs
    "Paragraph Format": "\u0424\u043e\u0440\u043c\u0430\u0442",
    "Normal": "\u041d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u044b\u0439",
    "Code": "\u041a\u043e\u0434",
    "Heading 1": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 1",
    "Heading 2": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 2",
    "Heading 3": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 3",
    "Heading 4": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 4",

    // Style
    "Paragraph Style": "\u041f\u0443\u043d\u043a\u0442 \u0441\u0442\u0438\u043b\u044c",
    "Inline Style": "\u0412\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u044b\u0439 \u0441\u0442\u0438\u043b\u044c",

    // Alignment
    "Align": "\u041f\u043e",
    "Align Left": "\u041f\u043e \u043b\u0435\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e",
    "Align Center": "\u041f\u043e \u0446\u0435\u043d\u0442\u0440\u0443",
    "Align Right": "\u041f\u043e \u043f\u0440\u0430\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e",
    "Align Justify": "\u041f\u043e \u0448\u0438\u0440\u0438\u043d\u0435",
    "None": "\u043d\u0438",

    // Lists
    "Ordered List": "\u041d\u0443\u043c\u0435\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a",
    "Unordered List": "\u041c\u0430\u0440\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a",

    // Indent
    "Decrease Indent": "\u0423\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u044c \u043e\u0442\u0441\u0442\u0443\u043f",
    "Increase Indent": "\u0423\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c \u043e\u0442\u0441\u0442\u0443\u043f",

    // Links
    "Insert Link": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443",
    "Open in new tab": "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 \u043d\u043e\u0432\u043e\u0439 \u0432\u043a\u043b\u0430\u0434\u043a\u0435",
    "Open Link": "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443",
    "Edit Link": "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443",
    "Unlink": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443",
    "Choose Link": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443",

    // Images
    "Insert Image": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435",
    "Upload Image": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435",
    "By URL": "\u041e\u0442 URL",
    "Browse": "\u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044c",
    "Drop image": "\u041f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u0435 \u0441\u044e\u0434\u0430 \u0444\u0430\u0439\u043b",
    "or click": "\u0438\u043b\u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435",
    "Manage Images": "\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f\u043c\u0438",
    "Loading": "\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430",
    "Deleting": "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435",
    "Tags": "\u041a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u0441\u043b\u043e\u0432\u0430",
    "Are you sure? Image will be deleted.": "\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b? \u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043b\u0435\u043d\u043e.",
    "Replace": "\u0437\u0430\u043c\u0435\u043d\u044f\u0442\u044c",
    "Uploading": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430",
    "Loading image": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0439",
    "Display": "\u0434\u0438\u0441\u043f\u043b\u0435\u0439",
    "Inline": "\u0412 \u043e\u0447\u0435\u0440\u0435\u0434\u0438",
    "Break Text": "\u0441\u043b\u043e\u043c\u0438\u0442\u044c \u0442\u0435\u043a\u0441\u0442",
    "Alternate Text": "\u0410\u043b\u044c\u0442\u0435\u0440\u043d\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442",
    "Change Size": "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0440\u0430\u0437\u043c\u0435\u0440",
    "Width": "\u0448\u0438\u0440\u0438\u043d\u0430",
    "Height": "\u0432\u044b\u0441\u043e\u0442\u0430",
    "Something went wrong. Please try again.": "\u0427\u0442\u043e\u002d\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a\u002e \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430\u002c \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437\u002e",

    // Video
    "Insert Video": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0432\u0438\u0434\u0435\u043e",
    "Embedded Code": "\u0412\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u0434",

    // Tables
    "Insert Table": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0442\u0430\u0431\u043b\u0438\u0446\u0443",
    "Header": "\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",
    "Row": "\u0421\u0442\u0440\u043e\u043a\u0430",
    "Insert row above": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u0443\u0441\u0442\u0443\u044e \u0441\u0442\u0440\u043e\u043a\u0443 \u0441\u0432\u0435\u0440\u0445\u0443",
    "Insert row below": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u0443\u0441\u0442\u0443\u044e \u0441\u0442\u0440\u043e\u043a\u0443 \u0441\u043d\u0438\u0437\u0443",
    "Delete row": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0442\u0440\u043e\u043a\u0443",
    "Column": "\u0421\u0442\u043e\u043b\u0431\u0435\u0446",
    "Insert column before": "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u043e\u043b\u0431\u0435\u0446 \u0441\u043b\u0435\u0432\u0430",
    "Insert column after": "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0442\u043e\u043b\u0431\u0435\u0446 \u0441\u043f\u0440\u0430\u0432\u0430",
    "Delete column": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0442\u043e\u043b\u0431\u0435\u0446",
    "Cell": "\u042f\u0447\u0435\u0439\u043a\u0430",
    "Merge cells": "\u041e\u0431\u044a\u0435\u0434\u0438\u043d\u0438\u0442\u044c \u044f\u0447\u0435\u0439\u043a\u0438",
    "Horizontal split": "\u0420\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u044c \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u043e",
    "Vertical split": "\u0420\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u044c \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u043e",
    "Cell Background": "\u0441\u043e\u0442\u043e\u0432\u044b\u0439 \u0444\u043e\u043d",
    "Vertical Align": "\u0412\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u0430\u044f \u0432\u044b\u0440\u0430\u0432\u043d\u0438\u0432\u0430\u043d\u0438\u0435",
    "Top": "\u0442\u043e\u043f",
    "Middle": "\u0441\u0440\u0435\u0434\u043d\u0438\u0439",
    "Bottom": "\u0414\u043d\u043e",
    "Align Top": "\u0421\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u0442\u0435 \u0432\u0435\u0440\u0445\u043d\u044e\u044e",
    "Align Middle": "\u0412\u044b\u0440\u043e\u0432\u043d\u044f\u0442\u044c \u043f\u043e \u0441\u0435\u0440\u0435\u0434\u0438\u043d\u0435",
    "Align Bottom": "\u0421\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u0442\u0435 \u043d\u0438\u0436\u043d\u044e\u044e",
    "Cell Style": "\u0441\u0442\u0438\u043b\u044c \u044f\u0447\u0435\u0439\u043a\u0438",

    // Files
    "Upload File": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0444\u0430\u0439\u043b",
    "Drop file": "\u043f\u0430\u0434\u0435\u043d\u0438\u0435 \u0444\u0430\u0439\u043b\u0430",

    // Emoticons
    "Emoticons": "\u0421\u043c\u0430\u0439\u043b\u0438\u043a\u0438",
"Grinning face": "",
    "Grinning face with smiling eyes": "\u0423\u0441\u043c\u0435\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u0443\u043b\u044b\u0431\u0430\u044e\u0449\u0438\u043c\u0438\u0441\u044f \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Face with tears of joy": "\u041b\u0438\u0446\u043e \u0441\u043e \u0441\u043b\u0435\u0437\u0430\u043c\u0438 \u0440\u0430\u0434\u043e\u0441\u0442\u0438",
    "Smiling face with open mouth": "\u0423\u043b\u044b\u0431\u0430\u044e\u0449\u0435\u0435\u0441\u044f \u043b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c",
    "Smiling face with open mouth and smiling eyes": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c \u0438 \u0443\u043b\u044b\u0431\u0430\u044e\u0449\u0438\u0435\u0441\u044f \u0433\u043b\u0430\u0437\u0430",
    "Smiling face with open mouth and cold sweat": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c \u0438 \u0445\u043e\u043b\u043e\u0434\u043d\u044b\u0439 \u043f\u043e\u0442",
    "Smiling face with open mouth and tightly-closed eyes": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c \u0438 \u043f\u043b\u043e\u0442\u043d\u043e \u0437\u0430\u043a\u0440\u044b\u0442\u044b\u043c\u0438 \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Smiling face with halo": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0433\u0430\u043b\u043e",
    "Smiling face with horns": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u0440\u043e\u0433\u0430\u043c\u0438",
    "Winking face": "\u043f\u043e\u0434\u043c\u0438\u0433\u0438\u0432\u0430\u044f \u043b\u0438\u0446\u043e",
    "Smiling face with smiling eyes": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u0443\u043b\u044b\u0431\u0430\u044e\u0449\u0438\u043c\u0438\u0441\u044f \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Face savoring delicious food": "\u041b\u0438\u0446\u043e \u0441\u043c\u0430\u043a\u0443\u044f \u0432\u043a\u0443\u0441\u043d\u0443\u044e \u0435\u0434\u0443",
    "Relieved face": "\u041e\u0441\u0432\u043e\u0431\u043e\u0436\u0434\u0435\u043d\u044b \u043b\u0438\u0446\u043e",
    "Smiling face with heart-shaped eyes": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0432 \u0444\u043e\u0440\u043c\u0435 \u0441\u0435\u0440\u0434\u0446\u0430 \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Smiling face with sunglasses": "\u0423\u043b\u044b\u0431\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u043e\u0447\u043a\u0430\u043c\u0438",
    "Smirking face": "\u0423\u0441\u043c\u0435\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043b\u0438\u0446\u043e",
    "Neutral face": "\u041e\u0431\u044b\u0447\u043d\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Expressionless face": "\u043d\u0435\u0432\u044b\u0440\u0430\u0437\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043b\u0438\u0446\u0430",
    "Unamused face": "\u041d\u0435 \u0441\u043c\u0435\u0448\u043d\u043e \u043b\u0438\u0446\u043e",
    "Face with cold sweat": "\u041b\u0438\u0446\u043e \u0441 \u0445\u043e\u043b\u043e\u0434\u043d\u043e\u0433\u043e \u043f\u043e\u0442\u0430",
    "Pensive face": "\u0417\u0430\u0434\u0443\u043c\u0447\u0438\u0432\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Confused face": "\u041f\u0443\u0442\u0430\u0442\u044c \u043b\u0438\u0446\u043e",
    "Confounded face": "\u0414\u0430 \u043f\u043e\u0441\u0442\u044b\u0434\u044f\u0442\u0441\u044f \u043b\u0438\u0446\u043e",
    "Kissing face": "\u041f\u043e\u0446\u0435\u043b\u0443\u0438 \u043b\u0438\u0446\u043e",
    "Face throwing a kiss": "\u041b\u0438\u0446\u043e \u0431\u0440\u043e\u0441\u0430\u043b\u0438 \u043f\u043e\u0446\u0435\u043b\u0443\u0439",
    "Kissing face with smiling eyes": "\u041f\u043e\u0446\u0435\u043b\u0443\u0438 \u043b\u0438\u0446\u043e \u0441 \u0443\u043b\u044b\u0431\u0430\u044e\u0449\u0438\u043c\u0438\u0441\u044f \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Kissing face with closed eyes": "\u041f\u043e\u0446\u0435\u043b\u0443\u0438 \u043b\u0438\u0446\u043e \u0441 \u0437\u0430\u043a\u0440\u044b\u0442\u044b\u043c\u0438 \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Face with stuck out tongue": "\u041b\u0438\u0446\u043e \u0441 \u0442\u043e\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u044b\u043a\u0430",
    "Face with stuck out tongue and winking eye": "\u041b\u0438\u0446\u043e \u0441 \u0442\u043e\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u044b\u043a \u0438 \u043f\u043e\u0434\u043c\u0438\u0433\u0438\u0432\u0430\u044f \u0433\u043b\u0430\u0437\u043e\u043c",
    "Face with stuck out tongue and tightly-closed eyes": "\u041b\u0438\u0446\u043e \u0441 \u0442\u043e\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u044b\u043a \u0438 \u043f\u043b\u043e\u0442\u043d\u043e \u0437\u0430\u043a\u0440\u044b\u0442\u044b\u043c\u0438 \u0433\u043b\u0430\u0437\u0430\u043c\u0438",
    "Disappointed face": "\u0420\u0430\u0437\u043e\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Worried face": "\u041e\u0431\u0435\u0441\u043f\u043e\u043a\u043e\u0435\u043d\u043d\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Angry face": "\u0417\u043b\u043e\u0439 \u043b\u0438\u0446\u043e",
    "Pouting face": "\u041f\u0443\u0445\u043b\u044b\u0435 \u043b\u0438\u0446\u043e",
    "Crying face": "\u041f\u043b\u0430\u0447 \u043b\u0438\u0446\u043e",
    "Persevering face": "\u041d\u0430\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u0430\u044f \u043b\u0438\u0446\u043e",
    "Face with look of triumph": "\u041b\u0438\u0446\u043e \u0441 \u0432\u0438\u0434\u043e\u043c \u0442\u0440\u0438\u0443\u043c\u0444\u0430",
    "Disappointed but relieved face": "\u0420\u0430\u0437\u043e\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439\u002c \u043d\u043e \u043e\u0441\u0432\u043e\u0431\u043e\u0436\u0434\u0435\u043d \u043b\u0438\u0446\u043e",
    "Frowning face with open mouth": "\u041d\u0430\u0445\u043c\u0443\u0440\u0438\u0432\u0448\u0438\u0441\u044c \u043b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c",
    "Anguished face": "\u043c\u0443\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Fearful face": "\u041e\u043f\u0430\u0441\u0430\u044f\u0441\u044c \u043b\u0438\u0446\u043e",
    "Weary face": "\u0423\u0441\u0442\u0430\u043b\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Sleepy face": "\u0441\u043e\u043d\u043d\u043e\u0435 \u043b\u0438\u0446\u043e",
    "Tired face": "\u0423\u0441\u0442\u0430\u043b\u0438 \u043b\u0438\u0446\u043e",
    "Grimacing face": "\u0413\u0440\u0438\u043c\u0430\u0441\u043d\u0438\u0447\u0430\u044f \u043b\u0438\u0446\u043e",
    "Loudly crying face": "\u0413\u0440\u043e\u043c\u043a\u043e \u043f\u043b\u0430\u0447\u0430 \u043b\u0438\u0446\u043e",
    "Face with open mouth": "\u041b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c",
    "Hushed face": "\u0417\u0430\u0442\u0438\u0445\u0448\u0438\u0439 \u043b\u0438\u0446\u043e",
    "Face with open mouth and cold sweat": "\u041b\u0438\u0446\u043e \u0441 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u043c \u0440\u0442\u043e\u043c \u0438 \u0445\u043e\u043b\u043e\u0434\u043d\u044b\u0439 \u043f\u043e\u0442",
    "Face screaming in fear": "\u041b\u0438\u0446\u043e \u043a\u0440\u0438\u0447\u0430\u0442\u044c \u0432 \u0441\u0442\u0440\u0430\u0445\u0435",
    "Astonished face": "\u0423\u0434\u0438\u0432\u043b\u0435\u043d\u043d\u044b\u0439 \u043b\u0438\u0446\u043e",
    "Flushed face": "\u041f\u0440\u0438\u043b\u0438\u0432 \u043a\u0440\u043e\u0432\u0438 \u043a \u043b\u0438\u0446\u0443",
    "Sleeping face": "\u0421\u043f\u044f\u0449\u0430\u044f \u043b\u0438\u0446\u043e",
    "Dizzy face": "\u0414\u0438\u0437\u0437\u0438 \u043b\u0438\u0446\u043e",
    "Face without mouth": "\u041b\u0438\u0446\u043e \u0431\u0435\u0437 \u0440\u0442\u0430",
    "Face with medical mask": "\u041b\u0438\u0446\u043e \u0441 \u043c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u043e\u0439 \u043c\u0430\u0441\u043a\u043e\u0439",

    // Line breaker
    "Break": "\u0441\u043b\u043e\u043c\u0438\u0442\u044c",

    // Math
    "Subscript": "\u0418\u043d\u0434\u0435\u043a\u0441",
    "Superscript": "\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u0438\u043d\u0434\u0435\u043a\u0441",

    // Full screen
    "Fullscreen": "\u043f\u043e\u043b\u043d\u044b\u0439 \u044d\u043a\u0440\u0430\u043d",

    // Horizontal line
    "Insert Horizontal Line": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u0443\u044e \u043b\u0438\u043d\u0438\u044e",

    // Clear formatting
    "Clear Formatting": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0444\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435",

    // Undo, redo
    "Undo": "\u0412\u0435\u0440\u043d\u0443\u0442\u044c",
    "Redo": "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c",

    // Select all
    "Select All": "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0441\u0435",

    // Code view
    "Code View": "\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u043a\u043e\u0434\u0430",

    // Quote
    "Quote": "\u0446\u0438\u0442\u0430\u0442\u0430",
    "Increase": "\u0423\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u0435",
    "Decrease": "\u0421\u043d\u0438\u0436\u0435\u043d\u0438\u0435"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Serbian (Latin)
 */


$.FroalaEditor.LANGUAGE['sr'] = {
  translation: {
    // Place holder
    "Type something": "Ukucajte ne\u0161tp",

    // Basic formatting
    "Bold": "Podebljan",
    "Italic": "Isko\u0161en",
    "Underline": "Podvu\u010deno",
    "Strikethrough": "Precrtan",

    // Main buttons
    "Insert": "Umetanje",
    "Delete": "Izbri\u0161i",
    "Cancel": "Otkazivanje",
    "OK": "Ok",
    "Back": "Nazad",
    "Remove": "Uklonite",
    "More": "Vi\u0161e",
    "Update": "A\u017euriranje",
    "Style": "Stil",

    // Font
    "Font Family": "Odaberi font",
    "Font Size": "Veli\u010dina fontova",

    // Colors
    "Colors": "Boje",
    "Background": "Pozadina",
    "Text": "Tekst",

    // Paragraphs
    "Paragraph Format": "Format pasusa",
    "Normal": "Normalno",
    "Code": "\u0160ifra",
    "Heading 1": "Naslov 1",
    "Heading 2": "Naslov 2",
    "Heading 3": "Naslov 3",
    "Heading 4": "Naslov 4",

    // Style
    "Paragraph Style": "Stil pasusa",
    "Inline Style": "Umetnutih stilova",

    // Alignment
    "Align": "Poravnavanje",
    "Align Left": "Poravnaj levo",
    "Align Center": "Poravnaj u centru",
    "Align Right": "Poravnaj desno",
    "Align Justify": "Obostrano poravnavanje",
    "None": "Niko nije",

    // Lists
    "Ordered List": "Ure\u0111enih lista",
    "Unordered List": "Neure\u0111enu lista",

    // Indent
    "Decrease Indent": "Smanjivanje uvla\u010denja",
    "Increase Indent": "Pove\u0107avanje uvla\u010denja",

    // Links
    "Insert Link": "Umetni vezu",
    "Open in new tab": "Otvori na novoj kartici",
    "Open Link": "Otvori vezu",
    "Edit Link": "Ure\u0111ivanje veze",
    "Unlink": "Ukloni vezu",
    "Choose Link": "Odaberite vezu",

    // Images
    "Insert Image": "Umetanje slike",
    "Upload Image": "Otpremanje slika",
    "By URL": "Po URL adresi",
    "Browse": "Potra\u017ei",
    "Drop image": "Baci sliku",
    "or click": "ili kliknite na dugme",
    "Manage Images": "Upravljanje slike",
    "Loading": "U\u010ditavanje",
    "Deleting": "Brisanje",
    "Tags": "Oznake",
    "Are you sure? Image will be deleted.": "Jesi siguran? Slika \u0107e biti izbrisana.",
    "Replace": "Zameni",
    "Uploading": "Otpremanje",
    "Loading image": "U\u010ditavanje slika",
    "Display": "Prikaz",
    "Inline": "Pri upisivanju",
    "Break Text": "Prelom teksta",
    "Alternate Text": "Alternativni tekst",
    "Change Size": "Promena veli\u010dine",
    "Width": "\u0160irina",
    "Height": "Visina",
    "Something went wrong. Please try again.": "Ne\u0161to krenulo naopako. Poku\u0161ajte ponovo.",

    // Video
    "Insert Video": "Umetanje video",
    "Embedded Code": "Ugra\u0111eni k\u00f4d",

    // Tables
    "Insert Table": "Umetni tabelu",
    "Header": "Zaglavlje",
    "Row": "Red",
    "Insert row above": "Umetni red iznad",
    "Insert row below": "Umetni red ispod",
    "Delete row": "Izbri\u0161i red",
    "Column": "Kolone",
    "Insert column before": "Umetnite kolonu pre",
    "Insert column after": "Umetnite kolonu nakon",
    "Delete column": "Izbri\u0161i kolone",
    "Cell": "Mobilni",
    "Merge cells": "Objedinjavanje \u0107elija",
    "Horizontal split": "Horizontalna split",
    "Vertical split": "Vertikalno razdelite",
    "Cell Background": "Mobilni pozadina",
    "Vertical Align": "Vertikalno poravnavanje",
    "Top": "Top",
    "Middle": "Srednji",
    "Bottom": "Dno",
    "Align Top": "Poravnaj gore",
    "Align Middle": "Poravnaj po sredini",
    "Align Bottom": "Poravnaj dole",
    "Cell Style": "Mobilni stil",

    // Files
    "Upload File": "Otpremanje datoteke",
    "Drop file": "Baci datoteku",

    // Emoticons
    "Emoticons": "Emotikona",
    "Grinning face": "Nasmejanoj lice",
    "Grinning face with smiling eyes": "Nasmejanoj lice sa osmehom o\u010di",
    "Face with tears of joy": "Suo\u010davaju sa suzama radosnicama",
    "Smiling face with open mouth": "Nasmejano lice sa otvorenim ustima",
    "Smiling face with open mouth and smiling eyes": "Lica sa otvorenim ustima i nasmejani o\u010di",
    "Smiling face with open mouth and cold sweat": "Nasmejano lice sa otvorenih usta i hladan znoj",
    "Smiling face with open mouth and tightly-closed eyes": "Nasmejano lice otvorenih usta i \u010dvrsto zatvorenih o\u010diju",
    "Smiling face with halo": "Nasmejano lice sa oreolom",
    "Smiling face with horns": "Nasmejano lice sa rogovima",
    "Winking face": "Namigivanje lice",
    "Smiling face with smiling eyes": "Lica sa osmehom o\u010di",
    "Face savoring delicious food": "Lice u\u045bivaju\u0436i u ukusnu hranu",
    "Relieved face": "Laknulo lice",
    "Smiling face with heart-shaped eyes": "Nasmejano lice sa o\u010dima u obliku srca",
    "Smiling face with sunglasses": "Nasmejano lice sa nao\u010dare",
    "Smirking face": "Rugaju\u0436i lice",
    "Neutral face": "Neutralno lice",
    "Expressionless face": "Bez izraza lica.",
    "Unamused face": "Nije zapaljen lice",
    "Face with cold sweat": "Suo\u010davaju sa hladnim znojem",
    "Pensive face": "Nevesela lica",
    "Confused face": "Zbunjeno lice",
    "Confounded face": "Dosadnih lice",
    "Kissing face": "Ljubim lice",
    "Face throwing a kiss": "Lice baca poljubac",
    "Kissing face with smiling eyes": "Ljubi lice sa osmehom o\u010di",
    "Kissing face with closed eyes": "Ljubi lice sa zatvorenim o\u010dima",
    "Face with stuck out tongue": "Lice sa zaglavio jezik",
    "Face with stuck out tongue and winking eye": "Lice sa zaglavljen jezik i namigivanje",
    "Face with stuck out tongue and tightly-closed eyes": "Lice sa zaglavljen jezik i cvrsto zatvorene o\u010di",
    "Disappointed face": "Razo\u010darani lice",
    "Worried face": "Zabrinuto lice",
    "Angry face": "Ljut lice",
    "Pouting face": "Zlovoljan lice",
    "Crying face": "Plakanje lice",
    "Persevering face": "Istrajnog lice",
    "Face with look of triumph": "Suo\u010davaju sa izgledom trijumfa",
    "Disappointed but relieved face": "Razo\u010daran ali laknulo lice",
    "Frowning face with open mouth": "Namršten lice sa otvorenim ustima",
    "Anguished face": "Enih lica",
    "Fearful face": "Strahu lice",
    "Weary face": "Umorna lica",
    "Sleepy face": "Spava mi se lice",
    "Tired face": "Umorna lica",
    "Grimacing face": "Klupi lice",
    "Loudly crying face": "Glasno plakanje lice",
    "Face with open mouth": "Suo\u010davaju sa otvorenim ustima",
    "Hushed face": "Tihim lice",
    "Face with open mouth and cold sweat": "Suo\u010davaju sa otvorenih usta i hladan znoj",
    "Face screaming in fear": "Lice vrisak u strahu",
    "Astonished face": "Zadivljeni lice",
    "Flushed face": "Uplakanu lice",
    "Sleeping face": "Pospanog lica",
    "Dizzy face": "Lice mi se vrti",
    "Face without mouth": "Lice bez jezika",
    "Face with medical mask": "Suo\u010davaju sa medicinskim masku",

    // Line breaker
    "Break": "Prelom",

    // Math
    "Subscript": "Indeksni tekst",
    "Superscript": "Eksponentni tekst",

    // Full screen
    "Fullscreen": "Puni ekran",

    // Horizontal line
    "Insert Horizontal Line": "Umetni horizontalnu liniju",

    // Clear formatting
    "Clear Formatting": "Brisanje oblikovanja",

    // Undo, redo
    "Undo": "Opozovi radnju",
    "Redo": "Ponavljanje",

    // Select all
    "Select All": "Izaberi sve",

    // Code view
    "Code View": "Prikaz koda",

    // Quote
    "Quote": "Ponude",
    "Increase": "Pove\u0107anje",
    "Decrease": "Smanjivanje"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Swedish
 */


$.FroalaEditor.LANGUAGE['sv'] = {
  translation: {
    // Place holder
    "Type something": "Ange n\u00e5got",

    // Basic formatting
    "Bold": "Fetstil",
    "Italic": "Kursiv stil",
    "Underline": "Understruken",
    "Strikethrough": "Genomstruken",

    // Main buttons
    "Insert": "Infoga",
    "Delete": "Radera",
    "Cancel": "Avbryt",
    "OK": "Ok",
    "Back": "Tillbaka",
    "Remove": "Avl\u00e4gsna",
    "More": "Vi\u0161e",
    "Update": "Uppdatera",
    "Style": "Stil",

    // Font
    "Font Family": "Teckensnitt",
    "Font Size": "Storlek",

    // Colors
    "Colors": "F\u00e4rger",
    "Background": "Bakgrund",
    "Text": "Text",

    // Paragraphs
    "Paragraph Format": "Format",
    "Normal": "Normal",
    "Code": "Kod",
    "Heading 1": "Rubrik 1",
    "Heading 2": "Rubrik 2",
    "Heading 3": "Rubrik 3",
    "Heading 4": "Rubrik 4",

    // Style
    "Paragraph Style": "Styckeformat",
    "Inline Style": "Infogad stil",

    // Alignment
    "Align": "Justera",
    "Align Left": "V\u00e4nsterst\u00e4ll",
    "Align Center": "Centrera",
    "Align Right": "H\u00f6gerst\u00e4ll",
    "Align Justify": "Justera",
    "None": "Inget",

    // Lists
    "Ordered List": "Ordnad lista",
    "Unordered List": "Oordnad lista",

    // Indent
    "Decrease Indent": "Minska indrag",
    "Increase Indent": "\u00d6ka indrag",

    // Links
    "Insert Link": "Infoga l\u00e4nk",
    "Open in new tab": "\u00d6ppna i ny flik",
    "Open Link": "\u00d6ppna l\u00e4nk",
    "Edit Link": "Redigera l\u00e4nk",
    "Unlink": "Ta bort l\u00e4nk",
    "Choose Link": "V\u00e4lj l\u00e4nk",

    // Images
    "Insert Image": "Infoga bild",
    "Upload Image": "Ladda upp en bild",
    "By URL": "Genom URL",
    "Browse": "Bl\u00e4ddra",
    "Drop image": "Sl\u00e4ppa bild",
    "or click": "eller klicka",
    "Manage Images": "Hantera bilder",
    "Loading": "L\u00e4ser",
    "Deleting": "Radera",
    "Tags": "Taggar",
    "Are you sure? Image will be deleted.": "\u00c4r du s\u00e4ker? Bild kommer att raderas.",
    "Replace": "Ers\u00e4tt",
    "Uploading": "Uppladdning",
    "Loading image": "Laddar bild",
    "Display": "Visa",
    "Inline": "I k\u00f6",
    "Break Text": "Break text",
    "Alternate Text": "Alternativ text",
    "Change Size": "\u00c4ndra storlek",
    "Width": "Bredd",
    "Height": "H\u00f6jd",
    "Something went wrong. Please try again.": "N\u00e5got gick snett. Var god f\u00f6rs\u00f6k igen.",

    // Video
    "Insert Video": "Infoga video",
    "Embedded Code": "Inb\u00e4ddad kod",

    // Tables
    "Insert Table": "Infoga tabell",
    "Header": "Header",
    "Row": "Rad",
    "Insert row above": "Infoga rad f\u00f6re",
    "Insert row below": "Infoga rad efter",
    "Delete row": "Radera rad",
    "Column": "Kolumn",
    "Insert column before": "Infoga kollumn f\u00f6re",
    "Insert column after": "Infoga kolumn efter",
    "Delete column": "Radera kolumn",
    "Cell": "Cell",
    "Merge cells": "Sammanfoga celler",
    "Horizontal split": "Horisontell split",
    "Vertical split": "Vertikal split",
    "Cell Background": "Cellbakgrunden",
    "Vertical Align": "Vertikala justeringen",
    "Top": "Topp",
    "Middle": "Mitten",
    "Bottom": "Botten",
    "Align Top": "Justera topp",
    "Align Middle": "Justera mitten",
    "Align Bottom": "Justera botten",
    "Cell Style": "Cellformat",

    // Files
    "Upload File": "Ladda upp fil",
    "Drop file": "Sl\u00e4ppa fil",

    // Emoticons
    "Emoticons": "Uttryckssymboler",
    "Grinning face": "Grina ansikte",
    "Grinning face with smiling eyes": "Grina ansikte med leende \u00f6gon",
    "Face with tears of joy": "Face med gl\u00e4djet\u00e5rar",
    "Smiling face with open mouth": "Leende ansikte med \u00f6ppen mun",
    "Smiling face with open mouth and smiling eyes": "Leende ansikte med \u00f6ppen mun och leende \u00f6gon",
    "Smiling face with open mouth and cold sweat": "Leende ansikte med \u00f6ppen mun och kallsvett",
    "Smiling face with open mouth and tightly-closed eyes": "Leende ansikte med \u00f6ppen mun och t\u00e4tt slutna \u00f6gon",
    "Smiling face with halo": "Leende ansikte med halo",
    "Smiling face with horns": "Leende ansikte med horn",
    "Winking face": "Blinka ansikte",
    "Smiling face with smiling eyes": "Leende ansikte med leende \u00f6gon",
    "Face savoring delicious food": "Ansikte smaka uts\u00f6kt mat",
    "Relieved face": "L\u00e4ttad ansikte",
    "Smiling face with heart-shaped eyes": "Leende ansikte med hj\u00e4rtformade \u00f6gon",
    "Smiling face with sunglasses": "Leende ansikte med solglas\u00f6gon",
    "Smirking face": "Flinande ansikte",
    "Neutral face": "Neutral ansikte",
    "Expressionless face": "Uttryckslöst ansikte",
    "Unamused face": "Inte roade ansikte",
    "Face with cold sweat": "Ansikte med kallsvett",
    "Pensive face": "Eftert\u00e4nksamt ansikte",
    "Confused face": "F\u00f6rvirrad ansikte",
    "Confounded face": "F\u00f6rbryllade ansikte",
    "Kissing face": "Kyssande ansikte",
    "Face throwing a kiss": "Ansikte kasta en kyss",
    "Kissing face with smiling eyes": "Kyssa ansikte med leende \u00f6gon",
    "Kissing face with closed eyes": "Kyssa ansikte med slutna \u00f6gon",
    "Face with stuck out tongue": "Ansikte med stack ut tungan",
    "Face with stuck out tongue and winking eye": "Ansikte med stack ut tungan och blinkande \u00f6ga",
    "Face with stuck out tongue and tightly-closed eyes": "Ansikte med stack ut tungan och t\u00e4tt slutna \u00f6gon",
    "Disappointed face": "Besviken ansikte",
    "Worried face": "Orolig ansikte",
    "Angry face": "Argt ansikte",
    "Pouting face": "Sk\u00e4ggtorsk ansikte",
    "Crying face": "Gr\u00e5tande ansikte",
    "Persevering face": "Uth\u00e5llig ansikte",
    "Face with look of triumph": "Ansikte med utseendet p\u00e5 triumf",
    "Disappointed but relieved face": "Besviken men l\u00e4ttad ansikte",
    "Frowning face with open mouth": "Rynkar pannan ansikte med \u00f6ppen mun",
    "Anguished face": "\u00c5ngest ansikte",
    "Fearful face": "R\u00e4dda ansikte",
    "Weary face": "Tr\u00f6tta ansikte",
    "Sleepy face": "S\u00f6mnig ansikte",
    "Tired face": "Tr\u00f6tt ansikte",
    "Grimacing face": "Grimaserande ansikte",
    "Loudly crying face": "H\u00f6gt gr\u00e5tande ansikte",
    "Face with open mouth": "Ansikte med \u00f6ppen mun",
    "Hushed face": "D\u00e4mpade ansikte",
    "Face with open mouth and cold sweat": "Ansikte med \u00f6ppen mun och kallsvett",
    "Face screaming in fear": "Face skriker i skr\u00e4ck",
    "Astonished face": "F\u00f6rv\u00e5nad ansikte",
    "Flushed face": "Ansiktsrodnad",
    "Sleeping face": "Sovande anskite",
    "Dizzy face": "Yr ansikte",
    "Face without mouth": "Ansikte utan mun",
    "Face with medical mask": "Ansikte med medicinsk maskera",

    // Line breaker
    "Break": "Break",

    // Math
    "Subscript": "Neds\u00e4nkt",
    "Superscript": "Upph\u00f6jd text",

    // Full screen
    "Fullscreen": "Helsk\u00e4rm",

    // Horizontal line
    "Insert Horizontal Line": "Infoga horisontell linje",

    // Clear formatting
    "Clear Formatting": "Ta bort formatering",

    // Undo, redo
    "Undo": "\u00c5ngra",
    "Redo": "G\u00f6r om",

    // Select all
    "Select All": "Markera allt",

    // Code view
    "Code View": "Kodvyn",

    // Quote
    "Quote": "Citerar",
    "Increase": "\u00d6ka",
    "Decrease": "Minska"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Thai
 */


$.FroalaEditor.LANGUAGE['th'] = {
  translation: {
    // Place holder
    "Type something": "\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e1a\u0e32\u0e07\u0e2a\u0e34\u0e48\u0e07\u0e1a\u0e32\u0e07\u0e2d\u0e22\u0e48\u0e32\u0e07",

    // Basic formatting
    "Bold": "\u0e15\u0e31\u0e27\u0e2b\u0e19\u0e32",
    "Italic": "\u0e15\u0e31\u0e27\u0e40\u0e2d\u0e35\u0e22\u0e07",
    "Underline": "\u0e02\u0e35\u0e14\u0e40\u0e2a\u0e49\u0e19\u0e43\u0e15\u0e49",
    "Strikethrough": "\u0e02\u0e35\u0e14\u0e17\u0e31\u0e1a",

    // Main buttons
    "Insert": "\u0e41\u0e17\u0e23\u0e01",
    "Delete": "\u0e25\u0e1a",
    "Cancel": "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",
    "OK": "\u0e15\u0e01\u0e25\u0e07",
    "Back": "\u0e01\u0e25\u0e31\u0e1a",
    "Remove": "\u0e40\u0e2d\u0e32\u0e2d\u0e2d\u0e01",
    "More": "\u0e21\u0e32\u0e01\u0e01\u0e27\u0e48\u0e32",
    "Update": "\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e17",
    "Style": "\u0e2a\u0e44\u0e15\u0e25\u0e4c",

    // Font
    "Font Family": "\u0e15\u0e23\u0e30\u0e01\u0e39\u0e25\u0e41\u0e1a\u0e1a\u0e2d\u0e31\u0e01\u0e29\u0e23",
    "Font Size": "\u0e02\u0e19\u0e32\u0e14\u0e41\u0e1a\u0e1a\u0e2d\u0e31\u0e01\u0e29\u0e23",

    // Colors
    "Colors": "\u0e2a\u0e35",
    "Background": "\u0e1e\u0e37\u0e49\u0e19\u0e2b\u0e25\u0e31\u0e07",
    "Text": "\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21",

    // Paragraphs
    "Paragraph Format": "\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a",
    "Normal": "\u0e1b\u0e01\u0e15\u0e34",
    "Code": "\u0e42\u0e04\u0e49\u0e14",
    "Heading 1": "\u0e2a\u0e48\u0e27\u0e19\u0e2b\u0e31\u0e27 1",
    "Heading 2": "\u0e2a\u0e48\u0e27\u0e19\u0e2b\u0e31\u0e27 2",
    "Heading 3": "\u0e2a\u0e48\u0e27\u0e19\u0e2b\u0e31\u0e27 3",
    "Heading 4": "\u0e2a\u0e48\u0e27\u0e19\u0e2b\u0e31\u0e27 4",

    // Style
    "Paragraph Style": "\u0e25\u0e31\u0e01\u0e29\u0e13\u0e30\u0e22\u0e48\u0e2d\u0e2b\u0e19\u0e49\u0e32",
    "Inline Style": "\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e2d\u0e34\u0e19\u0e44\u0e25\u0e19\u0e4c",

    // Alignment
    "Align": "\u0e01\u0e32\u0e23\u0e08\u0e31\u0e14\u0e41\u0e19\u0e27",
    "Align Left": "\u0e08\u0e31\u0e14\u0e0a\u0e34\u0e14\u0e0b\u0e49\u0e32\u0e22",
    "Align Center": "\u0e08\u0e31\u0e14\u0e01\u0e36\u0e48\u0e07\u0e01\u0e25\u0e32\u0e07",
    "Align Right": "\u0e08\u0e31\u0e14\u0e0a\u0e34\u0e14\u0e02\u0e27\u0e32",
    "Align Justify": "\u0e40\u0e15\u0e47\u0e21\u0e41\u0e19\u0e27",
    "None": "\u0e44\u0e21\u0e48",

    // Lists
    "Ordered List": "\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e25\u0e33\u0e14\u0e31\u0e1a\u0e40\u0e25\u0e02",
    "Unordered List": "\u0e23\u0e32\u0e22\u0e01\u0e32\u0e23\u0e2a\u0e31\u0e0d\u0e25\u0e31\u0e01\u0e29\u0e13\u0e4c\u0e2b\u0e31\u0e27\u0e02\u0e49\u0e2d\u0e22\u0e48\u0e2d\u0e22",

    // Indent
    "Decrease Indent": "\u0e25\u0e14\u0e01\u0e32\u0e23\u0e40\u0e22\u0e37\u0e49\u0e2d\u0e07",
    "Increase Indent": "\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e01\u0e32\u0e23\u0e40\u0e22\u0e37\u0e49\u0e2d\u0e07",

    // Links
    "Insert Link": "\u0e41\u0e17\u0e23\u0e01\u0e25\u0e34\u0e07\u0e01\u0e4c",
    "Open in new tab": "\u0e40\u0e1b\u0e34\u0e14\u0e43\u0e19\u0e41\u0e17\u0e47\u0e1a\u0e43\u0e2b\u0e21\u0e48",
    "Open Link": "\u0e40\u0e1b\u0e34\u0e14\u0e25\u0e34\u0e49\u0e07\u0e04\u0e4c",
    "Edit Link": "\u0e25\u0e34\u0e07\u0e04\u0e4c\u0e41\u0e01\u0e49\u0e44\u0e02",
    "Unlink": "\u0e40\u0e2d\u0e32\u0e25\u0e34\u0e07\u0e01\u0e4c\u0e2d\u0e2d\u0e01",
    "Choose Link": "\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e37\u0e48\u0e2d\u0e21\u0e42\u0e22\u0e07",

    // Images
    "Insert Image": "\u0e41\u0e17\u0e23\u0e01\u0e23\u0e39\u0e1b\u0e20\u0e32\u0e1e",
    "Upload Image": "\u0e01\u0e32\u0e23\u0e2d\u0e31\u0e1b\u0e42\u0e2b\u0e25\u0e14\u0e20\u0e32\u0e1e",
    "By URL": "\u0e15\u0e32\u0e21 URL",
    "Browse": "\u0e40\u0e23\u0e35\u0e22\u0e01\u0e14\u0e39",
    "Drop image": "\u0e27\u0e32\u0e07\u0e20\u0e32\u0e1e",
    "or click": "\u0e2b\u0e23\u0e37\u0e2d\u0e04\u0e25\u0e34\u0e01\u0e17\u0e35\u0e48",
    "Manage Images": "\u0e08\u0e31\u0e14\u0e01\u0e32\u0e23\u0e20\u0e32\u0e1e",
    "Loading": "\u0e42\u0e2b\u0e25\u0e14",
    "Deleting": "\u0e25\u0e1a",
    "Tags": "\u0e41\u0e17\u0e47\u0e01",
    "Are you sure? Image will be deleted.": "\u0e04\u0e38\u0e13\u0e41\u0e19\u0e48\u0e43\u0e08\u0e2b\u0e23\u0e37\u0e2d\u0e44\u0e21\u0e48 \u0e20\u0e32\u0e1e\u0e08\u0e30\u0e16\u0e39\u0e01\u0e25\u0e1a",
    "Replace": "\u0e41\u0e17\u0e19\u0e17\u0e35\u0e48",
    "Uploading": "\u0e2d\u0e31\u0e1e\u0e42\u0e2b\u0e25\u0e14",
    "Loading image": "\u0e42\u0e2b\u0e25\u0e14\u0e20\u0e32\u0e1e",
    "Display": "\u0e41\u0e2a\u0e14\u0e07",
    "Inline": "\u0e41\u0e1a\u0e1a\u0e2d\u0e34\u0e19\u0e44\u0e25\u0e19\u0e4c",
    "Break Text": "\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2b\u0e22\u0e38\u0e14",
    "Alternate Text": "\u0e02\u0e49\u0e2d\u0e04\u0e27\u0e32\u0e21\u0e2d\u0e37\u0e48\u0e19",
    "Change Size": "\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e02\u0e19\u0e32\u0e14",
    "Width": "\u0e04\u0e27\u0e32\u0e21\u0e01\u0e27\u0e49\u0e32\u0e07",
    "Height": "\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e39\u0e07",
    "Something went wrong. Please try again.": "\u0e1a\u0e32\u0e07\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e1c\u0e34\u0e14\u0e1b\u0e01\u0e15\u0e34. \u0e01\u0e23\u0e38\u0e13\u0e32\u0e25\u0e2d\u0e07\u0e2d\u0e35\u0e01\u0e04\u0e23\u0e31\u0e49\u0e07.",

    // Video
    "Insert Video": "\u0e41\u0e17\u0e23\u0e01\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d",
    "Embedded Code": "\u0e23\u0e2b\u0e31\u0e2a\u0e2a\u0e21\u0e2d\u0e07\u0e01\u0e25\u0e1d\u0e31\u0e07\u0e15\u0e31\u0e27",

    // Tables
    "Insert Table": "\u0e41\u0e17\u0e23\u0e01\u0e15\u0e32\u0e23\u0e32\u0e07",
    "Header": "\u0e2a\u0e48\u0e27\u0e19\u0e2b\u0e31\u0e27",
    "Row": "\u0e41\u0e16\u0e27",
    "Insert row above": "\u0e41\u0e17\u0e23\u0e01\u0e41\u0e16\u0e27\u0e14\u0e49\u0e32\u0e19\u0e1a\u0e19",
    "Insert row below": "\u0e41\u0e17\u0e23\u0e01\u0e41\u0e16\u0e27\u0e14\u0e49\u0e32\u0e19\u0e25\u0e48\u0e32\u0e07",
    "Delete row": "\u0e25\u0e1a\u0e41\u0e16\u0e27",
    "Column": "\u0e04\u0e2d\u0e25\u0e31\u0e21\u0e19\u0e4c",
    "Insert column before": "\u0e41\u0e17\u0e23\u0e01\u0e04\u0e2d\u0e25\u0e31\u0e21\u0e19\u0e4c\u0e02\u0e49\u0e32\u0e07\u0e2b\u0e19\u0e49\u0e32",
    "Insert column after": "\u0e41\u0e17\u0e23\u0e01\u0e04\u0e2d\u0e25\u0e31\u0e21\u0e19\u0e4c\u0e02\u0e49\u0e32\u0e07\u0e2b\u0e25\u0e31\u0e07",
    "Delete column": "\u0e25\u0e1a\u0e04\u0e2d\u0e25\u0e31\u0e21\u0e19\u0e4c",
    "Cell": "\u0e40\u0e0b\u0e25\u0e25\u0e4c",
    "Merge cells": "\u0e1c\u0e2a\u0e32\u0e19\u0e40\u0e0b\u0e25\u0e25\u0e4c",
    "Horizontal split": "\u0e41\u0e22\u0e01\u0e41\u0e19\u0e27\u0e19\u0e2d\u0e19",
    "Vertical split": "\u0e41\u0e22\u0e01\u0e43\u0e19\u0e41\u0e19\u0e27\u0e15\u0e31\u0e49\u0e07",
    "Cell Background": "\u0e1e\u0e37\u0e49\u0e19\u0e2b\u0e25\u0e31\u0e07\u0e02\u0e2d\u0e07\u0e40\u0e0b\u0e25\u0e25\u0e4c",
    "Vertical Align": "\u0e08\u0e31\u0e14\u0e41\u0e19\u0e27\u0e15\u0e31\u0e49\u0e07",
    "Top": "\u0e14\u0e49\u0e32\u0e19\u0e1a\u0e19",
    "Middle": "\u0e01\u0e25\u0e32\u0e07",
    "Bottom": "\u0e01\u0e49\u0e19",
    "Align Top": "\u0e08\u0e31\u0e14\u0e14\u0e49\u0e32\u0e19\u0e1a\u0e19",
    "Align Middle": "\u0e15\u0e4d\u0e32\u0e41\u0e2b\u0e19\u0e48\u0e07\u0e01\u0e25\u0e32\u0e07",
    "Align Bottom": "\u0e15\u0e4d\u0e32\u0e41\u0e2b\u0e19\u0e48\u0e07\u0e14\u0e49\u0e32\u0e19\u0e25\u0e48\u0e32\u0e07",
    "Cell Style": "\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e02\u0e2d\u0e07\u0e40\u0e0b\u0e25\u0e25\u0e4c",

    // Files
    "Upload File": "\u0e2d\u0e31\u0e1b\u0e42\u0e2b\u0e25\u0e14\u0e44\u0e1f\u0e25\u0e4c",
    "Drop file": "\u0e27\u0e32\u0e07\u0e44\u0e1f\u0e25\u0e4c",

    // Emoticons
    "Emoticons": "\u0e2d\u0e35\u0e42\u0e21\u0e15\u0e34\u0e04\u0e2d\u0e19",
    "Grinning face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21",
    "Grinning face with smiling eyes": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e14\u0e49\u0e27\u0e22\u0e15\u0e32\u0e22\u0e34\u0e49\u0e21",
    "Face with tears of joy": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e14\u0e49\u0e27\u0e22\u0e19\u0e49\u0e33\u0e15\u0e32\u0e41\u0e2b\u0e48\u0e07\u0e04\u0e27\u0e32\u0e21\u0e2a\u0e38\u0e02",
    "Smiling face with open mouth": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e1b\u0e37\u0e49\u0e2d\u0e19\u0e23\u0e2d\u0e22\u0e22\u0e34\u0e49\u0e21\u0e17\u0e35\u0e48\u0e21\u0e35\u0e1b\u0e32\u0e01\u0e40\u0e1b\u0e34\u0e14",
    "Smiling face with open mouth and smiling eyes": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e01\u0e31\u0e1a\u0e40\u0e1b\u0e34\u0e14\u0e1b\u0e32\u0e01\u0e41\u0e25\u0e30\u0e15\u0e32\u0e22\u0e34\u0e49\u0e21",
    "Smiling face with open mouth and cold sweat": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e14\u0e49\u0e27\u0e22\u0e1b\u0e32\u0e01\u0e40\u0e1b\u0e34\u0e14\u0e41\u0e25\u0e30\u0e40\u0e2b\u0e07\u0e37\u0e48\u0e2d\u0e40\u0e22\u0e47\u0e19",
    "Smiling face with open mouth and tightly-closed eyes": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e01\u0e31\u0e1a\u0e40\u0e1b\u0e34\u0e14\u0e1b\u0e32\u0e01\u0e41\u0e25\u0e30\u0e15\u0e32\u0e41\u0e19\u0e48\u0e19\u0e1b\u0e34\u0e14",
    "Smiling face with halo": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e17\u0e35\u0e48\u0e21\u0e35\u0e23\u0e31\u0e28\u0e21\u0e35",
    "Smiling face with horns": "\u0e22\u0e34\u0e49\u0e21\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e21\u0e35\u0e40\u0e02\u0e32",
    "Winking face": "\u0e01\u0e32\u0e23\u0e01\u0e23\u0e30\u0e1e\u0e23\u0e34\u0e1a\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32",
    "Smiling face with smiling eyes": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e14\u0e49\u0e27\u0e22\u0e15\u0e32\u0e22\u0e34\u0e49\u0e21",
    "Face savoring delicious food": "\u0e40\u0e1c\u0e0a\u0e34\u0e0d \u0073\u0061\u0076\u006f\u0072\u0069\u006e\u0067 \u0e2d\u0e32\u0e2b\u0e32\u0e23\u0e2d\u0e23\u0e48\u0e2d\u0e22",
    "Relieved face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e42\u0e25\u0e48\u0e07\u0e43\u0e08",
    "Smiling face with heart-shaped eyes": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e22\u0e34\u0e49\u0e21\u0e14\u0e49\u0e27\u0e22\u0e15\u0e32\u0e23\u0e39\u0e1b\u0e2b\u0e31\u0e27\u0e43\u0e08",
    "Smiling face with sunglasses": "\u0e22\u0e34\u0e49\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e14\u0e49\u0e27\u0e22\u0e41\u0e27\u0e48\u0e19\u0e15\u0e32\u0e01\u0e31\u0e19\u0e41\u0e14\u0e14",
    "Smirking face": "\u0e2b\u0e19\u0e49\u0e32\u0e41\u0e2a\u0e22\u0e30\u0e22\u0e34\u0e49\u0e21\u0e17\u0e35\u0e48\u0e21\u0e38\u0e21",
    "Neutral face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e35\u0e48\u0e40\u0e1b\u0e47\u0e19\u0e01\u0e25\u0e32\u0e07",
    "Expressionless face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e2d\u0e32\u0e23\u0e21\u0e13\u0e4c",
    "Unamused face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32 \u0055\u006e\u0061\u006d\u0075\u0073\u0065\u0064",
    "Face with cold sweat": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e35\u0e48\u0e21\u0e35\u0e40\u0e2b\u0e07\u0e37\u0e48\u0e2d\u0e40\u0e22\u0e47\u0e19",
    "Pensive face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e2b\u0e21\u0e48\u0e19",
    "Confused face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e2a\u0e31\u0e1a\u0e2a\u0e19",
    "Confounded face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e2a\u0e31\u0e1a\u0e2a\u0e19",
    "Kissing face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e39\u0e1a",
    "Face throwing a kiss": "\u0e15\u0e49\u0e2d\u0e07\u0e40\u0e1c\u0e0a\u0e34\u0e0d\u0e01\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e02\u0e27\u0e49\u0e32\u0e07\u0e1b\u0e32\u0e08\u0e39\u0e1a",
    "Kissing face with smiling eyes": "\u0e08\u0e39\u0e1a\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e14\u0e49\u0e27\u0e22\u0e15\u0e32\u0e22\u0e34\u0e49\u0e21",
    "Kissing face with closed eyes": "\u0e08\u0e39\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e14\u0e49\u0e27\u0e22\u0e14\u0e27\u0e07\u0e15\u0e32\u0e17\u0e35\u0e48\u0e1b\u0e34\u0e14\u0e2a\u0e19\u0e34\u0e17",
    "Face with stuck out tongue": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e21\u0e35\u0e41\u0e1e\u0e25\u0e21\u0e2d\u0e2d\u0e01\u0e21\u0e32\u0e25\u0e34\u0e49\u0e19",
    "Face with stuck out tongue and winking eye": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e21\u0e35\u0e15\u0e34\u0e14\u0e25\u0e34\u0e49\u0e19\u0e41\u0e25\u0e30\u0e15\u0e32\u0e02\u0e22\u0e34\u0e1a\u0e15\u0e32",
    "Face with stuck out tongue and tightly-closed eyes": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e21\u0e35\u0e15\u0e34\u0e14\u0e25\u0e34\u0e49\u0e19\u0e41\u0e25\u0e30\u0e14\u0e27\u0e07\u0e15\u0e32\u0e17\u0e35\u0e48\u0e1b\u0e34\u0e14\u0e41\u0e19\u0e48\u0e19",
    "Disappointed face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e1c\u0e34\u0e14\u0e2b\u0e27\u0e31\u0e07",
    "Worried face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e01\u0e31\u0e07\u0e27\u0e25",
    "Angry face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e42\u0e01\u0e23\u0e18",
    "Pouting face": "\u0e2b\u0e19\u0e49\u0e32\u0e21\u0e38\u0e48\u0e22",
    "Crying face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e23\u0e49\u0e2d\u0e07\u0e44\u0e2b\u0e49",
    "Persevering face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e2d\u0e32\u0e16\u0e48\u0e32\u0e19",
    "Face with look of triumph": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e01\u0e31\u0e1a\u0e23\u0e39\u0e1b\u0e25\u0e31\u0e01\u0e29\u0e13\u0e4c\u0e02\u0e2d\u0e07\u0e0a\u0e31\u0e22\u0e0a\u0e19\u0e30",
    "Disappointed but relieved face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e1c\u0e34\u0e14\u0e2b\u0e27\u0e31\u0e07 \u0e41\u0e15\u0e48\u0e42\u0e25\u0e48\u0e07\u0e43\u0e08",
    "Frowning face with open mouth": "\u0e2b\u0e19\u0e49\u0e32\u0e21\u0e38\u0e48\u0e22\u0e17\u0e35\u0e48\u0e21\u0e35\u0e1b\u0e32\u0e01\u0e40\u0e1b\u0e34\u0e14",
    "Anguished face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e01\u0e14\u0e02\u0e35\u0e48",
    "Fearful face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e35\u0e48\u0e19\u0e48\u0e32\u0e01\u0e25\u0e31\u0e27",
    "Weary face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e35\u0e48\u0e40\u0e2b\u0e19\u0e37\u0e48\u0e2d\u0e22\u0e25\u0e49\u0e32",
    "Sleepy face": "\u0e2b\u0e19\u0e49\u0e32\u0e07\u0e48\u0e27\u0e07\u0e19\u0e2d\u0e19",
    "Tired face": "\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e1a\u0e37\u0e48\u0e2d",
    "Grimacing face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32 \u0067\u0072\u0069\u006d\u0061\u0063\u0069\u006e\u0067",
    "Loudly crying face": "\u0e23\u0e49\u0e2d\u0e07\u0e44\u0e2b\u0e49\u0e40\u0e2a\u0e35\u0e22\u0e07\u0e14\u0e31\u0e07\u0e2b\u0e19\u0e49\u0e32",
    "Face with open mouth": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e35\u0e48\u0e21\u0e35\u0e1b\u0e32\u0e01\u0e40\u0e1b\u0e34\u0e14",
    "Hushed face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e40\u0e07\u0e35\u0e22\u0e1a",
    "Face with open mouth and cold sweat": "",
    "Face screaming in fear": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e35\u0e48\u0e21\u0e35\u0e1b\u0e32\u0e01\u0e40\u0e1b\u0e34\u0e14\u0e41\u0e25\u0e30\u0e40\u0e2b\u0e07\u0e37\u0e48\u0e2d\u0e40\u0e22\u0e47\u0e19",
    "Astonished face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e1b\u0e23\u0e30\u0e2b\u0e25\u0e32\u0e14\u0e43\u0e08",
    "Flushed face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e41\u0e14\u0e07",
    "Sleeping face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e19\u0e2d\u0e19",
    "Dizzy face": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e15\u0e32\u0e25\u0e32\u0e22",
    "Face without mouth": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e42\u0e14\u0e22\u0e44\u0e21\u0e48\u0e15\u0e49\u0e2d\u0e07\u0e1b\u0e32\u0e01",
    "Face with medical mask": "\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e14\u0e49\u0e27\u0e22\u0e2b\u0e19\u0e49\u0e32\u0e01\u0e32\u0e01\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e41\u0e1e\u0e17\u0e22\u0e4c",

    // Line breaker
    "Break": "\u0e2b\u0e22\u0e38\u0e14",

    // Math
    "Subscript": "\u0e15\u0e31\u0e27\u0e2b\u0e49\u0e2d\u0e22",
    "Superscript": "\u0e15\u0e31\u0e27\u0e22\u0e01",

    // Full screen
    "Fullscreen": "\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d",

    // Horizontal line
    "Insert Horizontal Line": "\u0e41\u0e17\u0e23\u0e01\u0e40\u0e2a\u0e49\u0e19\u0e41\u0e19\u0e27\u0e19\u0e2d\u0e19",

    // Clear formatting
    "Clear Formatting": "\u0e19\u0e33\u0e01\u0e32\u0e23\u0e08\u0e31\u0e14\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a",

    // Undo, redo
    "Undo": "\u0e40\u0e25\u0e34\u0e01\u0e17\u0e33",
    "Redo": "\u0e17\u0e4d\u0e32\u0e0b\u0e49\u0e33",

    // Select all
    "Select All": "\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",

    // Code view
    "Code View": "\u0e21\u0e38\u0e21\u0e21\u0e2d\u0e07\u0e23\u0e2b\u0e31\u0e2a",

    // Quote
    "Quote": "\u0e2d\u0e49\u0e32\u0e07",
    "Increase": "\u0e40\u0e1e\u0e34\u0e48\u0e21",
    "Decrease": "\u0e25\u0e14\u0e25\u0e07"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Turkish
 */


$.FroalaEditor.LANGUAGE['tr'] = {
  translation: {
    // Place holder
    "Type something": "Bir \u015fey yaz\u0131n",

    // Basic formatting
    "Bold": "Kal\u0131n",
    "Italic": "\u0130talik",
    "Underline": "Alt\u0131 \u00e7izili",
    "Strikethrough": "\u00dcst\u00fc \u00e7izili",

    // Main buttons
    "Insert": "Ekle",
    "Delete": "Silmek",
    "Cancel": "\u0130ptal",
    "OK": "Tamam",
    "Back": "Geri",
    "Remove": "Kald\u0131r",
    "More": "Daha",
    "Update": "G\u00fcncelle\u015ftirme",
    "Style": "Stil",

    // Font
    "Font Family": "Yaz\u0131tipi Ailesi",
    "Font Size": "Yaz\u0131tipi B\u00fcy\u00fckl\u00fc\u011f\u00fc",

    // Colors
    "Colors": "Renkler",
    "Background": "Arkaplan",
    "Text": "Metin",

    // Paragraphs
    "Paragraph Format": "Bi\u00e7imler",
    "Normal": "Normal",
    "Code": "Kod",
    "Heading 1": "Ba\u015fl\u0131k 1",
    "Heading 2": "Ba\u015fl\u0131k 2",
    "Heading 3": "Ba\u015fl\u0131k 3",
    "Heading 4": "Ba\u015fl\u0131k 4",

    // Style
    "Paragraph Style": "Paragraf stili",
    "Inline Style": "\u00c7izgide stili",

    // Alignment
    "Align": "Hizalama",
    "Align Left": "Sola hizala",
    "Align Center": "Ortala",
    "Align Right": "Sa\u011fa hizala",
    "Align Justify": "\u0130ki yana yasla",
    "None": "Hi\u00e7biri",

    // Lists
    "Ordered List": "S\u0131ral\u0131 liste",
    "Unordered List": "S\u0131ras\u0131z liste",

    // Indent
    "Decrease Indent": "Girintiyi azalt",
    "Increase Indent": "Girintiyi art\u0131r",

    // Links
    "Insert Link": "Ba\u011flant\u0131 ekle",
    "Open in new tab": "Yeni sekmede a\u00e7",
    "Open Link": "Linki a\u00e7",
    "Edit Link": "D\u00fczenleme ba\u011flant\u0131s\u0131",
    "Unlink": "Ba\u011flant\u0131y\u0131 kald\u0131r",
    "Choose Link": "Ba\u011flant\u0131y\u0131 se\u00e7in",

    // Images
    "Insert Image": "Resim ekle",
    "Upload Image": "Y\u00fckleme g\u00f6r\u00fcnt\u00fcs\u00fc",
    "By URL": "URL'ye g\u00f6re",
    "Browse": "G\u00f6zat",
    "Drop image": "B\u0131rak resim",
    "or click": "ya da t\u0131klay\u0131n",
    "Manage Images": "G\u00f6r\u00fcnt\u00fcleri y\u00f6netin",
    "Loading": "Y\u00fckleniyor",
    "Deleting": "Silme",
    "Tags": "Etiketler",
    "Are you sure? Image will be deleted.": "Emin misin? Resim silinecektir.",
    "Replace": "De\u011fi\u015ftirmek",
    "Uploading": "Y\u00fckleme",
    "Loading image": "Y\u00fckleme g\u00f6r\u00fcnt\u00fcs\u00fc",
    "Display": "G\u00f6stermek",
    "Inline": "\u00c7izgide",
    "Break Text": "K\u0131r\u0131lma metni",
    "Alternate Text": "Alternatif metin",
    "Change Size": "De\u011fi\u015fim boyutu",
    "Width": "Geni\u015flik",
    "Height": "Y\u00fckseklik",
    "Something went wrong. Please try again.": "Bir \u015feyler yanl\u0131\u015f gitti. L\u00fctfen tekrar deneyin.",

    // Video
    "Insert Video": "Video ekle",
    "Embedded Code": "G\u00f6m\u00fcl\u00fc kod",

    // Tables
    "Insert Table": "Tablo ekle",
    "Header": "\u00dcstbilgi",
    "Row": "Sat\u0131r",
    "Insert row above": "\u00d6ncesine yeni sat\u0131r ekle",
    "Insert row below": "Sonras\u0131na yeni sat\u0131r ekle",
    "Delete row": "Sat\u0131r\u0131 sil",
    "Column": "S\u00fctun",
    "Insert column before": "\u00d6ncesine yeni s\u00fctun ekle",
    "Insert column after": "Sonras\u0131na yeni s\u00fctun ekle",
    "Delete column": "S\u00fctunu sil",
    "Cell": "H\u00fccre",
    "Merge cells": "H\u00fccreleri birle\u015ftir",
    "Horizontal split": "Yatay b\u00f6l\u00fcnm\u00fc\u015f",
    "Vertical split": "Dikey  b\u00f6l\u00fcnm\u00fc\u015f",
    "Cell Background": "H\u00fccre arka plan\u0131",
    "Vertical Align": "Dikey hizalama",
    "Top": "\u00dcst",
    "Middle": "Orta",
    "Bottom": "Alt",
    "Align Top": "\u00dcst hizalama",
    "Align Middle": "Orta hizalama",
    "Align Bottom": "Dibe hizalama",
    "Cell Style": "H\u00fccre stili",

    // Files
    "Upload File": "Dosya Y\u00fckle",
    "Drop file": "B\u0131rak dosya",

    // Emoticons
    "Emoticons": "\u0130fadeler",
    "Grinning face": "S\u0131r\u0131tan y\u00fcz",
    "Grinning face with smiling eyes": "G\u00fclen g\u00f6zlerle y\u00fcz s\u0131r\u0131tarak",
    "Face with tears of joy": "Sevin\u00e7 g\u00f6zya\u015flar\u0131yla Y\u00fcz",
    "Smiling face with open mouth": "A\u00e7\u0131k a\u011fz\u0131 ile g\u00fcl\u00fcmseyen y\u00fcz\u00fc",
    "Smiling face with open mouth and smiling eyes": "A\u00e7\u0131k a\u011fzı ve g\u00fcl\u00fcmseyen g\u00f6zlerle g\u00fcler y\u00fcz",
    "Smiling face with open mouth and cold sweat": "A\u00e7\u0131k a\u011fz\u0131 ve so\u011fuk ter ile g\u00fclen y\u00fcz\u00fc",
    "Smiling face with open mouth and tightly-closed eyes": "A\u00e7\u0131k a\u011fz\u0131 s\u0131k\u0131ca kapal\u0131 g\u00f6zlerle g\u00fclen y\u00fcz\u00fc",
    "Smiling face with halo": "Halo ile y\u00fcz g\u00fclen",
    "Smiling face with horns": "Boynuzlar\u0131 ile g\u00fcler y\u00fcz",
    "Winking face": "G\u00f6z a\u00e7\u0131p kapay\u0131ncaya y\u00fcz\u00fc",
    "Smiling face with smiling eyes": "G\u00fclen g\u00f6zlerle g\u00fcler Y\u00fcz",
    "Face savoring delicious food": "Lezzetli yemekler tad\u0131n\u0131 Y\u00fcz",
    "Relieved face": "Rahatlad\u0131m y\u00fcz\u00fc",
    "Smiling face with heart-shaped eyes": "Kalp \u015feklinde g\u00f6zlerle g\u00fcler y\u00fcz",
    "Smiling face with sunglasses": "Kalp \u015feklinde g\u00f6zlerle g\u00fcler y\u00fcz",
    "Smirking face": "S\u0131r\u0131tan y\u00fcz",
    "Neutral face": "N\u00f6tr y\u00fcz",
    "Expressionless face": "Ifadesiz y\u00fcz\u00fc",
    "Unamused face": "Kay\u0131ts\u0131z y\u00fcz\u00fc",
    "Face with cold sweat": "So\u011fuk terler Y\u00fcz",
    "Pensive face": "dalg\u0131n bir y\u00fcz",
    "Confused face": "\u015fa\u015fk\u0131n bir y\u00fcz",
    "Confounded face": "Ele\u015ftirilmi\u015ftir y\u00fcz\u00fc",
    "Kissing face": "\u00f6p\u00fc\u015fme y\u00fcz\u00fc",
    "Face throwing a kiss": "Bir \u00f6p\u00fcc\u00fck atma Y\u00fcz",
    "Kissing face with smiling eyes": "G\u00fclen g\u00f6zlerle y\u00fcz \u00f6p\u00fc\u015fme",
    "Kissing face with closed eyes": "Kapal\u0131 g\u00f6zlerle \u00f6p\u00f6\u015fme y\u00fcz",
    "Face with stuck out tongue": "Dilini y\u00fcz ile s\u0131k\u0131\u015fm\u0131\u015f",
    "Face with stuck out tongue and winking eye": "\u015ea\u015f\u0131r\u0131p kalm\u0131\u015f d\u0131\u015far\u0131 dil ve g\u00f6z k\u0131rpan y\u00fcz",
    "Face with stuck out tongue and tightly-closed eyes": "Y\u00fcz ile dil ve s\u0131k\u0131ca kapal\u0131 g\u00f6zleri s\u0131k\u0131\u015fm\u0131\u015f",
    "Disappointed face": "Hayal k\u0131r\u0131kl\u0131\u011f\u0131na y\u00fcz\u00fc",
    "Worried face": "Endi\u015feli bir y\u00fcz",
    "Angry face": "K\u0131zg\u0131n y\u00fcz",
    "Pouting face": "Somurtarak y\u00fcz\u00fc",
    "Crying face": "A\u011flayan y\u00fcz",
    "Persevering face": "Azmeden y\u00fcz\u00fc",
    "Face with look of triumph": "Zafer bak\u0131\u015fla Y\u00fcz",
    "Disappointed but relieved face": "Hayal k\u0131r\u0131kl\u0131\u011f\u0131 ama rahatlad\u0131m y\u00fcz",
    "Frowning face with open mouth": "A\u00e7\u0131k a\u011fz\u0131 ile \u00e7at\u0131k y\u00fcz\u00fc",
    "Anguished face": "Kederli y\u00fcz",
    "Fearful face": "Korkulu y\u00fcz\u00fc",
    "Weary face": "Yorgun y\u00fcz\u00fc",
    "Sleepy face": "Uykulu y\u00fcz\u00fc",
    "Tired face": "Yorgun y\u00fcz\u00fc",
    "Grimacing face": "Y\u00fcz\u00fcn\u00fc buru\u015fturarak y\u00fcz\u00fc",
    "Loudly crying face": "Y\u00fcksek sesle y\u00fcz\u00fc a\u011fl\u0131yor",
    "Face with open mouth": "A\u00e7\u0131k a\u011fz\u0131 ile Y\u00fcz",
    "Hushed face": "Dingin y\u00fcz\u00fc",
    "Face with open mouth and cold sweat": "A\u00e7\u0131k a\u011fz\u0131 ve so\u011fuk ter ile Y\u00fcz",
    "Face screaming in fear": "Korku i\u00e7inde \u00e7ı\u011fl\u0131k Y\u00fcz",
    "Astonished face": "\u015fa\u015fk\u0131n bir y\u00fcz",
    "Flushed face": "K\u0131zarm\u0131\u015f y\u00fcz\u00fc",
    "Sleeping face": "Uyuyan y\u00fcz\u00fc",
    "Dizzy face": "Ba\u015f\u0131m d\u00f6nd\u00fc y\u00fcz",
    "Face without mouth": "A\u011f\u0131z olmadan Y\u00fcz",
    "Face with medical mask": "T\u0131bbi maske ile y\u00fcz",

    // Line breaker
    "Break": "K\u0131r\u0131lma",

    // Math
    "Subscript": "Alt simge",
    "Superscript": "\u00dcst simge",

    // Full screen
    "Fullscreen": "Tam ekran",

    // Horizontal line
    "Insert Horizontal Line": "Yatay \u00e7izgi ekleme",

    // Clear formatting
    "Clear Formatting": "Bi\u00e7imlendirme kald\u0131r",

    // Undo, redo
    "Undo": "Geri Al",
    "Redo": "Yinele",

    // Select all
    "Select All": "T\u00fcm\u00fcn\u00fc se\u00e7",

    // Code view
    "Code View": "Kod g\u00f6r\u00fcn\u00fcm\u00fc",

    // Quote
    "Quote": "Al\u0131nt\u0131",
    "Increase": "Art\u0131rmak",
    "Decrease": "Azal\u0131\u015f"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Ukrainian
 */


$.FroalaEditor.LANGUAGE['ua'] = {
  translation: {
    // Place holder
    "Type something": "\u041d\u0430\u043f\u0438\u0448\u0456\u0442\u044c \u0431\u0443\u0434\u044c-\u0449\u043e",

    // Basic formatting
    "Bold": "\u0416\u0438\u0440\u043d\u0438\u0439",
    "Italic": "\u041a\u0443\u0440\u0441\u0438\u0432",
    "Underline": "\u041f\u0456\u0434\u043a\u0440\u0435\u0441\u043b\u0435\u043d\u0438\u0439",
    "Strikethrough": "\u0417\u0430\u043a\u0440\u0435\u0441\u043b\u0435\u043d\u0438\u0439",

    // Main buttons
    "Insert": "\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u0438",
    "Delete": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
    "Cancel": "\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
    "OK": "OK",
    "Back": "\u043d\u0430\u0437\u0430\u0434",
    "Remove": "\u0432\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
    "More": "\u0431\u0456\u043b\u044c\u0448\u0435",
    "Update": "\u043e\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f",
    "Style": "\u0441\u0442\u0438\u043b\u044c",

    // Font
    "Font Family": "\u0428\u0440\u0438\u0444\u0442",
    "Font Size": "\u0420\u043e\u0437\u043c\u0456\u0440 \u0448\u0440\u0438\u0444\u0442\u0443",

    // Colors
    "Colors": "\u043a\u043e\u043b\u044c\u043e\u0440\u0438",
    "Background": "\u0424\u043e\u043d",
    "Text": "\u0422\u0435\u043a\u0441\u0442",

    // Paragraphs
    "Paragraph Format": "\u0424\u043e\u0440\u043c\u0430\u0442",
    "Normal": "\u041d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u0438\u0439",
    "Code": "\u041a\u043e\u0434",
    "Heading 1": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 1",
    "Heading 2": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 2",
    "Heading 3": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 3",
    "Heading 4": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 4",

    // Style
    "Paragraph Style": "\u043f\u0443\u043d\u043a\u0442 \u0441\u0442\u0438\u043b\u044c",
    "Inline Style": "\u0432\u0431\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0439 \u0441\u0442\u0438\u043b\u044c",

    // Alignment
    "Align": "\u0412\u0438\u0440\u0456\u0432\u043d\u044e\u0432\u0430\u043d\u043d\u044f",
    "Align Left": "\u041f\u043e \u043b\u0456\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e",
    "Align Center": "\u041f\u043e \u0446\u0435\u043d\u0442\u0440\u0443",
    "Align Right": "\u041f\u043e \u043f\u0440\u0430\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e",
    "Align Justify": "\u041f\u043e \u0448\u0438\u0440\u0438\u043d\u0456",
    "None": "\u043d\u0456",

    // Lists
    "Ordered List": "\u041d\u0443\u043c\u0435\u0440\u043e\u0432\u0430\u043d\u0438\u0439 \u0441\u043f\u0438\u0441\u043e\u043a",
    "Unordered List": "\u041c\u0430\u0440\u043a\u043e\u0432\u0430\u043d\u0438\u0439 \u0441\u043f\u0438\u0441\u043e\u043a",

    // Indent
    "Decrease Indent": "\u0417\u043c\u0435\u043d\u0448\u0438\u0442\u0438 \u0432\u0456\u0434\u0441\u0442\u0443\u043f",
    "Increase Indent": "\u0417\u0431\u0456\u043b\u044c\u0448\u0438\u0442\u0438 \u0432\u0456\u0434\u0441\u0442\u0443\u043f",

    // Links
    "Insert Link": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Open in new tab": "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u0432 \u043d\u043e\u0432\u0456\u0439 \u0432\u043a\u043b\u0430\u0434\u0446\u0456",
    "Open Link": "\u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Edit Link": "\u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Unlink": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Choose Link": "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",

    // Images
    "Insert Image": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
    "Upload Image": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
    "By URL": "\u0437\u0430 URL",
    "Browse": "\u043f\u0435\u0440\u0435\u0433\u043b\u044f\u0434\u0430\u0442\u0438",
    "Drop image": "\u041f\u0435\u0440\u0435\u043c\u0456\u0441\u0442\u0456\u0442\u044c \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0441\u044e\u0434\u0438",
    "or click": "\u0430\u0431\u043e \u043d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c",
    "Manage Images": "\u041a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f\u043c\u0438",
    "Loading": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f",
    "Deleting": "\u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043d\u044f",
    "Tags": "\u043a\u043b\u044e\u0447\u043e\u0432\u0456 \u0441\u043b\u043e\u0432\u0430",
    "Are you sure? Image will be deleted.": "\u0412\u0438 \u0432\u043f\u0435\u0432\u043d\u0435\u043d\u0456? \u0417\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0431\u0443\u0434\u0435 \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043e.",
    "Replace": "\u0437\u0430\u043c\u0456\u043d\u044e\u0432\u0430\u0442\u0438",
    "Uploading": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f",
    "Loading image": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u044c",
    "Display": "\u0434\u0438\u0441\u043f\u043b\u0435\u0439",
    "Inline": "\u0412 \u043b\u0456\u043d\u0456\u044e",
    "Break Text": "\u043f\u0435\u0440\u0435\u0440\u0432\u0430 \u0442\u0435\u043a\u0441\u0442",
    "Alternate Text": "\u0430\u043b\u044c\u0442\u0435\u0440\u043d\u0430\u0442\u0438\u0432\u043d\u0438\u0439 \u0442\u0435\u043a\u0441\u0442",
    "Change Size": "\u0437\u043c\u0456\u043d\u0438\u0442\u0438 \u0440\u043e\u0437\u043c\u0456\u0440",
    "Width": "\u0428\u0438\u0440\u0438\u043d\u0430",
    "Height": "\u0412\u0438\u0441\u043e\u0442\u0430",
    "Something went wrong. Please try again.": "\u0429\u043e\u0441\u044c \u043f\u0456\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.",

    // Video
    "Insert Video": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0432\u0456\u0434\u0435\u043e",
    "Embedded Code": "\u0432\u0431\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0439 \u043a\u043e\u0434",

    // Tables
    "Insert Table": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0442\u0430\u0431\u043b\u0438\u0446\u044e",
    "Header": "\u0422\u0435\u043c\u0430",
    "Row": "\u0420\u044f\u0434\u043e\u043a",
    "Insert row above": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043f\u043e\u0440\u043e\u0436\u043d\u0456\u0439 \u0440\u044f\u0434\u043e\u043a \u0437\u0432\u0435\u0440\u0445\u0443",
    "Insert row below": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043f\u043e\u0440\u043e\u0436\u043d\u0456\u0439 \u0440\u044f\u0434\u043e\u043a \u0437\u043d\u0438\u0437\u0443",
    "Delete row": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0440\u044f\u0434\u043e\u043a",
    "Column": "\u0421\u0442\u043e\u0432\u043f\u0435\u0446\u044c",
    "Insert column before": "\u0414\u043e\u0434\u0430\u0442\u0438 \u0441\u0442\u043e\u0432\u043f\u0435\u0446\u044c \u043b\u0456\u0432\u043e\u0440\u0443\u0447",
    "Insert column after": "\u0414\u043e\u0434\u0430\u0442\u0438 \u0441\u0442\u043e\u0432\u043f\u0435\u0446\u044c \u043f\u0440\u0430\u0432\u043e\u0440\u0443\u0447",
    "Delete column": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0441\u0442\u043e\u0432\u043f\u0435\u0446\u044c",
    "Cell": "\u041a\u043e\u043c\u0456\u0440\u043a\u0430",
    "Merge cells": "\u041e\u0431'\u0454\u0434\u043d\u0430\u0442\u0438 \u043a\u043e\u043c\u0456\u0440\u043a\u0438",
    "Horizontal split": "\u0420\u043e\u0437\u0434\u0456\u043b\u0438\u0442\u0438 \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u043e",
    "Vertical split": "\u0420\u043e\u0437\u0434\u0456\u043b\u0438\u0442\u0438 \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u043e",
    "Cell Background": "\u0441\u0442\u0456\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u0438\u0439 \u0444\u043e\u043d",
    "Vertical Align": "\u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u0430 \u0432\u0438\u0440\u0456\u0432\u043d\u044e\u0432\u0430\u043d\u043d\u044f",
    "Top": "\u0422\u043e\u043f",
    "Middle": "\u0441\u0435\u0440\u0435\u0434\u043d\u0456\u0439",
    "Bottom": "\u0434\u043d\u043e",
    "Align Top": "\u0417\u0456\u0441\u0442\u0430\u0432\u0442\u0435 \u0432\u0435\u0440\u0445\u043d\u044e",
    "Align Middle": "\u0432\u0438\u0440\u0456\u0432\u043d\u044f\u0442\u0438 \u043f\u043e \u0441\u0435\u0440\u0435\u0434\u0438\u043d\u0456",
    "Align Bottom": "\u0417\u0456\u0441\u0442\u0430\u0432\u0442\u0435 \u043d\u0438\u0436\u043d\u044e",
    "Cell Style": "\u0441\u0442\u0438\u043b\u044c \u043a\u043e\u043c\u0456\u0440\u043a\u0438",

    // Files
    "Upload File": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0444\u0430\u0439\u043b",
    "Drop file": "\u041f\u0435\u0440\u0435\u043c\u0456\u0441\u0442\u0456\u0442\u044c \u0444\u0430\u0439\u043b \u0441\u044e\u0434\u0438",

    // Emoticons
    "Emoticons": "\u0441\u043c\u0430\u0439\u043b\u0438",
    "Grinning face": "\u043f\u043e\u0441\u043c\u0456\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430",
    "Grinning face with smiling eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0443\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Face with tears of joy": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437\u0456 \u0441\u043b\u044c\u043e\u0437\u0430\u043c\u0438 \u0440\u0430\u0434\u043e\u0441\u0442\u0456",
    "Smiling face with open mouth": "\u0423\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0435 \u043e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c",
    "Smiling face with open mouth and smiling eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 ",
    "Smiling face with open mouth and cold sweat": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 ",
    "Smiling face with open mouth and tightly-closed eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 \u0449\u0456\u043b\u044c\u043d\u043e \u0437\u0430\u043a\u0440\u0438\u0442\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Smiling face with halo": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0433\u0430\u043b\u043e",
    "Smiling face with horns": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0440\u043e\u0433\u0430\u043c\u0438",
    "Winking face": "\u043f\u0456\u0434\u043c\u043e\u0440\u0433\u0443\u044e\u0447\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Smiling face with smiling eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0443\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Face savoring delicious food": "\u041e\u0441\u043e\u0431\u0430 \u0441\u043c\u0430\u043a\u0443\u044e\u0447\u0438 \u0441\u043c\u0430\u0447\u043d\u0443 \u0457\u0436\u0443",
    "Relieved face": "\u0437\u0432\u0456\u043b\u044c\u043d\u0435\u043d\u043e \u043e\u0441\u043e\u0431\u0430",
    "Smiling face with heart-shaped eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0443 \u0444\u043e\u0440\u043c\u0456 \u0441\u0435\u0440\u0446\u044f \u043e\u0447\u0438\u043c\u0430",
    "Smiling face with sunglasses": "\u0053\u006d\u0069\u006c\u0069\u006e\u0067 \u0066\u0061\u0063\u0065 \u0077\u0069\u0074\u0068 \u0073\u0075\u006e\u0067\u006c\u0061\u0073\u0073\u0065\u0073",
    "Smirking face": "\u043f\u043e\u0441\u043c\u0456\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430",
    "Neutral face": "\u0437\u0432\u0438\u0447\u0430\u0439\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Expressionless face": "\u043d\u0435\u0432\u0438\u0440\u0430\u0437\u043d\u0456 \u043e\u0431\u043b\u0438\u0447\u0447\u044f",
    "Unamused face": "\u0055\u006e\u0061\u006d\u0075\u0073\u0065\u0064 \u043e\u0441\u043e\u0431\u0430",
    "Face with cold sweat": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0445\u043e\u043b\u043e\u0434\u043d\u043e\u0433\u043e \u043f\u043e\u0442\u0443",
    "Pensive face": "\u0437\u0430\u043c\u0438\u0441\u043b\u0435\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Confused face": "\u043f\u043b\u0443\u0442\u0430\u0442\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Confounded face": "\u043d\u0435\u0445\u0430\u0439 \u043f\u043e\u0441\u043e\u0440\u043e\u043c\u043b\u044f\u0442\u044c\u0441\u044f \u043e\u0441\u043e\u0431\u0430",
    "Kissing face": "\u043f\u043e\u0446\u0456\u043b\u0443\u043d\u043a\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Face throwing a kiss": "\u041e\u0441\u043e\u0431\u0430 \u043a\u0438\u0434\u0430\u043b\u0438 \u043f\u043e\u0446\u0456\u043b\u0443\u043d\u043e\u043a",
    "Kissing face with smiling eyes": "\u041f\u043e\u0446\u0456\u043b\u0443\u043d\u043a\u0438 \u043e\u0441\u043e\u0431\u0430 \u0437 \u0443\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Kissing face with closed eyes": "\u041f\u043e\u0446\u0456\u043b\u0443\u043d\u043a\u0438 \u043e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0437\u0430\u043f\u043b\u044e\u0449\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Face with stuck out tongue": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0441\u0442\u0438\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u0438\u043a",
    "Face with stuck out tongue and winking eye": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0441\u0442\u0438\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u0438\u043a\u0430 \u0456 \u0410\u043d\u0456\u043c\u043e\u0432\u0430\u043d\u0435 \u043e\u0447\u0435\u0439",
    "Face with stuck out tongue and tightly-closed eyes": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0441\u0442\u0438\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u0438\u043a\u0430 \u0456 \u0449\u0456\u043b\u044c\u043d\u043e \u0437\u0430\u043a\u0440\u0438\u0442\u0456 \u043e\u0447\u0456",
    "Disappointed face": "\u0440\u043e\u0437\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Worried face": "\u0441\u0442\u0443\u0440\u0431\u043e\u0432\u0430\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Angry face": "\u0437\u043b\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Pouting face": "\u043f\u0443\u0445\u043a\u0456 \u043e\u0441\u043e\u0431\u0430",
    "Crying face": "\u043f\u043b\u0430\u0447 \u043e\u0441\u043e\u0431\u0430",
    "Persevering face": "\u043d\u0430\u043f\u043e\u043b\u0435\u0433\u043b\u0438\u0432\u0430 \u043e\u0441\u043e\u0431\u0430",
    "Face with look of triumph": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0438\u0434\u043e\u043c \u0442\u0440\u0456\u0443\u043c\u0444\u0443",
    "Disappointed but relieved face": "\u0420\u043e\u0437\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u0438\u0439\u002c \u0430\u043b\u0435 \u0437\u0432\u0456\u043b\u044c\u043d\u0435\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Frowning face with open mouth": "\u041d\u0430\u0441\u0443\u043f\u0438\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c",
    "Anguished face": "\u0431\u043e\u043b\u0456\u0441\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Fearful face": "\u043f\u043e\u0431\u043e\u044e\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430",
    "Weary face": "\u0432\u0442\u043e\u043c\u043b\u0435\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Sleepy face": "сонне обличчя",
    "Tired face": "\u0432\u0442\u043e\u043c\u0438\u043b\u0438\u0441\u044f \u043e\u0441\u043e\u0431\u0430",
    "Grimacing face": "\u0433\u0440\u0438\u043c\u0430\u0441\u0443\u044e\u0447\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Loudly crying face": "\u004c\u006f\u0075\u0064\u006c\u0079 \u0063\u0072\u0079\u0069\u006e\u0067 \u0066\u0061\u0063\u0065",
    "Face with open mouth": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c",
    "Hushed face": "\u0437\u0430\u0442\u0438\u0445 \u043e\u0441\u043e\u0431\u0430",
    "Face with open mouth and cold sweat": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 \u0445\u043e\u043b\u043e\u0434\u043d\u0438\u0439 \u043f\u0456\u0442",
    "Face screaming in fear": "\u041e\u0441\u043e\u0431\u0430 \u043a\u0440\u0438\u0447\u0430\u0442\u0438 \u0432 \u0441\u0442\u0440\u0430\u0445\u0443",
    "Astonished face": "\u0437\u0434\u0438\u0432\u043e\u0432\u0430\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Flushed face": "\u043f\u0440\u0438\u043f\u043b\u0438\u0432 \u043a\u0440\u043e\u0432\u0456 \u0434\u043e \u043e\u0431\u043b\u0438\u0447\u0447\u044f",
    "Sleeping face": "\u0421\u043f\u043b\u044f\u0447\u0430 \u043e\u0441\u043e\u0431\u0430",
    "Dizzy face": "\u0414\u0456\u0437\u0437\u0456 \u043e\u0441\u043e\u0431\u0430",
    "Face without mouth": "\u041e\u0441\u043e\u0431\u0430 \u0431\u0435\u0437 \u0440\u043e\u0442\u0430",
    "Face with medical mask": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u043c\u0435\u0434\u0438\u0447\u043d\u043e\u044e \u043c\u0430\u0441\u043a\u043e\u044e",

    // Line breaker
    "Break": "\u0437\u043b\u043e\u043c\u0438\u0442\u0438",

    // Math
    "Subscript": "\u043f\u0456\u0434\u0440\u044f\u0434\u043a\u043e\u0432\u0438\u0439",
    "Superscript": "\u043d\u0430\u0434\u0440\u044f\u0434\u043a\u043e\u0432\u0438\u0439 \u0441\u0438\u043c\u0432\u043e\u043b",

    // Full screen
    "Fullscreen": "\u043f\u043e\u0432\u043d\u043e\u0435\u043a\u0440\u0430\u043d\u043d\u0438\u0439 \u0440\u0435\u0436\u0438\u043c",

    // Horizontal line
    "Insert Horizontal Line": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u0443 \u043b\u0456\u043d\u0456\u044e",

    // Clear formatting
    "Clear Formatting": "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u0444\u043e\u0440\u043c\u0430\u0442\u0443\u0432\u0430\u043d\u043d\u044f",

    // Undo, redo
    "Undo": "\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
    "Redo": "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0438",

    // Select all
    "Select All": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0432\u0441\u0435",

    // Code view
    "Code View": "\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u0434 \u043a\u043e\u0434\u0443",

    // Quote
    "Quote": "\u0426\u0438\u0442\u0430\u0442\u0430",
    "Increase": "\u0417\u0431\u0456\u043b\u044c\u0448\u0438\u0442\u0438",
    "Decrease": "\u0437\u043d\u0438\u0436\u0435\u043d\u043d\u044f"
  },
  direction: "ltr"
};
/**
 * Ukrainian
 */


$.FroalaEditor.LANGUAGE['uk'] = {
  translation: {
    // Place holder
    "Type something": "\u041d\u0430\u043f\u0438\u0448\u0456\u0442\u044c \u0431\u0443\u0434\u044c-\u0449\u043e",

    // Basic formatting
    "Bold": "\u0416\u0438\u0440\u043d\u0438\u0439",
    "Italic": "\u041a\u0443\u0440\u0441\u0438\u0432",
    "Underline": "\u041f\u0456\u0434\u043a\u0440\u0435\u0441\u043b\u0435\u043d\u0438\u0439",
    "Strikethrough": "\u0417\u0430\u043a\u0440\u0435\u0441\u043b\u0435\u043d\u0438\u0439",

    // Main buttons
    "Insert": "\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u0438",
    "Delete": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
    "Cancel": "\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
    "OK": "OK",
    "Back": "\u043d\u0430\u0437\u0430\u0434",
    "Remove": "\u0432\u0438\u0434\u0430\u043b\u0438\u0442\u0438",
    "More": "\u0431\u0456\u043b\u044c\u0448\u0435",
    "Update": "\u043e\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f",
    "Style": "\u0441\u0442\u0438\u043b\u044c",

    // Font
    "Font Family": "\u0428\u0440\u0438\u0444\u0442",
    "Font Size": "\u0420\u043e\u0437\u043c\u0456\u0440 \u0448\u0440\u0438\u0444\u0442\u0443",

    // Colors
    "Colors": "\u043a\u043e\u043b\u044c\u043e\u0440\u0438",
    "Background": "\u0424\u043e\u043d",
    "Text": "\u0422\u0435\u043a\u0441\u0442",

    // Paragraphs
    "Paragraph Format": "\u0424\u043e\u0440\u043c\u0430\u0442",
    "Normal": "\u041d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u0438\u0439",
    "Code": "\u041a\u043e\u0434",
    "Heading 1": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 1",
    "Heading 2": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 2",
    "Heading 3": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 3",
    "Heading 4": "\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 4",

    // Style
    "Paragraph Style": "\u043f\u0443\u043d\u043a\u0442 \u0441\u0442\u0438\u043b\u044c",
    "Inline Style": "\u0432\u0431\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0439 \u0441\u0442\u0438\u043b\u044c",

    // Alignment
    "Align": "\u0412\u0438\u0440\u0456\u0432\u043d\u044e\u0432\u0430\u043d\u043d\u044f",
    "Align Left": "\u041f\u043e \u043b\u0456\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e",
    "Align Center": "\u041f\u043e \u0446\u0435\u043d\u0442\u0440\u0443",
    "Align Right": "\u041f\u043e \u043f\u0440\u0430\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e",
    "Align Justify": "\u041f\u043e \u0448\u0438\u0440\u0438\u043d\u0456",
    "None": "\u043d\u0456",

    // Lists
    "Ordered List": "\u041d\u0443\u043c\u0435\u0440\u043e\u0432\u0430\u043d\u0438\u0439 \u0441\u043f\u0438\u0441\u043e\u043a",
    "Unordered List": "\u041c\u0430\u0440\u043a\u043e\u0432\u0430\u043d\u0438\u0439 \u0441\u043f\u0438\u0441\u043e\u043a",

    // Indent
    "Decrease Indent": "\u0417\u043c\u0435\u043d\u0448\u0438\u0442\u0438 \u0432\u0456\u0434\u0441\u0442\u0443\u043f",
    "Increase Indent": "\u0417\u0431\u0456\u043b\u044c\u0448\u0438\u0442\u0438 \u0432\u0456\u0434\u0441\u0442\u0443\u043f",

    // Links
    "Insert Link": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Open in new tab": "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u0432 \u043d\u043e\u0432\u0456\u0439 \u0432\u043a\u043b\u0430\u0434\u0446\u0456",
    "Open Link": "\u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Edit Link": "\u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Unlink": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",
    "Choose Link": "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f",

    // Images
    "Insert Image": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
    "Upload Image": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f",
    "By URL": "\u0437\u0430 URL",
    "Browse": "\u043f\u0435\u0440\u0435\u0433\u043b\u044f\u0434\u0430\u0442\u0438",
    "Drop image": "\u041f\u0435\u0440\u0435\u043c\u0456\u0441\u0442\u0456\u0442\u044c \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0441\u044e\u0434\u0438",
    "or click": "\u0430\u0431\u043e \u043d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c",
    "Manage Images": "\u041a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f\u043c\u0438",
    "Loading": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f",
    "Deleting": "\u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043d\u044f",
    "Tags": "\u043a\u043b\u044e\u0447\u043e\u0432\u0456 \u0441\u043b\u043e\u0432\u0430",
    "Are you sure? Image will be deleted.": "\u0412\u0438 \u0432\u043f\u0435\u0432\u043d\u0435\u043d\u0456? \u0417\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0431\u0443\u0434\u0435 \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043e.",
    "Replace": "\u0437\u0430\u043c\u0456\u043d\u044e\u0432\u0430\u0442\u0438",
    "Uploading": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f",
    "Loading image": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u044c",
    "Display": "\u0434\u0438\u0441\u043f\u043b\u0435\u0439",
    "Inline": "\u0412 \u043b\u0456\u043d\u0456\u044e",
    "Break Text": "\u043f\u0435\u0440\u0435\u0440\u0432\u0430 \u0442\u0435\u043a\u0441\u0442",
    "Alternate Text": "\u0430\u043b\u044c\u0442\u0435\u0440\u043d\u0430\u0442\u0438\u0432\u043d\u0438\u0439 \u0442\u0435\u043a\u0441\u0442",
    "Change Size": "\u0437\u043c\u0456\u043d\u0438\u0442\u0438 \u0440\u043e\u0437\u043c\u0456\u0440",
    "Width": "\u0428\u0438\u0440\u0438\u043d\u0430",
    "Height": "\u0412\u0438\u0441\u043e\u0442\u0430",
    "Something went wrong. Please try again.": "\u0429\u043e\u0441\u044c \u043f\u0456\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.",

    // Video
    "Insert Video": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0432\u0456\u0434\u0435\u043e",
    "Embedded Code": "\u0432\u0431\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0439 \u043a\u043e\u0434",

    // Tables
    "Insert Table": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0442\u0430\u0431\u043b\u0438\u0446\u044e",
    "Header": "\u0422\u0435\u043c\u0430",
    "Row": "\u0420\u044f\u0434\u043e\u043a",
    "Insert row above": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043f\u043e\u0440\u043e\u0436\u043d\u0456\u0439 \u0440\u044f\u0434\u043e\u043a \u0437\u0432\u0435\u0440\u0445\u0443",
    "Insert row below": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043f\u043e\u0440\u043e\u0436\u043d\u0456\u0439 \u0440\u044f\u0434\u043e\u043a \u0437\u043d\u0438\u0437\u0443",
    "Delete row": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0440\u044f\u0434\u043e\u043a",
    "Column": "\u0421\u0442\u043e\u0432\u043f\u0435\u0446\u044c",
    "Insert column before": "\u0414\u043e\u0434\u0430\u0442\u0438 \u0441\u0442\u043e\u0432\u043f\u0435\u0446\u044c \u043b\u0456\u0432\u043e\u0440\u0443\u0447",
    "Insert column after": "\u0414\u043e\u0434\u0430\u0442\u0438 \u0441\u0442\u043e\u0432\u043f\u0435\u0446\u044c \u043f\u0440\u0430\u0432\u043e\u0440\u0443\u0447",
    "Delete column": "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0441\u0442\u043e\u0432\u043f\u0435\u0446\u044c",
    "Cell": "\u041a\u043e\u043c\u0456\u0440\u043a\u0430",
    "Merge cells": "\u041e\u0431'\u0454\u0434\u043d\u0430\u0442\u0438 \u043a\u043e\u043c\u0456\u0440\u043a\u0438",
    "Horizontal split": "\u0420\u043e\u0437\u0434\u0456\u043b\u0438\u0442\u0438 \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u043e",
    "Vertical split": "\u0420\u043e\u0437\u0434\u0456\u043b\u0438\u0442\u0438 \u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u043e",
    "Cell Background": "\u0441\u0442\u0456\u043b\u044c\u043d\u0438\u043a\u043e\u0432\u0438\u0439 \u0444\u043e\u043d",
    "Vertical Align": "\u0432\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u0430 \u0432\u0438\u0440\u0456\u0432\u043d\u044e\u0432\u0430\u043d\u043d\u044f",
    "Top": "\u0422\u043e\u043f",
    "Middle": "\u0441\u0435\u0440\u0435\u0434\u043d\u0456\u0439",
    "Bottom": "\u0434\u043d\u043e",
    "Align Top": "\u0417\u0456\u0441\u0442\u0430\u0432\u0442\u0435 \u0432\u0435\u0440\u0445\u043d\u044e",
    "Align Middle": "\u0432\u0438\u0440\u0456\u0432\u043d\u044f\u0442\u0438 \u043f\u043e \u0441\u0435\u0440\u0435\u0434\u0438\u043d\u0456",
    "Align Bottom": "\u0417\u0456\u0441\u0442\u0430\u0432\u0442\u0435 \u043d\u0438\u0436\u043d\u044e",
    "Cell Style": "\u0441\u0442\u0438\u043b\u044c \u043a\u043e\u043c\u0456\u0440\u043a\u0438",

    // Files
    "Upload File": "\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0444\u0430\u0439\u043b",
    "Drop file": "\u041f\u0435\u0440\u0435\u043c\u0456\u0441\u0442\u0456\u0442\u044c \u0444\u0430\u0439\u043b \u0441\u044e\u0434\u0438",

    // Emoticons
    "Emoticons": "\u0441\u043c\u0430\u0439\u043b\u0438",
    "Grinning face": "\u043f\u043e\u0441\u043c\u0456\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430",
    "Grinning face with smiling eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0443\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Face with tears of joy": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437\u0456 \u0441\u043b\u044c\u043e\u0437\u0430\u043c\u0438 \u0440\u0430\u0434\u043e\u0441\u0442\u0456",
    "Smiling face with open mouth": "\u0423\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0435 \u043e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c",
    "Smiling face with open mouth and smiling eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 ",
    "Smiling face with open mouth and cold sweat": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 ",
    "Smiling face with open mouth and tightly-closed eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 \u0449\u0456\u043b\u044c\u043d\u043e \u0437\u0430\u043a\u0440\u0438\u0442\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Smiling face with halo": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0433\u0430\u043b\u043e",
    "Smiling face with horns": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0440\u043e\u0433\u0430\u043c\u0438",
    "Winking face": "\u043f\u0456\u0434\u043c\u043e\u0440\u0433\u0443\u044e\u0447\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Smiling face with smiling eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0443\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Face savoring delicious food": "\u041e\u0441\u043e\u0431\u0430 \u0441\u043c\u0430\u043a\u0443\u044e\u0447\u0438 \u0441\u043c\u0430\u0447\u043d\u0443 \u0457\u0436\u0443",
    "Relieved face": "\u0437\u0432\u0456\u043b\u044c\u043d\u0435\u043d\u043e \u043e\u0441\u043e\u0431\u0430",
    "Smiling face with heart-shaped eyes": "\u041f\u043e\u0441\u043c\u0456\u0445\u0430\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0443 \u0444\u043e\u0440\u043c\u0456 \u0441\u0435\u0440\u0446\u044f \u043e\u0447\u0438\u043c\u0430",
    "Smiling face with sunglasses": "\u0053\u006d\u0069\u006c\u0069\u006e\u0067 \u0066\u0061\u0063\u0065 \u0077\u0069\u0074\u0068 \u0073\u0075\u006e\u0067\u006c\u0061\u0073\u0073\u0065\u0073",
    "Smirking face": "\u043f\u043e\u0441\u043c\u0456\u0445\u043d\u0443\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430",
    "Neutral face": "\u0437\u0432\u0438\u0447\u0430\u0439\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Expressionless face": "\u043d\u0435\u0432\u0438\u0440\u0430\u0437\u043d\u0456 \u043e\u0431\u043b\u0438\u0447\u0447\u044f",
    "Unamused face": "\u0055\u006e\u0061\u006d\u0075\u0073\u0065\u0064 \u043e\u0441\u043e\u0431\u0430",
    "Face with cold sweat": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0445\u043e\u043b\u043e\u0434\u043d\u043e\u0433\u043e \u043f\u043e\u0442\u0443",
    "Pensive face": "\u0437\u0430\u043c\u0438\u0441\u043b\u0435\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Confused face": "\u043f\u043b\u0443\u0442\u0430\u0442\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Confounded face": "\u043d\u0435\u0445\u0430\u0439 \u043f\u043e\u0441\u043e\u0440\u043e\u043c\u043b\u044f\u0442\u044c\u0441\u044f \u043e\u0441\u043e\u0431\u0430",
    "Kissing face": "\u043f\u043e\u0446\u0456\u043b\u0443\u043d\u043a\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Face throwing a kiss": "\u041e\u0441\u043e\u0431\u0430 \u043a\u0438\u0434\u0430\u043b\u0438 \u043f\u043e\u0446\u0456\u043b\u0443\u043d\u043e\u043a",
    "Kissing face with smiling eyes": "\u041f\u043e\u0446\u0456\u043b\u0443\u043d\u043a\u0438 \u043e\u0441\u043e\u0431\u0430 \u0437 \u0443\u0441\u043c\u0456\u0445\u043d\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Kissing face with closed eyes": "\u041f\u043e\u0446\u0456\u043b\u0443\u043d\u043a\u0438 \u043e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0437\u0430\u043f\u043b\u044e\u0449\u0435\u043d\u0438\u043c\u0438 \u043e\u0447\u0438\u043c\u0430",
    "Face with stuck out tongue": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0441\u0442\u0438\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u0438\u043a",
    "Face with stuck out tongue and winking eye": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0441\u0442\u0438\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u0438\u043a\u0430 \u0456 \u0410\u043d\u0456\u043c\u043e\u0432\u0430\u043d\u0435 \u043e\u0447\u0435\u0439",
    "Face with stuck out tongue and tightly-closed eyes": "\u041e\u0431\u043b\u0438\u0447\u0447\u044f \u0437 \u0441\u0442\u0438\u0440\u0447\u0430\u043b\u0438 \u044f\u0437\u0438\u043a\u0430 \u0456 \u0449\u0456\u043b\u044c\u043d\u043e \u0437\u0430\u043a\u0440\u0438\u0442\u0456 \u043e\u0447\u0456",
    "Disappointed face": "\u0440\u043e\u0437\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Worried face": "\u0441\u0442\u0443\u0440\u0431\u043e\u0432\u0430\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Angry face": "\u0437\u043b\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Pouting face": "\u043f\u0443\u0445\u043a\u0456 \u043e\u0441\u043e\u0431\u0430",
    "Crying face": "\u043f\u043b\u0430\u0447 \u043e\u0441\u043e\u0431\u0430",
    "Persevering face": "\u043d\u0430\u043f\u043e\u043b\u0435\u0433\u043b\u0438\u0432\u0430 \u043e\u0441\u043e\u0431\u0430",
    "Face with look of triumph": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0438\u0434\u043e\u043c \u0442\u0440\u0456\u0443\u043c\u0444\u0443",
    "Disappointed but relieved face": "\u0420\u043e\u0437\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u0438\u0439\u002c \u0430\u043b\u0435 \u0437\u0432\u0456\u043b\u044c\u043d\u0435\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Frowning face with open mouth": "\u041d\u0430\u0441\u0443\u043f\u0438\u0432\u0448\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c",
    "Anguished face": "\u0431\u043e\u043b\u0456\u0441\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Fearful face": "\u043f\u043e\u0431\u043e\u044e\u044e\u0447\u0438\u0441\u044c \u043e\u0441\u043e\u0431\u0430",
    "Weary face": "\u0432\u0442\u043e\u043c\u043b\u0435\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Sleepy face": "сонне обличчя",
    "Tired face": "\u0432\u0442\u043e\u043c\u0438\u043b\u0438\u0441\u044f \u043e\u0441\u043e\u0431\u0430",
    "Grimacing face": "\u0433\u0440\u0438\u043c\u0430\u0441\u0443\u044e\u0447\u0438 \u043e\u0441\u043e\u0431\u0430",
    "Loudly crying face": "\u004c\u006f\u0075\u0064\u006c\u0079 \u0063\u0072\u0079\u0069\u006e\u0067 \u0066\u0061\u0063\u0065",
    "Face with open mouth": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c",
    "Hushed face": "\u0437\u0430\u0442\u0438\u0445 \u043e\u0441\u043e\u0431\u0430",
    "Face with open mouth and cold sweat": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u043c \u0440\u043e\u0442\u043e\u043c \u0456 \u0445\u043e\u043b\u043e\u0434\u043d\u0438\u0439 \u043f\u0456\u0442",
    "Face screaming in fear": "\u041e\u0441\u043e\u0431\u0430 \u043a\u0440\u0438\u0447\u0430\u0442\u0438 \u0432 \u0441\u0442\u0440\u0430\u0445\u0443",
    "Astonished face": "\u0437\u0434\u0438\u0432\u043e\u0432\u0430\u043d\u0438\u0439 \u043e\u0441\u043e\u0431\u0430",
    "Flushed face": "\u043f\u0440\u0438\u043f\u043b\u0438\u0432 \u043a\u0440\u043e\u0432\u0456 \u0434\u043e \u043e\u0431\u043b\u0438\u0447\u0447\u044f",
    "Sleeping face": "\u0421\u043f\u043b\u044f\u0447\u0430 \u043e\u0441\u043e\u0431\u0430",
    "Dizzy face": "\u0414\u0456\u0437\u0437\u0456 \u043e\u0441\u043e\u0431\u0430",
    "Face without mouth": "\u041e\u0441\u043e\u0431\u0430 \u0431\u0435\u0437 \u0440\u043e\u0442\u0430",
    "Face with medical mask": "\u041e\u0441\u043e\u0431\u0430 \u0437 \u043c\u0435\u0434\u0438\u0447\u043d\u043e\u044e \u043c\u0430\u0441\u043a\u043e\u044e",

    // Line breaker
    "Break": "\u0437\u043b\u043e\u043c\u0438\u0442\u0438",

    // Math
    "Subscript": "\u043f\u0456\u0434\u0440\u044f\u0434\u043a\u043e\u0432\u0438\u0439",
    "Superscript": "\u043d\u0430\u0434\u0440\u044f\u0434\u043a\u043e\u0432\u0438\u0439 \u0441\u0438\u043c\u0432\u043e\u043b",

    // Full screen
    "Fullscreen": "\u043f\u043e\u0432\u043d\u043e\u0435\u043a\u0440\u0430\u043d\u043d\u0438\u0439 \u0440\u0435\u0436\u0438\u043c",

    // Horizontal line
    "Insert Horizontal Line": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u0443 \u043b\u0456\u043d\u0456\u044e",

    // Clear formatting
    "Clear Formatting": "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u0444\u043e\u0440\u043c\u0430\u0442\u0443\u0432\u0430\u043d\u043d\u044f",

    // Undo, redo
    "Undo": "\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
    "Redo": "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0438",

    // Select all
    "Select All": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0432\u0441\u0435",

    // Code view
    "Code View": "\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u0434 \u043a\u043e\u0434\u0443"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Simplified Chinese spoken in China.
 */


$.FroalaEditor.LANGUAGE['zh_cn'] = {
  translation: {
    // Place holder
    "Type something": "\u8f93\u5165\u4e00\u4e9b\u5185\u5bb9",

    // Basic formatting
    "Bold": "\u7c97\u4f53",
    "Italic": "\u659c\u4f53",
    "Underline": "\u4e0b\u5212\u7ebf",
    "Strikethrough": "\u5220\u9664\u7ebf",

    // Main buttons
    "Insert": "\u63d2\u5165",
    "Delete": "\u5220\u9664",
    "Cancel": "\u53d6\u6d88",
    "OK": "\u786e\u5b9a",
    "Back": "\u80cc\u90e8",
    "Remove": "\u53bb\u6389",
    "More": "\u66f4\u591a",
    "Update": "\u66f4\u65b0",
    "Style": "\u98ce\u683c",

    // Font
    "Font Family": "\u5b57\u4f53",
    "Font Size": "\u5b57\u53f7",

    // Colors
    "Colors": "\u989c\u8272",
    "Background": "\u80cc\u666f",
    "Text": "\u6587\u5b57",

    // Paragraphs
    "Paragraph Format": "\u683c\u5f0f",
    "Normal": "\u6b63\u5e38",
    "Code": "\u4ee3\u7801",
    "Heading 1": "\u6807\u98981",
    "Heading 2": "\u6807\u98982",
    "Heading 3": "\u6807\u98983",
    "Heading 4": "\u6807\u98984",

    // Style
    "Paragraph Style": "\u6bb5\u843d\u6837\u5f0f",
    "Inline Style": "\u5185\u8054\u6837\u5f0f",

    // Alignment
    "Align": "\u5bf9\u9f50\u65b9\u5f0f",
    "Align Left": "\u5de6\u5bf9\u9f50",
    "Align Center": "\u5c45\u4e2d",
    "Align Right": "\u53f3\u5bf9\u9f50",
    "Align Justify": "\u4e24\u7aef\u5bf9\u9f50",
    "None": "\u65e0",

    // Lists
    "Ordered List": "\u7f16\u53f7\u5217\u8868",
    "Unordered List": "\u9879\u76ee\u7b26\u53f7",

    // Indent
    "Decrease Indent": "\u51cf\u5c11\u7f29\u8fdb",
    "Increase Indent": "\u589e\u52a0\u7f29\u8fdb",

    // Links
    "Insert Link": "\u63d2\u5165\u94fe\u63a5",
    "Open in new tab": "\u5f00\u542f\u5728\u65b0\u6807\u7b7e\u9875",
    "Open Link": "\u6253\u5f00\u94fe\u63a5",
    "Edit Link": "\u7f16\u8f91\u94fe\u63a5",
    "Unlink": "\u5220\u9664\u94fe\u63a5",
    "Choose Link": "\u9009\u62e9\u94fe\u63a5",

    // Images
    "Insert Image": "\u63d2\u5165\u56fe\u7247",
    "Upload Image": "\u4e0a\u4f20\u56fe\u7247",
    "By URL": "\u901a\u8fc7\u7f51\u5740",
    "Browse": "\u6d4f\u89c8",
    "Drop image": "\u56fe\u50cf\u62d6\u653e",
    "or click": "\u6216\u70b9\u51fb",
    "Manage Images": "\u7ba1\u7406\u56fe\u50cf",
    "Loading": "\u8f7d\u5165\u4e2d",
    "Deleting": "\u5220\u9664",
    "Tags": "\u6807\u7b7e",
    "Are you sure? Image will be deleted.": "\u4f60\u786e\u5b9a\u5417\uff1f\u56fe\u50cf\u5c06\u88ab\u5220\u9664\u3002",
    "Replace": "\u66f4\u6362",
    "Uploading": "\u4e0a\u4f20",
    "Loading image": "\u5bfc\u5165\u56fe\u50cf",
    "Display": "\u663e\u793a",
    "Inline": "\u6392\u961f",
    "Break Text": "\u65ad\u5f00\u6587\u672c",
    "Alternate Text": "\u5907\u7528\u6587\u672c",
    "Change Size": "\u5c3a\u5bf8\u53d8\u5316",
    "Width": "\u5bbd\u5ea6",
    "Height": "\u9ad8\u5ea6",
    "Something went wrong. Please try again.": "\u51fa\u4e86\u4e9b\u95ee\u9898\u3002 \u8bf7\u518d\u8bd5\u4e00\u6b21\u3002",

    // Video
    "Insert Video": "\u63d2\u5165\u89c6\u9891",
    "Embedded Code": "\u5d4c\u5165\u5f0f\u4ee3\u7801",

    // Tables
    "Insert Table": "\u63d2\u5165\u8868\u683c",
    "Header": "\u5934",
    "Row": "\u884c",
    "Insert row above": "\u5728\u4e0a\u65b9\u63d2\u5165",
    "Insert row below": "\u5728\u4e0b\u65b9\u63d2\u5165",
    "Delete row": "\u5220\u9664\u884c",
    "Column": "\u5217",
    "Insert column before": "\u5728\u5de6\u4fa7\u63d2\u5165",
    "Insert column after": "\u5728\u53f3\u4fa7\u63d2\u5165",
    "Delete column": "\u5220\u9664\u5217",
    "Cell": "\u5355\u5143\u683c",
    "Merge cells": "\u5408\u5e76\u5355\u5143\u683c",
    "Horizontal split": "\u6c34\u5e73\u5206\u5272",
    "Vertical split": "\u5782\u76f4\u5206\u5272",
    "Cell Background": "\u5355\u5143\u683c\u80cc\u666f",
    "Vertical Align": "\u5782\u76f4\u5bf9\u9f50",
    "Top": "\u6700\u4f73",
    "Middle": "\u4e2d\u95f4",
    "Bottom": "\u5e95\u90e8",
    "Align Top": "\u9876\u90e8\u5bf9\u9f50",
    "Align Middle": "\u4e2d\u95f4\u5bf9\u9f50",
    "Align Bottom": "\u5e95\u90e8\u5bf9\u9f50",
    "Cell Style": "\u5355\u5143\u683c\u6837\u5f0f",

    // Files
    "Upload File": "\u4e0a\u4f20\u6587\u4ef6",
    "Drop file": "\u6587\u4ef6\u62d6\u653e",

    // Emoticons
    "Emoticons": "\u8868\u60c5",
    "Grinning face": "\u8138\u4e0a\u7b11\u563b\u563b",
    "Grinning face with smiling eyes": "",
    "Face with tears of joy": "\u7b11\u563b\u563b\u7684\u8138\uff0c\u542b\u7b11\u7684\u773c\u775b",
    "Smiling face with open mouth": "\u7b11\u8138\u5f20\u5f00\u5634",
    "Smiling face with open mouth and smiling eyes": "\u7b11\u8138\u5f20\u5f00\u5634\u5fae\u7b11\u7684\u773c\u775b",
    "Smiling face with open mouth and cold sweat": "\u7b11\u8138\u5f20\u5f00\u5634\uff0c\u4e00\u8eab\u51b7\u6c57",
    "Smiling face with open mouth and tightly-closed eyes": "\u7b11\u8138\u5f20\u5f00\u5634\uff0c\u7d27\u7d27\u95ed\u7740\u773c\u775b",
    "Smiling face with halo": "\u7b11\u8138\u6655",
    "Smiling face with horns": "\u5fae\u7b11\u7684\u8138\u89d2",
    "Winking face": "\u7728\u773c\u8868\u60c5",
    "Smiling face with smiling eyes": "\u9762\u5e26\u5fae\u7b11\u7684\u773c\u775b",
    "Face savoring delicious food": "\u9762\u5bf9\u54c1\u5c1d\u7f8e\u5473\u7684\u98df\u7269",
    "Relieved face": "\u9762\u5bf9\u5982\u91ca\u91cd\u8d1f",
    "Smiling face with heart-shaped eyes": "\u5fae\u7b11\u7684\u8138\uff0c\u5fc3\u810f\u5f62\u7684\u773c\u775b",
    "Smiling face with sunglasses": "\u7b11\u8138\u592a\u9633\u955c",
    "Smirking face": "\u9762\u5bf9\u9762\u5e26\u7b11\u5bb9",
    "Neutral face": "\u4e2d\u6027\u9762",
    "Expressionless face": "\u9762\u65e0\u8868\u60c5",
    "Unamused face": "\u4e00\u8138\u4e0d\u5feb\u7684\u8138",
    "Face with cold sweat": "\u9762\u5bf9\u51b7\u6c57",
    "Pensive face": "\u6c89\u601d\u7684\u8138",
    "Confused face": "\u9762\u5bf9\u56f0\u60d1",
    "Confounded face": "\u8be5\u6b7b\u7684\u8138",
    "Kissing face": "\u9762\u5bf9\u63a5\u543b",
    "Face throwing a kiss": "\u9762\u5bf9\u6295\u63b7\u4e00\u4e2a\u543b",
    "Kissing face with smiling eyes": "\u63a5\u543b\u8138\uff0c\u542b\u7b11\u7684\u773c\u775b",
    "Kissing face with closed eyes": "\u63a5\u543b\u7684\u8138\u95ed\u7740\u773c\u775b",
    "Face with stuck out tongue": "\u9762\u5bf9\u4f38\u51fa\u820c\u5934",
    "Face with stuck out tongue and winking eye": "\u9762\u5bf9\u4f38\u51fa\u820c\u5934\u548c\u7728\u52a8\u7684\u773c\u775b",
    "Face with stuck out tongue and tightly-closed eyes": "\u9762\u5bf9\u4f38\u51fa\u820c\u5934\u548c\u7d27\u95ed\u7684\u773c\u775b",
    "Disappointed face": "\u9762\u5bf9\u5931\u671b",
    "Worried face": "\u9762\u5bf9\u62c5\u5fc3",
    "Angry face": "\u6124\u6012\u7684\u8138",
    "Pouting face": "\u9762\u5bf9\u5658\u5634",
    "Crying face": "\u54ed\u6ce3\u7684\u8138",
    "Persevering face": "\u600e\u5948\u8138",
    "Face with look of triumph": "\u9762\u5e26\u770b\u7684\u80dc\u5229",
    "Disappointed but relieved face": "\u5931\u671b\uff0c\u4f46\u8138\u4e0a\u91ca\u7136",
    "Frowning face with open mouth": "\u9762\u5bf9\u76b1\u7740\u7709\u5934\u5f20\u53e3",
    "Anguished face": "\u9762\u5bf9\u75db\u82e6",
    "Fearful face": "\u53ef\u6015\u7684\u8138",
    "Weary face": "\u9762\u5bf9\u538c\u5026",
    "Sleepy face": "\u9762\u5bf9\u56f0",
    "Tired face": "\u75b2\u60eb\u7684\u8138",
    "Grimacing face": "\u72f0\u72de\u7684\u8138",
    "Loudly crying face": "\u5927\u58f0\u54ed\u8138",
    "Face with open mouth": "\u9762\u5bf9\u5f20\u5f00\u5634",
    "Hushed face": "\u5b89\u9759\u7684\u8138",
    "Face with open mouth and cold sweat": "",
    "Face screaming in fear": "\u9762\u5bf9\u5f20\u5f00\u5634\uff0c\u4e00\u8eab\u51b7\u6c57",
    "Astonished face": "\u9762\u5bf9\u60ca\u8bb6",
    "Flushed face": "\u7ea2\u6251\u6251\u7684\u8138\u86cb",
    "Sleeping face": "\u719f\u7761\u7684\u8138",
    "Dizzy face": "\u9762\u5bf9\u7729",
    "Face without mouth": "\u8138\u4e0a\u6ca1\u6709\u5634",
    "Face with medical mask": "\u9762\u5bf9\u533b\u7597\u53e3\u7f69",

    // Line breaker
    "Break": "\u7834",

    // Math
    "Subscript": "\u4e0b\u6807",
    "Superscript": "\u4e0a\u6807",

    // Full screen
    "Fullscreen": "\u5168\u5c4f",

    // Horizontal line
    "Insert Horizontal Line": "\u63d2\u5165\u6c34\u5e73\u7ebf",

    // Clear formatting
    "Clear Formatting": "\u683c\u5f0f\u5316\u5220\u9664",

    // Undo, redo
    "Undo": "\u64a4\u6d88",
    "Redo": "\u91cd\u590d",

    // Select all
    "Select All": "\u5168\u9009",

    // Code view
    "Code View": "\u4ee3\u7801\u89c6\u56fe",

    // Quote
    "Quote": "\u62a5\u4ef7",
    "Increase": "\u589e\u52a0",
    "Decrease": "\u51cf\u5c11"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */

/**
 * Traditional Chinese spoken in Taiwan.
 */


$.FroalaEditor.LANGUAGE['zh_tw'] = {
  translation: {
    // Place holder
    "Type something": "\u8f93\u5165\u4e00\u4e9b\u5185\u5bb9",

    // Basic formatting
    "Bold": "\u7c97\u9ad4",
    "Italic": "\u659c\u9ad4",
    "Underline": "\u5e95\u7dda",
    "Strikethrough": "\u522a\u9664\u7dda",

    // Main buttons
    "Insert": "\u63d2\u5165",
    "Delete": "\u522a\u9664",
    "Cancel": "\u53d6\u6d88",
    "OK": "\u78ba\u5b9a",
    "Back": "\u5f8c",
    "Remove": "\u53bb\u6389",
    "More": "\u66f4\u591a",
    "Update": "\u66f4\u65b0",
    "Style": "\u98a8\u683c",

    // Font
    "Font Family": "\u5b57\u9ad4",
    "Font Size": "\u5b57\u578b\u5927\u5c0f",

    // Colors
    "Colors": "\u984f\u8272",
    "Background": "\u80cc\u666f",
    "Text": "\u6587\u5b57",

    // Paragraphs
    "Paragraph Format": "\u683c\u5f0f",
    "Normal": "\u6b63\u5e38",
    "Code": "\u7a0b\u5f0f\u78bc",
    "Heading 1": "\u6a19\u984c 1",
    "Heading 2": "\u6a19\u984c 2",
    "Heading 3": "\u6a19\u984c 3",
    "Heading 4": "\u6a19\u984c 4",

    // Style
    "Paragraph Style": "\u6bb5\u843d\u6a23\u5f0f",
    "Inline Style": "\u5167\u806f\u6a23\u5f0f",

    // Alignment
    "Align": "\u5c0d\u9f4a",
    "Align Left": "\u7f6e\u5de6\u5c0d\u9f4a",
    "Align Center": "\u7f6e\u4e2d\u5c0d\u9f4a",
    "Align Right": "\u7f6e\u53f3\u5c0d\u9f4a",
    "Align Justify": "\u5de6\u53f3\u5c0d\u9f4a",
    "None": "\u7121",

    // Lists
    "Ordered List": "\u6578\u5b57\u6e05\u55ae",
    "Unordered List": "\u9805\u76ee\u6e05\u55ae",

    // Indent
    "Decrease Indent": "\u6e1b\u5c11\u7e2e\u6392",
    "Increase Indent": "\u589e\u52a0\u7e2e\u6392",

    // Links
    "Insert Link": "\u63d2\u5165\u9023\u7d50",
    "Open in new tab": "\u5f00\u542f\u5728\u65b0\u6807\u7b7e\u9875",
    "Open Link": "\u6253\u958b\u93c8\u63a5",
    "Edit Link": "\u7de8\u8f2f\u93c8\u63a5",
    "Unlink": "\u79fb\u9664\u9023\u7d50",
    "Choose Link": "\u9078\u64c7\u93c8\u63a5",

    // Images
    "Insert Image": "\u63d2\u5165\u5716\u7247",
    "Upload Image": "\u4e0a\u50b3\u5716\u7247",
    "By URL": "\u901a\u904e\u7db2\u5740",
    "Browse": "\u700f\u89bd",
    "Drop image": "\u56fe\u50cf\u62d6\u653e",
    "or click": "\u6216\u70b9\u51fb",
    "Manage Images": "\u7ba1\u7406\u5716\u50cf",
    "Loading": "\u8f09\u5165\u4e2d",
    "Deleting": "\u522a\u9664",
    "Tags": "\u6a19\u7c64",
    "Are you sure? Image will be deleted.": "\u4f60\u786e\u5b9a\u5417\uff1f\u56fe\u50cf\u5c06\u88ab\u5220\u9664\u3002",
    "Replace": "\u66f4\u63db",
    "Uploading": "\u4e0a\u50b3",
    "Loading image": "\u5c0e\u5165\u5716\u50cf",
    "Display": "\u986f\u793a",
    "Inline": "\u4e00\u81f4",
    "Break Text": "\u65b7\u958b\u6587\u672c",
    "Alternate Text": "\u5099\u7528\u6587\u672c",
    "Change Size": "\u5c3a\u5bf8\u8b8a\u5316",
    "Width": "\u5bec\u5ea6",
    "Height": "\u9ad8\u5ea6",
    "Something went wrong. Please try again.": "\u51fa\u4e8b\u4e86\u3002\u8acb\u91cd\u8a66\u3002",

    // Video
    "Insert Video": "\u63d2\u5165\u5f71\u97f3",
    "Embedded Code": "\u5d4c\u5165\u5f0f\u4ee3\u78bc",

    // Tables
    "Insert Table": "\u63d2\u5165\u8868\u683c",
    "Header": "\u982d",
    "Row": "\u884c",
    "Insert row above": "\u5728\u4e0a\u65b9\u63d2\u5165",
    "Insert row below": "\u5728\u4e0b\u65b9\u63d2\u5165",
    "Delete row": "\u5220\u9664\u884c",
    "Column": "\u5217",
    "Insert column before": "\u5728\u5de6\u4fa7\u63d2\u5165",
    "Insert column after": "\u5728\u53f3\u4fa7\u63d2\u5165",
    "Delete column": "\u5220\u9664\u5217",
    "Cell": "\u5355\u5143\u683c",
    "Merge cells": "\u5408\u4f75\u55ae\u5143\u683c",
    "Horizontal split": "\u6c34\u5e73\u5206\u5272",
    "Vertical split": "\u5782\u76f4\u5206\u5272",
    "Cell Background": "\u55ae\u5143\u683c\u80cc\u666f",
    "Vertical Align": "\u5782\u76f4\u5c0d\u9f4a",
    "Top": "\u9802",
    "Middle": "\u4e2d\u9593",
    "Bottom": "\u5e95\u90e8",
    "Align Top": "\u9802\u90e8\u5c0d\u9f4a",
    "Align Middle": "\u4e2d\u9593\u5c0d\u9f4a",
    "Align Bottom": "\u5e95\u90e8\u5c0d\u9f4a",
    "Cell Style": "\u55ae\u5143\u683c\u6a23\u5f0f",

    // Files
    "Upload File": "\u4e0a\u50b3\u6587\u4ef6",
    "Drop file": "\u6587\u4ef6\u62d6\u653e",

    // Emoticons
    "Emoticons": "\u8868\u60c5",
    "Grinning face": "\u81c9\u4e0a\u7b11\u563b\u563b",
    "Grinning face with smiling eyes": "\u7b11\u563b\u563b\u7684\u81c9\uff0c\u542b\u7b11\u7684\u773c\u775b",
    "Face with tears of joy": "\u81c9\u4e0a\u5e36\u8457\u559c\u6085\u7684\u6dda\u6c34",
    "Smiling face with open mouth": "\u7b11\u81c9\u5f35\u958b\u5634",
    "Smiling face with open mouth and smiling eyes": "\u7b11\u81c9\u5f35\u958b\u5634\u5fae\u7b11\u7684\u773c\u775b",
    "Smiling face with open mouth and cold sweat": "\u7b11\u81c9\u5f35\u958b\u5634\uff0c\u4e00\u8eab\u51b7\u6c57",
    "Smiling face with open mouth and tightly-closed eyes": "\u7b11\u81c9\u5f35\u958b\u5634\uff0c\u7dca\u7dca\u9589\u8457\u773c\u775b",
    "Smiling face with halo": "\u7b11\u81c9\u6688",
    "Smiling face with horns": "\u5fae\u7b11\u7684\u81c9\u89d2",
    "Winking face": "\u7728\u773c\u8868\u60c5",
    "Smiling face with smiling eyes": "\u9762\u5e36\u5fae\u7b11\u7684\u773c\u775b",
    "Face savoring delicious food": "\u9762\u5c0d\u54c1\u5690\u7f8e\u5473\u7684\u98df\u7269",
    "Relieved face": "\u9762\u5c0d\u5982\u91cb\u91cd\u8ca0",
    "Smiling face with heart-shaped eyes": "\u5fae\u7b11\u7684\u81c9\uff0c\u5fc3\u81df\u5f62\u7684\u773c\u775b",
    "Smiling face with sunglasses": "\u7b11\u81c9\u592a\u967d\u93e1",
    "Smirking face": "\u9762\u5c0d\u9762\u5e36\u7b11\u5bb9",
    "Neutral face": "\u4e2d\u6027\u9762",
    "Expressionless face": "\u9762\u7121\u8868\u60c5",
    "Unamused face": "\u4e00\u81c9\u4e0d\u5feb\u7684\u81c9",
    "Face with cold sweat": "\u9762\u5c0d\u51b7\u6c57",
    "Pensive face": "\u6c89\u601d\u7684\u81c9",
    "Confused face": "\u9762\u5c0d\u56f0\u60d1",
    "Confounded face": "\u8a72\u6b7b\u7684\u81c9",
    "Kissing face": "\u9762\u5c0d\u63a5\u543b",
    "Face throwing a kiss": "\u9762\u5c0d\u6295\u64f2\u4e00\u500b\u543b",
    "Kissing face with smiling eyes": "\u63a5\u543b\u81c9\uff0c\u542b\u7b11\u7684\u773c\u775b",
    "Kissing face with closed eyes": "\u63a5\u543b\u7684\u81c9\u9589\u8457\u773c\u775b",
    "Face with stuck out tongue": "\u9762\u5c0d\u4f38\u51fa\u820c\u982d",
    "Face with stuck out tongue and winking eye": "\u9762\u5c0d\u4f38\u51fa\u820c\u982d\u548c\u7728\u52d5\u7684\u773c\u775b",
    "Face with stuck out tongue and tightly-closed eyes": "\u9762\u5c0d\u4f38\u51fa\u820c\u982d\u548c\u7dca\u9589\u7684\u773c\u775b",
    "Disappointed face": "\u9762\u5c0d\u5931\u671b",
    "Worried face": "\u9762\u5c0d\u64d4\u5fc3",
    "Angry face": "\u61a4\u6012\u7684\u81c9",
    "Pouting face": "\u9762\u5c0d\u5658\u5634",
    "Crying face": "\u54ed\u6ce3\u7684\u81c9",
    "Persevering face": "\u600e\u5948\u81c9",
    "Face with look of triumph": "\u9762\u5e36\u770b\u7684\u52dd\u5229",
    "Disappointed but relieved face": "\u5931\u671b\uff0c\u4f46\u81c9\u4e0a\u91cb\u7136",
    "Frowning face with open mouth": "\u9762\u5c0d\u76ba\u8457\u7709\u982d\u5f35\u53e3",
    "Anguished face": "\u9762\u5c0d\u75db\u82e6",
    "Fearful face": "\u53ef\u6015\u7684\u81c9",
    "Weary face": "\u9762\u5c0d\u53ad\u5026",
    "Sleepy face": "\u9762\u5c0d\u56f0",
    "Tired face": "\u75b2\u618a\u7684\u81c9",
    "Grimacing face": "\u7319\u7370\u7684\u81c9",
    "Loudly crying face": "\u5927\u8072\u54ed\u81c9",
    "Face with open mouth": "\u9762\u5c0d\u5f35\u958b\u5634",
    "Hushed face": "\u5b89\u975c\u7684\u81c9",
    "Face with open mouth and cold sweat": "\u9762\u5c0d\u5f35\u958b\u5634\uff0c\u4e00\u8eab\u51b7\u6c57",
    "Face screaming in fear": "\u9762\u5c0d\u5c16\u53eb\u5728\u6050\u61fc\u4e2d",
    "Astonished face": "\u9762\u5c0d\u9a5a\u8a1d",
    "Flushed face": "\u7d05\u64b2\u64b2\u7684\u81c9\u86cb",
    "Sleeping face": "\u719f\u7761\u7684\u81c9",
    "Dizzy face": "\u9762\u5c0d\u7729",
    "Face without mouth": "\u81c9\u4e0a\u6c92\u6709\u5634",
    "Face with medical mask": "\u9762\u5c0d\u91ab\u7642\u53e3\u7f69",

    // Line breaker
    "Break": "\u7834",

    // Math
    "Subscript": "\u4e0b\u6a19",
    "Superscript": "\u4e0a\u6a19",

    // Full screen
    "Fullscreen": "\u5168\u5c4f",

    // Horizontal line
    "Insert Horizontal Line": "\u63d2\u5165\u6c34\u5e73\u7dda",

    // Clear formatting
    "Clear Formatting": "\u683c\u5f0f\u5316\u522a\u9664",

    // Undo, redo
    "Undo": "\u5fa9\u539f",
    "Redo": "\u53d6\u6d88\u5fa9\u539f",

    // Select all
    "Select All": "\u5168\u9078",

    // Code view
    "Code View": "\u4ee3\u78bc\u8996\u5716",

    // Quote
    "Quote": "\u5831\u50f9",
    "Increase": "\u52a0",
    "Decrease": "\u6e1b\u5c11"
  },
  direction: "ltr"
};
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.FroalaEditor.PLUGINS.align=function(b){function c(c){b.selection.save(),b.html.wrap(!0,!0,!0),b.selection.restore();for(var d=b.selection.blocks(),e=0;e<d.length;e++)a(d[e]).css("text-align",c).removeClass("fr-temp-div"),""===a(d[e]).attr("class")&&a(d[e]).removeAttr("class");b.selection.save(),b.html.unwrap(),b.selection.restore()}function d(c){var d=b.selection.blocks();if(d.length){var e=b.helpers.getAlignment(a(d[0]));c.find("> *:first").replaceWith(b.icon.create("align-"+e))}}function e(c,d){var e=b.selection.blocks();if(e.length){var f=b.helpers.getAlignment(a(e[0]));d.find('a.fr-command[data-param1="'+f+'"]').addClass("fr-active")}}return{apply:c,refresh:d,refreshOnShow:e}},a.FroalaEditor.DefineIcon("align",{NAME:"align-left"}),a.FroalaEditor.DefineIcon("align-left",{NAME:"align-left"}),a.FroalaEditor.DefineIcon("align-right",{NAME:"align-right"}),a.FroalaEditor.DefineIcon("align-center",{NAME:"align-center"}),a.FroalaEditor.DefineIcon("align-justify",{NAME:"align-justify"}),a.FroalaEditor.RegisterCommand("align",{type:"dropdown",title:"Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.align.options;for(var d in c)b+='<li><a class="fr-command fr-title" data-cmd="align" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+"</a></li>";return b+="</ul>"},callback:function(a,b){this.align.apply(b)},refresh:function(a){this.align.refresh(a)},refreshOnShow:function(a,b){this.align.refreshOnShow(a,b)}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{charCounterMax:-1,charCounterCount:!0}),a.FroalaEditor.PLUGINS.charCounter=function(b){function c(){return b.$el.text().length}function d(a){if(b.opts.charCounterMax<0)return!0;if(c()<b.opts.charCounterMax)return!0;var d=a.which;return!b.keys.ctrlKey(a)&&b.keys.isCharacter(d)?(a.preventDefault(),a.stopPropagation(),b.events.trigger("charCounter.exceeded"),!1):!0}function e(d){if(b.opts.charCounterMax<0)return d;var e=a("<div>").html(d).text().length;return e+c()<=b.opts.charCounterMax?d:(b.events.trigger("charCounter.exceeded"),"")}function f(){if(b.opts.charCounterCount){var a=c()+(b.opts.charCounterMax>0?"/"+b.opts.charCounterMax:"");h.text(a),b.opts.toolbarBottom&&h.css("margin-bottom",b.$tb.outerHeight(!0));var d=b.$wp.get(0).offsetWidth-b.$wp.get(0).clientWidth;d>0&&("rtl"==b.opts.direction?h.css("margin-left",d):h.css("margin-right",d))}}function g(){return b.$wp&&b.opts.charCounterCount?(h=a('<span class="fr-counter"></span>'),b.$box.append(h),b.events.on("keydown",d,!0),b.events.on("paste.afterCleanup",e),b.events.on("keyup",f),b.events.on("contentChanged",f),b.events.on("charCounter.update",f),f(),void b.events.on("destroy",function(){a(b.original_window).off("resize.char"+b.id),h.removeData().remove()})):!1}var h;return{_init:g}}});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.FroalaEditor.PLUGINS.codeBeautifier=function(){function a(a,c){function d(a){return a.replace(/^\s+/g,"")}function e(a){return a.replace(/\s+$/g,"")}function g(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=i,this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),extra_liners:u,in_array:function(a,b){for(var c=0;c<b.length;c++)if(a==b[c])return!0;return!1}},this.is_whitespace=function(a){for(var b=0;b<a.length;a++)if(!this.Utils.in_array(a.charAt(b),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var a="";if(a=this.input.charAt(this.pos),this.Utils.in_array(a,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(a,this.Utils.whitespace);)o&&"\n"==a&&this.newlines<=p&&(this.newlines+=1),this.pos++,a=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(a){this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,a),this.print_indentation(a)):(this.line_char_count++,a.push(" "))},this.get_content=function(){for(var a="",b=[];"<"!=this.input.charAt(this.pos);){if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];if(this.traverse_whitespace())this.space_or_wrap(b);else{if(q){var c=this.input.substr(this.pos,3);if("{{#"==c||"{{/"==c)break;if("{{!"==c)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"==this.input.substr(this.pos,2)&&"{{else}}"==this.get_tag(!0))break}a=this.input.charAt(this.pos),this.pos++,this.line_char_count++,b.push(a)}}return b.length?b.join(""):""},this.get_contents_to=function(a){if(this.pos==this.input.length)return["","TK_EOF"];var b="",c=new RegExp("</"+a+"\\s*>","igm");c.lastIndex=this.pos;var d=c.exec(this.input),e=d?d.index:this.input.length;return this.pos<e&&(b=this.input.substring(this.pos,e),this.pos=e),b},this.record_tag=function(a){this.tags[a+"count"]?(this.tags[a+"count"]++,this.tags[a+this.tags[a+"count"]]=this.indent_level):(this.tags[a+"count"]=1,this.tags[a+this.tags[a+"count"]]=this.indent_level),this.tags[a+this.tags[a+"count"]+"parent"]=this.tags.parent,this.tags.parent=a+this.tags[a+"count"]},this.retrieve_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&a+this.tags[a+"count"]!=b;)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]],this.tags.parent=this.tags[b+"parent"]),delete this.tags[a+this.tags[a+"count"]+"parent"],delete this.tags[a+this.tags[a+"count"]],1==this.tags[a+"count"]?delete this.tags[a+"count"]:this.tags[a+"count"]--}},this.indent_to_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&a+this.tags[a+"count"]!=b;)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]])}},this.get_tag=function(a){var b,c,d,e="",f=[],g="",h=!1,i=!0,j=this.pos,l=this.line_char_count;a=void 0!==a?a:!1;do{if(this.pos>=this.input.length)return a&&(this.pos=j,this.line_char_count=l),f.length?f.join(""):["","TK_EOF"];if(e=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(e,this.Utils.whitespace))h=!0;else{if(("'"==e||'"'==e)&&(e+=this.get_unformatted(e),h=!0),"="==e&&(h=!1),f.length&&"="!=f[f.length-1]&&">"!=e&&h){if(this.space_or_wrap(f),h=!1,!i&&"force"==r&&"/"!=e){this.print_newline(!0,f),this.print_indentation(f);for(var m=0;s>m;m++)f.push(k)}for(var o=0;o<f.length;o++)if(" "==f[o]){i=!1;break}}if(q&&"<"==d&&e+this.input.charAt(this.pos)=="{{"&&(e+=this.get_unformatted("}}"),f.length&&" "!=f[f.length-1]&&"<"!=f[f.length-1]&&(e=" "+e),h=!0),"<"!=e||d||(b=this.pos-1,d="<"),q&&!d&&f.length>=2&&"{"==f[f.length-1]&&"{"==f[f.length-2]&&(b="#"==e||"/"==e||"!"==e?this.pos-3:this.pos-2,d="{"),this.line_char_count++,f.push(e),f[1]&&("!"==f[1]||"?"==f[1]||"%"==f[1])){f=[this.get_comment(b)];break}if(q&&f[1]&&"{"==f[1]&&f[2]&&"!"==f[2]){f=[this.get_comment(b)];break}if(q&&"{"==d&&f.length>2&&"}"==f[f.length-2]&&"}"==f[f.length-1])break}}while(">"!=e);var p,t,u=f.join("");p=-1!=u.indexOf(" ")?u.indexOf(" "):"{"==u[0]?u.indexOf("}"):u.indexOf(">"),t="<"!=u[0]&&q?"#"==u[2]?3:2:1;var v=u.substring(t,p).toLowerCase();return"/"==u.charAt(u.length-2)||this.Utils.in_array(v,this.Utils.single_token)?a||(this.tag_type="SINGLE"):q&&"{"==u[0]&&"else"==v?a||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(v,n)?(g=this.get_unformatted("</"+v+">",u),f.push(g),c=this.pos-1,this.tag_type="SINGLE"):"script"==v&&(-1==u.search("type")||u.search("type")>-1&&u.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)>-1)?a||(this.record_tag(v),this.tag_type="SCRIPT"):"style"==v&&(-1==u.search("type")||u.search("type")>-1&&u.search("text/css")>-1)?a||(this.record_tag(v),this.tag_type="STYLE"):"!"==v.charAt(0)?a||(this.tag_type="SINGLE",this.traverse_whitespace()):a||("/"==v.charAt(0)?(this.retrieve_tag(v.substring(1)),this.tag_type="END"):(this.record_tag(v),"html"!=v.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(f),this.Utils.in_array(v,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!=this.output[this.output.length-2]&&this.print_newline(!0,this.output))),a&&(this.pos=j,this.line_char_count=l),f.join("")},this.get_comment=function(a){var b="",c=">",d=!1;this.pos=a;var e=this.input.charAt(this.pos);for(this.pos++;this.pos<=this.input.length&&(b+=e,b[b.length-1]!=c[c.length-1]||-1==b.indexOf(c));)!d&&b.length<10&&(0===b.indexOf("<![if")?(c="<![endif]>",d=!0):0===b.indexOf("<![cdata[")?(c="]]>",d=!0):0===b.indexOf("<![")?(c="]>",d=!0):0===b.indexOf("<!--")?(c="-->",d=!0):0===b.indexOf("{{!")?(c="}}",d=!0):0===b.indexOf("<?")?(c="?>",d=!0):0===b.indexOf("<%")&&(c="%>",d=!0)),e=this.input.charAt(this.pos),this.pos++;return b},this.get_unformatted=function(a,b){if(b&&-1!=b.toLowerCase().indexOf(a))return"";var c="",d="",e=0,f=!0;do{if(this.pos>=this.input.length)return d;if(c=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(c,this.Utils.whitespace)){if(!f){this.line_char_count--;continue}if("\n"==c||"\r"==c){d+="\n",this.line_char_count=0;continue}}d+=c,this.line_char_count++,f=!0,q&&"{"==c&&d.length&&"{"==d[d.length-2]&&(d+=this.get_unformatted("}}"),e=d.length)}while(-1==d.toLowerCase().indexOf(a,e));return d},this.get_token=function(){var a;if("TK_TAG_SCRIPT"==this.last_token||"TK_TAG_STYLE"==this.last_token){var b=this.last_token.substr(7);return a=this.get_contents_to(b),"string"!=typeof a?a:[a,"TK_"+b]}if("CONTENT"==this.current_mode)return a=this.get_content(),"string"!=typeof a?a:[a,"TK_CONTENT"];if("TAG"==this.current_mode){if(a=this.get_tag(),"string"!=typeof a)return a;var c="TK_TAG_"+this.tag_type;return[a,c]}},this.get_full_indent=function(a){return a=this.indent_level+a||0,1>a?"":new Array(a+1).join(this.indent_string)},this.is_unformatted=function(a,b){if(!this.Utils.in_array(a,b))return!1;if("a"!=a.toLowerCase()||!this.Utils.in_array("a",b))return!0;var c=this.get_tag(!0),d=(c||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!d||this.Utils.in_array(d,b)?!0:!1},this.printer=function(a,b,c,f,g){this.input=a||"",this.output=[],this.indent_character=b,this.indent_string="",this.indent_size=c,this.brace_style=g,this.indent_level=0,this.wrap_line_length=f,this.line_char_count=0;for(var h=0;h<this.indent_size;h++)this.indent_string+=this.indent_character;this.print_newline=function(a,b){this.line_char_count=0,b&&b.length&&(a||"\n"!=b[b.length-1])&&("\n"!=b[b.length-1]&&(b[b.length-1]=e(b[b.length-1])),b.push("\n"))},this.print_indentation=function(a){for(var b=0;b<this.indent_level;b++)a.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(a){(!this.is_whitespace(a)||this.output.length)&&((a||""!==a)&&this.output.length&&"\n"==this.output[this.output.length-1]&&(this.print_indentation(this.output),a=d(a)),this.print_token_raw(a))},this.print_token_raw=function(a){this.newlines>0&&(a=e(a)),a&&""!==a&&(a.length>1&&"\n"==a[a.length-1]?(this.output.push(a.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(a));for(var b=0;b<this.newlines;b++)this.print_newline(b>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var h,i,j,k,l,m,n,o,p,q,r,s,t,u;for(c=c||{},void 0!==c.wrap_line_length&&0!==parseInt(c.wrap_line_length,10)||void 0===c.max_char||0===parseInt(c.max_char,10)||(c.wrap_line_length=c.max_char),i=void 0===c.indent_inner_html?!1:c.indent_inner_html,j=void 0===c.indent_size?4:parseInt(c.indent_size,10),k=void 0===c.indent_char?" ":c.indent_char,m=void 0===c.brace_style?"collapse":c.brace_style,l=0===parseInt(c.wrap_line_length,10)?32786:parseInt(c.wrap_line_length||250,10),n=c.unformatted||["a","span","img","bdo","em","strong","dfn","code","samp","kbd","var","cite","abbr","acronym","q","sub","sup","tt","i","b","big","small","u","s","strike","font","ins","del","address","dt","pre"],o=void 0===c.preserve_newlines?!0:c.preserve_newlines,p=o?isNaN(parseInt(c.max_preserve_newlines,10))?32786:parseInt(c.max_preserve_newlines,10):0,q=void 0===c.indent_handlebars?!1:c.indent_handlebars,r=void 0===c.wrap_attributes?"auto":c.wrap_attributes,s=void 0===c.wrap_attributes_indent_size?j:parseInt(c.wrap_attributes_indent_size,10)||j,t=void 0===c.end_with_newline?!1:c.end_with_newline,u=Array.isArray(c.extra_liners)?c.extra_liners.concat():"string"==typeof c.extra_liners?c.extra_liners.split(","):"head,body,/html".split(","),c.indent_with_tabs&&(k="	",j=1),h=new g,h.printer(a,k,j,l,m);;){var v=h.get_token();if(h.token_text=v[0],h.token_type=v[1],"TK_EOF"==h.token_type)break;switch(h.token_type){case"TK_TAG_START":h.print_newline(!1,h.output),h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"==h.last_token&&""===h.last_text){var w=h.token_text.match(/\w+/)[0],x=null;h.output.length&&(x=h.output[h.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null==x||x[1]!=w&&!h.Utils.in_array(x[1],n))&&h.print_newline(!1,h.output)}h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var y=h.token_text.match(/^\s*<([a-z-]+)/i);y&&h.Utils.in_array(y[1],n)||h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_CONTENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==h.token_text){h.print_newline(!1,h.output);var z,A=h.token_text,B=1;"TK_SCRIPT"==h.token_type?z="function"==typeof f&&f:"TK_STYLE"==h.token_type&&(z="function"==typeof b&&b),"keep"==c.indent_scripts?B=0:"separate"==c.indent_scripts&&(B=-h.indent_level);var C=h.get_full_indent(B);if(z)A=z(A.replace(/^\s*/,C),c);else{var D=A.match(/^\s*/)[0],E=D.match(/[^\n\r]*$/)[0].split(h.indent_string).length-1,F=h.get_full_indent(B-E);A=A.replace(/^\s*/,C).replace(/\r\n|\r|\n/g,"\n"+F).replace(/\s+$/,"")}A&&(h.print_token_raw(A),h.print_newline(!0,h.output))}h.current_mode="TAG";break;default:""!==h.token_text&&h.print_token(h.token_text)}h.last_token=h.token_type,h.last_text=h.token_text}var G=h.output.join("").replace(/[\r\n\t ]+$/,"");return t&&(G+="\n"),G}function b(a,c){function d(){return u=a.charAt(++w),u||""}function e(b){var c="",e=w;return b&&h(),c=a.charAt(w+1)||"",w=e-1,d(),c}function f(b){for(var c=w;d();)if("\\"===u)d();else{if(-1!==b.indexOf(u))break;if("\n"===u)break}return a.substring(c,w+1)}function g(a){var b=w,c=f(a);return w=b-1,d(),c}function h(){for(var a="";v.test(e());)d(),a+=u;return a}function i(){var a="";for(u&&v.test(u)&&(a=u);v.test(d());)a+=u;return a}function j(b){var c=w;for(b="/"===e(),d();d();){if(!b&&"*"===u&&"/"===e()){d();break}if(b&&"\n"===u)return a.substring(c,w)}return a.substring(c,w)+u}function k(b){return a.substring(w-b.length,w).toLowerCase()===b}function l(){for(var b=0,c=w+1;c<a.length;c++){var d=a.charAt(c);if("{"===d)return!0;if("("===d)b+=1;else if(")"===d){if(0==b)return!1;b-=1}else if(";"===d||"}"===d)return!1}return!1}function m(){A++,y+=z}function n(){A--,y=y.slice(0,-o)}c=c||{},a=a||"",a=a.replace(/\r\n|[\r\u2028\u2029]/g,"\n");var o=c.indent_size||4,p=c.indent_char||" ",q=void 0===c.selector_separator_newline?!0:c.selector_separator_newline,r=void 0===c.end_with_newline?!1:c.end_with_newline,s=void 0===c.newline_between_rules?!0:c.newline_between_rules,t=c.eol?c.eol:"\n";"string"==typeof o&&(o=parseInt(o,10)),c.indent_with_tabs&&(p="	",o=1),t=t.replace(/\\r/,"\r").replace(/\\n/,"\n");var u,v=/^\s+$/,w=-1,x=0,y=a.match(/^[\t ]*/)[0],z=new Array(o+1).join(p),A=0,B=0,C={};C["{"]=function(a){C.singleSpace(),D.push(a),C.newLine()},C["}"]=function(a){C.newLine(),D.push(a),C.newLine()},C._lastCharWhitespace=function(){return v.test(D[D.length-1])},C.newLine=function(a){D.length&&(a||"\n"===D[D.length-1]||C.trim(),D.push("\n"),y&&D.push(y))},C.singleSpace=function(){D.length&&!C._lastCharWhitespace()&&D.push(" ")},C.preserveSingleSpace=function(){K&&C.singleSpace()},C.trim=function(){for(;C._lastCharWhitespace();)D.pop()};for(var D=[],E=!1,F=!1,G=!1,H="",I="";;){var J=i(),K=""!==J,L=-1!==J.indexOf("\n");if(I=H,H=u,!u)break;if("/"===u&&"*"===e()){var M=0===A;(L||M)&&C.newLine(),D.push(j()),C.newLine(),M&&C.newLine(!0)}else if("/"===u&&"/"===e())L||"{"===I||C.trim(),C.singleSpace(),D.push(j()),C.newLine();else if("@"===u){C.preserveSingleSpace(),D.push(u);var N=g(": ,;{}()[]/='\"");N.match(/[ :]$/)&&(d(),N=f(": ").replace(/\s$/,""),D.push(N),C.singleSpace()),N=N.replace(/\s$/,""),N in b.NESTED_AT_RULE&&(B+=1,N in b.CONDITIONAL_GROUP_RULE&&(G=!0))}else"#"===u&&"{"===e()?(C.preserveSingleSpace(),D.push(f("}"))):"{"===u?"}"===e(!0)?(h(),d(),C.singleSpace(),D.push("{}"),C.newLine(),s&&0===A&&C.newLine(!0)):(m(),C["{"](u),G?(G=!1,E=A>B):E=A>=B):"}"===u?(n(),C["}"](u),E=!1,F=!1,B&&B--,s&&0===A&&C.newLine(!0)):":"===u?(h(),!E&&!G||k("&")||l()?":"===e()?(d(),D.push("::")):D.push(":"):(F=!0,D.push(":"),C.singleSpace())):'"'===u||"'"===u?(C.preserveSingleSpace(),D.push(f(u))):";"===u?(F=!1,D.push(u),C.newLine()):"("===u?k("url")?(D.push(u),h(),d()&&(")"!==u&&'"'!==u&&"'"!==u?D.push(f(")")):w--)):(x++,C.preserveSingleSpace(),D.push(u),h()):")"===u?(D.push(u),x--):","===u?(D.push(u),h(),q&&!F&&1>x?C.newLine():C.singleSpace()):"]"===u?D.push(u):"["===u?(C.preserveSingleSpace(),D.push(u)):"="===u?(h(),u="=",D.push(u)):(C.preserveSingleSpace(),D.push(u))}var O="";return y&&(O+=y),O+=D.join("").replace(/[\r\n\t ]+$/,""),r&&(O+="\n"),"\n"!=t&&(O=O.replace(/[\n]/g,t)),O}function c(a,b){for(var c=0;c<b.length;c+=1)if(b[c]===a)return!0;return!1}function d(a){return a.replace(/^\s+|\s+$/g,"")}function e(a){return a.replace(/^\s+/g,"")}function f(a,b){var c=new g(a,b);return c.beautify()}function g(a,b){function f(a,b){var c=0;a&&(c=a.indentation_level,!Q.just_added_newline()&&a.line_indent_level>c&&(c=a.line_indent_level));var d={mode:b,parent:a,last_text:a?a.last_text:"",last_word:a?a.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:c,line_indent_level:a?a.line_indent_level:c,start_line_index:Q.get_line_number(),ternary_depth:0};return d}function g(a){var b=a.newlines,c=aa.keep_array_indentation&&s(X.mode);if(c)for(d=0;b>d;d+=1)m(d>0);else if(aa.max_preserve_newlines&&b>aa.max_preserve_newlines&&(b=aa.max_preserve_newlines),aa.preserve_newlines&&a.newlines>1){m();for(var d=1;b>d;d+=1)m(!0)}T=a,_[T.type]()}function h(a){a=a.replace(/\x0d/g,"");for(var b=[],c=a.indexOf("\n");-1!==c;)b.push(a.substring(0,c)),a=a.substring(c+1),c=a.indexOf("\n");return a.length&&b.push(a),b}function l(a){if(a=void 0===a?!1:a,!Q.just_added_newline())if(aa.preserve_newlines&&T.wanted_newline||a)m(!1,!0);else if(aa.wrap_line_length){var b=Q.current_line.get_character_count()+T.text.length+(Q.space_before_token?1:0);b>=aa.wrap_line_length&&m(!1,!0)}}function m(a,b){if(!b&&";"!==X.last_text&&","!==X.last_text&&"="!==X.last_text&&"TK_OPERATOR"!==U)for(;X.mode===k.Statement&&!X.if_block&&!X.do_block;)u();Q.add_new_line(a)&&(X.multiline_frame=!0)}function n(){Q.just_added_newline()&&(aa.keep_array_indentation&&s(X.mode)&&T.wanted_newline?(Q.current_line.push(T.whitespace_before),Q.space_before_token=!1):Q.set_indent(X.indentation_level)&&(X.line_indent_level=X.indentation_level))}function o(a){return Q.raw?void Q.add_raw_token(T):(aa.comma_first&&"TK_COMMA"===U&&Q.just_added_newline()&&","===Q.previous_line.last()&&(Q.previous_line.pop(),n(),Q.add_token(","),Q.space_before_token=!0),a=a||T.text,n(),void Q.add_token(a))}function p(){X.indentation_level+=1}function q(){X.indentation_level>0&&(!X.parent||X.indentation_level>X.parent.indentation_level)&&(X.indentation_level-=1)}function r(a){X?(Z.push(X),Y=X):Y=f(null,a),X=f(Y,a)}function s(a){return a===k.ArrayLiteral}function t(a){return c(a,[k.Expression,k.ForInitializer,k.Conditional])}function u(){Z.length>0&&(Y=X,X=Z.pop(),Y.mode===k.Statement&&Q.remove_redundant_indentation(Y))}function v(){return X.parent.mode===k.ObjectLiteral&&X.mode===k.Statement&&(":"===X.last_text&&0===X.ternary_depth||"TK_RESERVED"===U&&c(X.last_text,["get","set"]))}function w(){return"TK_RESERVED"===U&&c(X.last_text,["var","let","const"])&&"TK_WORD"===T.type||"TK_RESERVED"===U&&"do"===X.last_text||"TK_RESERVED"===U&&"return"===X.last_text&&!T.wanted_newline||"TK_RESERVED"===U&&"else"===X.last_text&&("TK_RESERVED"!==T.type||"if"!==T.text)||"TK_END_EXPR"===U&&(Y.mode===k.ForInitializer||Y.mode===k.Conditional)||"TK_WORD"===U&&X.mode===k.BlockStatement&&!X.in_case&&"--"!==T.text&&"++"!==T.text&&"function"!==V&&"TK_WORD"!==T.type&&"TK_RESERVED"!==T.type||X.mode===k.ObjectLiteral&&(":"===X.last_text&&0===X.ternary_depth||"TK_RESERVED"===U&&c(X.last_text,["get","set"]))?(r(k.Statement),p(),"TK_RESERVED"===U&&c(X.last_text,["var","let","const"])&&"TK_WORD"===T.type&&(X.declaration_statement=!0),v()||l("TK_RESERVED"===T.type&&c(T.text,["do","for","if","while"])),!0):!1}function x(a,b){for(var c=0;c<a.length;c++){var e=d(a[c]);if(e.charAt(0)!==b)return!1}return!0}function y(a,b){for(var c,d=0,e=a.length;e>d;d++)if(c=a[d],c&&0!==c.indexOf(b))return!1;return!0}function z(a){return c(a,["case","return","do","if","throw","else"])}function A(a){var b=R+(a||0);return 0>b||b>=ba.length?null:ba[b]}function B(){w();var a=k.Expression;if("["===T.text){if("TK_WORD"===U||")"===X.last_text)return"TK_RESERVED"===U&&c(X.last_text,S.line_starters)&&(Q.space_before_token=!0),r(a),o(),p(),void(aa.space_in_paren&&(Q.space_before_token=!0));a=k.ArrayLiteral,s(X.mode)&&("["===X.last_text||","===X.last_text&&("]"===V||"}"===V))&&(aa.keep_array_indentation||m())}else"TK_RESERVED"===U&&"for"===X.last_text?a=k.ForInitializer:"TK_RESERVED"===U&&c(X.last_text,["if","while"])&&(a=k.Conditional);";"===X.last_text||"TK_START_BLOCK"===U?m():"TK_END_EXPR"===U||"TK_START_EXPR"===U||"TK_END_BLOCK"===U||"."===X.last_text?l(T.wanted_newline):"TK_RESERVED"===U&&"("===T.text||"TK_WORD"===U||"TK_OPERATOR"===U?"TK_RESERVED"===U&&("function"===X.last_word||"typeof"===X.last_word)||"*"===X.last_text&&"function"===V?aa.space_after_anon_function&&(Q.space_before_token=!0):"TK_RESERVED"!==U||!c(X.last_text,S.line_starters)&&"catch"!==X.last_text||aa.space_before_conditional&&(Q.space_before_token=!0):Q.space_before_token=!0,"("===T.text&&"TK_RESERVED"===U&&"await"===X.last_word&&(Q.space_before_token=!0),"("===T.text&&("TK_EQUALS"===U||"TK_OPERATOR"===U)&&(v()||l()),r(a),o(),aa.space_in_paren&&(Q.space_before_token=!0),p()}function C(){for(;X.mode===k.Statement;)u();X.multiline_frame&&l("]"===T.text&&s(X.mode)&&!aa.keep_array_indentation),aa.space_in_paren&&("TK_START_EXPR"!==U||aa.space_in_empty_paren?Q.space_before_token=!0:(Q.trim(),Q.space_before_token=!1)),"]"===T.text&&aa.keep_array_indentation?(o(),u()):(u(),o()),Q.remove_redundant_indentation(Y),X.do_while&&Y.mode===k.Conditional&&(Y.mode=k.Expression,X.do_block=!1,X.do_while=!1)}function D(){var a=A(1),b=A(2);r(b&&(":"===b.text&&c(a.type,["TK_STRING","TK_WORD","TK_RESERVED"])||c(a.text,["get","set"])&&c(b.type,["TK_WORD","TK_RESERVED"]))?c(V,["class","interface"])?k.BlockStatement:k.ObjectLiteral:k.BlockStatement);var d=!a.comments_before.length&&"}"===a.text,e=d&&"function"===X.last_word&&"TK_END_EXPR"===U;"expand"===aa.brace_style||"none"===aa.brace_style&&T.wanted_newline?"TK_OPERATOR"!==U&&(e||"TK_EQUALS"===U||"TK_RESERVED"===U&&z(X.last_text)&&"else"!==X.last_text)?Q.space_before_token=!0:m(!1,!0):"TK_OPERATOR"!==U&&"TK_START_EXPR"!==U?"TK_START_BLOCK"===U?m():Q.space_before_token=!0:s(Y.mode)&&","===X.last_text&&("}"===V?Q.space_before_token=!0:m()),o(),p()}function E(){for(;X.mode===k.Statement;)u();var a="TK_START_BLOCK"===U;"expand"===aa.brace_style?a||m():a||(s(X.mode)&&aa.keep_array_indentation?(aa.keep_array_indentation=!1,m(),aa.keep_array_indentation=!0):m()),u(),o()}function F(){if("TK_RESERVED"===T.type&&X.mode!==k.ObjectLiteral&&c(T.text,["set","get"])&&(T.type="TK_WORD"),"TK_RESERVED"===T.type&&X.mode===k.ObjectLiteral){var a=A(1);":"==a.text&&(T.type="TK_WORD")}if(w()||!T.wanted_newline||t(X.mode)||"TK_OPERATOR"===U&&"--"!==X.last_text&&"++"!==X.last_text||"TK_EQUALS"===U||!aa.preserve_newlines&&"TK_RESERVED"===U&&c(X.last_text,["var","let","const","set","get"])||m(),X.do_block&&!X.do_while){if("TK_RESERVED"===T.type&&"while"===T.text)return Q.space_before_token=!0,o(),Q.space_before_token=!0,void(X.do_while=!0);m(),X.do_block=!1}if(X.if_block)if(X.else_block||"TK_RESERVED"!==T.type||"else"!==T.text){for(;X.mode===k.Statement;)u();X.if_block=!1,X.else_block=!1}else X.else_block=!0;if("TK_RESERVED"===T.type&&("case"===T.text||"default"===T.text&&X.in_case_statement))return m(),(X.case_body||aa.jslint_happy)&&(q(),X.case_body=!1),o(),X.in_case=!0,void(X.in_case_statement=!0);if("TK_RESERVED"===T.type&&"function"===T.text&&((c(X.last_text,["}",";"])||Q.just_added_newline()&&!c(X.last_text,["[","{",":","=",","]))&&(Q.just_added_blankline()||T.comments_before.length||(m(),m(!0))),"TK_RESERVED"===U||"TK_WORD"===U?"TK_RESERVED"===U&&c(X.last_text,["get","set","new","return","export","async"])?Q.space_before_token=!0:"TK_RESERVED"===U&&"default"===X.last_text&&"export"===V?Q.space_before_token=!0:m():"TK_OPERATOR"===U||"="===X.last_text?Q.space_before_token=!0:(X.multiline_frame||!t(X.mode)&&!s(X.mode))&&m()),("TK_COMMA"===U||"TK_START_EXPR"===U||"TK_EQUALS"===U||"TK_OPERATOR"===U)&&(v()||l()),"TK_RESERVED"===T.type&&c(T.text,["function","get","set"]))return o(),void(X.last_word=T.text);if($="NONE","TK_END_BLOCK"===U?"TK_RESERVED"===T.type&&c(T.text,["else","catch","finally"])?"expand"===aa.brace_style||"end-expand"===aa.brace_style||"none"===aa.brace_style&&T.wanted_newline?$="NEWLINE":($="SPACE",Q.space_before_token=!0):$="NEWLINE":"TK_SEMICOLON"===U&&X.mode===k.BlockStatement?$="NEWLINE":"TK_SEMICOLON"===U&&t(X.mode)?$="SPACE":"TK_STRING"===U?$="NEWLINE":"TK_RESERVED"===U||"TK_WORD"===U||"*"===X.last_text&&"function"===V?$="SPACE":"TK_START_BLOCK"===U?$="NEWLINE":"TK_END_EXPR"===U&&(Q.space_before_token=!0,$="NEWLINE"),"TK_RESERVED"===T.type&&c(T.text,S.line_starters)&&")"!==X.last_text&&($="else"===X.last_text||"export"===X.last_text?"SPACE":"NEWLINE"),"TK_RESERVED"===T.type&&c(T.text,["else","catch","finally"]))if("TK_END_BLOCK"!==U||"expand"===aa.brace_style||"end-expand"===aa.brace_style||"none"===aa.brace_style&&T.wanted_newline)m();else{Q.trim(!0);var b=Q.current_line;"}"!==b.last()&&m(),Q.space_before_token=!0}else"NEWLINE"===$?"TK_RESERVED"===U&&z(X.last_text)?Q.space_before_token=!0:"TK_END_EXPR"!==U?"TK_START_EXPR"===U&&"TK_RESERVED"===T.type&&c(T.text,["var","let","const"])||":"===X.last_text||("TK_RESERVED"===T.type&&"if"===T.text&&"else"===X.last_text?Q.space_before_token=!0:m()):"TK_RESERVED"===T.type&&c(T.text,S.line_starters)&&")"!==X.last_text&&m():X.multiline_frame&&s(X.mode)&&","===X.last_text&&"}"===V?m():"SPACE"===$&&(Q.space_before_token=!0);o(),X.last_word=T.text,"TK_RESERVED"===T.type&&"do"===T.text&&(X.do_block=!0),"TK_RESERVED"===T.type&&"if"===T.text&&(X.if_block=!0)}function G(){for(w()&&(Q.space_before_token=!1);X.mode===k.Statement&&!X.if_block&&!X.do_block;)u();o()}function H(){w()?Q.space_before_token=!0:"TK_RESERVED"===U||"TK_WORD"===U?Q.space_before_token=!0:"TK_COMMA"===U||"TK_START_EXPR"===U||"TK_EQUALS"===U||"TK_OPERATOR"===U?v()||l():m(),o()}function I(){w(),X.declaration_statement&&(X.declaration_assignment=!0),Q.space_before_token=!0,o(),Q.space_before_token=!0}function J(){return X.declaration_statement?(t(X.parent.mode)&&(X.declaration_assignment=!1),o(),void(X.declaration_assignment?(X.declaration_assignment=!1,m(!1,!0)):(Q.space_before_token=!0,aa.comma_first&&l()))):(o(),void(X.mode===k.ObjectLiteral||X.mode===k.Statement&&X.parent.mode===k.ObjectLiteral?(X.mode===k.Statement&&u(),m()):(Q.space_before_token=!0,aa.comma_first&&l())))}function K(){if(w(),"TK_RESERVED"===U&&z(X.last_text))return Q.space_before_token=!0,void o();if("*"===T.text&&"TK_DOT"===U)return void o();if(":"===T.text&&X.in_case)return X.case_body=!0,p(),o(),m(),void(X.in_case=!1);if("::"===T.text)return void o();"TK_OPERATOR"===U&&l();var a=!0,b=!0;c(T.text,["--","++","!","~"])||c(T.text,["-","+"])&&(c(U,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||c(X.last_text,S.line_starters)||","===X.last_text)?(a=!1,b=!1,!T.wanted_newline||"--"!==T.text&&"++"!==T.text||m(!1,!0),";"===X.last_text&&t(X.mode)&&(a=!0),"TK_RESERVED"===U?a=!0:"TK_END_EXPR"===U?a=!("]"===X.last_text&&("--"===T.text||"++"===T.text)):"TK_OPERATOR"===U&&(a=c(T.text,["--","-","++","+"])&&c(X.last_text,["--","-","++","+"]),c(T.text,["+","-"])&&c(X.last_text,["--","++"])&&(b=!0)),X.mode!==k.BlockStatement&&X.mode!==k.Statement||"{"!==X.last_text&&";"!==X.last_text||m()):":"===T.text?0===X.ternary_depth?a=!1:X.ternary_depth-=1:"?"===T.text?X.ternary_depth+=1:"*"===T.text&&"TK_RESERVED"===U&&"function"===X.last_text&&(a=!1,b=!1),Q.space_before_token=Q.space_before_token||a,o(),Q.space_before_token=b}function L(){if(Q.raw)return Q.add_raw_token(T),void(T.directives&&"end"===T.directives.preserve&&(aa.test_output_raw||(Q.raw=!1)));if(T.directives)return m(!1,!0),o(),"start"===T.directives.preserve&&(Q.raw=!0),void m(!1,!0);if(!acorn.newline.test(T.text)&&!T.wanted_newline)return Q.space_before_token=!0,o(),void(Q.space_before_token=!0);var a,b=h(T.text),c=!1,d=!1,f=T.whitespace_before,g=f.length;for(m(!1,!0),b.length>1&&(x(b.slice(1),"*")?c=!0:y(b.slice(1),f)&&(d=!0)),o(b[0]),a=1;a<b.length;a++)m(!1,!0),c?o(" "+e(b[a])):d&&b[a].length>g?o(b[a].substring(g)):Q.add_token(b[a]);m(!1,!0)}function M(){T.wanted_newline?m(!1,!0):Q.trim(!0),Q.space_before_token=!0,o(),m(!1,!0)}function N(){w(),"TK_RESERVED"===U&&z(X.last_text)?Q.space_before_token=!0:l(")"===X.last_text&&aa.break_chained_methods),o()}function O(){o(),"\n"===T.text[T.text.length-1]&&m()}function P(){for(;X.mode===k.Statement;)u()}var Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba=[],ca="";for(_={TK_START_EXPR:B,TK_END_EXPR:C,TK_START_BLOCK:D,TK_END_BLOCK:E,TK_WORD:F,TK_RESERVED:F,TK_SEMICOLON:G,TK_STRING:H,TK_EQUALS:I,TK_OPERATOR:K,TK_COMMA:J,TK_BLOCK_COMMENT:L,TK_COMMENT:M,TK_DOT:N,TK_UNKNOWN:O,TK_EOF:P},b=b?b:{},aa={},void 0!==b.braces_on_own_line&&(aa.brace_style=b.braces_on_own_line?"expand":"collapse"),aa.brace_style=b.brace_style?b.brace_style:aa.brace_style?aa.brace_style:"collapse","expand-strict"===aa.brace_style&&(aa.brace_style="expand"),aa.indent_size=b.indent_size?parseInt(b.indent_size,10):4,aa.indent_char=b.indent_char?b.indent_char:" ",aa.eol=b.eol?b.eol:"\n",aa.preserve_newlines=void 0===b.preserve_newlines?!0:b.preserve_newlines,aa.break_chained_methods=void 0===b.break_chained_methods?!1:b.break_chained_methods,aa.max_preserve_newlines=void 0===b.max_preserve_newlines?0:parseInt(b.max_preserve_newlines,10),aa.space_in_paren=void 0===b.space_in_paren?!1:b.space_in_paren,aa.space_in_empty_paren=void 0===b.space_in_empty_paren?!1:b.space_in_empty_paren,aa.jslint_happy=void 0===b.jslint_happy?!1:b.jslint_happy,aa.space_after_anon_function=void 0===b.space_after_anon_function?!1:b.space_after_anon_function,aa.keep_array_indentation=void 0===b.keep_array_indentation?!1:b.keep_array_indentation,aa.space_before_conditional=void 0===b.space_before_conditional?!0:b.space_before_conditional,aa.unescape_strings=void 0===b.unescape_strings?!1:b.unescape_strings,aa.wrap_line_length=void 0===b.wrap_line_length?0:parseInt(b.wrap_line_length,10),aa.e4x=void 0===b.e4x?!1:b.e4x,aa.end_with_newline=void 0===b.end_with_newline?!1:b.end_with_newline,aa.comma_first=void 0===b.comma_first?!1:b.comma_first,aa.test_output_raw=void 0===b.test_output_raw?!1:b.test_output_raw,aa.jslint_happy&&(aa.space_after_anon_function=!0),b.indent_with_tabs&&(aa.indent_char="	",aa.indent_size=1),aa.eol=aa.eol.replace(/\\r/,"\r").replace(/\\n/,"\n"),W="";aa.indent_size>0;)W+=aa.indent_char,aa.indent_size-=1;var da=0;if(a&&a.length){for(;" "===a.charAt(da)||"	"===a.charAt(da);)ca+=a.charAt(da),da+=1;a=a.substring(da)}U="TK_START_BLOCK",V="",Q=new i(W,ca),Q.raw=aa.test_output_raw,Z=[],r(k.BlockStatement),this.beautify=function(){var b,c;for(S=new j(a,aa,W),ba=S.tokenize(),R=0;b=A();){for(var d=0;d<b.comments_before.length;d++)g(b.comments_before[d]);g(b),V=X.last_text,U=b.type,X.last_text=b.text,R+=1}return c=Q.get_code(),aa.end_with_newline&&(c+="\n"),"\n"!=aa.eol&&(c=c.replace(/[\n]/g,aa.eol)),c}}function h(a){var b=0,c=-1,d=[],e=!0;this.set_indent=function(d){b=a.baseIndentLength+d*a.indent_length,c=d},this.get_character_count=function(){return b},this.is_empty=function(){return e},this.last=function(){return this._empty?null:d[d.length-1]},this.push=function(a){d.push(a),b+=a.length,e=!1},this.pop=function(){var a=null;return e||(a=d.pop(),b-=a.length,e=0===d.length),a},this.remove_indent=function(){c>0&&(c-=1,b-=a.indent_length)},this.trim=function(){for(;" "===this.last();){d.pop();b-=1}e=0===d.length},this.toString=function(){var b="";return this._empty||(c>=0&&(b=a.indent_cache[c]),b+=d.join("")),b}}function i(a,b){b=b||"",this.indent_cache=[b],this.baseIndentLength=b.length,this.indent_length=a.length,this.raw=!1;var c=[];this.baseIndentString=b,this.indent_string=a,this.previous_line=null,this.current_line=null,this.space_before_token=!1,this.add_outputline=function(){this.previous_line=this.current_line,this.current_line=new h(this),c.push(this.current_line)},this.add_outputline(),this.get_line_number=function(){return c.length},this.add_new_line=function(a){return 1===this.get_line_number()&&this.just_added_newline()?!1:a||!this.just_added_newline()?(this.raw||this.add_outputline(),!0):!1},this.get_code=function(){var a=c.join("\n").replace(/[\r\n\t ]+$/,"");return a},this.set_indent=function(a){if(c.length>1){for(;a>=this.indent_cache.length;)this.indent_cache.push(this.indent_cache[this.indent_cache.length-1]+this.indent_string);return this.current_line.set_indent(a),!0}return this.current_line.set_indent(0),!1},this.add_raw_token=function(a){for(var b=0;b<a.newlines;b++)this.add_outputline();this.current_line.push(a.whitespace_before),this.current_line.push(a.text),this.space_before_token=!1},this.add_token=function(a){this.add_space_before_token(),this.current_line.push(a);
},this.add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&this.current_line.push(" "),this.space_before_token=!1},this.remove_redundant_indentation=function(a){if(!a.multiline_frame&&a.mode!==k.ForInitializer&&a.mode!==k.Conditional)for(var b=a.start_line_index,d=c.length;d>b;)c[b].remove_indent(),b++},this.trim=function(d){for(d=void 0===d?!1:d,this.current_line.trim(a,b);d&&c.length>1&&this.current_line.is_empty();)c.pop(),this.current_line=c[c.length-1],this.current_line.trim();this.previous_line=c.length>1?c[c.length-2]:null},this.just_added_newline=function(){return this.current_line.is_empty()},this.just_added_blankline=function(){if(this.just_added_newline()){if(1===c.length)return!0;var a=c[c.length-2];return a.is_empty()}return!1}}function j(a,b,e){function f(a){if(!a.match(x))return null;var b={};y.lastIndex=0;for(var c=y.exec(a);c;)b[c[1]]=c[2],c=y.exec(a);return b}function g(){var e,g=[];if(o=0,p="",s>=t)return["","TK_EOF"];var x;x=r.length?r[r.length-1]:new l("TK_START_BLOCK","{");var y=a.charAt(s);for(s+=1;c(y,i);){if(acorn.newline.test(y)?("\n"!==y||"\r"!==a.charAt(s-2))&&(o+=1,g=[]):g.push(y),s>=t)return["","TK_EOF"];y=a.charAt(s),s+=1}if(g.length&&(p=g.join("")),j.test(y)){var B=!0,C=!0,D=j;for("0"===y&&t>s&&/[Xxo]/.test(a.charAt(s))?(B=!1,C=!1,y+=a.charAt(s),s+=1,D=/[o]/.test(a.charAt(s))?k:m):(y="",s-=1);t>s&&D.test(a.charAt(s));)y+=a.charAt(s),s+=1,B&&t>s&&"."===a.charAt(s)&&(y+=a.charAt(s),s+=1,B=!1),C&&t>s&&/[Ee]/.test(a.charAt(s))&&(y+=a.charAt(s),s+=1,t>s&&/[+-]/.test(a.charAt(s))&&(y+=a.charAt(s),s+=1),C=!1,B=!1);return[y,"TK_WORD"]}if(acorn.isIdentifierStart(a.charCodeAt(s-1))){if(t>s)for(;acorn.isIdentifierChar(a.charCodeAt(s))&&(y+=a.charAt(s),s+=1,s!==t););return"TK_DOT"===x.type||"TK_RESERVED"===x.type&&c(x.text,["set","get"])||!c(y,u)?[y,"TK_WORD"]:"in"===y?[y,"TK_OPERATOR"]:[y,"TK_RESERVED"]}if("("===y||"["===y)return[y,"TK_START_EXPR"];if(")"===y||"]"===y)return[y,"TK_END_EXPR"];if("{"===y)return[y,"TK_START_BLOCK"];if("}"===y)return[y,"TK_END_BLOCK"];if(";"===y)return[y,"TK_SEMICOLON"];if("/"===y){var E="";if("*"===a.charAt(s)){s+=1,v.lastIndex=s;var F=v.exec(a);E="/*"+F[0],s+=F[0].length;var G=f(E);return G&&"start"===G.ignore&&(z.lastIndex=s,F=z.exec(a),E+=F[0],s+=F[0].length),E=E.replace(acorn.lineBreak,"\n"),[E,"TK_BLOCK_COMMENT",G]}if("/"===a.charAt(s)){s+=1,w.lastIndex=s;var F=w.exec(a);return E="//"+F[0],s+=F[0].length,[E,"TK_COMMENT"]}}if("`"===y||"'"===y||'"'===y||("/"===y||b.e4x&&"<"===y&&a.slice(s-1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/))&&("TK_RESERVED"===x.type&&c(x.text,["return","case","throw","else","do","typeof","yield"])||"TK_END_EXPR"===x.type&&")"===x.text&&x.parent&&"TK_RESERVED"===x.parent.type&&c(x.parent.text,["if","while","for"])||c(x.type,["TK_COMMENT","TK_START_EXPR","TK_START_BLOCK","TK_END_BLOCK","TK_OPERATOR","TK_EQUALS","TK_EOF","TK_SEMICOLON","TK_COMMA"]))){var H=y,I=!1,J=!1;if(e=y,"/"===H)for(var K=!1;t>s&&(I||K||a.charAt(s)!==H)&&!acorn.newline.test(a.charAt(s));)e+=a.charAt(s),I?I=!1:(I="\\"===a.charAt(s),"["===a.charAt(s)?K=!0:"]"===a.charAt(s)&&(K=!1)),s+=1;else if(b.e4x&&"<"===H){var L=/<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,M=a.slice(s-1),N=L.exec(M);if(N&&0===N.index){for(var O=N[2],P=0;N;){var Q=!!N[1],R=N[2],S=!!N[N.length-1]||"![CDATA["===R.slice(0,8);if(R!==O||S||(Q?--P:++P),0>=P)break;N=L.exec(M)}var T=N?N.index+N[0].length:M.length;return M=M.slice(0,T),s+=T-1,M=M.replace(acorn.lineBreak,"\n"),[M,"TK_STRING"]}}else for(;t>s&&(I||a.charAt(s)!==H&&("`"===H||!acorn.newline.test(a.charAt(s))));)(I||"`"===H)&&acorn.newline.test(a.charAt(s))?("\r"===a.charAt(s)&&"\n"===a.charAt(s+1)&&(s+=1),e+="\n"):e+=a.charAt(s),I?(("x"===a.charAt(s)||"u"===a.charAt(s))&&(J=!0),I=!1):I="\\"===a.charAt(s),s+=1;if(J&&b.unescape_strings&&(e=h(e)),t>s&&a.charAt(s)===H&&(e+=H,s+=1,"/"===H))for(;t>s&&acorn.isIdentifierStart(a.charCodeAt(s));)e+=a.charAt(s),s+=1;return[e,"TK_STRING"]}if("#"===y){if(0===r.length&&"!"===a.charAt(s)){for(e=y;t>s&&"\n"!==y;)y=a.charAt(s),e+=y,s+=1;return[d(e)+"\n","TK_UNKNOWN"]}var U="#";if(t>s&&j.test(a.charAt(s))){do y=a.charAt(s),U+=y,s+=1;while(t>s&&"#"!==y&&"="!==y);return"#"===y||("["===a.charAt(s)&&"]"===a.charAt(s+1)?(U+="[]",s+=2):"{"===a.charAt(s)&&"}"===a.charAt(s+1)&&(U+="{}",s+=2)),[U,"TK_WORD"]}}if("<"===y&&("?"===a.charAt(s)||"%"===a.charAt(s))){A.lastIndex=s-1;var V=A.exec(a);if(V)return y=V[0],s+=y.length-1,y=y.replace(acorn.lineBreak,"\n"),[y,"TK_STRING"]}if("<"===y&&"<!--"===a.substring(s-1,s+3)){for(s+=3,y="<!--";!acorn.newline.test(a.charAt(s))&&t>s;)y+=a.charAt(s),s++;return q=!0,[y,"TK_COMMENT"]}if("-"===y&&q&&"-->"===a.substring(s-1,s+2))return q=!1,s+=2,["-->","TK_COMMENT"];if("."===y)return[y,"TK_DOT"];if(c(y,n)){for(;t>s&&c(y+a.charAt(s),n)&&(y+=a.charAt(s),s+=1,!(s>=t)););return","===y?[y,"TK_COMMA"]:"="===y?[y,"TK_EQUALS"]:[y,"TK_OPERATOR"]}return[y,"TK_UNKNOWN"]}function h(a){for(var b,c=!1,d="",e=0,f="",g=0;c||e<a.length;)if(b=a.charAt(e),e++,c){if(c=!1,"x"===b)f=a.substr(e,2),e+=2;else{if("u"!==b){d+="\\"+b;continue}f=a.substr(e,4),e+=4}if(!f.match(/^[0123456789abcdefABCDEF]+$/))return a;if(g=parseInt(f,16),g>=0&&32>g){d+="x"===b?"\\x"+f:"\\u"+f;continue}if(34===g||39===g||92===g)d+="\\"+String.fromCharCode(g);else{if("x"===b&&g>126&&255>=g)return a;d+=String.fromCharCode(g)}}else"\\"===b?c=!0:d+=b;return d}var i="\n\r	 ".split(""),j=/[0-9]/,k=/[01234567]/,m=/[0123456789abcdefABCDEF]/,n="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");this.line_starters="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");var o,p,q,r,s,t,u=this.line_starters.concat(["do","in","else","get","set","new","catch","finally","typeof","yield","async","await"]),v=/([\s\S]*?)((?:\*\/)|$)/g,w=/([^\n\r\u2028\u2029]*)/g,x=/\/\* beautify( \w+[:]\w+)+ \*\//g,y=/ (\w+)[:](\w+)/g,z=/([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,A=/((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;this.tokenize=function(){t=a.length,s=0,q=!1,r=[];for(var b,c,d,e=null,f=[],h=[];!c||"TK_EOF"!==c.type;){for(d=g(),b=new l(d[1],d[0],o,p);"TK_COMMENT"===b.type||"TK_BLOCK_COMMENT"===b.type||"TK_UNKNOWN"===b.type;)"TK_BLOCK_COMMENT"===b.type&&(b.directives=d[2]),h.push(b),d=g(),b=new l(d[1],d[0],o,p);h.length&&(b.comments_before=h,h=[]),"TK_START_BLOCK"===b.type||"TK_START_EXPR"===b.type?(b.parent=c,f.push(e),e=b):("TK_END_BLOCK"===b.type||"TK_END_EXPR"===b.type)&&e&&("]"===b.text&&"["===e.text||")"===b.text&&"("===e.text||"}"===b.text&&"{"===e.text)&&(b.parent=e.parent,e=f.pop()),r.push(b),c=b}return r}}var k={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"},l=function(a,b,c,d,e,f){this.type=a,this.text=b,this.comments_before=[],this.newlines=c||0,this.wanted_newline=c>0,this.whitespace_before=d||"",this.parent=null,this.directives=null};return{run:a}}});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{codeMirror:!0,codeMirrorOptions:{lineNumbers:!0,tabMode:"indent",indentWithTabs:!0,lineWrapping:!0,mode:"text/html",tabSize:2}}),a.FroalaEditor.PLUGINS.codeView=function(b){function c(){return b.$box.hasClass("fr-code-view")}function d(){return k?k.getValue():j.val()}function e(a){var c=d();b.html.set(c),b.$el.blur(),b.$tb.find(" > .fr-command").not(a).removeClass("fr-disabled"),a.removeClass("fr-active"),b.events.focus(!0),b.placeholder.refresh(),b.undo.saveStep()}function f(a,c){!k&&b.opts.codeMirror&&"undefined"!=typeof CodeMirror&&(k=CodeMirror.fromTextArea(j.get(0),b.opts.codeMirrorOptions)),b.undo.saveStep(),b.html.cleanWhiteTags(!0),b.core.hasFocus()&&(b.selection.save(),b.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'),b.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>'),b.$el.blur());var d=b.html.get(!1,!0);b.$el.find("span.fr-tmp").remove(),d=d.replace(/<span class="fr-tmp fr-sm">F<\/span>/,"FROALA-SM"),d=d.replace(/<span class="fr-tmp fr-em">F<\/span>/,"FROALA-EM"),b.codeBeautifier&&(d=b.codeBeautifier.run(d,{end_with_newline:!0,indent_inner_html:!0,extra_liners:["p","h1","h2","h3","h4","h5","h6","blockquote","pre","ul","ol","table"],brace_style:"expand",indent_char:"	",indent_size:1,wrap_line_length:0}));var e,f;if(k){e=d.indexOf("FROALA-SM"),f=d.indexOf("FROALA-EM"),e>f?e=f:f-=9,d=d.replace(/FROALA-SM/g,"").replace(/FROALA-EM/g,"");var g=d.substring(0,e).length-d.substring(0,e).replace(/\n/g,"").length,h=d.substring(0,f).length-d.substring(0,f).replace(/\n/g,"").length;e=d.substring(0,e).length-d.substring(0,d.substring(0,e).lastIndexOf("\n")+1).length,f=d.substring(0,f).length-d.substring(0,d.substring(0,f).lastIndexOf("\n")+1).length,k.setSize(null,Math.max(c,150)),k.setValue(d),k.focus(),k.setSelection({line:g,ch:e},{line:h,ch:f}),k.refresh(),k.clearHistory()}else e=d.indexOf("FROALA-SM"),f=d.indexOf("FROALA-EM")-9,j.css("height",c),j.val(d.replace(/FROALA-SM/g,"").replace(/FROALA-EM/g,"")),j.focus(),j.get(0).setSelectionRange(e,f);b.$tb.find(" > .fr-command").not(a).addClass("fr-disabled"),a.addClass("fr-active"),!b.helpers.isMobile()&&b.opts.toolbarInline&&b.toolbar.hide()}function g(){var a=b.$tb.find('.fr-command[data-cmd="html"]');if(c())b.$box.toggleClass("fr-code-view",!1),e(a);else{b.popups.hideAll();var d=b.$wp.outerHeight();b.$box.toggleClass("fr-code-view",!0),f(a,d)}}function h(){c()&&(g(b.$tb.find('button[data-cmd="html"]')),j.val("").removeData().remove()),l&&l.remove()}function i(){if(!b.$wp)return!1;j=a('<textarea class="fr-code" tabindex="-1">'),b.$wp.append(j),j.attr("dir",b.opts.direction);var d=function(){return!c()};b.opts.toolbarInline&&(l=a('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch'+(b.helpers.isMobile()?"":" fr-desktop")+'" role="button" tabindex="-1"><i class="fa fa-code"></i></button>'),b.$box.append(l),b.events.bindClick(b.$box,"a.html-switch",function(){g(b.$tb.find('button[data-cmd="html"]'))})),b.events.on("buttons.refresh",d),b.events.on("copy",d,!0),b.events.on("cut",d,!0),b.events.on("paste",d,!0),b.events.on("destroy",h,!0),b.events.on("form.submit",function(){c()&&g(b.$tb.find('button[data-cmd="html"]'))})}var j,k,l;return{_init:i,toggle:g,isActive:c,get:d}},a.FroalaEditor.RegisterCommand("html",{title:"Code View",undo:!1,focus:!1,forcedRefresh:!0,callback:function(){this.codeView.toggle()}}),a.FroalaEditor.DefineIcon("html",{NAME:"code"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{"colors.picker":"[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_]"}),a.extend(a.FroalaEditor.DEFAULTS,{colorsText:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],colorsBackground:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],colorsStep:7,colorsDefaultTab:"text",colorsButtons:["colorsBack","|","-"]}),a.FroalaEditor.PLUGINS.colors=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="color"]'),c=b.popups.get("colors.picker");if(c||(c=e()),!c.hasClass("fr-active")){b.popups.setContainer("colors.picker",b.$tb),h(c.find(".fr-selected-tab").attr("data-param1"));var d=a.offset().left+a.outerWidth()/2,f=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("colors.picker",d,f,a.outerHeight())}}function d(){b.popups.hide("colors.picker")}function e(){var a='<div class="fr-buttons fr-colors-buttons">';b.opts.toolbarInline&&b.opts.colorsButtons.length>0&&(a+=b.button.buildList(b.opts.colorsButtons)),a+=f()+"</div>";var c={buttons:a,text_colors:g("text"),background_colors:g("background")},d=b.popups.create("colors.picker",c);return d}function f(){var a='<div class="fr-colors-tabs">';return a+='<span class="fr-colors-tab '+("background"==b.opts.colorsDefaultTab?"":"fr-selected-tab ")+'fr-command" data-param1="text" data-cmd="colorChangeSet" title="'+b.language.translate("Text")+'">'+b.language.translate("Text")+"</span>",a+='<span class="fr-colors-tab '+("background"==b.opts.colorsDefaultTab?"fr-selected-tab ":"")+'fr-command" data-param1="background" data-cmd="colorChangeSet" title="'+b.language.translate("Background")+'">'+b.language.translate("Background")+"</span>",a+"</div>"}function g(a){for(var c="text"==a?b.opts.colorsText:b.opts.colorsBackground,d='<div class="fr-color-set fr-'+a+"-color"+(b.opts.colorsDefaultTab==a||"text"!=b.opts.colorsDefaultTab&&"background"!=b.opts.colorsDefaultTab&&"text"==a?" fr-selected-set":"")+'">',e=0;e<c.length;e++)0!==e&&e%b.opts.colorsStep===0&&(d+="<br>"),d+="REMOVE"!=c[e]?'<span class="fr-command fr-select-color" style="background: '+c[e]+';" data-cmd="'+a+'Color" data-param1="'+c[e]+'"></span>':'<span class="fr-command fr-select-color" data-cmd="'+a+'Color" data-param1="REMOVE" title="'+b.language.translate("Clear Formatting")+'"><i class="fa fa-eraser"></i></span>';return d+"</div>"}function h(c){var d,e=b.popups.get("colors.picker"),f=a(b.selection.element());for(d="background"==c?"background-color":"color",e.find(".fr-"+c+"-color .fr-select-color").removeClass("fr-selected-color");f.get(0)!=b.$el.get(0);){if("transparent"!=f.css(d)&&"rgba(0, 0, 0, 0)"!=f.css(d)){e.find(".fr-"+c+'-color .fr-select-color[data-param1="'+b.helpers.RGBToHex(f.css(d))+'"]').addClass("fr-selected-color");break}f=f.parent()}}function i(a,b){a.hasClass("fr-selected-tab")||(a.siblings().removeClass("fr-selected-tab"),a.addClass("fr-selected-tab"),a.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"),a.parents(".fr-popup").find(".fr-color-set.fr-"+b+"-color").addClass("fr-selected-set"),h(b))}function j(c){"REMOVE"!=c?b.commands.applyProperty("background-color",b.helpers.HEXtoRGB(c)):(b.commands.applyProperty("background-color","#123456"),b.selection.save(),b.$el.find("span").each(function(c,d){var e=a(d),f=e.css("background-color");("#123456"===f||"#123456"===b.helpers.RGBToHex(f))&&e.replaceWith(e.html())}),b.selection.restore()),d()}function k(c){"REMOVE"!=c?b.commands.applyProperty("color",b.helpers.HEXtoRGB(c)):(b.commands.applyProperty("color","#123456"),b.selection.save(),b.$el.find("span").each(function(c,d){var e=a(d),f=e.css("color");("#123456"===f||"#123456"===b.helpers.RGBToHex(f))&&e.replaceWith(e.html())}),b.selection.restore()),d()}function l(){b.popups.hide("colors.picker"),b.toolbar.showInline()}function m(){}return{_init:m,showColorsPopup:c,hideColorsPopup:d,changeSet:i,background:j,text:k,back:l}},a.FroalaEditor.DefineIcon("colors",{NAME:"tint"}),a.FroalaEditor.RegisterCommand("color",{title:"Colors",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("colors.picker")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("colors.picker")):this.colors.showColorsPopup()}}),a.FroalaEditor.RegisterCommand("textColor",{undo:!0,callback:function(a,b){this.colors.text(b)}}),a.FroalaEditor.RegisterCommand("backgroundColor",{undo:!0,callback:function(a,b){this.colors.background(b)}}),a.FroalaEditor.RegisterCommand("colorChangeSet",{undo:!1,focus:!1,callback:function(a,b){var c=this.popups.get("colors.picker").find('.fr-command[data-cmd="'+a+'"][data-param1="'+b+'"]');this.colors.changeSet(c,b)}}),a.FroalaEditor.DefineIcon("colorsBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("colorsBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.colors.back()}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{emoticons:"[_BUTTONS_][_EMOTICONS_]"}),a.extend(a.FroalaEditor.DEFAULTS,{emoticonsStep:8,emoticonsSet:[{code:"&#x1f600;",desc:"Grinning face"},{code:"&#x1f601;",desc:"Grinning face with smiling eyes"},{code:"&#x1f602;",desc:"Face with tears of joy"},{code:"&#x1f603;",desc:"Smiling face with open mouth"},{code:"&#x1f604;",desc:"Smiling face with open mouth and smiling eyes"},{code:"&#x1f605;",desc:"Smiling face with open mouth and cold sweat"},{code:"&#x1f606;",desc:"Smiling face with open mouth and tightly-closed eyes"},{code:"&#x1f607;",desc:"Smiling face with halo"},{code:"&#x1f608;",desc:"Smiling face with horns"},{code:"&#x1f609;",desc:"Winking face"},{code:"&#x1f60a;",desc:"Smiling face with smiling eyes"},{code:"&#x1f60b;",desc:"Face savoring delicious food"},{code:"&#x1f60c;",desc:"Relieved face"},{code:"&#x1f60d;",desc:"Smiling face with heart-shaped eyes"},{code:"&#x1f60e;",desc:"Smiling face with sunglasses"},{code:"&#x1f60f;",desc:"Smirking face"},{code:"&#x1f610;",desc:"Neutral face"},{code:"&#x1f611;",desc:"Expressionless face"},{code:"&#x1f612;",desc:"Unamused face"},{code:"&#x1f613;",desc:"Face with cold sweat"},{code:"&#x1f614;",desc:"Pensive face"},{code:"&#x1f615;",desc:"Confused face"},{code:"&#x1f616;",desc:"Confounded face"},{code:"&#x1f617;",desc:"Kissing face"},{code:"&#x1f618;",desc:"Face throwing a kiss"},{code:"&#x1f619;",desc:"Kissing face with smiling eyes"},{code:"&#x1f61a;",desc:"Kissing face with closed eyes"},{code:"&#x1f61b;",desc:"Face with stuck out tongue"},{code:"&#x1f61c;",desc:"Face with stuck out tongue and winking eye"},{code:"&#x1f61d;",desc:"Face with stuck out tongue and tightly-closed eyes"},{code:"&#x1f61e;",desc:"Disappointed face"},{code:"&#x1f61f;",desc:"Worried face"},{code:"&#x1f620;",desc:"Angry face"},{code:"&#x1f621;",desc:"Pouting face"},{code:"&#x1f622;",desc:"Crying face"},{code:"&#x1f623;",desc:"Persevering face"},{code:"&#x1f624;",desc:"Face with look of triumph"},{code:"&#x1f625;",desc:"Disappointed but relieved face"},{code:"&#x1f626;",desc:"Frowning face with open mouth"},{code:"&#x1f627;",desc:"Anguished face"},{code:"&#x1f628;",desc:"Fearful face"},{code:"&#x1f629;",desc:"Weary face"},{code:"&#x1f62a;",desc:"Sleepy face"},{code:"&#x1f62b;",desc:"Tired face"},{code:"&#x1f62c;",desc:"Grimacing face"},{code:"&#x1f62d;",desc:"Loudly crying face"},{code:"&#x1f62e;",desc:"Face with open mouth"},{code:"&#x1f62f;",desc:"Hushed face"},{code:"&#x1f630;",desc:"Face with open mouth and cold sweat"},{code:"&#x1f631;",desc:"Face screaming in fear"},{code:"&#x1f632;",desc:"Astonished face"},{code:"&#x1f633;",desc:"Flushed face"},{code:"&#x1f634;",desc:"Sleeping face"},{code:"&#x1f635;",desc:"Dizzy face"},{code:"&#x1f636;",desc:"Face without mouth"},{code:"&#x1f637;",desc:"Face with medical mask"}],emoticonsButtons:["emoticonsBack","|"]}),a.FroalaEditor.PLUGINS.emoticons=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="emoticons"]'),c=b.popups.get("emoticons");if(c||(c=e()),!c.hasClass("fr-active")){b.popups.refresh("emoticons"),b.popups.setContainer("emoticons",b.$tb);var d=a.offset().left+a.outerWidth()/2,f=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("emoticons",d,f,a.outerHeight())}}function d(){b.popups.hide("emoticons")}function e(){var a="";b.opts.toolbarInline&&b.opts.emoticonsButtons.length>0&&(a='<div class="fr-buttons fr-emoticons-buttons">'+b.button.buildList(b.opts.emoticonsButtons)+"</div>");var c={buttons:a,emoticons:f()},d=b.popups.create("emoticons",c);return b.tooltip.bind(d,".fr-emoticon"),d}function f(){for(var a="<div>",c=0;c<b.opts.emoticonsSet.length;c++)0!==c&&c%b.opts.emoticonsStep===0&&(a+="<br>"),a+='<span class="fr-command fr-emoticon" data-cmd="insertEmoticon" title="'+b.language.translate(b.opts.emoticonsSet[c].desc)+'" data-param1="'+b.opts.emoticonsSet[c].code+'">'+b.opts.emoticonsSet[c].code+"</span>";return a+="</div>"}function g(c){b.html.insert('<span class="fr-emoticon">'+c+"</span>"+a.FroalaEditor.MARKERS,!0)}function h(){b.popups.hide("emoticons"),b.toolbar.showInline()}function i(){b.events.on("html.get",function(c){for(var d=0;d<b.opts.emoticonsSet.length;d++){var e=b.opts.emoticonsSet[d],f=a("<div>").html(e.code).text();c=c.split(f).join(e.code)}return c});var c=function(){if(!b.selection.isCollapsed())return!1;var c=b.selection.element(),d=b.selection.endElement();if(a(c).hasClass("fr-emoticon"))return c;if(a(d).hasClass("fr-emoticon"))return d;var e=b.selection.ranges(0),f=e.startContainer;if(f.nodeType==Node.ELEMENT_NODE&&f.childNodes.length>0&&e.startOffset>0){var g=f.childNodes[e.startOffset-1];if(a(g).hasClass("fr-emoticon"))return g}return!1};b.events.on("keydown",function(d){if(b.keys.isCharacter(d.which)&&b.selection.inEditor()){var e=b.selection.ranges(0),f=c();f&&(0===e.startOffset?a(f).before(a.FroalaEditor.MARKERS+a.FroalaEditor.INVISIBLE_SPACE):a(f).after(a.FroalaEditor.INVISIBLE_SPACE+a.FroalaEditor.MARKERS),b.selection.restore())}}),b.events.on("keyup",function(){for(var c=b.$el.get(0).querySelectorAll(".fr-emoticon"),d=0;d<c.length;d++)"undefined"!=typeof c[d].textContent&&0===c[d].textContent.replace(/\u200B/gi,"").length&&a(c[d]).remove()})}return{_init:i,insert:g,showEmoticonsPopup:c,hideEmoticonsPopup:d,back:h}},a.FroalaEditor.DefineIcon("emoticons",{NAME:"smile-o"}),a.FroalaEditor.RegisterCommand("emoticons",{title:"Emoticons",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("emoticons")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("emoticons")):this.emoticons.showEmoticonsPopup()}}),a.FroalaEditor.RegisterCommand("insertEmoticon",{callback:function(a,b){this.emoticons.insert(b),this.emoticons.hideEmoticonsPopup()}}),a.FroalaEditor.DefineIcon("emoticonsBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("emoticonsBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.emoticons.back()}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{entities:"&amp;&lt;&gt;&quot;&apos;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;"}),a.FroalaEditor.PLUGINS.entities=function(b){function c(a){if(a.nodeType==Node.COMMENT_NODE)return"<!--"+a.nodeValue+"-->";if(a.nodeType!=Node.ELEMENT_NODE)return a.outerHTML;if("IFRAME"==a.tagName)return a.outerHTML;var d=a.childNodes;if(0===d.length&&(b.opts.fullPage||"BODY"!=a.tagName))return a.outerHTML;for(var e="",h=0;h<d.length;h++)if(d[h].nodeType==Node.TEXT_NODE){var i=d[h].textContent;if(i.match(f)){for(var j="",k=0;k<i.length;k++)j+=g[i[k]]?g[i[k]]:i[k];e+=j.replace(/\u00A0/g,"&nbsp;")}else e+=i.replace(/\u00A0/g,"&nbsp;")}else e+=c(d[h]);return b.opts.fullPage||"BODY"!=a.tagName?b.node.openTagString(a)+e+b.node.closeTagString(a):e}function d(d){var e=[];d=d.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,function(a){return e.push(a),"<!--[FROALA.EDITOR.SCRIPT "+(e.length-1)+"]-->"}),d=d.replace(/<img((?:[\w\W]*?)) src="/g,'<img$1 data-src="'),b.opts.fullPage||(d="<html><head></head><body>"+d+"</body></html>"),h=a('<iframe style="width:0; height:0; position: absolute; left: -2000px; display: none;">'),a("body").append(h),h.get(0).contentWindow.document.open(),h.get(0).contentWindow.document.write(d),h.get(0).contentWindow.document.close();var f;f=b.opts.fullPage?h.contents().find("html").get(0):h.get(0).contentDocument.getElementsByTagName("body")[0];var g=c(f);if(b.opts.fullPage){var i=b.html.getDoctype(h.get(0).contentWindow.document);g=i+g}return g=g.replace(/<!--\[FROALA\.EDITOR\.SCRIPT ([\d]*)]-->/gi,function(a,b){return e[parseInt(b,10)]}),g=g.replace(/<img((?:[\w\W]*?)) data-src="/g,'<img$1 src="'),h.remove(),g}function e(){b.opts.htmlSimpleAmpersand&&(b.opts.entities=b.opts.entities.replace("&amp;",""));var c=a("<div>").html(b.opts.entities).text(),e=b.opts.entities.split(";");g={},f="";for(var h=0;h<c.length;h++){var i=c.charAt(h);g[i]=e[h]+";",f+="\\"+i+(h<c.length-1?"|":"")}f=new RegExp("("+f+")","g"),b.events.on("html.get",d,!0)}var f,g,h;return{_init:e}}});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{"file.insert":"[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]"}),a.extend(a.FroalaEditor.DEFAULTS,{fileUploadURL:"http://i.froala.com/upload",fileUploadParam:"file",fileUploadParams:{},fileUploadToS3:!1,fileUploadMethod:"POST",fileMaxSize:10485760,fileAllowedTypes:["*"],fileInsertButtons:["fileBack","|"],fileUseSelectedText:!1}),a.FroalaEditor.PLUGINS.file=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="insertFile"]'),c=b.popups.get("file.insert");if(c||(c=r()),e(),!c.hasClass("fr-active")){b.popups.refresh("file.insert"),b.popups.setContainer("file.insert",b.$tb);var d=a.offset().left+a.outerWidth()/2,f=a.offset().top+(b.opts.toolbarBottom?0:a.outerHeight());b.popups.show("file.insert",d,f,a.outerHeight()),b.selection.save()}}function d(){var a=b.popups.get("file.insert");a&&(a.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),a.find(".fr-file-progress-bar-layer").addClass("fr-active"),a.find(".fr-buttons").hide(),f("Uploading",0))}function e(a){var c=b.popups.get("file.insert");c&&(c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),c.find(".fr-file-progress-bar-layer").removeClass("fr-active"),c.find(".fr-buttons").show(),a&&b.popups.show("file.insert",null,null))}function f(a,c){var d=b.popups.get("file.insert");if(d){var e=d.find(".fr-file-progress-bar-layer");e.find("h3").text(a+(c?" "+c+"%":"")),e.removeClass("fr-error"),c?(e.find("div").removeClass("fr-indeterminate"),e.find("div > span").css("width",c+"%")):e.find("div").addClass("fr-indeterminate")}}function g(a){var c=b.popups.get("file.insert"),d=c.find(".fr-file-progress-bar-layer");d.addClass("fr-error"),d.find("h3").text(a)}function h(a,c,d){b.edit.on(),b.events.focus(!0),b.selection.restore(),b.html.insert('<a href="'+a+'" id="fr-inserted-file" class="fr-file">'+(c||b.selection.text())+"</a>");var e=b.$el.find("#fr-inserted-file");e.removeAttr("id"),b.popups.hide("file.insert"),b.undo.saveStep(),b.events.trigger("file.inserted",[e,d])}function i(c){try{if(b.events.trigger("file.uploaded",[c],!0)===!1)return b.edit.on(),!1;var d=a.parseJSON(c);return d.link?d:(n(x,c),!1)}catch(e){return n(z,c),!1}}function j(c){try{var d=a(c).find("Location").text(),e=a(c).find("Key").text();return b.events.trigger("file.uploadedToS3",[d,e,c],!0)===!1?(b.edit.on(),!1):d}catch(f){return n(z,c),!1}}function k(a){var c=this.status,d=this.response,e=this.responseXML,f=this.responseText;try{if(b.opts.fileUploadToS3)if(201==c){var g=j(e);g&&h(g,a,d||e)}else n(z,d||e);else if(c>=200&&300>c){var k=i(f);k&&h(k.link,a,d||f)}else n(y,d||f)}catch(l){n(z,d||f)}}function l(){n(z,this.response||this.responseText||this.responseXML)}function m(a){if(a.lengthComputable){var b=a.loaded/a.total*100|0;f("Uploading",b)}}function n(a,c){b.edit.on(),g(b.language.translate("Something went wrong. Please try again.")),b.events.trigger("file.error",[{code:a,message:D[a]},c])}function o(a){if(b.events.trigger("file.beforeUpload",[a])===!1)return!1;if("undefined"!=typeof a&&a.length>0){var c=a[0];if(c.size>b.opts.fileMaxSize)return n(A),!1;if(b.opts.fileAllowedTypes.indexOf("*")<0&&b.opts.fileAllowedTypes.indexOf(c.type.replace(/file\//g,""))<0)return n(B),!1;var e;if(b.drag_support.formdata&&(e=b.drag_support.formdata?new FormData:null),e){var f;if(b.opts.fileUploadToS3!==!1){e.append("key",b.opts.fileUploadToS3.keyStart+(new Date).getTime()+"-"+(c.name||"untitled")),e.append("success_action_status","201"),e.append("X-Requested-With","xhr"),e.append("Content-Type",c.type);for(f in b.opts.fileUploadToS3.params)e.append(f,b.opts.fileUploadToS3.params[f])}for(f in b.opts.fileUploadParams)e.append(f,b.opts.fileUploadParams[f]);e.append(b.opts.fileUploadParam,c);var g=b.opts.fileUploadURL;b.opts.fileUploadToS3&&(g="https://"+b.opts.fileUploadToS3.region+".amazonaws.com/"+b.opts.fileUploadToS3.bucket);var h=b.core.getXHR(g,b.opts.fileUploadMethod);h.onload=function(){k.call(h,[b.opts.fileUseSelectedText?null:c.name])},h.onerror=l,h.upload.onprogress=m,d(),b.edit.off(),h.send(e)}}}function p(b){b.on("dragover dragenter",".fr-file-upload-layer",function(){return a(this).addClass("fr-drop"),!1}),b.on("dragleave dragend",".fr-file-upload-layer",function(){return a(this).removeClass("fr-drop"),!1}),b.on("drop",".fr-file-upload-layer",function(b){b.preventDefault(),b.stopPropagation(),a(this).removeClass("fr-drop");var c=b.originalEvent.dataTransfer;c&&c.files&&o(c.files)}),b.on("change",'.fr-file-upload-layer input[type="file"]',function(){this.files&&o(this.files),a(this).val("")})}function q(){e()}function r(){var a="";a='<div class="fr-buttons">'+b.button.buildList(b.opts.fileInsertButtons)+"</div>";var c="";c='<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-'+b.id+'"><strong>'+b.language.translate("Drop file")+"</strong><br>("+b.language.translate("or click")+')<form><input type="file" name="'+b.opts.fileUploadParam+'" accept="/*" tabIndex="-1"></form></div>';var d='<div class="fr-file-progress-bar-layer fr-layer"><h3 class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command" data-cmd="fileDismissError" tabIndex="2">OK</button></div></div>',e={buttons:a,upload_layer:c,progress_bar:d},f=b.popups.create("file.insert",e);return b.popups.onHide("file.insert",q),p(f),f}function s(c){return a(c).hasClass("fr-file")?b.events.trigger("file.unlink",[c]):void 0}function t(){var c=function(a){a.preventDefault()};b.events.on("dragenter",c),b.events.on("dragover",c),b.events.on("drop",function(c){b.popups.hideAll();var e=c.originalEvent.dataTransfer;if(e&&e.files&&e.files.length){var f=e.files[0];if(f&&f.type&&(b.opts.fileAllowedTypes.indexOf(f.type)>=0||b.opts.fileAllowedTypes.indexOf("*")>=0)){b.markers.insertAtPoint(c.originalEvent),b.markers.remove(),b.popups.hideAll();var g=b.popups.get("file.insert");g||(g=r()),b.popups.setContainer("file.insert",a(b.opts.scrollableContainer)),b.popups.show("file.insert",c.originalEvent.pageX,c.originalEvent.pageY),d(),o(e.files),c.preventDefault(),c.stopPropagation()}}})}function u(){b.events.disableBlur(),b.selection.restore(),b.events.enableBlur(),b.popups.hide("file.insert"),b.toolbar.showInline()}function v(){t(),b.events.on("link.beforeRemove",s)}var w=1,x=2,y=3,z=4,A=5,B=6,C=7,D={};return D[w]="File cannot be loaded from the passed link.",D[x]="No link in upload response.",D[y]="Error during file upload.",D[z]="Parsing response failed.",D[A]="File is too large.",D[B]="File file type is invalid.",D[C]="Files can be uploaded only to same domain in IE 8 and IE 9.",{_init:v,showInsertPopup:c,upload:o,insert:h,back:u,hideProgressBar:e}},a.FroalaEditor.DefineIcon("insertFile",{NAME:"file-o"}),a.FroalaEditor.RegisterCommand("insertFile",{title:"Upload File",undo:!1,focus:!0,refershAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("file.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("file.insert")):this.file.showInsertPopup()}}),a.FroalaEditor.DefineIcon("fileBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("fileBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.file.back()},refresh:function(a){this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FroalaEditor.RegisterCommand("fileDismissError",{title:"OK",callback:function(){this.file.hideProgressBar(!0)}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{fontFamily:{"Arial,Helvetica,sans-serif":"Arial","Georgia,serif":"Georgia","Impact,Charcoal,sans-serif":"Impact","Tahoma,Geneva,sans-serif":"Tahoma","'Times New Roman',Times,serif":"Times New Roman","Verdana,Geneva,sans-serif":"Verdana"},fontFamilySelection:!1,fontFamilyDefaultSelection:"Time New Roman"}),a.FroalaEditor.PLUGINS.fontFamily=function(b){function c(a){b.commands.applyProperty("font-family",a)}function d(c,d){var e=a(b.selection.element()).css("font-family").replace(/"/g,"'").replace(/, /g,",");d.find(".fr-command.fr-active").removeClass("fr-active"),d.find('.fr-command[data-param1="'+e+'"]').addClass("fr-active");var f=d.find(".fr-dropdown-list"),g=d.find(".fr-active").parent();g.length?f.parent().scrollTop(g.offset().top-f.offset().top-(f.parent().outerHeight()/2-g.outerHeight()/2)):f.parent().scrollTop(0)}function e(c,d){var e=a(b.selection.element()).css("font-family").replace(/"/g,"'").replace(/, /g,",");c.find("> span").text(d.find('.fr-command[data-param1="'+e+'"]').text()||b.opts.fontFamilyDefaultSelection)}return{apply:c,refreshOnShow:d,refresh:e}},a.FroalaEditor.RegisterCommand("fontFamily",{type:"dropdown",displaySelection:function(a){return a.opts.fontFamilySelection},defaultSelection:function(a){return a.opts.fontFamilyDefaultSelection},displaySelectionWidth:120,html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.fontFamily;for(var c in b)a+='<li><a class="fr-command" data-cmd="fontFamily" data-param1="'+c+'" style="font-family: '+b[c]+'" title="'+b[c]+'">'+b[c]+"</a></li>";return a+="</ul>"},title:"Font Family",callback:function(a,b){this.fontFamily.apply(b)},refresh:function(a,b){this.fontFamily.refresh(a,b)},refreshOnShow:function(a,b){this.fontFamily.refreshOnShow(a,b)}}),a.FroalaEditor.DefineIcon("fontFamily",{NAME:"font"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{fontSize:["8","9","10","11","12","14","18","24","30","36","48","60","72","96"],fontSizeSelection:!1}),a.FroalaEditor.PLUGINS.fontSize=function(b){function c(a){b.commands.applyProperty("font-size",a+"px")}function d(c,d){var e=b.helpers.getPX(a(b.selection.element()).css("font-size"));d.find(".fr-command.fr-active").removeClass("fr-active"),d.find('.fr-command[data-param1="'+e+'"]').addClass("fr-active");var f=d.find(".fr-dropdown-list"),g=d.find(".fr-active").parent();g.length?f.parent().scrollTop(g.offset().top-f.offset().top-(f.parent().outerHeight()/2-g.outerHeight()/2)):f.parent().scrollTop(0)}function e(c){var d=b.helpers.getPX(a(b.selection.element()).css("font-size"));c.find("> span").text(d)}return{apply:c,refreshOnShow:d,refresh:e}},a.FroalaEditor.RegisterCommand("fontSize",{type:"dropdown",title:"Font Size",displaySelection:function(a){return a.opts.fontSizeSelection},displaySelectionWidth:30,defaultSelection:"12",html:function(){for(var a='<ul class="fr-dropdown-list">',b=this.opts.fontSize,c=0;c<b.length;c++){var d=b[c];a+='<li><a class="fr-command" data-cmd="fontSize" data-param1="'+d+'" title="'+d+'">'+d+"</a></li>"}return a+="</ul>"},callback:function(a,b){this.fontSize.apply(b)},refresh:function(a){this.fontSize.refresh(a)},refreshOnShow:function(a,b){this.fontSize.refreshOnShow(a,b)}}),a.FroalaEditor.DefineIcon("fontSize",{NAME:"text-height"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.FroalaEditor.PLUGINS.fullscreen=function(b){function c(){return b.$box.hasClass("fr-fullscreen")}function d(){i=a(b.original_window).scrollTop(),b.$box.toggleClass("fr-fullscreen"),a("body").toggleClass("fr-fullscreen"),j=a('<div style="display: none;"></div>'),b.$box.after(j).appendTo(a("body")),b.helpers.isMobile()&&(b.$tb.data("parent",b.$tb.parent()),b.$tb.prependTo(b.$box),b.$tb.data("sticky-dummy")&&b.$tb.after(b.$tb.data("sticky-dummy"))),b.$wp.css("max-height",""),b.$wp.css("height",a(b.original_window).height()-(b.opts.toolbarInline?0:b.$tb.outerHeight())),b.opts.toolbarInline&&b.toolbar.showInline(),b.events.trigger("charCounter.update"),b.$window.trigger("scroll.sticky"+b.id)}function e(){j.replaceWith(b.$box),b.$box.toggleClass("fr-fullscreen"),a("body").toggleClass("fr-fullscreen"),b.$tb.prependTo(b.$tb.data("parent")),b.$tb.data("sticky-dummy")&&b.$tb.after(b.$tb.data("sticky-dummy")),b.$wp.css("height",""),b.size.refresh(),a(b.original_window).scrollTop(i),b.opts.toolbarInline&&b.toolbar.showInline(),b.events.trigger("charCounter.update"),b.opts.toolbarSticky&&b.opts.toolbarStickyOffset&&(b.opts.toolbarBottom?b.$tb.css("bottom",b.opts.toolbarStickyOffset).data("bottom",b.opts.toolbarStickyOffset):b.$tb.css("top",b.opts.toolbarStickyOffset).data("top",b.opts.toolbarStickyOffset)),b.$window.trigger("scroll.sticky"+b.id)}function f(){c()?e():d(),g(b.$tb.find('.fr-command[data-cmd="fullscreen"]'))}function g(a){var b=c();a.toggleClass("fr-active",b),a.find("i").toggleClass("fa-expand",!b).toggleClass("fa-compress",b)}function h(){return b.$wp?(a(b.original_window).on("resize.fullscreen"+b.id,function(){c()&&(e(),d())}),b.events.on("toolbar.hide",function(){return c()&&b.helpers.isMobile()?!1:void 0}),void b.events.on("destroy",function(){a(b.original_window).off("resize.fullscreen"+b.id)})):!1}var i,j;return{_init:h,toggle:f,refresh:g,isActive:c}},a.FroalaEditor.RegisterCommand("fullscreen",{title:"Fullscreen",undo:!1,focus:!1,forcedRefresh:!0,callback:function(){this.fullscreen.toggle()},refresh:function(a){this.fullscreen.refresh(a)}}),a.FroalaEditor.DefineIcon("fullscreen",{NAME:"expand"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{"image.insert":"[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]","image.edit":"[_BUTTONS_]","image.alt":"[_BUTTONS_][_ALT_LAYER_]","image.size":"[_BUTTONS_][_SIZE_LAYER_]"}),a.extend(a.FroalaEditor.DEFAULTS,{imageInsertButtons:["imageBack","|","imageUpload","imageByURL"],imageEditButtons:["imageReplace","imageAlign","imageRemove","|","imageLink","linkOpen","linkEdit","linkRemove","-","imageDisplay","imageStyle","imageAlt","imageSize"],imageAltButtons:["imageBack","|"],imageSizeButtons:["imageBack","|"],imageUploadURL:"http://i.froala.com/upload",imageUploadParam:"file",imageUploadParams:{},imageUploadToS3:!1,imageUploadMethod:"POST",imageMaxSize:10485760,imageAllowedTypes:["jpeg","jpg","png","gif","svg+xml"],imageResize:!0,imageResizeWithPercent:!1,imageMove:!0,imageDefaultWidth:300,imageDefaultAlign:"center",imageDefaultDisplay:"block",imageStyles:{"fr-rounded":"Rounded","fr-bordered":"Bordered"},imageMultipleStyles:!0,imageTextNear:!0,imagePaste:!0}),a.FroalaEditor.PLUGINS.image=function(b){function c(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val(""),ha&&c.val(ha.attr("src")),c.trigger("change")}function d(){var a=b.$tb.find('.fr-command[data-cmd="insertImage"]'),c=b.popups.get("image.insert");if(c||(c=E()),r(),!c.hasClass("fr-active"))if(b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",b.$tb),a.is(":visible")){var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("image.insert",d,e,a.outerHeight())}else b.position.forSelection(c),b.popups.show("image.insert")}function e(){var c=b.popups.get("image.edit");c||(c=p()),b.popups.setContainer("image.edit",a(b.opts.scrollableContainer)),b.popups.refresh("image.edit");var d=ha.offset().left+ha.outerWidth()/2,e=ha.offset().top+ha.outerHeight();b.popups.show("image.edit",d,e,ha.outerHeight())}function f(){r()}function g(a){if(!a.hasClass("fr-dii")&&!a.hasClass("fr-dib")){var c=a.css("float");a.css("float","none"),"block"==a.css("display")?(a.css("float",c),0===parseInt(a.css("margin-left"),10)&&(a.attr("style")||"").indexOf("margin-right: auto")>=0?a.addClass("fr-fil"):0===parseInt(a.css("margin-right"),10)&&(a.attr("style")||"").indexOf("margin-left: auto")>=0&&a.addClass("fr-fir"),a.addClass("fr-dib")):(a.css("float",c),"left"==a.css("float")?a.addClass("fr-fil"):"right"==a.css("float")&&a.addClass("fr-fir"),a.addClass("fr-dii")),a.css("margin",""),a.css("float",""),a.css("display",""),a.css("z-index",""),a.css("position",""),a.css("overflow",""),a.css("vertical-align","")}a.attr("width")&&(a.css("width",a.width()),a.removeAttr("width")),b.opts.imageTextNear||a.removeClass("fr-dii").addClass("fr-dib")}function h(){for(var c="IMG"==b.$el.get(0).tagName?[b.$el.get(0)]:b.$el.get(0).querySelectorAll("img"),d=0;d<c.length;d++)g(a(c[d])),b.opts.iframe&&a(c[d]).on("load",b.size.syncIframe)}function i(){var c,d=Array.prototype.slice.call(b.$el.get(0).querySelectorAll("img")),e=[];for(c=0;c<d.length;c++)e.push(d[c].getAttribute("src"));if(ta)for(c=0;c<ta.length;c++)e.indexOf(ta[c].getAttribute("src"))<0&&b.events.trigger("image.removed",[a(ta[c])]);ta=d}function j(){ia||Q();var a=b.$wp?b.$wp.scrollTop()-(b.$wp.offset().top+1):-1,c=b.$wp?b.$wp.scrollLeft()-(b.$wp.offset().left+1):-1;b.$wp&&(c-=b.helpers.getPX(b.$wp.css("border-left-width"))),ia.css("top",b.opts.iframe?ha.offset().top-1:ha.offset().top+a).css("left",b.opts.iframe?ha.offset().left-1:ha.offset().left+c).css("width",ha.outerWidth()).css("height",ha.outerHeight()).addClass("fr-active")}function k(a){return'<div class="fr-handler fr-h'+a+'"></div>'}function l(c){c.preventDefault(),c.stopPropagation(),ja=a(this),ja.data("start-x",c.pageX||c.originalEvent.touches[0].pageX),ka.show(),b.popups.hideAll()}function m(c){if(ja){c.preventDefault();var d=c.pageX||(c.originalEvent.touches?c.originalEvent.touches[0].pageX:null);if(!d)return!1;var e=ja.data("start-x");ja.data("start-x",d);var f=d-e,g=ha.width();if((ja.hasClass("fr-hnw")||ja.hasClass("fr-hsw"))&&(f=0-f),b.opts.imageResizeWithPercent){var h=ha.parentsUntil(b.$el,b.html.blockTagsQuery()).get(0);ha.css("width",((g+f)/a(h).outerWidth()*100).toFixed(2)+"%")}else ha.css("width",g+f);ha.css("height","").removeAttr("height"),j(),b.events.trigger("image.resize",[fa()])}}function n(a){ja&&(a&&a.stopPropagation(),ja=null,ka.hide(),j(),e(),b.undo.saveStep(),b.events.trigger("image.resizeEnd",[fa()]))}function o(a,c){b.edit.on(),t(b.language.translate("Something went wrong. Please try again.")),b.events.trigger("image.error",[{code:a,message:sa[a]},c])}function p(){var a="";b.opts.imageEditButtons.length>1&&(a+='<div class="fr-buttons">',a+=b.button.buildList(b.opts.imageEditButtons),a+="</div>");var c={buttons:a},d=b.popups.create("image.edit",c);return b.$wp&&(b.$wp.on("scroll.image-edit",function(){ha&&b.popups.isVisible("image.edit")&&e()}),b.events.on("destroy",function(){b.$wp.off("scroll.image-edit")})),d}function q(){var a=b.popups.get("image.insert");a&&(a.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),a.find(".fr-image-progress-bar-layer").addClass("fr-active"),a.find(".fr-buttons").hide(),s("Uploading",0))}function r(a){var c=b.popups.get("image.insert");c&&(c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),c.find(".fr-image-progress-bar-layer").removeClass("fr-active"),c.find(".fr-buttons").show(),a&&b.popups.show("image.insert",null,null))}function s(a,c){var d=b.popups.get("image.insert");if(d){var e=d.find(".fr-image-progress-bar-layer");e.find("h3").text(a+(c?" "+c+"%":"")),e.removeClass("fr-error"),c?(e.find("div").removeClass("fr-indeterminate"),e.find("div > span").css("width",c+"%")):e.find("div").addClass("fr-indeterminate")}}function t(a){var c=b.popups.get("image.insert"),d=c.find(".fr-image-progress-bar-layer");d.addClass("fr-error"),d.find("h3").text(a)}function u(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val().length>0&&(q(),s("Loading image"),v(b.helpers.sanitizeURL(c.val()),!0,[],ha),c.val(""),c.blur())}function v(c,d,e,f,g){b.edit.off(),s("Loading image");var h=new Image;h.onload=function(){var d,h;if(f){d=f.clone(),f.replaceWith(d),d.off("load");for(var i=d.get(0).attributes,j=0;j<i.length;j++){var k=i[j];0===k.nodeName.indexOf("data-")&&d.removeAttr(k.nodeName)}if("undefined"!=typeof e)for(h in e)"link"!=h&&d.attr("data-"+h,e[h]);d.on("load",function(){b.popups.hide("image.insert"),d.trigger("click").trigger("touchend"),b.events.trigger("image.loaded",[d])}),d.attr("src",c),b.edit.on(),b.undo.saveStep(),b.events.trigger("image.replaced",[d,g])}else{var l="";if("undefined"!=typeof e)for(h in e)"link"!=h&&(l+=" data-"+h+'="'+e[h]+'"');var m=b.opts.imageDefaultWidth;m&&"auto"!=m&&(""+m).indexOf("px")<0&&(""+m).indexOf("%")<0&&(m+="px"),d=a('<img class="fr-di'+b.opts.imageDefaultDisplay[0]+("center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+l+(m?' style="width: '+m+';"':"")+">"),d.on("load",function(){d.trigger("click").trigger("touchend"),b.events.trigger("image.loaded",[d])}),b.edit.on(),b.events.focus(!0),b.selection.restore(),b.selection.isCollapsed()||b.selection.remove(),b.markers.insert();var n=b.$el.find(".fr-marker");n.replaceWith(d),b.selection.clear(),b.undo.saveStep(),b.events.trigger("image.inserted",[d,g])}},h.onerror=function(){o(la)},h.src=c}function w(c){try{if(b.events.trigger("image.uploaded",[c],!0)===!1)return b.edit.on(),!1;var d=a.parseJSON(c);return d.link?d:(o(ma,c),!1)}catch(e){return o(oa,c),!1}}function x(c){try{var d=a(c).find("Location").text(),e=a(c).find("Key").text();return b.events.trigger("image.uploadedToS3",[d,e,c],!0)===!1?(b.edit.on(),!1):d}catch(f){return o(oa,c),!1}}function y(a){s("Loading image");var c=this.status,d=this.response,e=this.responseXML,f=this.responseText;try{if(b.opts.imageUploadToS3)if(201==c){var g=x(e);g&&v(g,!1,[],a,d||e)}else o(oa,d||e);else if(c>=200&&300>c){var h=w(f);h&&v(h.link,!1,h,a,d||f)}else o(na,d||f)}catch(i){o(oa,d||f)}}function z(){o(oa,this.response||this.responseText||this.responseXML)}function A(a){if(a.lengthComputable){var b=a.loaded/a.total*100|0;s("Uploading",b)}}function B(a){if(b.events.trigger("image.beforeUpload",[a])===!1)return!1;if("undefined"!=typeof a&&a.length>0){var c=a[0];if(c.size>b.opts.imageMaxSize)return o(pa),!1;if(b.opts.imageAllowedTypes.indexOf(c.type.replace(/image\//g,""))<0)return o(qa),!1;var d;if(b.drag_support.formdata&&(d=b.drag_support.formdata?new FormData:null),d){var e;if(b.opts.imageUploadToS3!==!1){d.append("key",b.opts.imageUploadToS3.keyStart+(new Date).getTime()+"-"+(c.name||"untitled")),d.append("success_action_status","201"),d.append("X-Requested-With","xhr"),d.append("Content-Type",c.type);for(e in b.opts.imageUploadToS3.params)d.append(e,b.opts.imageUploadToS3.params[e])}for(e in b.opts.imageUploadParams)d.append(e,b.opts.imageUploadParams[e]);d.append(b.opts.imageUploadParam,c);var f=b.opts.imageUploadURL;b.opts.imageUploadToS3&&(f="https://"+b.opts.imageUploadToS3.region+".amazonaws.com/"+b.opts.imageUploadToS3.bucket);var g=b.core.getXHR(f,b.opts.imageUploadMethod),h=ha;g.onload=function(){y.call(g,h)},g.onerror=z,g.upload.onprogress=A,q(),b.edit.off(),g.send(d)}}}function C(b){b.on("dragover dragenter",".fr-image-upload-layer",function(){return a(this).addClass("fr-drop"),!1}),b.on("dragleave dragend",".fr-image-upload-layer",function(){return a(this).removeClass("fr-drop"),!1}),b.on("drop",".fr-image-upload-layer",function(b){b.preventDefault(),b.stopPropagation(),a(this).removeClass("fr-drop");var c=b.originalEvent.dataTransfer;c&&c.files&&B(c.files)}),b.on("change",'.fr-image-upload-layer input[type="file"]',function(){this.files&&B(this.files),a(this).val(""),a(this).blur()})}function D(){b.$el.on(b._mousedown,"IMG"==b.$el.get(0).tagName?null:"img",function(c){b.selection.clear(),b.browser.msie&&(b.events.disableBlur(),b.$el.attr("contenteditable",!1)),b.opts.imageMove||c.preventDefault(),c.stopPropagation(),b.opts.imageMove&&(b.opts.toolbarInline&&b.toolbar.hide(),a(this).addClass("fr-img-move"))}),b.$el.on(b._mouseup,"IMG"==b.$el.get(0).tagName?null:"img",function(c){c.stopPropagation(),b.browser.msie&&(b.$el.attr("contenteditable",!0),b.events.enableBlur()),a(this).removeClass("fr-img-move")});var c=function(a){var c=b.$document.find("img.fr-img-move").get(0);return c?"undefined"!=typeof b.browser.msie||"undefined"!=typeof b.browser.edge:void a.preventDefault()},d=function(a){a.preventDefault()};b.events.on("dragenter",d,!0),b.events.on("dragover",c,!0),b.events.on("drop",function(c){for(var d,e,f=0;f<a.FroalaEditor.INSTANCES.length;f++)if(d=a.FroalaEditor.INSTANCES[f].$el.find("img.fr-img-move").get(0)){e=a.FroalaEditor.INSTANCES[f];break}if(d){c.preventDefault(),c.stopPropagation(),X(!0),e!=b&&e.image&&(e.image.exitEdit(!0),e.popups.hide("image.edit"));var g,h;"A"==d.parentNode.tagName&&0===d.parentNode.textContent.length?(h=a(d.parentNode),g=a(d.parentNode).clone(),g.find("img").removeClass("fr-img-move").on("load",W)):(h=a(d),g=a(d).clone(),g.removeClass("fr-img-move").on("load",W)),b.markers.insertAtPoint(c.originalEvent);var i=b.$el.find(".fr-marker");return i.replaceWith(g),h.remove(),b.undo.saveStep(),!1}X(!0),b.popups.hideAll();var j=c.originalEvent.dataTransfer;if(j&&j.files&&j.files.length&&(d=j.files[0],d&&d.type&&b.opts.imageAllowedTypes.indexOf(d.type.replace(/image\//g,""))>=0)){b.markers.insertAtPoint(c.originalEvent),b.markers.remove(),b.popups.hideAll();var k=b.popups.get("image.insert");return k||(k=E()),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)),b.popups.show("image.insert",c.originalEvent.pageX,c.originalEvent.pageY),q(),B(j.files),c.preventDefault(),c.stopPropagation(),!1}},!0),b.events.on("document.drop",function(a){b.$el.find("img.fr-img-move").length&&(a.preventDefault(),a.stopPropagation(),b.$el.find("img.fr-img-move").removeClass("fr-img-move"))}),b.events.on("mousedown",Y),b.events.on("window.mousedown",Y),b.events.on("window.touchmove",Z),b.events.on("mouseup",X),b.events.on("window.mouseup",X),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&X()}),b.events.on("image.hideResizer",function(){X(!0)}),b.events.on("commands.undo",function(){X(!0)}),b.events.on("commands.redo",function(){X(!0)}),b.events.on("destroy",function(){b.$el.off(b._mouseup,"img")},!0)}function E(){var a,d="";b.opts.imageInsertButtons.length>1&&(d='<div class="fr-buttons">'+b.button.buildList(b.opts.imageInsertButtons)+"</div>");var e=b.opts.imageInsertButtons.indexOf("imageUpload"),g=b.opts.imageInsertButtons.indexOf("imageByURL"),h="";e>=0&&(a=" fr-active",g>=0&&e>g&&(a=""),h='<div class="fr-image-upload-layer'+a+' fr-layer" id="fr-image-upload-layer-'+b.id+'"><strong>'+b.language.translate("Drop image")+"</strong><br>("+b.language.translate("or click")+')<form><input type="file" name="'+b.opts.imageUploadParam+'" accept="image/*" tabIndex="-1"></form></div>');var i="";g>=0&&(a=" fr-active",e>=0&&g>e&&(a=""),i='<div class="fr-image-by-url-layer'+a+' fr-layer" id="fr-image-by-url-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2">'+b.language.translate("Insert")+"</button></div></div>");var j='<div class="fr-image-progress-bar-layer fr-layer"><h3 class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-back" data-cmd="imageDismissError" tabIndex="2">OK</button></div></div>',k={buttons:d,upload_layer:h,by_url_layer:i,progress_bar:j},l=b.popups.create("image.insert",k);return b.popups.onRefresh("image.insert",c),b.popups.onHide("image.insert",f),b.$wp&&b.$wp.on("scroll.image-insert",function(){ha&&b.popups.isVisible("image.insert")&&da()}),b.events.on("destroy",function(){b.$wp&&b.$wp.off("scroll.image-insert"),l.off("dragover dragenter",".fr-image-upload-layer"),l.off("dragleave dragend",".fr-image-upload-layer"),l.off("drop",".fr-image-upload-layer"),l.off("change",'.fr-image-upload-layer input[type="file"]')}),C(l),l}function F(){if(ha){var a=b.popups.get("image.alt");a.find("input").val(ha.attr("alt")||"").trigger("change")}}function G(){var c=b.popups.get("image.alt");c||(c=H()),r(),b.popups.refresh("image.alt"),b.popups.setContainer("image.alt",a(b.opts.scrollableContainer));var d=ha.offset().left+ha.width()/2,e=ha.offset().top+ha.height();b.popups.show("image.alt",d,e,ha.outerHeight())}function H(){var a="";a='<div class="fr-buttons">'+b.button.buildList(b.opts.imageAltButtons)+"</div>";var c="";c='<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="'+b.language.translate("Alternate Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var d={buttons:a,alt_layer:c},e=b.popups.create("image.alt",d);return b.popups.onRefresh("image.alt",F),b.$wp&&(b.$wp.on("scroll.image-alt",function(){ha&&b.popups.isVisible("image.alt")&&G()}),b.events.on("destroy",function(){b.$wp.off("scroll.image-alt")})),e}function I(a){if(ha){var c=b.popups.get("image.alt");ha.attr("alt",a||c.find("input").val()||""),c.find("input").blur(),setTimeout(function(){ha.trigger("click").trigger("touchend")},b.helpers.isAndroid()?50:0)}}function J(){if(ha){var a=b.popups.get("image.size");a.find('input[name="width"]').val(ha.get(0).style.width).trigger("change"),a.find('input[name="height"]').val(ha.get(0).style.height).trigger("change")}}function K(){var c=b.popups.get("image.size");c||(c=L()),r(),b.popups.refresh("image.size"),b.popups.setContainer("image.size",a(b.opts.scrollableContainer));var d=ha.offset().left+ha.width()/2,e=ha.offset().top+ha.height();b.popups.show("image.size",d,e,ha.outerHeight())}function L(){var a="";a='<div class="fr-buttons">'+b.button.buildList(b.opts.imageSizeButtons)+"</div>";var c="";c='<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'+b.id+'"><div class="fr-image-group"><div class="fr-input-line"><input type="text" name="width" placeholder="'+b.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="'+b.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var d={buttons:a,size_layer:c},e=b.popups.create("image.size",d);return b.popups.onRefresh("image.size",J),b.$wp&&(b.$wp.on("scroll.image-size",function(){ha&&b.popups.isVisible("image.size")&&K()}),b.events.on("destroy",function(){b.$wp.off("scroll.image-size")})),e}function M(a,c){if(ha){var d=b.popups.get("image.size");ha.css("width",a||d.find('input[name="width"]').val()),ha.css("height",c||d.find('input[name="height"]').val()),d.find("input").blur(),setTimeout(function(){ha.trigger("click").trigger("touchend")},b.helpers.isAndroid()?50:0)}}function N(a){var c,d,e=b.popups.get("image.insert");if(ha||b.opts.toolbarInline)ha&&(d=ha.offset().top+ha.outerHeight());else{var f=b.$tb.find('.fr-command[data-cmd="insertImage"]');c=f.offset().left+f.outerWidth()/2,d=f.offset().top+(b.opts.toolbarBottom?10:f.outerHeight()-10)}!ha&&b.opts.toolbarInline&&(d=e.offset().top-b.helpers.getPX(e.css("margin-top")),e.hasClass("fr-above")&&(d+=e.outerHeight())),e.find(".fr-layer").removeClass("fr-active"),e.find(".fr-"+a+"-layer").addClass("fr-active"),b.popups.show("image.insert",c,d,ha?ha.outerHeight():0)}function O(a){var c=b.popups.get("image.insert");c.find(".fr-image-upload-layer").hasClass("fr-active")&&a.addClass("fr-active")}function P(a){var c=b.popups.get("image.insert");c.find(".fr-image-by-url-layer").hasClass("fr-active")&&a.addClass("fr-active")}function Q(){if(ia=a('<div class="fr-image-resizer"></div>'),(b.$wp||a(b.opts.scrollableContainer)).append(ia),ia.on("mousedown",function(a){a.stopPropagation()}),a(b.original_window).on("resize.image"+b.id,function(){b.helpers.isMobile()||X(!0)}),b.events.on("destroy",function(){ia.html("").removeData().remove(),a(b.original_window).off("resize.image"+b.id)},!0),b.opts.imageResize){ia.append(k("nw")+k("ne")+k("sw")+k("se"));var c=ia.get(0).ownerDocument;ia.on(b._mousedown+".imgresize"+b.id,".fr-handler",l),a(c).on(b._mousemove+".imgresize"+b.id,m),a(c.defaultView||c.parentWindow).on(b._mouseup+".imgresize"+b.id,n),ka=a('<div class="fr-image-overlay"></div>'),a(c).find("body").append(ka),ka.on("mouseleave",n),b.events.on("destroy",function(){ia.off(b._mousedown+".imgresize"+b.id),a(c).off(b._mousemove+".imgresize"+b.id),a(c.defaultView||c.parentWindow).off(b._mouseup+".imgresize"+b.id),ka.off("mouseleave").remove()},!0)}}function R(c){c=c||ha,c&&b.events.trigger("image.beforeRemove",[c])!==!1&&(b.popups.hideAll(),X(!0),c.get(0)==b.$el.get(0)?c.removeAttr("src"):("A"==c.get(0).parentNode.tagName?(b.selection.setBefore(c.get(0).parentNode)||b.selection.setAfter(c.get(0).parentNode),a(c.get(0).parentNode).remove()):(b.selection.setBefore(c.get(0))||b.selection.setAfter(c.get(0)),c.remove()),b.selection.restore(),b.html.fillEmptyBlocks(!0)),b.undo.saveStep())}function S(){D(),b.$el.on(b.helpers.isMobile()?"touchend":"click","IMG"==b.$el.get(0).tagName?null:"img",W),b.helpers.isMobile()&&(b.$el.on("touchstart","IMG"==b.$el.get(0).tagName?null:"img",function(){ua=!1}),b.$el.on("touchmove",function(){ua=!0})),b.events.on("keydown",function(c){var d=c.which;return!ha||d!=a.FroalaEditor.KEYCODE.BACKSPACE&&d!=a.FroalaEditor.KEYCODE.DELETE?ha&&d==a.FroalaEditor.KEYCODE.ESC?(X(!0),c.preventDefault(),!1):ha&&!b.keys.ctrlKey(c)?(c.preventDefault(),!1):void 0:(c.preventDefault(),R(),!1)},!0),b.events.on("paste.before",U),b.events.on("paste.beforeCleanup",V),b.events.on("paste.after",T),b.events.on("html.set",h),h(),b.opts.iframe&&b.events.on("image.loaded",b.size.syncIframe),b.$wp&&(i(),b.events.on("contentChanged",i)),a(b.original_window).on("orientationchange.image."+b.id,function(){setTimeout(function(){var a=fa();a&&a.trigger("click").trigger("touchend")},0)}),b.events.on("destroy",function(){b.$el.off("click touchstart touchend touchmove","img"),b.$el.off("load","img.fr-img-dirty"),b.$el.off("error","img.fr-img-dirty"),a(b.original_window).off("orientationchange.image."+b.id)},!0),b.events.on("node.remove",function(a){return"IMG"==a.get(0).tagName?(R(a),!1):void 0})}function T(){b.opts.imagePaste?b.$el.find("img[data-fr-image-pasted]").each(function(c,d){if(0===d.src.indexOf("data:")){if(b.events.trigger("image.beforePasteUpload",[d])===!1)return!1;var f=b.opts.imageDefaultWidth;"auto"!=f&&(f+=b.opts.imageResizeWithPercent?"%":"px"),a(d).css("width",f),a(d).addClass("fr-dib"),ha=a(d),j(),e(),da(),q(),b.edit.off();for(var g=atob(a(d).attr("src").split(",")[1]),h=[],i=0;i<g.length;i++)h.push(g.charCodeAt(i));var k=new Blob([new Uint8Array(h)],{type:"image/jpeg"});B([k]),a(d).removeAttr("data-fr-image-pasted")}else 0!==d.src.indexOf("http")?(b.selection.save(),a(d).remove(),b.selection.restore()):a(d).removeAttr("data-fr-image-pasted")}):b.$el.find("img[data-fr-image-pasted]").remove()}function U(a){if(a&&a.clipboardData&&a.clipboardData.items&&a.clipboardData.items[0]){var c=a.clipboardData.items[0].getAsFile();if(c){var d=new FileReader;return d.onload=function(a){var c=a.target.result;b.html.insert('<img data-fr-image-pasted="true" src="'+c+'" />'),b.events.trigger("paste.after")},d.readAsDataURL(c),!1}}}function V(a){return a=a.replace(/<img /gi,'<img data-fr-image-pasted="true" ')}function W(c){if(c&&"touchend"==c.type&&ua)return!0;if(b.edit.isDisabled())return c.stopPropagation(),c.preventDefault(),!1;b.toolbar.disable(),c.stopPropagation(),c.preventDefault(),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur()),b.opts.iframe&&b.size.syncIframe(),ha=a(this),j(),e(),b.selection.clear(),b.button.bulkRefresh(),b.events.trigger("video.hideResizer");for(var d=0;d<a.FroalaEditor.INSTANCES.length;d++)a.FroalaEditor.INSTANCES[d]!=b&&a.FroalaEditor.INSTANCES[d].events.trigger("image.hideResizer")}function X(a){a===!0&&(va=!0),ha&&va&&(b.toolbar.enable(),ia.removeClass("fr-active"),b.popups.hide("image.edit"),ha=null),va=!1}function Y(){va=!0}function Z(){va=!1}function $(a){ha.removeClass("fr-fir fr-fil"),"left"==a?ha.addClass("fr-fil"):"right"==a&&ha.addClass("fr-fir"),j(),e()}function _(a){ha&&(ha.hasClass("fr-fil")?a.find("> i").attr("class","fa fa-align-left"):ha.hasClass("fr-fir")?a.find("> i").attr("class","fa fa-align-right"):a.find("> i").attr("class","fa fa-align-justify"))}function aa(a,b){if(ha){var c="justify";ha.hasClass("fr-fil")?c="left":ha.hasClass("fr-fir")&&(c="right"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}}function ba(a){ha.removeClass("fr-dii fr-dib"),"inline"==a?ha.addClass("fr-dii"):"block"==a&&ha.addClass("fr-dib"),j(),e()}function ca(a,b){var c="block";ha.hasClass("fr-dii")&&(c="inline"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}function da(){var c=b.popups.get("image.insert");c||(c=E()),b.popups.isVisible("image.insert")||(r(),b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)));var d=ha.offset().left+ha.width()/2,e=ha.offset().top+ha.height();b.popups.show("image.insert",d,e,ha.outerHeight())}function ea(){ha?ha.trigger("click").trigger("touchend"):(b.popups.hide("image.insert"),b.toolbar.showInline())}function fa(){return ha}function ga(a){if(!ha)return!1;if(!b.opts.imageMultipleStyles){var c=Object.keys(b.opts.imageStyles);c.splice(c.indexOf(a),1),ha.removeClass(c.join(" "))}ha.toggleClass(a),ha.trigger("click").trigger("touchend")}var ha,ia,ja,ka,la=1,ma=2,na=3,oa=4,pa=5,qa=6,ra=7,sa={};sa[la]="Image cannot be loaded from the passed link.",sa[ma]="No link in upload response.",sa[na]="Error during file upload.",sa[oa]="Parsing response failed.",sa[pa]="File is too large.",sa[qa]="Image file type is invalid.",sa[ra]="Files can be uploaded only to same domain in IE 8 and IE 9.";var ta,ua,va=!1;return{_init:S,showInsertPopup:d,showLayer:N,refreshUploadButton:O,refreshByURLButton:P,upload:B,insertByURL:u,align:$,refreshAlign:_,refreshAlignOnShow:aa,display:ba,refreshDisplayOnShow:ca,replace:da,back:ea,get:fa,insert:v,showProgressBar:q,remove:R,hideProgressBar:r,applyStyle:ga,showAltPopup:G,showSizePopup:K,setAlt:I,setSize:M,exitEdit:X}},a.FroalaEditor.DefineIcon("insertImage",{NAME:"image"}),a.FroalaEditor.RegisterShortcut(80,"insertImage"),a.FroalaEditor.RegisterCommand("insertImage",{title:"Insert Image",undo:!1,focus:!0,refershAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("image.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("image.insert")):this.image.showInsertPopup()}}),a.FroalaEditor.DefineIcon("imageUpload",{NAME:"upload"}),a.FroalaEditor.RegisterCommand("imageUpload",{title:"Upload Image",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-upload")},refresh:function(a){this.image.refreshUploadButton(a)}}),a.FroalaEditor.DefineIcon("imageByURL",{NAME:"link"}),a.FroalaEditor.RegisterCommand("imageByURL",{title:"By URL",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-by-url")},refresh:function(a){this.image.refreshByURLButton(a)}}),a.FroalaEditor.RegisterCommand("imageInsertByURL",{title:"Insert Image",undo:!0,refreshAfterCallback:!1,callback:function(){this.image.insertByURL()},refresh:function(a){var b=this.image.get();b?a.text("Replace"):a.text(this.language.translate("Insert"))}}),a.FroalaEditor.DefineIcon("imageDisplay",{NAME:"star"}),a.FroalaEditor.RegisterCommand("imageDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(a,b){this.image.display(b)},refresh:function(a){this.opts.imageTextNear||a.addClass("fr-hidden")},refreshOnShow:function(a,b){this.image.refreshDisplayOnShow(a,b)}}),a.FroalaEditor.DefineIcon("imageAlign",{NAME:"align-center"}),a.FroalaEditor.RegisterCommand("imageAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",justify:"None",right:"Align Right"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.imageAlign.options;for(var d in c)b+='<li><a class="fr-command fr-title" data-cmd="imageAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'"><i class="fa fa-align-'+d+'"></i></a></li>';return b+="</ul>"},callback:function(a,b){this.image.align(b)},refresh:function(a){this.image.refreshAlign(a)},refreshOnShow:function(a,b){this.image.refreshAlignOnShow(a,b)}}),a.FroalaEditor.DefineIcon("imageReplace",{NAME:"exchange"}),a.FroalaEditor.RegisterCommand("imageReplace",{title:"Replace",undo:!1,focus:!1,refreshAfterCallback:!1,callback:function(){this.image.replace()}}),a.FroalaEditor.DefineIcon("imageRemove",{NAME:"trash"}),a.FroalaEditor.RegisterCommand("imageRemove",{title:"Remove",callback:function(){this.image.remove()}}),a.FroalaEditor.DefineIcon("imageBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("imageBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.image.back()},refresh:function(a){var b=this.image.get();b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FroalaEditor.RegisterCommand("imageDismissError",{title:"OK",callback:function(){this.image.hideProgressBar(!0)}}),a.FroalaEditor.DefineIcon("imageStyle",{NAME:"magic"}),a.FroalaEditor.RegisterCommand("imageStyle",{title:"Style",type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.imageStyles;for(var c in b)a+='<li><a class="fr-command" data-cmd="imageStyle" data-param1="'+c+'">'+this.language.translate(b[c])+"</a></li>";return a+="</ul>"},callback:function(a,b){this.image.applyStyle(b)},refreshOnShow:function(b,c){var d=this.image.get();d&&c.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",d.hasClass(b))})}}),a.FroalaEditor.DefineIcon("imageAlt",{NAME:"info"}),a.FroalaEditor.RegisterCommand("imageAlt",{undo:!1,focus:!1,title:"Alternate Text",callback:function(){this.image.showAltPopup()}}),a.FroalaEditor.RegisterCommand("imageSetAlt",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setAlt()}}),a.FroalaEditor.DefineIcon("imageSize",{NAME:"arrows-alt"}),a.FroalaEditor.RegisterCommand("imageSize",{undo:!1,focus:!1,title:"Change Size",callback:function(){this.image.showSizePopup()}}),a.FroalaEditor.RegisterCommand("imageSetSize",{undo:!0,focus:!1,callback:function(){this.image.setSize()}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";if(a.extend(a.FroalaEditor.DEFAULTS,{imageManagerLoadURL:"http://i.froala.com/load-files",imageManagerLoadMethod:"get",imageManagerLoadParams:{},imageManagerPreloader:"",imageManagerDeleteURL:"",imageManagerDeleteMethod:"post",imageManagerDeleteParams:{},imageManagerPageSize:12,imageManagerScrollOffset:20,imageManagerToggleTags:!0}),a.FroalaEditor.PLUGINS.imageManager=function(b){function c(){z.show(),F.show(),U=b.image.get(),A||x(),i(),b.$document.find("body").addClass("prevent-scroll"),b.helpers.isMobile()&&b.$document.find("body").addClass("fr-mobile")}function d(){b.events.enableBlur(),z.hide(),F.hide(),b.$document.find("body").removeClass("prevent-scroll fr-mobile")}function e(){var b=a(window).outerWidth();return 768>b?2:1200>b?3:4}function f(){B.empty();for(var a=0;K>a;a++)B.append('<div class="fr-list-column"></div>')}function g(){var c="";b.opts.theme&&(c=" "+b.opts.theme+"-theme");var d='<div class="fr-modal'+c+'"><div class="fr-modal-wrapper">';return d+='<div class="fr-modal-title"><div class="fr-modal-title-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-'+b.id+'" title="'+b.language.translate("Tags")+'"></i><h4 data-text="true">'+b.language.translate("Manage Images")+'</h4><i title="'+b.language.translate("Cancel")+'" class="fa fa-times fr-modal-close" id="fr-modal-close-'+b.id+'"></i></div>',d+='<div class="fr-modal-tags" id="fr-modal-tags-'+b.id+'"></div>',d+="</div>",d+='<img class="fr-preloader" id="fr-preloader-'+b.id+'" alt="'+b.language.translate("Loading")+'.." src="'+b.opts.imageManagerPreloader+'" style="display: none;">',d+='<div class="fr-scroller" id="fr-scroller-'+b.id+'"><div class="fr-image-list" id="fr-image-list-'+b.id+'"></div></div>',d+="</div></div>",a(d)}function h(){z=g(),b.helpers.isMobile()||z.addClass("fr-desktop"),z.appendTo("body"),F=a('<div class="fr-overlay">').appendTo("body"),b.opts.theme&&F.addClass(b.opts.theme+"-theme"),d(),b.events.on("destroy",function(){z.removeData().remove(),F.removeData().remove()},!0)}function i(){A.show(),B.find(".fr-list-column").empty(),b.opts.imageManagerLoadURL?a.ajax({url:b.opts.imageManagerLoadURL,method:b.opts.imageManagerLoadMethod,data:b.opts.imageManagerLoadParams,dataType:"json"}).done(function(a,c,d){b.events.trigger("imageManager.imagesLoaded",[a]),j(a,d.response),A.hide()}).fail(function(){var a=this.xhr();s(M,a.response||a.responseText)}):s(N)}function j(a,b){try{B.find(".fr-list-column").empty(),H=0,I=0,J=0,G=a,k()}catch(c){s(O,b)}}function k(){if(I<G.length&&(B.outerHeight()<=C.outerHeight()+b.opts.imageManagerScrollOffset||C.scrollTop()+b.opts.imageManagerScrollOffset>B.outerHeight()-C.outerHeight())){H++;for(var a=b.opts.imageManagerPageSize*(H-1);a<Math.min(G.length,b.opts.imageManagerPageSize*H);a++)l(G[a])}}function l(c){var d=new Image,e=a('<div class="fr-image-container fr-empty fr-image-'+J++ +'" data-loading="'+b.language.translate("Loading")+'.." data-deleting="'+b.language.translate("Deleting")+'..">');p(!1),d.onload=function(){e.height(Math.floor(e.width()/d.width*d.height));var f=a("<img/>");if(c.thumb)f.attr("src",c.thumb);else{if(s(P,c),!c.url)return s(Q,c),!1;f.attr("src",c.url)}if(c.url&&f.attr("data-url",c.url),c.tag)if(E.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"),E.find(".fr-modal-tags").show(),c.tag.indexOf(",")>=0){for(var g=c.tag.split(","),h=0;h<g.length;h++)g[h]=g[h].trim(),0===D.find('a[title="'+g[h]+'"]').length&&D.append('<a role="button" title="'+g[h]+'">'+g[h]+"</a>");f.attr("data-tag",g.join())}else 0===D.find('a[title="'+c.tag.trim()+'"]').length&&D.append('<a role="button" title="'+c.tag.trim()+'">'+c.tag.trim()+"</a>"),f.attr("data-tag",c.tag.trim());for(var i in c)"thumb"!=i&&"url"!=i&&"tag"!=i&&f.attr("data-"+i,c[i]);e.append(f).append('<i class="fa fa-trash-o fr-delete-img" title="'+b.language.translate("Delete")+'"></i>').append('<i class="fa fa-plus fr-insert-img" title="'+b.language.translate("Insert")+'"></i>'),D.find(".fr-selected-tag").each(function(a,b){w(f,b.text)||e.hide()}),f.on("load",function(){e.removeClass("fr-empty"),e.height("auto"),I++;var a=n(parseInt(f.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1);o(a),p(!1),I%b.opts.imageManagerPageSize===0&&k()}),b.events.trigger("imageManager.imageLoaded",[f])},d.onerror=function(){I++,e.remove();var a=n(parseInt(e.attr("class").match(/fr-image-(\d+)/)[1],10)+1);o(a),s(L,c),I%b.opts.imageManagerPageSize===0&&k()},d.src=c.url,m().append(e)}function m(){var b,c;return B.find(".fr-list-column").each(function(d,e){var f=a(e);0===d?(c=f.outerHeight(),b=f):f.outerHeight()<c&&(c=f.outerHeight(),b=f)}),b}function n(b){void 0===b&&(b=0);for(var c=[],d=J-1;d>=b;d--){var e=B.find(".fr-image-"+d);e.length&&(c.push(e),a('<div id="fr-image-hidden-container">').append(e),B.find(".fr-image-"+d).remove())}return c}function o(a){for(var b=a.length-1;b>=0;b--)m().append(a[b])}function p(a){if(void 0===a&&(a=!0),!z.is(":visible"))return!0;var c=e();if(c!=K){K=c;var d=n();f(),o(d)}var g=b.$window.height(),h=z.find(".fr-modal-wrapper"),i=parseFloat(h.css("margin-top"))+parseFloat(h.css("margin-bottom")),j=parseFloat(h.css("padding-top"))+parseFloat(h.css("padding-bottom")),l=parseFloat(h.css("border-top-width")),m=h.find("h4").outerHeight();C.height(Math.min(B.outerHeight(),g-i-j-m-l)),a&&k()}function q(c){var e=a(c.currentTarget).siblings("img");if(d(),b.image.showProgressBar(),U)U.trigger("click");else{b.events.focus(!0),b.selection.restore();var f=b.position.getBoundingRect(),g=f.left+f.width/2,h=f.top+f.height;b.popups.setContainer("image.insert",b.$box||a("body")),b.popups.show("image.insert",g,h)}var i={},j=e.data();for(var k in j)"url"!=k&&"tag"!=k&&(i[k]=j[k]);b.image.insert(e.data("url"),!1,i,U)}function r(c){var d=a(c.currentTarget).siblings("img"),e=b.language.translate("Are you sure? Image will be deleted.");confirm(e)&&(b.opts.imageManagerDeleteURL?b.events.trigger("imageManager.beforeDeleteImage",[d])!==!1&&(d.parent().addClass("fr-image-deleting"),a.ajax({method:b.opts.imageManagerDeleteMethod,url:b.opts.imageManagerDeleteURL,data:a.extend({src:d.attr("src")},b.opts.imageManagerDeleteParams)}).done(function(a){b.events.trigger("imageManager.imageDeleted",[a]);var c=n(parseInt(d.parent().attr("class").match(/fr-image-(\d+)/)[1],10)+1);d.parent().remove(),o(c),p(!0)}).fail(function(){var a=this.xhr();s(R,a.response||a.responseText)})):s(S))}function s(c,d){c>=10&&20>c?A.hide():c>=20&&30>c&&a(".fr-image-deleting").removeClass("fr-image-deleting"),b.events.trigger("imageManager.error",[{code:c,message:T[c]},d])}function t(){var a=E.find(".fr-modal-title-line").outerHeight(),b=D.outerHeight();E.toggleClass(".fr-show-tags"),E.hasClass(".fr-show-tags")?(E.css("height",a+b),D.find("a").css("opacity",1)):(E.css("height",a),D.find("a").css("opacity",0))}function u(){var b=D.find(".fr-selected-tag");b.length>0?(B.find("img").parent().show(),b.each(function(b,c){B.find("img").each(function(b,d){var e=a(d);w(e,c.text)||e.parent().hide()})})):B.find("img").parent().show();var c=n();o(c),k()}function v(c){c.preventDefault();var d=a(c.currentTarget);d.toggleClass("fr-selected-tag"),b.opts.imageManagerToggleTags&&d.siblings("a").removeClass("fr-selected-tag"),u()}function w(a,b){for(var c=a.attr("data-tag").split(","),d=0;d<c.length;d++)if(c[d]==b)return!0;return!1}function x(){A=z.find("#fr-preloader-"+b.id),B=z.find("#fr-image-list-"+b.id),C=z.find("#fr-scroller-"+b.id),D=z.find("#fr-modal-tags-"+b.id),E=D.parent(),K=e(),f();var c=E.find(".fr-modal-title-line").outerHeight();E.css("height",c),C.css("margin-top",c),b.events.bindClick(z,"i#fr-modal-close-"+b.id,d),a(window).on("resize.imagemanager"+b.id,p),b.helpers.isMobile()&&(b.events.bindClick(B,"div.fr-image-container",function(b){z.find(".fr-mobile-selected").removeClass("fr-mobile-selected"),a(b.currentTarget).addClass("fr-mobile-selected")}),z.on(b._mousedown,function(){z.find(".fr-mobile-selected").removeClass("fr-mobile-selected")})),b.events.bindClick(B,".fr-insert-img",q),b.events.bindClick(B,".fr-delete-img",r),z.on(b._mousedown+" "+b._mouseup,function(a){a.stopPropagation()}),z.on(b._mousedown,"*",function(){b.events.disableBlur()}),C.on("scroll",k),b.events.bindClick(z,"i#fr-modal-more-"+b.id,t),b.events.bindClick(D,"a",v),b.events.on("destroy",function(){a(window).off("resize.imagemanager"+b.id)},!0)}function y(){return b.$wp||"IMG"==b.$el.get(0).tagName?void h():!1}var z,A,B,C,D,E,F,G,H,I,J,K,L=10,M=11,N=12,O=13,P=14,Q=15,R=21,S=22,T={};T[L]="Image cannot be loaded from the passed link.",T[M]="Error during load images request.",T[N]="Missing imageManagerLoadURL option.",T[O]="Parsing load response failed.",T[P]="Missing image thumb.",T[Q]="Missing image URL.",T[R]="Error during delete image request.",T[S]="Missing imageManagerDeleteURL option.";var U;return{require:["image"],_init:y,show:c,hide:d}},!a.FroalaEditor.PLUGINS.image)throw new Error("Image manager plugin requires image plugin.");a.FroalaEditor.DEFAULTS.imageInsertButtons.push("imageManager"),a.FroalaEditor.RegisterCommand("imageManager",{title:"Browse",undo:!1,focus:!1,callback:function(){this.imageManager.show()}}),a.FroalaEditor.DefineIcon("imageManager",{NAME:"fa fa-folder"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{inlineStyles:{"Big Red":"font-size: 20px; color: red;","Small Blue":"font-size: 14px; color: blue;"}}),a.FroalaEditor.PLUGINS.inlineStyle=function(b){function c(c){""!==b.selection.text()?b.html.insert(a.FroalaEditor.START_MARKER+'<span style="'+c+'">'+b.selection.text()+"</span>"+a.FroalaEditor.END_MARKER):b.html.insert('<span style="'+c+'">'+a.FroalaEditor.INVISIBLE_SPACE+a.FroalaEditor.MARKERS+"</span>")}return{apply:c}},a.FroalaEditor.RegisterCommand("inlineStyle",{type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.inlineStyles;for(var c in b)a+='<li><span style="'+b[c]+'"><a class="fr-command" data-cmd="inlineStyle" data-param1="'+b[c]+'" title="'+this.language.translate(c)+'">'+this.language.translate(c)+"</a></span></li>";return a+="</ul>"},title:"Inline Style",callback:function(a,b){this.inlineStyle.apply(b)}}),a.FroalaEditor.DefineIcon("inlineStyle",{NAME:"paint-brush"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{lineBreakerTags:["table","hr","iframe","form","dl"],lineBreakerOffset:10}),a.FroalaEditor.PLUGINS.lineBreaker=function(b){function c(c,d){var e,f,g,h,i,j,k,l;if(null==c)h=d.parent(),i=h.offset().top,k=d.offset().top,e=k-Math.min((k-i)/2,b.opts.lineBreakerOffset),g=h.outerWidth(),f=h.offset().left;else if(null==d)h=c.parent(),j=h.offset().top+h.outerHeight(),l=c.offset().top+c.outerHeight(),e=l+Math.min((j-l)/2,b.opts.lineBreakerOffset),g=h.outerWidth(),f=h.offset().left;else{h=c.parent();var m=c.offset().top+c.height(),o=d.offset().top;if(m>o)return!1;e=(m+o)/2,g=h.outerWidth(),f=h.offset().left}b.opts.iframe&&(f+=b.$iframe.offset().left-a(b.original_window).scrollLeft(),e+=b.$iframe.offset().top-a(b.original_window).scrollTop()),n.css("top",e-b.window.pageYOffset),n.css("left",f-b.window.pageXOffset),n.css("width",g),n.data("tag1",c),n.data("tag2",d),n.show()}function d(a,d){var f,g,h=a.offset().top,i=a.offset().top+a.outerHeight();if(Math.abs(i-d)<=b.opts.lineBreakerOffset||Math.abs(d-h)<=b.opts.lineBreakerOffset)if(Math.abs(i-d)<Math.abs(d-h)){g=a.get(0);for(var j=g.nextSibling;j&&j.nodeType==Node.TEXT_NODE&&0===j.textContent.length;)j=j.nextSibling;j?(f=e(j),f&&c(a,f)):c(a,null)}else g=a.get(0),g.previousSibling?(f=e(g.previousSibling),f&&c(f,a)):c(null,a)}function e(c){if(c){var d=a(c);if(0===b.$el.find(d).length)return null;if(c.nodeType!=Node.TEXT_NODE&&b.opts.lineBreakerTags.indexOf(c.tagName.toLowerCase())>=0)return d;if(d.parents(b.opts.lineBreakerTags.join(",")).length>0)return c=d.parents(b.opts.lineBreakerTags.join(",")).get(0),a(c)}return null}function f(c){p=null,n.hide();var f,g,h,i=null,j=b.document.elementFromPoint(c.pageX-b.window.pageXOffset,c.pageY-b.window.pageYOffset);if(b.node.isElement(j))for(f=1;f<=b.opts.lineBreakerOffset;f++){if(g=b.document.elementFromPoint(c.pageX-b.window.pageXOffset,c.pageY-b.window.pageYOffset-f),g&&!b.node.isElement(g)&&g!=b.$wp.get(0)&&a(g).parents(b.$wp).length){i=e(g);break}if(h=b.document.elementFromPoint(c.pageX-b.window.pageXOffset,c.pageY-b.window.pageYOffset+f),h&&!b.node.isElement(h)&&h!=b.$wp.get(0)&&a(h).parents(b.$wp).length){i=e(h);break}}else i=e(j);i&&d(i,c.pageY)}function g(a){o===!1&&(p&&clearTimeout(p),p=setTimeout(f,30,a))}function h(){p&&clearTimeout(p),n.hide()}function i(){o=!0,h()}function j(){o=!1}function k(c){c.preventDefault(),n.hide();var d=n.data("tag1"),e=n.data("tag2"),f=b.html.defaultTag();null==d?f&&"TD"!=e.parent().get(0).tagName?e.before("<"+f+">"+a.FroalaEditor.MARKERS+"<br></"+f+">"):e.before(a.FroalaEditor.MARKERS+"<br>"):f&&"TD"!=d.parent().get(0).tagName?d.after("<"+f+">"+a.FroalaEditor.MARKERS+"<br></"+f+">"):d.after(a.FroalaEditor.MARKERS+"<br>"),b.selection.restore()}function l(){n=a('<div class="fr-line-breaker"><a role="button" tabindex="-1" title="'+b.language.translate("Break")+'"><i class="fa fa-plus"></i></a></div>'),b.$wp.append(n),b.events.on("destroy",function(){n.html("").removeData().remove()},!0),n.on("mouseleave.linebreaker"+b.id,h),n.on("mousemove",function(a){a.stopPropagation()}),n.on("mousedown","a",function(a){a.stopPropagation()}),n.on("click","a",k),b.events.on("destroy",function(){n.off("mouseleave.linebreaker"),n.off("mousedown"),n.off("mousedown","a"),n.off("click","a")},!0)}function m(){return b.$wp?(l(),o=!1,b.$window.on("mousemove.linebreaker"+b.id,g),a(b.window).on("scroll.linebreaker"+b.id,h),a(b.window).on("mousedown.linebreaker"+b.id,i),a(b.window).on("mouseup.linebreaker"+b.id,j),void b.events.on("destroy",function(){b.$window.off("mousemove.linebreaker"+b.id),a(b.window).off("scroll.linebreaker"+b.id),a(b.window).off("mousedown.linebreaker"+b.id),a(b.window).off("mouseup.linebreaker"+b.id)},!0)):!1}var n,o,p;return{_init:m}}});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{"link.edit":"[_BUTTONS_]","link.insert":"[_BUTTONS_][_INPUT_LAYER_]"}),a.extend(a.FroalaEditor.DEFAULTS,{linkEditButtons:["linkOpen","linkStyle","linkEdit","linkRemove"],linkInsertButtons:["linkBack","|","linkList"],linkAttributes:{},linkAutoPrefix:"http://",linkStyles:{"fr-green":"Green","fr-strong":"Thick"},linkMultipleStyles:!0,linkConvertEmailAddress:!0,linkAlwaysBlank:!1,linkAlwaysNoFollow:!1,linkList:[{text:"Froala",href:"https://froala.com",target:"_blank"},{text:"Google",href:"https://google.com",target:"_blank"},{displayText:"Facebook",href:"https://facebook.com"}],linkText:!0}),a.FroalaEditor.PLUGINS.link=function(b){function c(){}function d(){var c=b.image?b.image.get():null;if(!c&&b.$wp){var d=b.selection.element(),e=b.selection.endElement();return"A"!=d.tagName&&(d=a(d).parents("a:first").get(0)),"A"!=e.tagName&&(e=a(e).parents("a:first").get(0)),e&&e==d?d:null}return"A"==b.$el.get(0).tagName&&b.core.hasFocus()?b.$el:c&&c.get(0).parentNode&&"A"==c.get(0).parentNode.tagName?c.get(0).parentNode:void 0}function e(){var a=b.image?b.image.get():null,c=[];if(a)"A"==a.get(0).parentNode.tagName&&c.push(a.get(0).parentNode);else{var d,e,f,g;if(b.window.getSelection){var h=b.window.getSelection();if(h.getRangeAt&&h.rangeCount){g=b.document.createRange();for(var i=0;i<h.rangeCount;++i)if(d=h.getRangeAt(i),e=d.commonAncestorContainer,e&&1!=e.nodeType&&(e=e.parentNode),e&&"a"==e.nodeName.toLowerCase())c.push(e);else{f=e.getElementsByTagName("a");for(var j=0;j<f.length;++j)g.selectNodeContents(f[j]),g.compareBoundaryPoints(d.END_TO_START,d)<1&&g.compareBoundaryPoints(d.START_TO_END,d)>-1&&c.push(f[j])}}}else if(b.document.selection&&"Control"!=b.document.selection.type)if(d=b.document.selection.createRange(),e=d.parentElement(),"a"==e.nodeName.toLowerCase())c.push(e);else{f=e.getElementsByTagName("a"),g=b.document.body.createTextRange();for(var k=0;k<f.length;++k)g.moveToElementText(f[k]),g.compareEndPoints("StartToEnd",d)>-1&&g.compareEndPoints("EndToStart",d)<1&&c.push(f[k])}}return c}function f(c){setTimeout(function(){if(!c||c&&(1==c.which||"mouseup"!=c.type)){var e=d(),f=b.image?b.image.get():null;if(e&&!f){if(b.image){var h=b.node.contents(e);if(1==h.length&&"IMG"==h[0].tagName)return a(h[0]).trigger("click"),!1}c&&c.stopPropagation(),g(e)}else b.popups.hide("link.edit")}},b.helpers.isIOS()?100:0)}function g(c){var d=b.popups.get("link.edit");d||(d=i());var e=a(c);b.popups.isVisible("link.edit")||b.popups.refresh("link.edit"),b.popups.setContainer("link.edit",a(b.opts.scrollableContainer));var f=e.offset().left+a(c).outerWidth()/2,g=e.offset().top+e.outerHeight();b.popups.show("link.edit",f,g,e.outerHeight())}function h(){b.popups.hide("link.edit")}function i(){var a="";b.opts.linkEditButtons.length>1&&("A"==b.$el.get(0).tagName&&b.opts.linkEditButtons.indexOf("linkRemove")>=0&&b.opts.linkEditButtons.splice(b.opts.linkEditButtons.indexOf("linkRemove"),1),a='<div class="fr-buttons">'+b.button.buildList(b.opts.linkEditButtons)+"</div>");var c={buttons:a},e=b.popups.create("link.edit",c);return b.$wp&&b.$wp.on("scroll.link-edit",function(){d()&&b.popups.isVisible("link.edit")&&g(d())}),b.events.on("destroy",function(){b.$wp&&b.$wp.off("scroll.link-edit")}),e}function j(){}function k(){var c=b.popups.get("link.insert"),e=d();if(e){var f,g,h=a(e),i=c.find('input.fr-link-attr[type="text"]'),j=c.find('input.fr-link-attr[type="checkbox"]');for(f=0;f<i.length;f++)g=a(i[f]),g.val(h.attr(g.attr("name")||""));for(j.prop("checked",!1),f=0;f<j.length;f++)g=a(j[f]),h.attr(g.attr("name"))==g.data("checked")&&g.prop("checked",!0);c.find('input.fr-link-attr[type="text"][name="text"]').val(h.text())}else c.find('input.fr-link-attr[type="text"]').val(""),c.find('input.fr-link-attr[type="checkbox"]').prop("checked",!1),c.find('input.fr-link-attr[type="text"][name="text"]').val(b.selection.text());c.find("input.fr-link-attr").trigger("change");var k=b.image?b.image.get():null;k?c.find('.fr-link-attr[name="text"]').parent().hide():c.find('.fr-link-attr[name="text"]').parent().show()}function l(){var c=b.$tb.find('.fr-command[data-cmd="insertLink"]'),d=b.popups.get("link.insert");if(d||(d=m()),!d.hasClass("fr-active"))if(b.popups.refresh("link.insert"),b.popups.setContainer("link.insert",b.$tb||a(b.opts.scrollableContainer)),c.is(":visible")){var e=c.offset().left+c.outerWidth()/2,f=c.offset().top+(b.opts.toolbarBottom?10:c.outerHeight()-10);b.popups.show("link.insert",e,f,c.outerHeight())}else b.position.forSelection(d),b.popups.show("link.insert")}function m(){var a="";b.opts.linkInsertButtons.length>=1&&(a='<div class="fr-buttons">'+b.button.buildList(b.opts.linkInsertButtons)+"</div>");var c='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>',e="",f=0;e='<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-'+b.id+'">',e+='<div class="fr-input-line"><input name="href" type="text" class="fr-link-attr" placeholder="URL" tabIndex="'+ ++f+'"></div>',b.opts.linkText&&(e+='<div class="fr-input-line"><input name="text" type="text" class="fr-link-attr" placeholder="'+b.language.translate("Text")+'" tabIndex="'+ ++f+'"></div>');for(var g in b.opts.linkAttributes){var h=b.opts.linkAttributes[g];e+='<div class="fr-input-line"><input name="'+g+'" type="text" class="fr-link-attr" placeholder="'+b.language.translate(h)+'" tabIndex="'+ ++f+'"></div>'}b.opts.linkAlwaysBlank||(e+='<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-'+b.id+'" tabIndex="'+ ++f+'"><span>'+c+'</span></span><label for="fr-link-target-'+b.id+'">'+b.language.translate("Open in new tab")+"</label></div>"),e+='<div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="linkInsert" href="#" tabIndex="'+ ++f+'" type="button">'+b.language.translate("Insert")+"</button></div></div>";var i={buttons:a,input_layer:e},l=b.popups.create("link.insert",i);return b.popups.onRefresh("link.insert",k),b.popups.onHide("link.insert",j),b.$wp&&b.$wp.on("scroll.link-insert",function(){var a=b.image?b.image.get():null;a&&b.popups.isVisible("link.insert")&&v(),d&&b.popups.isVisible("link.insert")&&t()}),b.events.on("destroy",function(){b.$wp&&b.$wp.off("scroll.link-insert")}),l}function n(){var c=d(),e=b.image?b.image.get():null;return b.events.trigger("link.beforeRemove",[c])===!1?!1:void(e&&c?(e.unwrap(),e.trigger("click")):c&&(b.selection.save(),a(c).replaceWith(a(c).html()),b.selection.restore(),h()))}function o(){b.events.on("keyup",function(b){b.which!=a.FroalaEditor.KEYCODE.ESC&&f(b)}),b.events.on("window.mouseup",f)}function p(c){var d,e,f=b.opts.linkList[c],g=b.popups.get("link.insert"),h=g.find('input.fr-link-attr[type="text"]'),i=g.find('input.fr-link-attr[type="checkbox"]');for(e=0;e<h.length;e++)d=a(h[e]),f[d.attr("name")]?d.val(f[d.attr("name")]):d.val("");for(e=0;e<i.length;e++)d=a(i[e]),d.prop("checked",d.data("checked")==f[d.attr("name")])}function q(){var c,d,e=b.popups.get("link.insert"),f=e.find('input.fr-link-attr[type="text"]'),g=e.find('input.fr-link-attr[type="checkbox"]'),h=f.filter('[name="href"]').val(),i=f.filter('[name="text"]').val(),j={};for(d=0;d<f.length;d++)c=a(f[d]),["href","text"].indexOf(c.attr("name"))<0&&(j[c.attr("name")]=c.val());for(d=0;d<g.length;d++)c=a(g[d]),c.is(":checked")?j[c.attr("name")]=c.data("checked"):j[c.attr("name")]=c.data("unchecked");var k=a(b.original_window).scrollTop();s(h,i,j),a(b.original_window).scrollTop(k)}function r(){if(!b.selection.isCollapsed()){b.selection.save();for(var c=b.$el.find(".fr-marker").addClass("fr-unprocessed").toArray();c.length;){var d=a(c.pop());d.removeClass("fr-unprocessed");var e=b.node.deepestParent(d.get(0));if(e){var f=d.get(0),g="",h="";do f=f.parentNode,b.node.isBlock(f)||(g+=b.node.closeTagString(f),h=b.node.openTagString(f)+h);while(f!=e);var i=b.node.openTagString(d.get(0))+d.html()+b.node.closeTagString(d.get(0));d.replaceWith('<span id="fr-break"></span>');var j=a(e).html();j=j.replace(/<span id="fr-break"><\/span>/g,g+i+h),a(e).html(j)}c=b.$el.find(".fr-marker.fr-unprocessed").toArray()}b.selection.restore()}}function s(c,g,h){"undefined"==typeof h&&(h={});var i=b.image?b.image.get():null;i||"A"==b.$el.get(0).tagName?"A"==b.$el.get(0).tagName&&b.$el.focus():(b.events.focus(!0),b.selection.restore());var j=c;if(b.opts.linkConvertEmailAddress){var k=/^[\w._]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;k.test(c)&&0!==c.indexOf("mailto:")&&(c="mailto:"+c)}if(0===c.indexOf("tel:")||0===c.indexOf("sms:")||0===c.indexOf("mailto:")||0===c.indexOf("data:image")||""===b.opts.linkAutoPrefix||/^(https?:|ftps?:|)\/\//.test(c)||(c=b.opts.linkAutoPrefix+c),c=b.helpers.sanitizeURL(c),b.opts.linkAlwaysBlank&&(h.target="_blank"),b.opts.linkAlwaysNoFollow&&(h.rel="nofollow"),g=g||"",c===b.opts.linkAutoPrefix){var l=b.popups.get("link.insert");return l.find('input[name="href"]').addClass("fr-error"),b.events.trigger("link.bad",[j]),!1}var m,n=d();if(n){m=a(n);var o=b.node.rawAttributes(n);for(var p in o)"class"!=p&&"style"!=p&&m.removeAttr(p);m.attr("href",c),g.length>0&&m.text()!=g&&!i&&m.text(g),i||m.prepend(a.FroalaEditor.START_MARKER).append(a.FroalaEditor.END_MARKER),m.attr(h),i||b.selection.restore()}else{i?i.wrap('<a href="'+c+'"></a>'):(b.document.execCommand("unlink",!1,!1),b.selection.isCollapsed()?(g=0===g.length?j:g,b.html.insert('<a href="'+c+'">'+a.FroalaEditor.START_MARKER+g+a.FroalaEditor.END_MARKER+"</a>"),b.selection.restore()):g.length>0&&g!=b.selection.text()?(b.selection.remove(),b.html.insert('<a href="'+c+'">'+a.FroalaEditor.START_MARKER+g+a.FroalaEditor.END_MARKER+"</a>"),b.selection.restore()):(r(),b.document.execCommand("createLink",!1,c)));for(var q=e(),s=0;s<q.length;s++)m=a(q[s]),m.attr(h),m.removeAttr("_moz_dirty");1==q.length&&b.$wp&&!i?(a(q[0]).prepend(a.FroalaEditor.START_MARKER).append(a.FroalaEditor.END_MARKER),b.selection.restore()):b.popups.hide("link.insert")}i?(i.trigger("touchstart"),i.trigger(b.helpers.isMobile()?"touchend":"click")):(b.popups.get("link.insert"),f())}function t(){h();var c=d();if(c){var e=b.popups.get("link.insert");e||(e=m()),b.popups.isVisible("link.insert")||(b.popups.refresh("link.insert"),b.selection.save(),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur())),b.popups.setContainer("link.insert",a(b.opts.scrollableContainer));var f=(b.image?b.image.get():null)||a(c),g=f.offset().left+f.outerWidth()/2,i=f.offset().top+f.outerHeight();b.popups.show("link.insert",g,i,f.outerHeight())}}function u(){var a=b.image?b.image.get():null;if(a)a.trigger("click").trigger("touchend");else{b.events.disableBlur(),b.selection.restore(),b.events.enableBlur();var c=d();c&&b.$wp?(b.selection.restore(),h(),f()):"A"==b.$el.get(0).tagName?(b.$el.focus(),f()):(b.popups.hide("link.insert"),b.toolbar.showInline())}}function v(){var c=b.image?b.image.get():null;if(c){var d=b.popups.get("link.insert");d||(d=m()),k(!0),b.popups.setContainer("link.insert",a(b.opts.scrollableContainer));var e=c.offset().left+c.outerWidth()/2,f=c.offset().top+c.outerHeight();b.popups.show("link.insert",e,f,c.outerHeight())}}function w(c){var e=d();if(!e)return!1;if(!b.opts.linkMultipleStyles){var f=Object.keys(b.opts.linkStyles);f.splice(f.indexOf(c),1),a(e).removeClass(f.join(" "))}a(e).toggleClass(c)}return{_init:o,callback:c,remove:n,showInsertPopup:l,usePredefined:p,insertCallback:q,insert:s,update:t,get:d,allSelected:e,back:u,imageLink:v,applyStyle:w}},a.FroalaEditor.DefineIcon("insertLink",{NAME:"link"}),a.FroalaEditor.RegisterShortcut(75,"insertLink"),a.FroalaEditor.RegisterCommand("insertLink",{title:"Insert Link",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("link.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("link.insert")):this.link.showInsertPopup()}}),a.FroalaEditor.DefineIcon("linkOpen",{NAME:"external-link"}),a.FroalaEditor.RegisterCommand("linkOpen",{title:"Open Link",undo:!1,refresh:function(b){var c=this.link.get();c?(b.removeClass("fr-hidden"),b.attr("href",a(c).attr("href")).attr("target","_blank").attr("rel","nofollow")):b.addClass("fr-hidden")}}),a.FroalaEditor.DefineIcon("linkEdit",{NAME:"edit"}),a.FroalaEditor.RegisterCommand("linkEdit",{title:"Edit Link",undo:!1,refreshAfterCallback:!1,callback:function(){this.link.update()},refresh:function(a){var b=this.link.get();b?a.removeClass("fr-hidden"):a.addClass("fr-hidden")}}),a.FroalaEditor.DefineIcon("linkRemove",{NAME:"unlink"}),a.FroalaEditor.RegisterCommand("linkRemove",{title:"Unlink",callback:function(){this.link.remove()},refresh:function(a){var b=this.link.get();b?a.removeClass("fr-hidden"):a.addClass("fr-hidden")}}),a.FroalaEditor.DefineIcon("linkBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("linkBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.link.back()},refresh:function(a){var b=this.link.get(),c=this.image?this.image.get():null;c||b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FroalaEditor.DefineIcon("linkList",{NAME:"search"}),a.FroalaEditor.RegisterCommand("linkList",{title:"Choose Link",type:"dropdown",focus:!1,undo:!1,refreshAfterCallback:!1,html:function(){for(var a='<ul class="fr-dropdown-list">',b=this.opts.linkList,c=0;c<b.length;c++)a+='<li><a class="fr-command" data-cmd="linkList" data-param1="'+c+'">'+(b[c].displayText||b[c].text)+"</a></li>";return a+="</ul>"},callback:function(a,b){this.link.usePredefined(b)}}),a.FroalaEditor.RegisterCommand("linkInsert",{focus:!1,refreshAfterCallback:!1,callback:function(){this.link.insertCallback()},refresh:function(a){var b=this.link.get();b?a.text(this.language.translate("Update")):a.text(this.language.translate("Insert"))}}),a.FroalaEditor.DefineIcon("imageLink",{NAME:"link"}),a.FroalaEditor.RegisterCommand("imageLink",{title:"Insert Link",undo:!1,focus:!1,callback:function(){this.link.imageLink()},refresh:function(a){var b,c=this.link.get();c?(b=a.prev(),b.hasClass("fr-separator")&&b.removeClass("fr-hidden"),a.addClass("fr-hidden")):(b=a.prev(),b.hasClass("fr-separator")&&b.addClass("fr-hidden"),a.removeClass("fr-hidden"))}}),a.FroalaEditor.DefineIcon("linkStyle",{NAME:"magic"}),a.FroalaEditor.RegisterCommand("linkStyle",{title:"Style",type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.linkStyles;for(var c in b)a+='<li><a class="fr-command" data-cmd="linkStyle" data-param1="'+c+'">'+this.language.translate(b[c])+"</a></li>";return a+="</ul>"},callback:function(a,b){this.link.applyStyle(b)},refreshOnShow:function(b,c){var d=this.link.get();if(d){var e=a(d);c.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",e.hasClass(b))})}}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.FroalaEditor.PLUGINS.lists=function(b){function c(a){return'<span class="fr-open-'+a.toLowerCase()+'"></span>'}function d(a){return'<span class="fr-close-'+a.toLowerCase()+'"></span>'}function e(b,c){for(var d=[],e=0;e<b.length;e++){var f=b[e].parentNode;"LI"==b[e].tagName&&f.tagName!=c&&d.indexOf(f)<0&&d.push(f)}for(e=d.length-1;e>=0;e--){var g=a(d[e]);g.replaceWith("<"+c.toLowerCase()+">"+g.html()+"</"+c.toLowerCase()+">")}}function f(c,d){e(c,d);for(var f=b.html.defaultTag(),g=0;g<c.length;g++)"LI"!=c[g].tagName&&(f&&c[g].tagName.toLowerCase()==f?a(c[g]).replaceWith("<"+d+"><li"+b.node.attributes(c[g])+">"+a(c[g]).html()+"</li></"+d+">"):a(c[g]).wrap("<"+d+"><li></li></"+d+">"));b.clean.lists()}function g(e){var f,g;for(f=e.length-1;f>=0;f--)for(g=f-1;g>=0;g--)if(a(e[g]).find(e[f]).length||e[g]==e[f]){e.splice(f,1);break}var h=[];for(f=0;f<e.length;f++){var i=a(e[f]),j=e[f].parentNode;i.before(d(j.tagName)),"LI"==j.parentNode.tagName?(i.before(d("LI")),i.after(c("LI"))):(b.node.isEmpty(i.get(0),!0)||0!==i.find(b.html.blockTagsQuery()).length||i.append("<br>"),i.append(c("LI")),i.prepend(d("LI"))),i.after(c(j.tagName)),"LI"==j.parentNode.tagName&&(j=j.parentNode.parentNode),h.indexOf(j)<0&&h.push(j)}for(f=0;f<h.length;f++){var k=a(h[f]),l=k.html();l=l.replace(/<span class="fr-close-([a-z]*)"><\/span>/g,"</$1>"),l=l.replace(/<span class="fr-open-([a-z]*)"><\/span>/g,"<$1>"),k.replaceWith(b.node.openTagString(k.get(0))+l+b.node.closeTagString(k.get(0)))}b.$el.find("li:empty").remove(),b.$el.find("ul:empty, ol:empty").remove(),b.clean.lists(),b.html.wrap()}function h(a,b){for(var c=!0,d=0;d<a.length;d++){if("LI"!=a[d].tagName)return!1;a[d].parentNode.tagName!=b&&(c=!1)}return c}function i(a){b.selection.save(),b.html.wrap(!0,!0),b.selection.restore();for(var c=b.selection.blocks(),d=0;d<c.length;d++)"LI"!=c[d].tagName&&"LI"==c[d].parentNode.tagName&&(c[d]=c[d].parentNode);b.selection.save(),h(c,a)?g(c):f(c,a),b.html.unwrap(),b.selection.restore()}function j(c,d){var e=a(b.selection.element());if(e.get(0)!=b.$el.get(0)){var f=e.get(0);"LI"!=f.tagName&&(f=e.parents("li").get(0)),f&&f.parentNode.tagName==d&&b.$el.get(0).contains(f.parentNode)&&c.addClass("fr-active")}}function k(c){b.selection.save();for(var d=0;d<c.length;d++){var e=c[d].previousSibling;if(e){var f=a(c[d]).find("> ul, > ol").get(0);if(f){for(var g=a("<li>").prependTo(a(f)),h=b.node.contents(c[d])[0];h&&!b.node.isList(h);){var i=h.nextSibling;g.append(h),h=i}a(e).append(a(f)),a(c[d]).remove()}else{var j=a(e).find("> ul, > ol").get(0);if(j)a(j).append(a(c[d]));else{var k=a("<"+c[d].parentNode.tagName+">");a(e).append(k),k.append(a(c[d]))}}}}b.clean.lists(),b.selection.restore()}function l(a){b.selection.save(),g(a),b.selection.restore()}function m(a){if("indent"==a||"outdent"==a){for(var c=!1,d=b.selection.blocks(),e=[],f=0;f<d.length;f++)"LI"==d[f].tagName?(c=!0,e.push(d[f])):"LI"==d[f].parentNode.tagName&&(c=!0,e.push(d[f].parentNode));c&&("indent"==a?k(e):l(e))}}function n(){b.events.on("commands.after",m),b.events.on("keydown",function(c){if(c.which==a.FroalaEditor.KEYCODE.TAB){for(var d,e=b.selection.blocks(),f=[],g=0;g<e.length;g++)"LI"==e[g].tagName?(d=!0,f.push(e[g])):"LI"==e[g].parentNode.tagName&&(d=!0,f.push(e[g].parentNode));if(d)return c.preventDefault(),c.stopPropagation(),c.shiftKey?l(f):k(f),!1}},!0)}return{_init:n,format:i,refresh:j}},a.FroalaEditor.RegisterCommand("formatUL",{title:"Unordered List",refresh:function(a){this.lists.refresh(a,"UL")},callback:function(){this.lists.format("UL")}}),a.FroalaEditor.RegisterCommand("formatOL",{title:"Ordered List",refresh:function(a){this.lists.refresh(a,"OL")},callback:function(){this.lists.format("OL")}}),a.FroalaEditor.DefineIcon("formatUL",{NAME:"list-ul"}),a.FroalaEditor.DefineIcon("formatOL",{NAME:"list-ol"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{paragraphFormat:{N:"Normal",H1:"Heading 1",H2:"Heading 2",H3:"Heading 3",H4:"Heading 4",PRE:"Code"},paragraphFormatSelection:!1}),a.FroalaEditor.PLUGINS.paragraphFormat=function(b){function c(c,d){var e=b.html.defaultTag();if(d&&d.toLowerCase()!=e)if(c.find("ul, ol").length>0){var f=a("<"+d+">");c.prepend(f);for(var g=b.node.contents(c.get(0))[0];g&&["UL","OL"].indexOf(g.tagName)<0;){var h=g.nextSibling;f.append(g),g=h}}else c.html("<"+d+">"+c.html()+"</"+d+">")}function d(c,d){var e=b.html.defaultTag();d||(d='div class="fr-temp-div" data-empty="true"'),d.toLowerCase()==e?c.replaceWith(c.html()):c.replaceWith(a("<"+d+">").html(c.html()))}function e(c,d){var e=b.html.defaultTag();d||(d='div class="fr-temp-div"'+(b.node.isEmpty(c.get(0),!0)?' data-empty="true"':"")),d.toLowerCase()==e?(b.node.isEmpty(c.get(0),!0)||c.append("<br/>"),c.replaceWith(c.html())):c.replaceWith(a("<"+d+">").html(c.html()))}function f(c,d){d||(d='div class="fr-temp-div"'+(b.node.isEmpty(c.get(0),!0)?' data-empty="true"':"")),c.replaceWith(a("<"+d+" "+b.node.attributes(c.get(0))+">").html(c.html()))}function g(g){"N"==g&&(g=b.html.defaultTag()),b.selection.save(),b.html.wrap(!0,!0,!0),b.selection.restore();var h=b.selection.blocks();b.selection.save(),b.$el.find("pre").attr("skip",!0);for(var i=0;i<h.length;i++)if(h[i].tagName!=g){var j=a(h[i]);"LI"==h[i].tagName?c(j,g):"LI"==h[i].parentNode.tagName?d(j,g):["TD","TH"].indexOf(h[i].parentNode.tagName)>=0?e(j,g):f(j,g)}b.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function(){a(this).prev().append("<br>"+a(this).html()),a(this).remove()}),b.$el.find("pre").removeAttr("skip"),b.html.unwrap(),b.selection.restore()}function h(a,c){var d=b.selection.blocks();if(d.length){var e=d[0],f="N",g=b.html.defaultTag();e.tagName.toLowerCase()!=g&&e!=b.$el.get(0)&&(f=e.tagName),c.find('.fr-command[data-param1="'+f+'"]').addClass("fr-active")}else c.find('.fr-command[data-param1="N"]').addClass("fr-active")}function i(a,c){var d=b.selection.blocks();if(d.length){var e=d[0],f="N",g=b.html.defaultTag();e.tagName.toLowerCase()!=g&&e!=b.$el.get(0)&&(f=e.tagName),["LI","TD","TH"].indexOf(f)>=0&&(f="N"),a.find("> span").text(c.find('.fr-command[data-param1="'+f+'"]').text())}else a.find("> span").text(c.find('.fr-command[data-param1="N"]').text())}return{apply:g,refreshOnShow:h,refresh:i}},a.FroalaEditor.RegisterCommand("paragraphFormat",{type:"dropdown",displaySelection:function(a){return a.opts.paragraphFormatSelection},defaultSelection:"Normal",displaySelectionWidth:100,html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.paragraphFormat;for(var c in b)a+="<li><"+c+' style="padding: 0 !important; margin: 0 !important;"><a class="fr-command" data-cmd="paragraphFormat" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></"+c+"></li>";return a+="</ul>"},title:"Paragraph Format",callback:function(a,b){this.paragraphFormat.apply(b)},refresh:function(a,b){this.paragraphFormat.refresh(a,b)},refreshOnShow:function(a,b){this.paragraphFormat.refreshOnShow(a,b)}}),a.FroalaEditor.DefineIcon("paragraphFormat",{NAME:"paragraph"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{paragraphStyles:{"fr-text-gray":"Gray","fr-text-bordered":"Bordered","fr-text-spaced":"Spaced","fr-text-uppercase":"Uppercase"},paragraphMultipleStyles:!0}),a.FroalaEditor.PLUGINS.paragraphStyle=function(b){function c(c){var d="";b.opts.paragraphMultipleStyles||(d=Object.keys(b.opts.paragraphStyles),d.splice(d.indexOf(c),1),d=d.join(" ")),b.selection.save(),b.html.wrap(!0,!0,!0),b.selection.restore();var e=b.selection.blocks();b.selection.save();for(var f=0;f<e.length;f++)a(e[f]).removeClass(d).toggleClass(c),a(e[f]).hasClass("fr-temp-div")&&a(e[f]).removeClass("fr-temp-div"),""===a(e[f]).attr("class")&&a(e[f]).removeAttr("class");b.html.unwrap(),b.selection.restore()}function d(c,d){var e=b.selection.blocks();if(e.length){var f=a(e[0]);d.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",f.hasClass(b))})}}function e(){}return{_init:e,apply:c,refreshOnShow:d}},a.FroalaEditor.RegisterCommand("paragraphStyle",{type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.paragraphStyles;for(var c in b)a+='<li><a class="fr-command '+c+'" data-cmd="paragraphStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>";return a+="</ul>"},title:"Paragraph Style",callback:function(a,b){this.paragraphStyle.apply(b)},refreshOnShow:function(a,b){this.paragraphStyle.refreshOnShow(a,b)}}),a.FroalaEditor.DefineIcon("paragraphStyle",{NAME:"magic"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.FroalaEditor.PLUGINS.quote=function(b){function c(a){for(;a.parentNode&&a.parentNode!=b.$el.get(0);)a=a.parentNode;return a}function d(){var d,e=b.selection.blocks();for(d=0;d<e.length;d++)e[d]=c(e[d]);b.selection.save();var f=a("<blockquote>");for(f.insertBefore(e[0]),d=0;d<e.length;d++)f.append(e[d]);b.html.unwrap(),b.selection.restore()}function e(){var c,d=b.selection.blocks();for(c=0;c<d.length;c++)"BLOCKQUOTE"!=d[c].tagName&&(d[c]=a(d[c]).parentsUntil(b.$el,"BLOCKQUOTE").get(0));for(b.selection.save(),c=0;c<d.length;c++)d[c]&&a(d[c]).replaceWith(d[c].innerHTML);b.html.unwrap(),b.selection.restore()}function f(a){b.selection.save(),b.html.wrap(!0,!0),b.selection.restore(),"increase"==a?d():"decrease"==a&&e()}return{apply:f}},a.FroalaEditor.RegisterShortcut(222,"quote","increase"),a.FroalaEditor.RegisterShortcut(222,"quote","decrease",!0),a.FroalaEditor.RegisterCommand("quote",{title:"Quote",type:"dropdown",options:{increase:"Increase",decrease:"Decrease"},callback:function(a,b){this.quote.apply(b)}}),a.FroalaEditor.DefineIcon("quote",{NAME:"quote-left"})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{saveInterval:1e3,saveURL:null,saveParams:{},saveParam:"body",saveMethod:"POST"}),a.FroalaEditor.PLUGINS.save=function(b){function c(a,c){b.events.trigger("save.error",[{code:a,message:n[a]},c])}function d(d){if("undefined"==typeof d&&(d=b.html.get()),b.events.trigger("save.before")===!1)return!1;if(b.opts.saveURL){var e={};for(var f in b.opts.saveParams){var g=b.opts.saveParams[f];"function"==typeof g?e[f]=g.call(this):e[f]=g}var h={};h[b.opts.saveParam]=d,a.ajax({type:b.opts.saveMethod,url:b.opts.saveURL,data:a.extend(h,e),crossDomain:b.opts.requestWithCORS,xhrFields:{withCredentials:b.opts.requestWithCORS},headers:b.opts.requestHeaders}).done(function(a){b.events.trigger("save.after",[a])}).fail(function(a){c(m,a.response)})}else c(l)}function e(){clearTimeout(i),i=setTimeout(function(){var a=b.html.get();(j!=a||k)&&(j=a,k=!1,d(a))},b.opts.saveInterval)}function f(){e(),k=!1}function g(){k=!0}function h(){b.opts.saveInterval&&(j=b.html.get(),b.events.on("contentChanged",e),b.events.on("keydown",function(){clearTimeout(i)}))}var i=null,j=null,k=!1,l=1,m=2,n={};return n[l]="Missing saveURL option.",n[m]="Something went wrong during save.",{_init:h,save:d,reset:f,force:g}},a.FroalaEditor.DefineIcon("save",{NAME:"floppy-o"}),a.FroalaEditor.RegisterCommand("save",{title:"Save",undo:!1,focus:!1,refreshAfterCallback:!1,callback:function(){this.save.save()}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{"table.insert":"[_BUTTONS_][_ROWS_COLUMNS_]","table.edit":"[_BUTTONS_]","table.colors":"[_BUTTONS_][_COLORS_]"}),a.extend(a.FroalaEditor.DEFAULTS,{tableInsertMaxSize:10,tableEditButtons:["tableHeader","tableRemove","|","tableRows","tableColumns","tableStyle","-","tableCells","tableCellBackground","tableCellVerticalAlign","tableCellHorizontalAlign","tableCellStyle"],tableInsertButtons:["tableBack","|"],tableResizerOffset:5,tableResizingLimit:30,tableColorsButtons:["tableBack","|"],tableColors:["#61BD6D","#1ABC9C","#54ACD2","#2C82C9","#9365B8","#475577","#CCCCCC","#41A85F","#00A885","#3D8EB9","#2969B0","#553982","#28324E","#000000","#F7DA64","#FBA026","#EB6B56","#E25041","#A38F84","#EFEFEF","#FFFFFF","#FAC51C","#F37934","#D14841","#B8312F","#7C706B","#D1D5D8","REMOVE"],tableColorsStep:7,tableCellStyles:{"fr-highlighted":"Highlighted","fr-thick":"Thick"},tableStyles:{"fr-dashed-borders":"Dashed Borders","fr-alternate-rows":"Alternate Rows"},tableCellMultipleStyles:!0,tableMultipleStyles:!0}),a.FroalaEditor.PLUGINS.table=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="insertTable"]'),c=b.popups.get("table.insert");if(c||(c=g()),!c.hasClass("fr-active")){b.popups.refresh("table.insert"),b.popups.setContainer("table.insert",b.$tb);var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("table.insert",d,e,a.outerHeight())}}function d(){var c=B();if(c){var d=b.popups.get("table.edit");d||(d=i()),b.popups.setContainer("table.edit",a(b.opts.scrollableContainer));var e=I(c),f=(e.left+e.right)/2,g=e.bottom;if(b.popups.show("table.edit",f,g,e.bottom-e.top),b.$el.find(".fr-selected-cell").length>1){b.toolbar.disable(),b.$el.removeClass("fr-no-selection"),b.edit.on();var h=a(b.original_window).scrollTop();b.$el.focus(),b.selection.setAtEnd(b.$el.find(".fr-selected-cell:last").get(0)),b.selection.restore(),a(b.original_window).scrollTop(h),b.button.bulkRefresh()}}}function e(){var c=B();if(c){var d=b.popups.get("table.colors");d||(d=j()),b.popups.setContainer("table.colors",a(b.opts.scrollableContainer));var e=I(c),f=(e.left+e.right)/2,g=e.bottom;l(),b.popups.show("table.colors",f,g,e.bottom-e.top)}}function f(){0===b.$el.get(0).querySelectorAll(".fr-selected-cell").length&&b.toolbar.enable()}function g(){var c="";b.opts.tableInsertButtons.length>0&&(c='<div class="fr-buttons">'+b.button.buildList(b.opts.tableInsertButtons)+"</div>");var d={buttons:c,rows_columns:h()},e=b.popups.create("table.insert",d);return b.popups.onHide("table.insert",function(){e.find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")}),e.on("mouseenter",".fr-table-size .fr-select-table-size .fr-table-cell",function(c){var d=a(c.currentTarget),e=d.data("row"),f=d.data("col"),g=d.parent();g.siblings(".fr-table-size-info").html(e+" &times; "+f),g.find("> span").removeClass("hover");for(var h=1;h<=b.opts.tableInsertMaxSize;h++)for(var i=0;i<=b.opts.tableInsertMaxSize;i++){var j=g.find('> span[data-row="'+h+'"][data-col="'+i+'"]');e>=h&&f>=i?j.addClass("hover"):e+1>=h||2>=h&&!b.helpers.isMobile()?j.css("display","inline-block"):h>2&&!b.helpers.isMobile()&&j.css("display","none")}}),b.events.on("destroy",function(){e.off("mouseenter",".fr-table-size .fr-select-table-size .fr-table-cell")},!0),e}function h(){for(var a='<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">',c=1;c<=b.opts.tableInsertMaxSize;c++){for(var d=1;d<=b.opts.tableInsertMaxSize;d++){var e="inline-block";c>2&&!b.helpers.isMobile()&&(e="none");var f="fr-table-cell ";1==c&&1==d&&(f+=" hover"),a+='<span class="fr-command '+f+'" data-cmd="tableInsert" data-row="'+c+'" data-col="'+d+'" data-param1="'+c+'" data-param2="'+d+'" style="display: '+e+';"><span></span></span>'}a+='<div class="new-line"></div>'}return a+="</div></div>"}function i(){var a="";b.opts.tableEditButtons.length>0&&(a='<div class="fr-buttons">'+b.button.buildList(b.opts.tableEditButtons)+"</div>");var c={buttons:a},e=b.popups.create("table.edit",c);return b.popups.onHide("table.edit",f),b.$wp.on("scroll.table-edit",function(){b.popups.isVisible("table.edit")&&d()}),b.events.on("destroy",function(){b.$wp.off("scroll.table-edit")}),e}function j(){var a="";b.opts.tableColorsButtons.length>0&&(a='<div class="fr-buttons fr-table-colors-buttons">'+b.button.buildList(b.opts.tableColorsButtons)+"</div>");var c={buttons:a,colors:k()},d=b.popups.create("table.colors",c);return b.$wp.on("scroll.table-colors",function(){b.popups.isVisible("table.colors")&&e()}),b.events.on("destroy",function(){b.$wp.off("scroll.table-colors")}),d}function k(){for(var a='<div class="fr-table-colors">',c=0;c<b.opts.tableColors.length;c++)0!==c&&c%b.opts.tableColorsStep===0&&(a+="<br>"),a+="REMOVE"!=b.opts.tableColors[c]?'<span class="fr-command" style="background: '+b.opts.tableColors[c]+';" data-cmd="tableCellBackgroundColor" data-param1="'+b.opts.tableColors[c]+'"></span>':'<span class="fr-command" data-cmd="tableCellBackgroundColor" data-param1="REMOVE" title="'+b.language.translate("Clear Formatting")+'"><i class="fa fa-eraser"></i></span>';return a+="</div>"}function l(){var a=b.popups.get("table.colors"),c=b.$el.find(".fr-selected-cell:first");a.find(".fr-selected-color").removeClass("fr-selected-color"),a.find('span[data-param1="'+b.helpers.RGBToHex(c.css("background-color"))+'"]').addClass("fr-selected-color")}function m(c,d){var e,f,g='<table style="width: 100%;"><tbody>',h=100/d;for(e=0;c>e;e++){for(g+="<tr>",f=0;d>f;f++)g+='<td style="width: '+h.toFixed(4)+'%;">',0===e&&0===f&&(g+=a.FroalaEditor.MARKERS),g+="<br></td>";g+="</tr>"}g+="</tbody></table>",b.html.insert(g),b.selection.restore()}function n(){if(b.$el.find(".fr-selected-cell").length>0){var a=b.$el.find(".fr-selected-cell").closest("table");b.selection.setBefore(a.get(0))||b.selection.setAfter(a.get(0)),b.selection.restore(),b.popups.hide("table.edit"),a.remove()}}function o(){var c=b.$el.find(".fr-selected-cell").closest("table");if(c.length>0&&0===c.find("th").length){var e,f="<thead><tr>",g=0;for(c.find("tr:first > td").each(function(){var b=a(this);g+=parseInt(b.attr("colspan"),10)||1}),e=0;g>e;e++)f+="<th><br></th>";f+="</tr></thead>",c.prepend(f),d()}}function p(){var a=b.$el.find(".fr-selected-cell").closest("table"),c=a.find("thead");if(c.length>0)if(0===a.find("tbody tr").length)n();else if(c.remove(),b.$el.find(".fr-selected-cell").length>0)d();else{b.popups.hide("table.edit");var e=a.find("tbody tr:first td:first").get(0);e&&(b.selection.setAtEnd(e),b.selection.restore())}}function q(c){var e=b.$el.find(".fr-selected-cell").closest("table");if(e.length>0){if(b.$el.find("th.fr-selected-cell").length>0&&"above"==c)return;var f,g,h=B(),i=G(h);g="above"==c?i.min_i:i.max_i;var j="<tr>";for(f=0;f<h[g].length;f++)if("below"==c&&g<h.length-1&&h[g][f]==h[g+1][f]||"above"==c&&g>0&&h[g][f]==h[g-1][f]){if(0===f||f>0&&h[g][f]!=h[g][f-1]){var k=a(h[g][f]);k.attr("rowspan",parseInt(k.attr("rowspan"),10)+1)}}else j+="<td><br></td>";j+="</tr>";var l=a(e.find("tr").not(e.find("table tr")).get(g));"below"==c?l.after(j):"above"==c&&(l.before(j),d())}}function r(){var c=b.$el.find(".fr-selected-cell").closest("table");if(c.length>0){var d,e,f,g=B(),h=G(g);if(0===h.min_i&&h.max_i==g.length-1)n();else{for(d=h.max_i;d>=h.min_i;d--){for(f=a(c.find("tr").not(c.find("table tr")).get(d)),e=0;e<g[d].length;e++)if(0===e||g[d][e]!=g[d][e-1]){var i=a(g[d][e]);if(parseInt(i.attr("rowspan"),10)>1){var j=parseInt(i.attr("rowspan"),10)-1;1==j?i.removeAttr("rowspan"):i.attr("rowspan",j)}if(d<g.length-1&&g[d][e]==g[d+1][e]&&(0===d||g[d][e]!=g[d-1][e])){for(var k=g[d][e],l=e;l>0&&g[d][l]==g[d][l-1];)l--;0===l?a(c.find("tr").not(c.find("table tr")).get(d+1)).prepend(k):a(g[d+1][l-1]).after(k)}}var m=f.parent();f.remove(),0===m.find("tr").length&&m.remove(),g=B(c)}h.min_i>0?b.selection.setAtEnd(g[h.min_i-1][0]):b.selection.setAtEnd(g[0][0]),b.selection.restore(),b.popups.hide("table.edit")}}}function s(c){var e=b.$el.find(".fr-selected-cell").closest("table");if(e.length>0){var f,g=B(),h=G(g);f="before"==c?h.min_j:h.max_j;var i,j=100/g[0].length,k=100/(g[0].length+1);e.find("th, td").each(function(){i=a(this),i.data("old-width",i.outerWidth()/e.outerWidth()*100)}),e.find("tr").not(e.find("table tr")).each(function(b){for(var d,e=a(this),h=0,i=0;f>h-1;){if(d=e.find("> th, > td").get(i),!d){d=null;break}d==g[b][h]?(h+=parseInt(a(d).attr("colspan"),10)||1,i++):(h+=parseInt(a(g[b][h]).attr("colspan"),10)||1,"after"==c&&(d=0===i?-1:e.find("> th, > td").get(i-1)))}var l=a(d);if("after"==c&&h-1>f||"before"==c&&f>0&&g[b][f]==g[b][f-1]){if(0===b||b>0&&g[b][f]!=g[b-1][f]){var m=parseInt(l.attr("colspan"),10)+1;l.attr("colspan",m),l.css("width",(l.data("old-width")*k/j+k).toFixed(4)+"%"),l.removeData("old-width")}}else{var n;n=e.find("th").length>0?'<th style="width: '+k.toFixed(4)+'%;"><br></th>':'<td style="width: '+k.toFixed(4)+'%;"><br></td>',-1==d?e.prepend(n):null==d?e.append(n):"before"==c?l.before(n):"after"==c&&l.after(n)}}),e.find("th, td").each(function(){i=a(this),i.data("old-width")&&(i.css("width",(i.data("old-width")*k/j).toFixed(4)+"%"),i.removeData("old-width"))}),d()}}function t(){var c=b.$el.find(".fr-selected-cell").closest("table");if(c.length>0){var d,e,f,g=B(),h=G(g);if(0===h.min_j&&h.max_j==g[0].length-1)n();else{var i=100/g[0].length,j=100/(g[0].length-h.max_j+h.min_j-1);for(c.find("th, td").each(function(){f=a(this),f.hasClass("fr-selected-cell")||f.data("old-width",f.outerWidth()/c.outerWidth()*100)}),e=h.max_j;e>=h.min_j;e--)for(d=0;d<g.length;d++)if(0===d||g[d][e]!=g[d-1][e])if(f=a(g[d][e]),parseInt(f.attr("colspan"),10)>1){var k=parseInt(f.attr("colspan"),10)-1;1==k?f.removeAttr("colspan"):f.attr("colspan",k),f.css("width",((f.data("old-width")-T(e,g))*j/i).toFixed(4)+"%"),f.removeData("old-width")}else{var l=a(f.parent().get(0));f.remove(),0===l.find("> th, > td").length&&(0===l.prev().length||0===l.next().length||l.prev().find("> th[rowspan], > td[rowspan]").length<l.prev().find("> th, > td").length)&&l.remove()}h.min_j>0?b.selection.setAtEnd(g[h.min_i][h.min_j-1]):b.selection.setAtEnd(g[h.min_i][0]),b.selection.restore(),b.popups.hide("table.edit"),c.find("th, td").each(function(){f=a(this),f.data("old-width")&&(f.css("width",(f.data("old-width")*j/i).toFixed(4)+"%"),f.removeData("old-width"))})}}}function u(){if(b.$el.find(".fr-selected-cell").length>1&&(0===b.$el.find("th.fr-selected-cell").length||0===b.$el.find("td.fr-selected-cell").length)){var c,e,f,g=B(),h=G(g),i=b.$el.find(".fr-selected-cell"),j=a(i[0]),k=j.parent(),l=k.find(".fr-selected-cell"),m=j.closest("table"),n=j.html(),o=0;for(c=0;c<l.length;c++)o+=a(l[c]).outerWidth();for(j.css("width",(o/k.outerWidth()*100).toFixed(4)+"%"),h.min_j<h.max_j&&j.attr("colspan",h.max_j-h.min_j+1),h.min_i<h.max_i&&j.attr("rowspan",h.max_i-h.min_i+1),c=1;c<i.length;c++)e=a(i[c]),"<br>"!=e.html()&&""!==e.html()&&(n+="<br>"+e.html()),e.remove();j.html(n),b.selection.setAtEnd(j.get(0)),b.selection.restore(),b.toolbar.enable();var p=m.find("tr:empty");for(c=p.length-1;c>=0;c--)f=a(p[c]),(0===f.prev().length||0===f.next().length||f.prev().find("> th[rowspan], > td[rowspan]").length<f.prev().find("> th, > td").length)&&f.remove();d()}}function v(){if(1==b.$el.find(".fr-selected-cell").length){var c=b.$el.find(".fr-selected-cell"),d=c.parent(),e=c.closest("table"),f=parseInt(c.attr("rowspan"),10),g=B(),h=C(c.get(0),g),i=c.clone().html("<br>");if(f>1){var j=Math.ceil(f/2);j>1?c.attr("rowspan",j):c.removeAttr("rowspan"),f-j>1?i.attr("rowspan",f-j):i.removeAttr("rowspan");for(var k=h.row+j,l=0===h.col?h.col:h.col-1;l>=0&&(g[k][l]==g[k][l-1]||k>0&&g[k][l]==g[k-1][l]);)l--;-1==l?a(e.find("tr").not(e.find("table tr")).get(k)).prepend(i):a(g[k][l]).after(i)}else{var m,n=a("<tr>").append(i);for(m=0;m<g[0].length;m++)if(0===m||g[h.row][m]!=g[h.row][m-1]){var o=a(g[h.row][m]);o.is(c)||o.attr("rowspan",(parseInt(o.attr("rowspan"),10)||1)+1)}d.after(n)}E(),b.popups.hide("table.edit")}}function w(){if(1==b.$el.find(".fr-selected-cell").length){var c=b.$el.find(".fr-selected-cell"),d=parseInt(c.attr("colspan"),10)||1,e=c.parent().outerWidth(),f=c.outerWidth(),g=c.clone().html("<br>"),h=B(),i=C(c.get(0),h);if(d>1){var j=Math.ceil(d/2);f=U(i.col,i.col+j-1,h)/e*100;var k=U(i.col+j,i.col+d-1,h)/e*100;j>1?c.attr("colspan",j):c.removeAttr("colspan"),d-j>1?g.attr("colspan",d-j):g.removeAttr("colspan"),c.css("width",f.toFixed(4)+"%"),g.css("width",k.toFixed(4)+"%")}else{var l;for(l=0;l<h.length;l++)if(0===l||h[l][i.col]!=h[l-1][i.col]){var m=a(h[l][i.col]);if(!m.is(c)){var n=(parseInt(m.attr("colspan"),10)||1)+1;m.attr("colspan",n)}}f=f/e*100/2,c.css("width",f.toFixed(4)+"%"),g.css("width",f.toFixed(4)+"%")}c.after(g),E(),b.popups.hide("table.edit")}}function x(a){"REMOVE"!=a?b.$el.find(".fr-selected-cell").css("background-color",b.helpers.HEXtoRGB(a)):b.$el.find(".fr-selected-cell").css("background-color","")}function y(a){b.$el.find(".fr-selected-cell").css("vertical-align",a)}function z(a){b.$el.find(".fr-selected-cell").css("text-align",a)}function A(a,b,c,d){if(b.length>0){if(!c){var e=Object.keys(d);e.splice(e.indexOf(a),1),b.removeClass(e.join(" "))}b.toggleClass(a)}}function B(c){c=c||null;var d=[];if(null==c&&b.$el.find(".fr-selected-cell").length>0&&(c=b.$el.find(".fr-selected-cell").closest("table")),c){var e=a(c);return e.find("tr").not(e.find("table tr")).each(function(b,c){var e=a(c),f=0;e.find("> th, > td").each(function(c,e){for(var g=a(e),h=parseInt(g.attr("colspan"),10)||1,i=parseInt(g.attr("rowspan"),10)||1,j=b;b+i>j;j++)for(var k=f;f+h>k;k++)d[j]||(d[j]=[]),d[j][k]?f++:d[j][k]=e;f+=h})}),d}}function C(a,b){for(var c=0;c<b.length;c++)for(var d=0;d<b[c].length;d++)if(b[c][d]==a)return{row:c,col:d}}function D(a,b,c){for(var d=a+1,e=b+1;d<c.length;){if(c[d][b]!=c[a][b]){d--;break}d++}for(d==c.length&&d--;e<c[a].length;){if(c[a][e]!=c[a][b]){e--;break}e++}return e==c[a].length&&e--,{row:d,col:e}}function E(){var c=b.$el.find(".fr-selected-cell");c.length>0&&c.each(function(){var b=a(this);b.removeClass("fr-selected-cell"),""===b.attr("class")&&b.removeAttr("class")})}function F(){setTimeout(function(){b.selection.clear(),b.$el.addClass("fr-no-selection"),b.edit.off(),b.$el.blur()},0)}function G(a){var c,d=a.length,e=0,f=a[0].length,g=0,h=b.$el.find(".fr-selected-cell");for(c=0;c<h.length;c++){var i=C(h[c],a),j=D(i.row,i.col,a);d=Math.min(i.row,d),e=Math.max(j.row,e),f=Math.min(i.col,f),g=Math.max(j.col,g)}return{min_i:d,max_i:e,min_j:f,max_j:g}}function H(b,c,d,e,f){var g,h,i,j,k=b,l=c,m=d,n=e;for(g=k;l>=g;g++)((parseInt(a(f[g][m]).attr("rowspan"),10)||1)>1||(parseInt(a(f[g][m]).attr("colspan"),10)||1)>1)&&(i=C(f[g][m],f),j=D(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n)),((parseInt(a(f[g][n]).attr("rowspan"),10)||1)>1||(parseInt(a(f[g][n]).attr("colspan"),10)||1)>1)&&(i=C(f[g][n],f),j=D(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n));for(h=m;n>=h;h++)((parseInt(a(f[k][h]).attr("rowspan"),10)||1)>1||(parseInt(a(f[k][h]).attr("colspan"),10)||1)>1)&&(i=C(f[k][h],f),j=D(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n)),((parseInt(a(f[l][h]).attr("rowspan"),10)||1)>1||(parseInt(a(f[l][h]).attr("colspan"),10)||1)>1)&&(i=C(f[l][h],f),j=D(i.row,i.col,f),k=Math.min(i.row,k),l=Math.max(j.row,l),m=Math.min(i.col,m),n=Math.max(j.col,n));return k==b&&l==c&&m==d&&n==e?{min_i:b,max_i:c,min_j:d,max_j:e}:H(k,l,m,n,f)}function I(b){var c=G(b),d=a(b[c.min_i][c.min_j]),e=a(b[c.min_i][c.max_j]),f=a(b[c.max_i][c.min_j]),g=d.offset().left,h=e.offset().left+e.outerWidth(),i=d.offset().top,j=f.offset().top+f.outerHeight();return{left:g,right:h,top:i,bottom:j}}function J(b,c){if(a(b).is(c))E(),a(b).addClass("fr-selected-cell");else{F();var d=B(),e=C(b,d),f=C(c,d),g=H(Math.min(e.row,f.row),Math.max(e.row,f.row),Math.min(e.col,f.col),Math.max(e.col,f.col),d);E();for(var h=g.min_i;h<=g.max_i;h++)for(var i=g.min_j;i<=g.max_j;i++)a(d[h][i]).addClass("fr-selected-cell")}}function K(c){var d=null,e=a(c.target);return"TD"==c.target.tagName||"TH"==c.target.tagName?d=c.target:e.closest("td").length>0?d=e.closest("td").get(0):e.closest("th").length>0&&(d=e.closest("th").get(0)),0===b.$el.find(d).length?null:d}function L(c){if(b.$el.find(".fr-selected-cell").length>0&&!c.shiftKey&&(E(),b.$el.removeClass("fr-no-selection"),b.edit.on()),1==c.which){var d=K(c);if(d){b.popups.hide("table.edit"),c.stopPropagation(),b.events.trigger("image.hideResizer"),b.events.trigger("video.hideResizer"),_=!0;var e=d.tagName.toLowerCase();c.shiftKey&&a(e+".fr-selected-cell").length>0?a(a(e+".fr-selected-cell").closest("table")).is(a(d).closest("table"))?J(aa,d):F():((b.keys.ctrlKey(c)||c.shiftKey)&&F(),aa=d,J(aa,aa))}}}function M(c){if(1==c.which){if(_){_=!1;var e=K(c);e||1!=b.$el.find(".fr-selected-cell").length?b.$el.find(".fr-selected-cell").length>0&&(b.selection.isCollapsed()?d():E()):E()}else b.$tb.is(c.target)||b.$tb.is(a(c.target).closest(b.$tb.get(0)))||(b.$el.get(0).querySelectorAll(".fr-selected-cell").length>0&&b.toolbar.enable(),E());if(ca){ca=!1,$.removeClass("fr-moving"),b.$el.removeClass("fr-no-selection"),b.edit.on(),$.find("div").css("opacity",0),$.hide();var f=parseFloat($.css("left"))+b.opts.tableResizerOffset;b.opts.iframe&&(f-=b.$iframe.offset().left),$.data("release-position",f),$.removeData("max-left"),$.removeData("max-right"),S(c)}}}function N(c){if(_===!0){var d=a(c.currentTarget);if(d.closest("table").is(b.$el.find(".fr-selected-cell").closest("table"))){if("TD"==c.currentTarget.tagName&&0===b.$el.find("th.fr-selected-cell").length)return void J(aa,c.currentTarget);if("TH"==c.currentTarget.tagName&&0===b.$el.find("td.fr-selected-cell").length)return void J(aa,c.currentTarget)}F()}}function O(a){(37==a.which||38==a.which||39==a.which||40==a.which)&&b.$el.find(".fr-selected-cell").length>0&&(E(),b.popups.hide("table.edit"))}function P(){$=a('<div class="fr-table-resizer"><div></div></div>'),b.$wp.append($),$.on("mousedown",function(){ca=!0,$.addClass("fr-moving"),E(),F(),$.find("div").css("opacity",1)}),b.events.on("destroy",function(){$.off("mousedown"),$.html("").removeData().remove()},!0)}function Q(c){ba=null;var d=b.document.elementFromPoint(c.pageX-b.window.pageXOffset,c.pageY-b.window.pageYOffset),e=a(d);if(d&&"TD"!=d.tagName&&"TH"!=d.tagName&&(e.closest("td").length>0?d=e.closest("td"):e.closest("th").length>0&&(d=e.closest("th"))),d&&("TD"==d.tagName||"TH"==d.tagName)){if(e=a(d),0===b.$el.find(e).length)return!1;var f=e.offset().left-1,g=f+e.outerWidth();if(Math.abs(c.pageX-f)<=b.opts.tableResizerOffset||Math.abs(g-c.pageX)<=b.opts.tableResizerOffset){var h,i,j,k,l,m=B(e.closest("table")),n=C(d,m),o=D(n.row,n.col,m),p=e.closest("table"),q=p.offset().top,r=p.outerHeight()-1;if(c.pageX-f<=b.opts.tableResizerOffset)if(j=f,n.col>0&&m[n.row][n.col-1]){var s=a(m[n.row][n.col-1]);k=1==(parseInt(s.attr("colspan"),10)||1)?s.offset().left-1+b.opts.tableResizingLimit:f-T(n.col-1,m)+b.opts.tableResizingLimit,l=1==(parseInt(e.attr("colspan"),10)||1)?f+e.outerWidth()-b.opts.tableResizingLimit:f+T(n.col,m)-b.opts.tableResizingLimit,h=n.col-1,i=n.col}else h=null,i=n.col,k=p.parent().offset().left+parseFloat(p.parent().css("padding-left")),l=p.offset().left-1+p.outerWidth()-m[0].length*b.opts.tableResizingLimit;else if(g-c.pageX<=b.opts.tableResizerOffset)if(j=g,o.col<m[o.row].length&&m[o.row][o.col+1]){var t=a(m[o.row][o.col+1]);k=1==(parseInt(e.attr("colspan"),10)||1)?f+b.opts.tableResizingLimit:g-T(o.col,m)+b.opts.tableResizingLimit,l=1==(parseInt(t.attr("colspan"),10)||1)?g+t.outerWidth()-b.opts.tableResizingLimit:g+T(n.col+1,m)-b.opts.tableResizingLimit,h=o.col,i=o.col+1}else{h=o.col,i=null;var u=p.parent();k=p.offset().left-1+m[0].length*b.opts.tableResizingLimit,l=u.offset().left-1+u.width()+parseFloat(u.css("padding-left"))}$.data("table",p),$.data("first",h),$.data("second",i);var v=j-b.window.pageXOffset-b.opts.tableResizerOffset,w=q-b.window.pageYOffset;b.opts.iframe&&(v+=b.$iframe.offset().left-a(b.original_window).scrollLeft(),w+=b.$iframe.offset().top-a(b.original_window).scrollTop(),k+=b.$iframe.offset().left,l+=b.$iframe.offset().left),$.data("max-left",k),$.data("max-right",l),$.data("origin",j-b.window.pageXOffset),$.css("top",w),$.css("left",v),$.css("height",r),$.find("div").css("height",r),$.css("padding-left",b.opts.tableResizerOffset),$.css("padding-right",b.opts.tableResizerOffset),$.show()}else $.hide()}}function R(){if(ca){var a=$.data("table");$.css("top",a.offset().top-b.window.pageYOffset)}}function S(){var c=$.data("origin"),d=$.data("release-position");if(c!==d){var e=$.data("first"),f=$.data("second"),g=$.data("table"),h=g.outerWidth();if(null!==e&&null!==f){var i,j,k,l=B(g),m=[],n=[],o=[],p=[];for(i=0;i<l.length;i++)j=a(l[i][e]),k=a(l[i][f]),m[i]=j.outerWidth(),o[i]=k.outerWidth(),n[i]=m[i]/h*100,p[i]=o[i]/h*100;for(i=0;i<l.length;i++){j=a(l[i][e]),k=a(l[i][f]);var q=(n[i]*(m[i]+d-c)/m[i]).toFixed(4);j.css("width",q+"%"),k.css("width",(n[i]+p[i]-q).toFixed(4)+"%")}}else{var r,s=g.parent(),t=h/s.width()*100;r=null==e?(h-d+c)/h*t:(h+d-c)/h*t,g.css("width",Math.round(r).toFixed(4)+"%")}}$.removeData("origin"),$.removeData("release-position"),$.removeData("first"),$.removeData("second"),$.removeData("table"),b.undo.saveStep()}function T(b,c){var d,e=a(c[0][b]).outerWidth();for(d=1;d<c.length;d++)e=Math.min(e,a(c[d][b]).outerWidth());return e}function U(a,b,c){var d,e=0;for(d=a;b>=d;d++)e+=T(d,c);return e}function V(a){if(_===!1&&ca===!1)ba&&clearTimeout(ba),ba=setTimeout(Q,30,a);else if(ca){var c=a.pageX-b.window.pageXOffset;b.opts.iframe&&(c+=b.$iframe.offset().left);var d=$.data("max-left"),e=$.data("max-right");c>=d&&e>=c?$.css("left",c-b.opts.tableResizerOffset):d>c&&parseFloat($.css("left"),10)>d-b.opts.tableResizerOffset?$.css("left",d-b.opts.tableResizerOffset):c>e&&parseFloat($.css("left"),10)<e-b.opts.tableResizerOffset&&$.css("left",e-b.opts.tableResizerOffset)}}function W(c){b.node.isEmpty(c.get(0))?c.prepend(a.FroalaEditor.MARKERS):c.prepend(a.FroalaEditor.START_MARKER).append(a.FroalaEditor.END_MARKER)}function X(c){var d=c.which;if(d==a.FroalaEditor.KEYCODE.TAB&&0===b.opts.tabSpaces){var e;if(b.$el.find(".fr-selected-cell").length>0)e=b.$el.find(".fr-selected-cell:last");else{var f=b.selection.element();"TD"==f.tagName||"TH"==f.tagName?e=a(f):a(f).closest("td").length>0?e=a(f).closest("td"):a(f).closest("th").length>0&&(e=a(f).closest("th"))}e&&(c.preventDefault(),E(),b.popups.hide("table.edit"),c.shiftKey?e.prev().length>0?W(e.prev()):e.closest("tr").length>0&&e.closest("tr").prev().length>0?W(e.closest("tr").prev().find("td:last")):e.closest("tbody").length>0&&e.closest("table").find("thead tr").length>0&&W(e.closest("table").find("thead tr th:last")):e.next().length>0?W(e.next()):e.closest("tr").length>0&&e.closest("tr").next().length>0?W(e.closest("tr").next().find("td:first")):e.closest("thead").length>0&&e.closest("table").find("tbody tr").length>0?W(e.closest("table").find("tbody tr td:first")):(e.addClass("fr-selected-cell"),q("below"),E(),W(e.closest("tr").next().find("td:first"))),b.selection.restore())}}function Y(){return b.$wp?(b.helpers.isMobile()||(_=!1,ca=!1,P(),b.$el.on("mousedown.table"+b.id,L),b.popups.onShow("image.edit",function(){E(),_=!1}),b.popups.onShow("link.edit",function(){E(),_=!1}),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&E()}),b.$el.on("mouseenter.table"+b.id,"th, td",N),b.$window.on("mouseup.table"+b.id,M),b.$el.on("keydown.table"+b.id,O),b.$window.on("mousemove.table"+b.id,V),a(b.window).on("scroll.table"+b.id,R),b.events.on("contentChanged",function(){b.$el.find(".fr-selected-cell").length>0&&(d(),b.$el.find("img").on("load.selected-cells",function(){a(this).off("load.selected-cells"),b.$el.find(".fr-selected-cell").length>0&&d()}))}),a(b.original_window).on("resize.table"+b.id,function(){E()}),a(b.window).on("keydown.table"+b.id,function(c){if(b.$el.find(".fr-selected-cell").length>0){if(c.which==a.FroalaEditor.KEYCODE.ESC)return E(),c.preventDefault(),c.stopPropagation(),c.stopImmediatePropagation(),!1;if(c.which==a.FroalaEditor.KEYCODE.BACKSPACE)return c.preventDefault(),!1;if(b.$el.find(".fr-selected-cell").length>1)return c.preventDefault(),!1}}),a(b.window).on("keydown.table"+b.id,d),a(b.window).on("input.table"+b.id,d),a(b.window).on("keyup.table"+b.id,d),b.events.on("html.get",function(a){return a=a.replace(/<(td|th)((?:[\w\W]*?))class="([\w\W]*?)fr-selected-cell([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/(td|th)>/g,'<$1$2class="$3$4"$5>$6</$7>'),a=a.replace(/<(td|th)((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/(td|th)>/g,"<$1$2$3>$4</$5>")}),b.events.on("destroy",function(){b.$el.off("mousedown.table"+b.id),b.$el.off("mouseenter.table"+b.id,"th, td"),b.$window.off("mouseup.table"+b.id),b.$el.off("keydown.table"+b.id),b.$window.off("mousemove.table"+b.id),a(b.window).off("scroll.table"+b.id),a(b.window).off("keydown.table"+b.id),a(b.window).off("input.table"+b.id),a(b.window).off("keyup.table"+b.id)},!0)),void b.events.on("keydown",X,!0)):!1}function Z(){b.$el.find(".fr-selected-cell").length>0?d():(b.popups.hide("table.insert"),b.toolbar.showInline())}var $,_,aa,ba,ca;return{_init:Y,insert:m,remove:n,insertRow:q,deleteRow:r,insertColumn:s,deleteColumn:t,mergeCells:u,splitCellVertically:w,splitCellHorizontally:v,addHeader:o,removeHeader:p,setBackground:x,showInsertPopup:c,showEditPopup:d,showColorsPopup:e,back:Z,verticalAlign:y,horizontalAlign:z,applyStyle:A}},a.FroalaEditor.DefineIcon("insertTable",{NAME:"table"}),a.FroalaEditor.RegisterCommand("insertTable",{title:"Insert Table",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("table.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("table.insert")):this.table.showInsertPopup()}}),a.FroalaEditor.RegisterCommand("tableInsert",{callback:function(a,b,c){this.table.insert(b,c),this.popups.hide("table.insert")}}),a.FroalaEditor.DefineIcon("tableHeader",{NAME:"header"}),a.FroalaEditor.RegisterCommand("tableHeader",{title:"Table Header",focus:!1,callback:function(){var a=this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]');a.hasClass("fr-active")?this.table.removeHeader():this.table.addHeader()},refresh:function(a){var b=this.$el.find(".fr-selected-cell").closest("table");b.length>0&&(0===b.find("th").length?a.removeClass("fr-active"):a.addClass("fr-active"))}}),a.FroalaEditor.DefineIcon("tableRows",{NAME:"bars"}),a.FroalaEditor.RegisterCommand("tableRows",{type:"dropdown",focus:!1,title:"Row",options:{above:"Insert row above",below:"Insert row below","delete":"Delete row"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.tableRows.options;for(var d in c)b+='<li><a class="fr-command" data-cmd="tableRows" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(c[d])+"</a></li>";return b+="</ul>"},callback:function(a,b){"above"==b||"below"==b?this.table.insertRow(b):this.table.deleteRow()}}),a.FroalaEditor.DefineIcon("tableColumns",{NAME:"bars fa-rotate-90"}),a.FroalaEditor.RegisterCommand("tableColumns",{type:"dropdown",focus:!1,title:"Column",options:{before:"Insert column before",after:"Insert column after","delete":"Delete column"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.tableColumns.options;for(var d in c)b+='<li><a class="fr-command" data-cmd="tableColumns" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(c[d])+"</a></li>";return b+="</ul>"},callback:function(a,b){"before"==b||"after"==b?this.table.insertColumn(b):this.table.deleteColumn()}}),a.FroalaEditor.DefineIcon("tableCells",{NAME:"square-o"}),a.FroalaEditor.RegisterCommand("tableCells",{type:"dropdown",focus:!1,title:"Cell",options:{merge:"Merge cells","vertical-split":"Vertical split","horizontal-split":"Horizontal split"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.tableCells.options;for(var d in c)b+='<li><a class="fr-command" data-cmd="tableCells" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(c[d])+"</a></li>";return b+="</ul>"},callback:function(a,b){"merge"==b?this.table.mergeCells():"vertical-split"==b?this.table.splitCellVertically():this.table.splitCellHorizontally()},refreshOnShow:function(a,b){this.$el.find(".fr-selected-cell").length>1?(b.find('a[data-param1="vertical-split"]').addClass("fr-disabled"),b.find('a[data-param1="horizontal-split"]').addClass("fr-disabled"),b.find('a[data-param1="merge"]').removeClass("fr-disabled")):(b.find('a[data-param1="merge"]').addClass("fr-disabled"),b.find('a[data-param1="vertical-split"]').removeClass("fr-disabled"),b.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled"))}}),a.FroalaEditor.DefineIcon("tableRemove",{NAME:"trash"}),a.FroalaEditor.RegisterCommand("tableRemove",{title:"Remove Table",focus:!1,callback:function(){this.table.remove()}}),a.FroalaEditor.DefineIcon("tableStyle",{NAME:"paint-brush"}),a.FroalaEditor.RegisterCommand("tableStyle",{title:"Table Style",type:"dropdown",focus:!1,html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.tableStyles;for(var c in b)a+='<li><a class="fr-command" data-cmd="tableStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>";return a+="</ul>"},callback:function(a,b){this.table.applyStyle(b,this.$el.find(".fr-selected-cell").closest("table"),this.opts.tableMultipleStyles,this.opts.tableStyles)},refreshOnShow:function(b,c){var d=this.$el.find(".fr-selected-cell").closest("table");d&&c.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",d.hasClass(b))})}}),a.FroalaEditor.DefineIcon("tableCellBackground",{NAME:"tint"}),a.FroalaEditor.RegisterCommand("tableCellBackground",{title:"Cell Background",focus:!1,callback:function(){this.table.showColorsPopup()}}),a.FroalaEditor.RegisterCommand("tableCellBackgroundColor",{undo:!0,focus:!1,callback:function(a,b){this.table.setBackground(b)}}),a.FroalaEditor.DefineIcon("tableBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("tableBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.table.back()},refresh:function(a){0!==this.$el.find(".fr-selected-cell").length||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FroalaEditor.DefineIcon("tableCellVerticalAlign",{NAME:"arrows-v"}),a.FroalaEditor.RegisterCommand("tableCellVerticalAlign",{type:"dropdown",focus:!1,title:"Vertical Align",options:{Top:"Align Top",Middle:"Align Middle",Bottom:"Align Bottom"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.tableCellVerticalAlign.options;for(var d in c)b+='<li><a class="fr-command" data-cmd="tableCellVerticalAlign" data-param1="'+d.toLowerCase()+'" title="'+this.language.translate(c[d])+'">'+this.language.translate(d)+"</a></li>";return b+="</ul>"},callback:function(a,b){this.table.verticalAlign(b)},refreshOnShow:function(a,b){b.find('.fr-command[data-param1="'+this.$el.find(".fr-selected-cell").css("vertical-align")+'"]').addClass("fr-active")}}),a.FroalaEditor.DefineIcon("tableCellHorizontalAlign",{NAME:"align-left"}),a.FroalaEditor.DefineIcon("align-left",{NAME:"align-left"}),a.FroalaEditor.DefineIcon("align-right",{NAME:"align-right"}),a.FroalaEditor.DefineIcon("align-center",{NAME:"align-center"}),a.FroalaEditor.DefineIcon("align-justify",{
NAME:"align-justify"}),a.FroalaEditor.RegisterCommand("tableCellHorizontalAlign",{type:"dropdown",focus:!1,title:"Horizontal Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.tableCellHorizontalAlign.options;for(var d in c)b+='<li><a class="fr-command fr-title" data-cmd="tableCellHorizontalAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+"</a></li>";return b+="</ul>"},callback:function(a,b){this.table.horizontalAlign(b)},refresh:function(a){a.find("> *:first").replaceWith(this.icon.create("align-"+this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first"))))},refreshOnShow:function(a,b){b.find('.fr-command[data-param1="'+this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first"))+'"]').addClass("fr-active")}}),a.FroalaEditor.DefineIcon("tableCellStyle",{NAME:"magic"}),a.FroalaEditor.RegisterCommand("tableCellStyle",{title:"Cell Style",type:"dropdown",focus:!1,html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.tableCellStyles;for(var c in b)a+='<li><a class="fr-command" data-cmd="tableCellStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>";return a+="</ul>"},callback:function(a,b){this.table.applyStyle(b,this.$el.find(".fr-selected-cell"),this.opts.tableCellMultipleStyles,this.opts.tableCellStyles)},refreshOnShow:function(b,c){var d=this.$el.find(".fr-selected-cell:first");d&&c.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",d.hasClass(b))})}})});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{}),a.FroalaEditor.URLRegEx=/(\s|^|>)((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+(\.[a-zA-Z]{2,3})?(:\d*)?(\/[^\s<]*)?)(\s|$|<)/gi,a.FroalaEditor.PLUGINS.url=function(b){function c(d){d.each(function(){if("IFRAME"!=this.tagName)if(3==this.nodeType){var d=this.textContent.replace(/&nbsp;/gi,"");a.FroalaEditor.URLRegEx.test(d)&&(a(this).before(d.replace(a.FroalaEditor.URLRegEx,'$1<a href="$2">$2</a>$7')),a(this).remove())}else 1==this.nodeType&&["A","BUTTON","TEXTAREA"].indexOf(this.tagName)<0&&c(b.node.contents(this))})}function d(){b.events.on("paste.afterCleanup",function(b){return a.FroalaEditor.URLRegEx.test(b)?b.replace(a.FroalaEditor.URLRegEx,'$1<a href="$2">$2</a>$7'):void 0}),b.events.on("keyup",function(d){var e=d.which;(e==a.FroalaEditor.KEYCODE.ENTER||e==a.FroalaEditor.KEYCODE.SPACE)&&c(b.node.contents(b.$el.get(0)))}),b.events.on("keydown",function(c){var d=c.which;if(d==a.FroalaEditor.KEYCODE.ENTER){var e=b.selection.element();if(("A"==e.tagName||a(e).parents("a").length)&&b.selection.info(e).atEnd)return c.stopImmediatePropagation(),"A"!==e.tagName&&(e=a(e).parents("a")[0]),a(e).after("&nbsp;"+a.FroalaEditor.MARKERS),b.selection.restore(),!1}})}return{_init:d}}});
/*!
 * froala_editor v2.0.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.POPUP_TEMPLATES,{"video.insert":"[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_]","video.edit":"[_BUTTONS_]","video.size":"[_BUTTONS_][_SIZE_LAYER_]"}),a.extend(a.FroalaEditor.DEFAULTS,{videoInsertButtons:["videoBack","|","videoByURL","videoEmbed"],videoEditButtons:["videoDisplay","videoAlign","videoSize","videoRemove"],videoResize:!0,videoSizeButtons:["videoBack","|"],videoTextNear:!0,videoDefaultAlign:"center",videoDefaultDisplay:"block"}),a.FroalaEditor.VIDEO_PROVIDERS=[{test_regex:/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,url_text:"//www.youtube.com/embed/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>'},{test_regex:/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:channels\/[A-z]+\/|groups\/[A-z]+\/videos\/)?(.+)/g,url_text:"//player.vimeo.com/video/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>'},{test_regex:/^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,url_text:"//www.dailymotion.com/embed/video/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>'},{test_regex:/^.+(screen.yahoo.com)\/[^_&]+/,url_regex:"",url_text:"",html:'<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'},{test_regex:/^.+(rutube.ru)\/[^_&]+/,url_regex:/(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,url_text:"//rutube.ru/play/embed/$1",html:'<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'}],a.FroalaEditor.PLUGINS.video=function(b){function c(){var a=b.popups.get("video.insert"),c=a.find(".fr-video-by-url-layer input");c.val("").trigger("change");var d=a.find(".fr-video-embed-layer textarea");d.val("").trigger("change")}function d(){var a=b.$tb.find('.fr-command[data-cmd="insertVideo"]'),c=b.popups.get("video.insert");if(c||(c=f()),!c.hasClass("fr-active")){b.popups.refresh("video.insert"),b.popups.setContainer("video.insert",b.$tb);var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("video.insert",d,e,a.outerHeight())}}function e(){var c=b.popups.get("video.edit");c||(c=y()),b.popups.setContainer("video.edit",a(b.opts.scrollableContainer)),b.popups.refresh("video.edit");var d=R.find("iframe, embed, video"),e=d.offset().left+d.outerWidth()/2,f=d.offset().top+d.outerHeight();b.popups.show("video.edit",e,f,d.outerHeight())}function f(){var a="";b.opts.videoInsertButtons.length>1&&(a='<div class="fr-buttons">'+b.button.buildList(b.opts.videoInsertButtons)+"</div>");var d="";b.opts.videoInsertButtons.indexOf("videoByURL")>=0&&(d='<div class="fr-video-by-url-layer fr-layer fr-active" id="fr-video-by-url-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2">'+b.language.translate("Insert")+"</button></div></div>");var e="";b.opts.videoInsertButtons.indexOf("videoEmbed")>=0&&(e='<div class="fr-video-embed-layer fr-layer" id="fr-video-embed-layer-'+b.id+'"><div class="fr-input-line"><textarea type="text" placeholder="'+b.language.translate("Embedded Code")+'" tabIndex="1" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2">'+b.language.translate("Insert")+"</button></div></div>");var f={buttons:a,by_url_layer:d,embed_layer:e},g=b.popups.create("video.insert",f);return b.popups.onRefresh("video.insert",c),b.popups.onHide("video.insert",j),g}function g(a){var c,d,e=b.popups.get("video.insert");if(!R&&!b.opts.toolbarInline){var f=b.$tb.find('.fr-command[data-cmd="insertVideo"]');c=f.offset().left+f.outerWidth()/2,d=f.offset().top+(b.opts.toolbarBottom?10:f.outerHeight()-10)}b.opts.toolbarInline&&(d=e.offset().top-b.helpers.getPX(e.css("margin-top")),e.hasClass("fr-above")&&(d+=e.outerHeight())),e.find(".fr-layer").removeClass("fr-active"),e.find(".fr-"+a+"-layer").addClass("fr-active"),b.popups.show("video.insert",c,d,0)}function h(a){var c=b.popups.get("video.insert");c.find(".fr-video-by-url-layer").hasClass("fr-active")&&a.addClass("fr-active")}function i(a){var c=b.popups.get("video.insert");c.find(".fr-video-embed-layer").hasClass("fr-active")&&a.addClass("fr-active")}function j(){}function k(a){b.events.focus(!0),b.selection.restore(),b.html.insert('<span contenteditable="false" class="fr-jiv fr-video fr-dv'+b.opts.videoDefaultDisplay[0]+("center"!=b.opts.videoDefaultAlign?" fr-fv"+b.opts.videoDefaultAlign[0]:"")+'">'+a+"<span>"),b.popups.hide("video.insert");var c=b.$el.find(".fr-jiv");c.removeClass("fr-jiv"),b.events.trigger("video.inserted",[c])}function l(c){if("undefined"==typeof c){var d=b.popups.get("video.insert");c=d.find('.fr-video-by-url-layer input[type="text"]').val()||""}var e=null;if(b.helpers.isURL(c))for(var f=0;f<a.FroalaEditor.VIDEO_PROVIDERS.length;f++){var g=a.FroalaEditor.VIDEO_PROVIDERS[f];if(g.test_regex.test(c)){e=c.replace(g.url_regex,g.url_text),e=g.html.replace(/\{url\}/,e);break}}e?k(e):b.events.trigger("video.linkError",[c])}function m(a){if("undefined"==typeof a){var c=b.popups.get("video.insert");a=c.find(".fr-video-embed-layer textarea").val()||""}0===a.length?b.events.trigger("video.codeError",[a]):k(a)}function n(c){c.preventDefault(),c.stopPropagation();var d=c.pageX||(c.originalEvent.touches?c.originalEvent.touches[0].pageX:null),e=c.pageY||(c.originalEvent.touches?c.originalEvent.touches[0].pageY:null);return d&&e?(P=a(this),P.data("start-x",d),P.data("start-y",e),O.show(),void b.popups.hideAll()):!1}function o(a){if(P){a.preventDefault();var b=a.pageX||(a.originalEvent.touches?a.originalEvent.touches[0].pageX:null),c=a.pageY||(a.originalEvent.touches?a.originalEvent.touches[0].pageY:null);if(!b||!c)return!1;var d=P.data("start-x"),e=P.data("start-y");P.data("start-x",b),P.data("start-y",c);var f=b-d,g=c-e,h=R.find("iframe, embed, video"),i=h.width(),j=h.height();(P.hasClass("fr-hnw")||P.hasClass("fr-hsw"))&&(f=0-f),(P.hasClass("fr-hnw")||P.hasClass("fr-hne"))&&(g=0-g),h.css("width",i+f),h.css("height",j+g),h.removeAttr("width"),h.removeAttr("height"),s()}}function p(a){P&&(a&&a.preventDefault(),P=null,O.hide(),s(),e())}function q(a){return'<div class="fr-handler fr-h'+a+'"></div>'}function r(){if(Q=a('<div class="fr-video-resizer"></div>'),b.$wp.append(Q),a(b.original_window).on("resize.video"+b.id,u),b.events.on("destroy",function(){Q.html("").removeData().remove(),a(b.original_window).off("resize.video"+b.id)},!0),b.opts.videoResize){Q.append(q("nw")+q("ne")+q("sw")+q("se"));var c=Q.get(0).ownerDocument;Q.on(b._mousedown+".vidresize"+b.id,".fr-handler",n),a(c).on(b._mousemove+".vidresize"+b.id,o),a(c.defaultView||c.parentWindow).on(b._mouseup+".vidresize"+b.id,p),O=a('<div class="fr-video-overlay"></div>'),a(c).find("body").append(O),O.on("mouseleave",p),b.events.on("destroy",function(){Q.off(b._mousedown+".vidresize"+b.id),a(c).off(b._mousemove+".vidresize"+b.id),a(c.defaultView||c.parentWindow).off(b._mouseup+".vidresize"+b.id),O.off("mouseleave").remove()},!0)}}function s(){Q||r();var a=R.find("iframe, embed, video");Q.css("top",(b.opts.iframe?a.offset().top-1:a.offset().top-b.$wp.offset().top-1)+b.$wp.scrollTop()).css("left",(b.opts.iframe?a.offset().left-1:a.offset().left-b.$wp.offset().left-1)+b.$wp.scrollLeft()).css("width",a.outerWidth()).css("height",a.height()).addClass("fr-active")}function t(c){return c&&"touchend"==c.type&&S?!0:(c.preventDefault(),c.stopPropagation(),b.edit.isDisabled()?!1:(c.stopPropagation(),b.toolbar.disable(),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur()),R=a(this),a(this).addClass("fr-active"),b.opts.iframe&&b.height.syncIframe(),s(),e(),b.selection.clear(),b.button.bulkRefresh(),void b.events.trigger("image.hideResizer")))}function u(a){a===!0&&(T=!0),R&&T&&(Q.removeClass("fr-active"),b.toolbar.enable(),R.removeClass("fr-active"),R=null),T=!1}function v(){T=!0}function w(){T=!1}function x(){b.events.on("mousedown",v),b.events.on("window.mousedown",v),b.events.on("window.touchmove",w),b.events.on("mouseup",u),b.events.on("window.mouseup",u),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&u()}),b.events.on("video.hideResizer",function(){u(!0)}),b.events.on("commands.undo",function(){u(!0)}),b.events.on("commands.redo",function(){u(!0)})}function y(){var a="";b.opts.videoEditButtons.length>1&&(a+='<div class="fr-buttons">',a+=b.button.buildList(b.opts.videoEditButtons),a+="</div>");var c={buttons:a},d=b.popups.create("video.edit",c);return b.$wp.on("scroll.video-edit",function(){R&&b.popups.isVisible("video.edit")&&e()}),b.events.on("destroy",function(){b.$wp.off("scroll.video-edit")}),d}function z(){if(R){var a=b.popups.get("video.size"),c=R.find("iframe, embed, video");a.find('input[name="width"]').val(c.get(0).style.width||c.attr("width")).trigger("change"),a.find('input[name="height"]').val(c.get(0).style.height||c.attr("height")).trigger("change")}}function A(){var c=b.popups.get("video.size");c||(c=B()),b.popups.refresh("video.size"),b.popups.setContainer("video.size",a(b.opts.scrollableContainer));var d=R.find("iframe, embed, video"),e=d.offset().left+d.width()/2,f=d.offset().top+d.height();b.popups.show("video.size",e,f,d.height())}function B(){var a="";a='<div class="fr-buttons">'+b.button.buildList(b.opts.videoSizeButtons)+"</div>";var c="";c='<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-'+b.id+'"><div class="fr-video-group"><div class="fr-input-line"><input type="text" name="width" placeholder="'+b.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="'+b.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var d={buttons:a,size_layer:c},e=b.popups.create("video.size",d);return b.popups.onRefresh("video.size",z),b.$wp.on("scroll.video-size",function(){R&&b.popups.isVisible("video.size")&&A()}),b.events.on("destroy",function(){b.$wp.off("scroll.video-size")}),e}function C(a){R.removeClass("fr-fvr fr-fvl"),"left"==a?R.addClass("fr-fvl"):"right"==a&&R.addClass("fr-fvr"),s(),e()}function D(a){R.hasClass("fr-fvl")?a.find("> i").attr("class","fa fa-align-left"):R.hasClass("fr-fvr")?a.find("> i").attr("class","fa fa-align-right"):a.find("> i").attr("class","fa fa-align-justify")}function E(a,b){var c="justify";R.hasClass("fr-fvl")?c="left":R.hasClass("fr-fvr")&&(c="right"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}function F(a){R.removeClass("fr-dvi fr-dvb"),"inline"==a?R.addClass("fr-dvi"):"block"==a&&R.addClass("fr-dvb"),s(),e()}function G(a,b){var c="block";R.hasClass("fr-dvi")&&(c="inline"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}function H(){if(R&&b.events.trigger("video.beforeRemove",[R])!==!1){var a=R;b.popups.hideAll(),u(!0),b.selection.setBefore(a.get(0))||b.selection.setAfter(a.get(0)),a.remove(),b.selection.restore(),b.html.fillEmptyBlocks(!0),b.events.trigger("video.removed",[a])}}function I(a){if(!a.hasClass("fr-dvi")&&!a.hasClass("fr-dvb")){var c=a.css("float");a.css("float","none"),"block"==a.css("display")?(a.css("float",c),0===parseInt(a.css("margin-left"),10)&&(a.attr("style")||"").indexOf("margin-right: auto")>=0?a.addClass("fr-fvl"):0===parseInt(a.css("margin-right"),10)&&(a.attr("style")||"").indexOf("margin-left: auto")>=0&&a.addClass("fr-fvr"),a.addClass("fr-dvb")):(a.css("float",c),"left"==a.css("float")?a.addClass("fr-fvl"):"right"==a.css("float")&&a.addClass("fr-fvr"),a.addClass("fr-dvi")),a.css("margin",""),a.css("float",""),a.css("display",""),a.css("z-index",""),a.css("position",""),a.css("overflow",""),a.css("vertical-align","")}b.opts.videoTextNear||a.removeClass("fr-dvi").addClass("fr-dvb")}function J(){b.$el.find("video").filter(function(){return 0===a(this).parents("span.fr-video").length}).wrap('<span class="fr-video" contenteditable="false"></span>'),b.$el.find("embed, iframe").filter(function(){if(b.browser.safari&&this.getAttribute("src")&&this.setAttribute("src",this.src),a(this).parents("span.fr-video").length>0)return!1;for(var c=a(this).attr("src"),d=0;d<a.FroalaEditor.VIDEO_PROVIDERS.length;d++){var e=a.FroalaEditor.VIDEO_PROVIDERS[d];if(e.test_regex.test(c))return!0}return!1}).map(function(){return 0===a(this).parents("object").length?this:a(this).parents("object").get(0)}).wrap('<span class="fr-video" contenteditable="false"></span>');for(var c=b.$el.find("span.fr-video"),d=0;d<c.length;d++)I(a(c[d]))}function K(){x(),b.helpers.isMobile()&&(b.$el.on("touchstart","span.fr-video",function(){S=!1}),b.$el.on("touchmove",function(){S=!0})),b.events.on("html.set",J),J(),b.$el.on("mousedown","span.fr-video",function(a){a.stopPropagation()}),b.$el.on("click touchend","span.fr-video",t),b.events.on("keydown",function(c){var d=c.which;return!R||d!=a.FroalaEditor.KEYCODE.BACKSPACE&&d!=a.FroalaEditor.KEYCODE.DELETE?R&&d==a.FroalaEditor.KEYCODE.ESC?(u(!0),c.preventDefault(),!1):R&&!b.keys.ctrlKey(c)?(c.preventDefault(),!1):void 0:(c.preventDefault(),H(),!1)},!0),b.events.on("keydown",function(){b.$el.find("span.fr-video:empty").remove()})}function L(){R?R.trigger("click"):(b.popups.hide("video.insert"),b.toolbar.showInline())}function M(a,c){if(R){var d=b.popups.get("video.size"),e=R.find("iframe, embed, video");e.css("width",a||d.find('input[name="width"]').val()),e.css("height",c||d.find('input[name="height"]').val()),e.get(0).style.width&&e.removeAttr("width"),e.get(0).style.height&&e.removeAttr("height"),d.find("input").blur(),setTimeout(function(){R.trigger("click")},b.helpers.isAndroid()?50:0)}}function N(){return R}var O,P,Q,R,S,T=!1;return{_init:K,showInsertPopup:d,showLayer:g,refreshByURLButton:h,refreshEmbedButton:i,insertByURL:l,insertEmbed:m,insert:k,align:C,refreshAlign:D,refreshAlignOnShow:E,display:F,refreshDisplayOnShow:G,remove:H,showSizePopup:A,back:L,setSize:M,get:N}},a.FroalaEditor.RegisterCommand("insertVideo",{title:"Insert Video",undo:!1,focus:!0,refreshAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("video.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("video.insert")):this.video.showInsertPopup()}}),a.FroalaEditor.DefineIcon("insertVideo",{NAME:"video-camera"}),a.FroalaEditor.DefineIcon("videoByURL",{NAME:"link"}),a.FroalaEditor.RegisterCommand("videoByURL",{title:"By URL",undo:!1,focus:!1,callback:function(){this.video.showLayer("video-by-url")},refresh:function(a){this.video.refreshByURLButton(a)}}),a.FroalaEditor.DefineIcon("videoEmbed",{NAME:"code"}),a.FroalaEditor.RegisterCommand("videoEmbed",{title:"Embedded Code",undo:!1,focus:!1,callback:function(){this.video.showLayer("video-embed")},refresh:function(a){this.video.refreshEmbedButton(a)}}),a.FroalaEditor.RegisterCommand("videoInsertByURL",{undo:!0,focus:!0,callback:function(){this.video.insertByURL()}}),a.FroalaEditor.RegisterCommand("videoInsertEmbed",{undo:!0,focus:!0,callback:function(){this.video.insertEmbed()}}),a.FroalaEditor.DefineIcon("videoDisplay",{NAME:"star"}),a.FroalaEditor.RegisterCommand("videoDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(a,b){this.video.display(b)},refresh:function(a){this.opts.videoTextNear||a.addClass("fr-hidden")},refreshOnShow:function(a,b){this.video.refreshDisplayOnShow(a,b)}}),a.FroalaEditor.DefineIcon("videoAlign",{NAME:"align-center"}),a.FroalaEditor.RegisterCommand("videoAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",justify:"None",right:"Align Right"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FroalaEditor.COMMANDS.videoAlign.options;for(var d in c)b+='<li><a class="fr-command fr-title" data-cmd="videoAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'"><i class="fa fa-align-'+d+'"></i></a></li>';return b+="</ul>"},callback:function(a,b){this.video.align(b)},refresh:function(a){this.video.refreshAlign(a)},refreshOnShow:function(a,b){this.video.refreshAlignOnShow(a,b)}}),a.FroalaEditor.DefineIcon("videoRemove",{NAME:"trash"}),a.FroalaEditor.RegisterCommand("videoRemove",{title:"Remove",callback:function(){this.video.remove()}}),a.FroalaEditor.DefineIcon("videoSize",{NAME:"arrows-alt"}),a.FroalaEditor.RegisterCommand("videoSize",{undo:!1,focus:!1,title:"Change Size",callback:function(){this.video.showSizePopup()}}),a.FroalaEditor.DefineIcon("videoBack",{NAME:"arrow-left"}),a.FroalaEditor.RegisterCommand("videoBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.video.back()},refresh:function(a){var b=this.video.get();b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FroalaEditor.RegisterCommand("videoSetSize",{undo:!0,focus:!1,callback:function(){this.video.setSize()}})});
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






//
$(document).ready(function(){
  $('input[type="file"]#avatar-upload-file-selector').change(function(){
    var file = this.files[0];
    function truncate(n, len) {
      var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
      var filename = n.replace('.'+ext,'');
      if(filename.length <= len) {
          return n;
      }
      filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
      return filename + '.' + ext;
  };
  var shortName = truncate(file.name, 4)
  $("#avatar-img").html(shortName);
  });
});


