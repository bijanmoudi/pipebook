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
	LIST__LIMIT as limit,
	LIST__GROUP_COUNT as groupCount
} from '../../constants';

import { modelPersonData } from '../../utils';

const initialState = {
	prioritizePerson: {
		error: false,
		loading: false,
		errorMsg: null,
		loadingMsg: "Saving the person's priority ..."
	},
	addPerson: {
		error: false,
		loading: false,
		errorMsg: null,
		loadingMsg: 'Adding the person ...'
	},
	deletePerson: {
		error: false,
		loading: false,
		errorMsg: null,
		loadingMsg: 'Deleting the person ...'
	},
	viewPerson: {
		data: null,
		error: false,
		loading: false,
		errorMsg: null,
		loadingMsg: 'Fetching person information ...'
	},
	listPeople: {
		error: false,
		loading: false,
		errorMsg: null,
		loadingMsg: "Updating people's list ...",
		term: null,
		start: 0,
		limit,
		items: [],
		groupCount,
		next_start: limit,
		more_items_in_collection: false
	},
	lastAction: null
};

const ListPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case PERSONS__FETCH_STARTED:
			return {
				...state,
				lastAction: 'listPeople',
				listPeople: {
					...state.listPeople,
					error: false,
					loading: true
				}
			};
		case PERSONS__FETCH_SUCCEEDED:
			return {
				...state,
				listPeople: {
					...state.listPeople,
					error: false,
					loading: false,
					...{
						items:
							action.payload && action.payload.data
								? modelPersonData(action.payload.data)
								: {}
					},
					...(action.payload &&
					action.payload.additional_data &&
					action.payload.additional_data.pagination
						? action.payload.additional_data.pagination
						: {})
				}
			};
		case PERSONS__FETCH_FAILED:
			return {
				...state,
				listPeople: {
					...state.listPeople,
					error: true,
					loading: false,
					errorMsg:
						"An error occured while trying to fetch people's list. Details: " +
						action.payload
				}
			};
		case PERSON__PRIORITIZE_STARTED:
			return {
				...state,
				lastAction: 'prioritizePerson',
				prioritizePerson: {
					...state.prioritizePerson,
					error: false,
					loading: true
				}
			};
		case PERSON__PRIORITIZE_SUCCEEDED:
			return {
				...state,
				prioritizePerson: {
					...state.prioritizePerson,
					error: false,
					loading: false
				}
			};
		case PERSON__PRIORITIZE_FAILED:
			return {
				...state,
				lastAction: 'prioritizePerson',
				prioritizePerson: {
					...state.prioritizePerson,
					error: true,
					loading: false,
					errorMsg:
						"An error occured while trying to prioritize people's list. Details: " +
						action.payload
				}
			};
		case PERSONS__ADD_STARTED:
			return {
				...state,
				lastAction: 'addPerson',
				addPerson: {
					...state.addPerson,
					error: false,
					loading: true
				}
			};
		case PERSONS__ADD_SUCCEEDED:
			return {
				...state,
				addPerson: {
					...state.addPerson,
					error: false,
					loading: false
				}
			};
		case PERSONS__ADD_FAILED:
			return {
				...state,
				lastAction: 'addPerson',
				addPerson: {
					...state.addPerson,
					error: true,
					loading: false,
					errorMsg:
						'An error occured while trying to add the person. Details: ' +
						action.payload
				}
			};
		case PERSON__FETCH_STARTED:
			return {
				...state,
				lastAction: 'viewPerson',
				viewPerson: {
					...state.viewPerson,
					data: null,
					error: false,
					loading: true
				}
			};
		case PERSON__FETCH_SUCCEEDED:
			return {
				...state,
				viewPerson: {
					...state.viewPerson,
					...{
						data:
							action.payload && action.payload.data
								? modelPersonData(action.payload.data)
								: {}
					},
					error: false,
					loading: false
				}
			};
		case PERSON__FETCH_FAILED:
			return {
				...state,
				lastAction: 'viewPerson',
				viewPerson: {
					...state.viewPerson,
					data: null,
					error: true,
					loading: false,
					errorMsg:
						'An error occured while trying to load the personal details. Details: ' +
						action.payload
				}
			};
		case PERSON__DELETE_STARTED:
			return {
				...state,
				lastAction: 'deletePerson',
				deletePerson: {
					...state.deletePerson,
					error: false,
					loading: true
				}
			};
		case PERSON__DELETE_SUCCEEDED:
			return {
				...state,
				deletePerson: {
					...state.deletePerson,
					error: false,
					loading: false
				}
			};
		case PERSON__DELETE_FAILED:
			return {
				...state,
				lastAction: 'deletePerson',
				deletePerson: {
					...state.deletePerson,
					error: true,
					loading: false,
					errorMsg:
						'An error occured while trying to delete the person. Details: ' +
						action.payload
				}
			};
		case SEARCH__FETCH_STARTED:
			return {
				...state,
				lastAction: 'listPeople',
				listPeople: {
					...state.listPeople,
					error: false,
					loading: true
				}
			};
		case SEARCH__FETCH_SUCCEEDED:
			return {
				...state,
				listPeople: {
					...state.listPeople,
					error: false,
					loading: false,
					...{
						items:
							action.payload && action.payload.data
								? modelPersonData(action.payload.data)
								: {}
					},
					...(action.payload.additional_data &&
					action.payload.additional_data.pagination
						? action.payload.additional_data.pagination
						: {})
				}
			};
		case SEARCH__FETCH_FAILED:
			return {
				...state,
				lastAction: 'listPeople',
				listPeople: {
					...state.listPeople,
					error: true,
					loading: false,
					errorMsg:
						'An error occured while trying to search your keyword. Details: ' +
						action.payload
				}
			};
		default:
			return state;
	}
};

export default ListPageReducer;
