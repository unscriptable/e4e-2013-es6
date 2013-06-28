import fn from 'when/function';

function compose (tx1, tx2/* ...txs */) {
	return fn.compose.apply(fn, arguments);
}

export default compose;