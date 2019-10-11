import { CUSTOM_FIELDS__PERSONS as customFields } from '../constants';

const extractApiData = (key = '', value = null) => {
	let newValue = value;
	const newKey = customFields[key];
	if (newKey) {
		switch (newKey) {
			case 'phone':
				newValue = !value
					? value
					: typeof value === 'string'
					? value
					: value[
							Object.keys(value).filter(
								item => value[item].primary
							)[0]
					  ].value;
				break;
			case 'email':
				newValue = !value
					? value
					: typeof value === 'string'
					? value
					: value[
							Object.keys(value).filter(
								item => value[item].primary
							)[0]
					  ].value;
				break;
			case 'picture':
				newValue =
					value == null
						? value
						: value.url
						? value.url
						: value.pictures['128'];
				break;
			default:
				newValue = value;
		}
	}
	return newKey ? { key: [newKey], value: newValue } : null;
};

const modelPersonData = (items = []) => {
	const isArray = items.constructor === Array;
	items = isArray ? items : [items];
	const newItems = items.map(item => {
		let key,
			keys = Object.keys(item);
		let n = keys.length;
		let newItem = {};
		while (n--) {
			key = keys[n];
			const data = extractApiData(key, item[key]);
			data && (newItem[data.key] = data.value);
		}
		return newItem;
	});

	return isArray ? newItems : newItems[0];
};

export default modelPersonData;
