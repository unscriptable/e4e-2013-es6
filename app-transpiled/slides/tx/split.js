define([],
  function() {
    "use strict";

    function split (separator) {
    	return function(text) {
    		return text.split(separator);
    	};
    }

    return split;
  });