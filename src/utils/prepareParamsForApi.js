import {
	API_VARIABLE__START,
	API_VARIABLE__LIMIT,
	API_VARIABLE__TERM,
	API_VARIABLE__SORT
} from '../constants';

const mapConstantsToApiVariables = (key = '') => {
	let apiVariable = key;
	switch (key) {
		case 'start':
			apiVariable = API_VARIABLE__START;
			break;
		case 'limit':
			apiVariable = API_VARIABLE__LIMIT;
			break;
		case 'term':
			apiVariable = API_VARIABLE__TERM;
			break;
		case 'sort':
			apiVariable = API_VARIABLE__SORT;
			break;
		default:
			apiVariable = null;
	}
	return apiVariable;
};

const prepareParamsForApi = (params = {}) => {
	let key,
		keys = Object.keys(params);
	let n = keys.length;
	let newParams = {};
	while (n--) {
		key = keys[n];
		const index = mapConstantsToApiVariables(key);
		index && (newParams[index] = params[key]);
	}
	return newParams;
};

export default prepareParamsForApi;
