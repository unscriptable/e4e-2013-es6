define(["app/slides/ArrayPresentationModel","app/slides/SlideView","app/slides/PresentationController","app/slides/tx/compose","app/slides/tx/fetch","app/slides/tx/markdown","app/slides/tx/highlight","app/slides/tx/split","css!highlightjs/styles/ir_black.css","css!themes/black/theme.css","css!themes/fade.css","domReady!"],
  function(Model, View, Controller, compose, fetch, markdown, highlight, split, ir_black, theme, fade, _) {
    "use strict";
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

  });