"use strict";
var fn = require("when/function");

function compose (tx1, tx2/* ...txs */) {
	return fn.compose.apply(fn, arguments);
}

module.exports = compose;