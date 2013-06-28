define(function() {
	return function(text, lang) {
		var result;

		try {
			result = hljs.highlight(lang, text);
		} catch(e) {
			result = hljs.highlightAuto(text);
		}

		return result ? hljs.fixMarkup(result.value, '  ') : text;

	};
})