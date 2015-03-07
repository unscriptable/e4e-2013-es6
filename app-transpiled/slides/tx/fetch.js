define(["when"],
  function(when) {
    "use strict";

    function fetch (require) {
    	return function(path) {
    		var d = when.defer();
    		require(['text!'+path], d.resolve, d.reject);
    		return d.promise;
    	};
    }

    return fetch;
  });