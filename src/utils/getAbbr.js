const getAbbr = (input = '') => {
	let abbr = (input && input.match(/\b\w/g)) || [];
	return ((abbr.shift() || '') + (abbr.pop() || '')).toUpperCase();
};

export default getAbbr;
