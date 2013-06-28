"use strict";
var marked = require("marked");
/* @license Copyright (c) 2011-2013 Brian Cavalier */

function markdown (options) {
	return function(markdownText) {
		marked.setOptions(options);
		return marked(markdownText);
	};
}

module.exports = markdown;