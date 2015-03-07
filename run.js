/* @license Copyright (c) 2011-2013 Brian Cavalier */
(function(curl) {

	curl({
		main: 'app/main',
		paths: {
			'themes': 'css/themes',
			'content': 'slides/slides.md',
			'markdown': 'app/hc/markdown',
			highlightjs: 'components/highlightjs'
		},
		packages: {
			app: { location: 'app-transpiled', main: 'main', config: { /*moduleLoader: 'curl/loader/cjsm11'*/ } },
			curl: { location: 'components/curl/src/curl' },
			when: { location: 'components/when', main: 'when' },
			marked: { location: 'components/marked', main: 'lib/marked' }
		},
		preloads: [
			'js!components/highlightjs/highlight.pack.js'
		]
	});

})(window.curl);