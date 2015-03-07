define(["marked"],
  function(marked) {
    "use strict";
    /* @license Copyright (c) 2011-2013 Brian Cavalier */

    function markdown (options) {
    	return function(markdownText) {
    		marked.setOptions(options);
    		return marked(markdownText);
    	};
    }

    return markdown;
  });