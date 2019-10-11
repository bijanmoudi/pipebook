import { CUSTOM_FIELDS__PERSONS as customFields } from '../constants';

const prepareData = (key = '', value = null) => {
	let keys = [];
	if (value) {
		keys = Object.keys(customFields).filter(
			field => customFields[field] === key
		);
	}
	return Object.keys(keys).length ? { key: keys[0], value } : null;
};

const prepareDataForApi = (input = {}) => {
	const keys = Object.keys(input);
	let key;
	let n = keys.length;
	let newItem = {};
	while (n--) {
		key = keys[n];
		const data = prepareData(key, input[key]);
		data && (newItem[data.key] = data.value);
	}
	return newItem;
};

export default prepareDataForApi;
