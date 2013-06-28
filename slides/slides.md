# The Future of Javascript Modules

### John Hann [@unscriptable](https://github.com/unscriptable)


----------------------------------------


<div style="float:right">
<a href="http://www.flickr.com/photos/unscriptable/8619107629/" title="barbarian-2x1 by unscriptable, on Flickr"><img src="http://farm9.staticflickr.com/8255/8619107629_e0bdab0237.jpg" width="250" height="500" alt="barbarian-2x1"></a>
</div>

# Who?

### John Hann [@unscriptable](https://github.com/unscriptable)

* Javascript barbarian
* Co-founder of [cujoJS](http://cujojs.com/), the <br/>Javascript Architectural Toolkit
	* wire, when, curl, cram, meld, msgs, rest, cola, poly, seed ...
* Engineer at [SpringSource](http://http://springsource.org/) / [Pivotal](http://gopivotal.com/)



----------------------------------------


# Intro to ES6 modules


----------------------------------------

## Show of hands

### *Who knows something about Javascript modules?*

o |o \o o o| \o o |o o/ \o


----------------------------------------

# Why Modules?


----------------------------------------

## Disruptive technology?

<img src="images/marconi-clifden.jpeg" width="90%"/>

----------------------------------------


## Terms

* _module_: a unit of code with optional _imports_ and
  _exports_.
* _exports_: a _module_ may `export` a value with or without a name.
* _imports_: a _module_ may `import` a value exported by another
  _module_.
* _package_: a collection of related _modules_.
* _loader_: an object that defines how modules are fetched,
  translated, compiled, and linked.
* _TC39_: the team that has been nominated to develop and specify ES6!


----------------------------------------


## Existing module formats

* _AMD_: Asynchronous Module Definition
	* RequireJS, cujoJS/curl.js, Inject.js, dojo, MooTools
* _CJS_: CommonJS Modules/1.1
	* node.js, RingoJS, Ember, etc.
* _node_: _CJS_ with extensions
	* `module.exports = ...`
	* `this === exports`
* _UMD_: Universal Module Definition
	* _AMD_ + _CJS/node_ in one file
* _Others_: YUI, Ext, etc.


----------------------------------------


## ES6 Module basics

```js
module "fu" {
	export function fuify (word) {
		return word + 'fu';
	};
	var somethingElse = 5;
	export somethingElse;
}

module "kung/fu" {
	import { fuify } from "fu";
	var kungfu;
	kungfu = fuify('kung');
	export kungfu;
}
```

----------------------------------------

## ES6 Module basics

* Module ids are just string literals
	* realistically, they should be compatible with file names and urls
* Zero or more imports: <br/>`import { <names> } from "<id>";`
* Zero or more exports: <br/>`export <expression>;`

----------------------------------------

## Static analysis

```js
module "fubar" {
	// #FAIL! SyntaxError
	if (document.all) {
		import { ick } from "uglyHacks/ie8";
		export function foo (n) { ick(n); }
	}
	else {
		import { rainbows } from "shortcuts/w3c";
		export function foo (n) { rainbows(n); }
	}
}
```

----------------------------------------

## Renaming imports

```js
module "fu" {
	export function fuify (word) {
		return word + 'fu';
	};
}

module "kung/fu" {
	import { fuify as tofu } from "fu";
	var kungfu;
	kungfu = tofu('kung');
	export kungfu;
}
```

----------------------------------------

## Anonymous modules

### Anonymous modules are the _normal way_ to author modules

```js
// file "fu.js"
export function fuify (word) {
	return word + 'fu';
};
```

```js
// file "kung/fu.js"
import { fuify as tofu } from "fu";
var kungfu;
kungfu = tofu('kung');
export kungfu;
```

----------------------------------------

## Export one thing

### *"Why can't we export just a function or constructor?"*

### *"Why do we always have to export a "bag" of properties?"*

(In a pure ES6 world, this might not matter much, but in a mixed world with
CommonJS and AMD modules, it gets messy.)

----------------------------------------

## Export one thing

Here's how we already do it in AMD:

```js
// file "fu.js" in AMD format
define(function () {
	// "fu" is a function-module
	return function (word) {
		return word + 'fu';
	};
});
```

```js
// file "kung/fu.js" in AMD format
define(["fu.js"], function (fuify) {
	// use "fu", the function-module
	return fuify('kung');
});
```

----------------------------------------

## Export one thing

And in node:

```js
// file "fu.js" in node format
// "fu" is a function-module
module.exports = function (word) {
	return word + 'fu';
};
```

```js
// file "kung/fu.js" in node format
var fuify = require("fu");
// use "fu", the function-module
module.exports = fuify('kung');
```

----------------------------------------

## Export one thing

### *"How do we import an AMD or CommonJS function-module in ES6?"*

```js
// how do we refer to the function-module?
// we can't pick something out of the "bag"!
import { ???? } from "fu";
```

----------------------------------------

<a style="float:right" href="http://www.flickr.com/photos/unscriptable/8618726629/" title="Screen Shot 2013-04-04 at 12.05.31 PM by unscriptable, on Flickr"><img src="images/twitter-convo.jpeg" width="680" alt="Screen Shot 2013-04-04 at 12.05.31 PM"></a>

## Export one thing

Thankfully, TC39 has committed to making this work in ES6, too!

----------------------------------------

## Export one thing

```js
// file "fu.js"
// reserved `default` keyword finally has a use!
export default function (word) {
	return word + 'fu';
};
```

```js
// file "kung/fu.js"
// slightly different import syntax
import fuify from "foo";
var kungfu;
kungfu = tofu('kung');
export kungfu;
```


----------------------------------------

## Module semantics

### "script" versus "module"

* Script elements expect global code (aka "scripts")
	* Any modules must be wrapped: <br/> `module "id" { /*...*/ }`!
	* `export` in a script will likely throw a SyntaxError
* Module loaders expect a single module (except when bundled)
	* The spec says that single modules should omit the wrapper!
	* Not ratified: how to specify bundles of modules.


----------------------------------------

## Module semantics

### Circular dependencies

CommonJS has a special form to prevent deadlock.

AMD uses a similar form.

*You have to write your code in a special way to prevent deadlock.*


----------------------------------------

## Module semantics

### Circular dependencies Just Work(tm) in ES6!

*But don't, please, just don't.*


----------------------------------------

## Module semantics

### *"What about loader plugins?"*

`s/loader plugins/loader extensions`

----------------------------------------


## Module loaders

### *"Why do I care?"*

* Dynamically load chunks of an app
* Load non-ES6 modules and text-based resources
	* "Legacy" AMD, CJS modules
	* HTML templates, CSS
	* CoffeeScript, LESS, other "transpiled" code

----------------------------------------

<img src="images/loader-pipeline.png" style="float:right" height="700"/>

## Module loaders

### Loader pipeline

* Normalize
* Resolve
* Fetch
* Translate
* Link

(I stole this image from [@wycats](https://gist.github.com/wycats/51c96e3adcdb3a68cbc3)!)



----------------------------------------

## The `System` loader

***** NOTE: THE LOADER SPECS ARE A MOVING TARGET! *****

A simple use case:

```js
// load and run an app's "main" module
System.load("app/main",
	function (main) {
		main();
		// get something that you know was loaded by "app/main":
		System.get('app/socket').init();
	},
	function (ex) {
		alert('drat! foiled again: ', ex.message);
	}
);
```


----------------------------------------

## The `Loader` constructor

```js
var loader = new Loader(System, {
	global: window,
	baseURL: '../client/',
	linkedTo: null, // set the fundamental intrinsics of the modules
	strict: true,
	resolve: myResolver
	fetch: myFetcher
	translate: myTranslater
// etc.
});

loader.load("app/main",
	function (main) {
		main();
		// get something that you know was loaded by "app/main":
		System.get('app/socket').init();
	},
	function (ex) {
		alert('drat! foiled again: ', ex.message);
	}
);
```


----------------------------------------

## Some loader methods and properties


Warning: The specs for these are volatile!

* _eval(src)_ - eval() the source code using this loader's
  scope and intrinsics.

* _evalAsync(src, callback, errback)_ eval() source code
  that may have remote dependencies.

* _get(id)_ - get a module that is already fetched / cached.

* _set(id, mod)_ - place a module into the loader's cache.

* _defineBuiltins({})_ - define the fundamental intrinsics of
  all modules declared by this loader.



----------------------------------------

## Extending a loader

Each of the steps in the pipeline can be extended by "advising" the methods:

```js
var loader = new Loader();
var origResolve = loader.resolve;

loader.resolve = function (moduleId, options) {
	if ('node' == options.type) {
		// find in top-level node_modules folder
		return { name: "node_modules/" + moduleId };
	}
	else {
		return origResolve.apply(this, arguments);
	}
};
```


----------------------------------------

## ES6 app structure

Bootstrapping is similar to AMD:

* Configure a loader (`System` or `new Loader()`)
* Init the app via a main module
* All bundled into one script OR partitioned into several


----------------------------------------

## ES6 app structure

Bundling is also similar to AMD:

* Process each module
	* Perform id normalization step (optional)
	* Wrap: <br/>`module "<path/id>" { <body> };`
* Concatenate into a file (order is not important!)
* Prepend the loader configuration / customization code


----------------------------------------

## Timeline

### *"When can we expect to start using ES6 modules?"*

A: Whichever comes later: Fall 2016 or IE6-10 fade away

### *"Ugh! Why so far away?"*

A: It'll take that long for implementations to work out the kinks and
performance issues, unfortunately.  Loader specs are still being developed.


----------------------------------------


# Strategies toward ES6 modules


----------------------------------------

## Strategies you can start today

* Ignore all modules
* Author carefully-written AMD or CJS modules
* Author ES6 modules


----------------------------------------

## Strategies you can start today

### Ignore all modules

&lt;script&gt; elements will continue to work into the foreseeable future.


----------------------------------------

## Strategies you can start today

### Ignore all modules

### Pros:

* Ignorance is bliss


----------------------------------------

## Strategies you can start today

### Ignore all modules

### Cons:

* Get left behind
* Less architectural freedom


----------------------------------------

## Strategies you can start today

### Author carefully-written AMD or CJS modules

* Avoid semantic and syntactic pitfalls
* Prepare to "transpile" when the time is right
* Seek out or write Loader extensions for legacy code and non-standard
  patterns (e.g. AMD plugins)


----------------------------------------

## Strategies you can start today

### Author carefully-written AMD or CJS modules

### Pros:

* Enjoy the benefits of modular code today
* Convert to ES6 at any time in the future


----------------------------------------

## Strategies you can start today

### Author carefully-written AMD or CJS modules

### Cons:

* JSLint and JSHint don't grok AMD or CJS modules
	* Can't ensure modules will transpile


----------------------------------------

## Strategies you can start today

### Author ES6 modules

* Author source files as ES6 modules
* Convert ES6 modules to ES5/ES3
	* TypeScript - by Microsoft: http://typescript.codeplex.com
		* Note: Lags **way** behind standard! (v0.9)
	* ES6 Module Transpiler - by Square: https://github.com/square/es6-module-transpiler
		* Fussy, restrictive, and buggy (v0.1.3)
		* Use the update-to-latest-proposal branch!
		* Note: no transpilation of other ES6 language features!
			* Use an ES5 polyfill like cujoJS's poly.js


----------------------------------------

## Strategies you can start today

### Author ES6 modules

# DEMO TIME!


----------------------------------------

<img src="images/dungeon-gate.jpeg" width="680" style="float:right"/>

## AAAARRRRGGHHHHHHH.........

----------------------------------------

## Strategies you can start today

### Author ES6 modules

### Pros:

* Enjoy ES6 features today
* Seamless transition to ES6 engines


----------------------------------------

## Strategies you can start today

### Author ES6 modules

### Cons:

* ES6 language specs are not ratified, may change
	* Module format may change, too
	* Current converters/transpilers lag behind standard or suck!
* JSLint and JSHint not useful (yet)
* Additional build step required
* Debugging in older browsers sucks (no source maps)


----------------------------------------

## Strategies you can start today

There only seems to be one real option...

### IMHO

----------------------------------------

# Author AMD or CJS modules and wait


----------------------------------------

# Author AMD or CJS modules and wait

## Avoid semantic and syntactic pitfalls

----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Keep all imports and exports at the topmost code block

### Bad

```js
if (process && process.env) {
	// conditional import and export!
	exports.getFile = require('fs').readSync;
}
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Keep all imports and exports at the topmost code block

### How a transpiler might convert to ES6

```js
if (process && process.env) {
	// SyntaxError in ES6
	import { readSync } from 'fs';
	export getFile = readSync;
}
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Keep all imports and exports at the topmost code block

### Good

```js
var readSync = require('fs').readSync;
exports.getFile = function () {
	if (process && process.env) {
		return readSync.apply(this, arguments);
	}
};
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Keep all imports and exports at the topmost code block

### How a transpiler might convert to ES6

```js
import { readSync } from 'fs';
export function getFile () {
	if (process && process.env) {
		return readSync.apply(this, arguments);
	}
};
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Use one `var` per `require`

### Problematic

```js
// var declarations are hoisted
var foo, bar;
foo = require('foo');
bar = require('bar');
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Use one `var` per `require`

### How a transpiler might convert to ES6

```js
// duplicate declarations cause SyntaxError
var foo, bar;
import foo from 'foo';
import bar from 'bar';
```

----------------------------------------

## Avoid semantic and syntactic pitfalls

### CommonJS

* Use one `var` per `require`

### Better

```js
// one var declaration per require
var foo = require('foo');
var bar = require('bar');
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### AMD

* Use "CommonJS-wrapped AMD" syntax and follow CommonJS rules

### Good

```js
define(function (require, module, exports) {
	var foo = require('foo');
	exports.bar = function (a) { return foo.bar(a + 1); };
});
```

----------------------------------------

## Avoid semantic and syntactic pitfalls

### AMD

* Use "CommonJS-wrapped AMD" syntax and follow CommonJS rules

### How a transpiler might convert to ES6

```js
import foo from 'foo';
export function bar (a) { return foo.bar(a + 1); };
```


----------------------------------------

## Avoid semantic and syntactic pitfalls

### AMD

* Use an inline dependency list and factory function

### Bad

```js
var deps = ['foo', 'bar'];
function factory (foo, bar) {
	return function (a) {
		return foo(bar(a));
	}
}
define(deps, factory);
```

(AMD bundling tools don't even know what to do with this!)



----------------------------------------

## Avoid semantic and syntactic pitfalls

### AMD

* Use an inline dependency list and factory function

### Good

```js
define(['foo', 'bar'], function (foo, bar) {
	return function (a) {
		return foo(bar(a));
	}
});
```



----------------------------------------

## Avoid semantic and syntactic pitfalls

### AMD

* Use an inline dependency list and factory function

### How a transpiler might convert to ES6

```js
import foo from 'foo';
import bar from 'bar';
export default function (a) {
	return foo(bar(a));
}
```




----------------------------------------


## Light reading

Tutorials about modules: http://know.cujojs.com/

Current spec: http://wiki.ecmascript.org/doku.php?id=harmony:modules

Current examples: http://wiki.ecmascript.org/doku.php?id=harmony:modules_examples

This presentation: https://github.com/unscriptable/e4e-2013-es6

# Questions?

