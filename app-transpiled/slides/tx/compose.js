define(["when/function"],
  function(fn) {
    "use strict";

    function compose (tx1, tx2/* ...txs */) {
    	return fn.compose.apply(fn, arguments);
    }

    return compose;
  });