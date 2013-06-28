/* @license Copyright (c) 2011-2013 Brian Cavalier */
import marked from 'marked';

function markdown (options) {
	return function(markdownText) {
		marked.setOptions(options);
		return marked(markdownText);
	};
}

export default markdown;