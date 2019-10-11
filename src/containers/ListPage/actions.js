import axios from 'axios';
import { prepareParamsForApi as prepareParams } from '../../utils';
import { prepareDataForApi as prepareData } from '../../utils';
import {
	PERSONS__FETCH_STARTED,
	PERSONS__FETCH_SUCCEEDED,
	PERSONS__FETCH_FAILED,
	PERSONS__ADD_STARTED,
	PERSONS__ADD_SUCCEEDED,
	PERSONS__ADD_FAILED,
	PERSON__PRIORITIZE_STARTED,
	PERSON__PRIORITIZE_SUCCEEDED,
	PERSON__PRIORITIZE_FAILED,
	PERSON__FETCH_STARTED,
	PERSON__FETCH_SUCCEEDED,
	PERSON__FETCH_FAILED,
	PERSON__DELETE_STARTED,
	PERSON__DELETE_SUCCEEDED,
	PERSON__DELETE_FAILED,
	SEARCH__FETCH_STARTED,
	SEARCH__FETCH_SUCCEEDED,
	SEARCH__FETCH_FAILED
} from '../../types';
import {
	API_TOKEN,
	API_URL,
	API_VARIABLE__TOKEN,
	API_ENDPOINT__PERSONS,
	API_ENDPOINT__PERSON,
	API_ENDPOINT__SEARCH,
	CUSTOM_FIELDS__PERSONS as customFileds
} from '../../constants';

let requests = {};

const priorityField = Object.keys(customFileds).filter(
	id => customFileds[id] === 'priority'
);

export const request = (
	id = Math.random(),
	url = null,
	data = {},
	params = {},
	method = 'GET',
	startType = '',
	successType = '',
	failureType = '',
	successCallback = null,
	handleCallbackData = null,
	callbackExecutionDelay = 0
) => {
	if (url) {
		return (dispatch, getState) => {
			Object.keys(requests).indexOf(id) !== -1 && requests[id].cancel();
			dispatch({
				type: startType,
				payload: {
					data,
					params
				}
			});
			params[API_VARIABLE__TOKEN] = API_TOKEN;
			const CancelToken = axios.CancelToken;
			const source = CancelToken.source();
			axios({
				url,
				data,
				params,
				method,
				cancelToken: source.token
			})
				.then(({ data: response }) => {
					if (!response.success) {
						let error = [];
						response.error && error.push(response.error);
						response.error_info && error.push(response.error_info);
						error = error.length
							? error.join('. ').replce('.. ', '. ')
							: JSON.stringify(response);
						throw Error(error);
					}
					return response;
				})
				.then(response => {
					dispatch({
						type: successType,
						payload: response
					});
					typeof successCallback == 'function' &&
						setTimeout(() => {
							dispatch(
								successCallback(
									typeof handleCallbackData == 'function'
										? handleCallbackData(
												getState().ListPage
										  )
										: getState().ListPage
								)
							);
						}, callbackExecutionDelay);
				})
				.catch(error => {
					!axios.isCancel(error) &&
						dispatch({
							type: failureType,
							payload: error
								? error.message
									? error.message
									: error
								: 'Sorry, an unexpected error occured. Please try again later.'
						});
				})
				.finally(() => {
					delete requests[id];
				});
			requests[id] = source;
		};
	}
};

export const fetchPersons = input => {
	const requestId = 'PERSONS__LIST';
	const url = API_URL + API_ENDPOINT__PERSONS;
	const data = {};
	input.sort = priorityField.length ? priorityField[0] + ' asc' : null;
	const params = prepareParams(input);
	const method = 'GET';
	const startType = PERSONS__FETCH_STARTED;
	const successType = PERSONS__FETCH_SUCCEEDED;
	const failureType = PERSONS__FETCH_FAILED;
	return request(
		requestId,
		url,
		data,
		params,
		method,
		startType,
		successType,
		failureType
	);
};

export const addPerson = (input, term) => {
	const requestId = 'PERSON__ADD';
	const url = API_URL + API_ENDPOINT__PERSONS;
	const data = prepareData(input);
	const params = {};
	const method = 'POST';
	const startType = PERSONS__ADD_STARTED;
	const successType = PERSONS__ADD_SUCCEEDED;
	const failureType = PERSONS__ADD_FAILED;
	const handleData = data => {
		return { ...data.listPeople, term };
	};
	return request(
		requestId,
		url,
		data,
		params,
		method,
		startType,
		successType,
		failureType,
		term ? searchPersons : fetchPersons,
		handleData,
		2000 // Just to make sure that new record is settled in DB considering API queues
	);
};

export const fetchPerson = ({ id }) => {
	const requestId = 'PERSON__VIEW';
	let url = API_URL + API_ENDPOINT__PERSON;
	const data = {};
	const params = {};
	const method = 'GET';
	const startType = PERSON__FETCH_STARTED;
	const successType = PERSON__FETCH_SUCCEEDED;
	const failureType = PERSON__FETCH_FAILED;
	url = url.replace('{id}', id);
	return request(
		requestId,
		url,
		data,
		params,
		method,
		startType,
		successType,
		failureType
	);
};

export const deletePerson = ({ id, term }) => {
	const requestId = 'PERSON__DELETE';
	let url = API_URL + API_ENDPOINT__PERSON;
	const data = {};
	const params = {};
	const method = 'DELETE';
	const startType = PERSON__DELETE_STARTED;
	const successType = PERSON__DELETE_SUCCEEDED;
	const failureType = PERSON__DELETE_FAILED;
	const handleData = data => {
		return { ...data.listPeople, term };
	};
	url = url.replace('{id}', id);
	return request(
		requestId,
		url,
		data,
		params,
		method,
		startType,
		successType,
		failureType,
		term ? searchPersons : fetchPersons,
		handleData
	);
};

export const searchPersons = input => {
	const requestId = 'PERSONS__LIST';
	const url = API_URL + API_ENDPOINT__SEARCH;
	const data = {};
	const params = prepareParams(input);
	const method = 'GET';
	const startType = SEARCH__FETCH_STARTED;
	const successType = SEARCH__FETCH_SUCCEEDED;
	const failureType = SEARCH__FETCH_FAILED;
	return request(
		requestId,
		url,
		data,
		params,
		method,
		startType,
		successType,
		failureType
	);
};

export const updatePriority = ({ id, priority }) => {
	const requestId = 'PERSON__PRIORITY';
	let url = API_URL + API_ENDPOINT__PERSON;
	const data = {
		...(priorityField.length ? { [priorityField[0]]: priority } : {})
	};
	const params = {};
	const method = 'PUT';
	const startType = PERSON__PRIORITIZE_STARTED;
	const successType = PERSON__PRIORITIZE_SUCCEEDED;
	const failureType = PERSON__PRIORITIZE_FAILED;
	const handleData = data => {
		return data.listPeople;
	};
	url = url.replace('{id}', id);
	return request(
		requestId,
		url,
		data,
		params,
		method,
		startType,
		successType,
		failureType,
		fetchPersons,
		handleData
	);
};
