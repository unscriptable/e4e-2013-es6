"use strict";
var Model = require("app/slides/ArrayPresentationModel");
var View = require("app/slides/SlideView");
var Controller = require("app/slides/PresentationController");
var compose = require("app/slides/tx/compose");
var fetch = require("app/slides/tx/fetch");
var markdown = require("app/slides/tx/markdown");
var highlight = require("app/slides/tx/highlight");
var split = require("app/slides/tx/split");
var ir_black = require("css!highlightjs/styles/ir_black.css");
var theme = require("css!themes/black/theme.css");
var fade = require("css!themes/fade.css");
var _ = require("domReady!");
/* @license Copyright (c) 2011-2013 Brian Cavalier */
//import require from 'require';

var source, model, view, controller, splitSlides;

splitSlides = /\s*\<hr\s*\/?\>\s*/i;
source = compose(fetch(curl), markdown({ highlight: highlighter, langPrefix: 'language-' }), split(splitSlides));

model = new Model(source('content'));
view = new View(document.getElementById('slide-container'), model);
controller = new Controller(view);

controller.start().then(function () {
	document.body.className = '';
});

function highlighter (source) {
	// actionscript seem to look the best (import keyword)
	return highlight(source, 'actionscript');
}
