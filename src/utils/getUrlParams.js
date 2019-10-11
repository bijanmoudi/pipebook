import pathToRegexp from 'path-to-regexp';

const getUrlParams = (url = document.location.pathname, pattern = '') => {
	let params = [];
	const keys = [];
	const regexp = pathToRegexp(pattern, keys);
	const fragments = regexp.exec(url);
	for (let i = 0; i < keys.length; i++) {
		params[keys[i].name] = fragments ? fragments[i + 1] : undefined;
	}
	return params;
};

export default getUrlParams;
