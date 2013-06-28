
function split (separator) {
	return function(text) {
		return text.split(separator);
	};
}

export default split;