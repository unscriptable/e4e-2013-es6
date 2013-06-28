"use strict";
var when = require("when");

function fetch (require) {
	return function(path) {
		var d = when.defer();
		require(['text!'+path], d.resolve, d.reject);
		return d.promise;
	};
}

module.exports = fetch;