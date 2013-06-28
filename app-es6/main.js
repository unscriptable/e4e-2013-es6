/* @license Copyright (c) 2011-2013 Brian Cavalier */
//import require from 'require';
import Model from 'app/slides/ArrayPresentationModel';
import View from 'app/slides/SlideView';
import Controller from 'app/slides/PresentationController';
import compose from 'app/slides/tx/compose';
import fetch from 'app/slides/tx/fetch';
import markdown from 'app/slides/tx/markdown';
import highlight from 'app/slides/tx/highlight';
import split from 'app/slides/tx/split';
import ir_black from 'css!highlightjs/styles/ir_black.css';
import theme from 'css!themes/black/theme.css';
import fade from 'css!themes/fade.css';
import _ from 'domReady!';

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
