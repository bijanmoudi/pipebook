import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	sortableHandle,
	sortableElement,
	sortableContainer
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {
	Avatar,
	Button,
	Card,
	Info,
	Input,
	Modal,
	Page,
	Pagination,
	Prompt
} from '../../components';
import {
	fetchPersons,
	searchPersons,
	fetchPerson,
	addPerson,
	deletePerson,
	updatePriority
} from '../../actions';
import { getUrlParams, getMinimumDifference } from '../../utils';
import { CUSTOM_FIELDS__PERSONS as customFilds } from '../../constants';
import './index.scss';

const pathPattern = '/list(/page)?/:page?(/search)?/:term?/';
const hashPattern = '#/:entity/:action/:id?/';
const grabbingElementClass = 'is--grabbing';
const movingElementClass = 'is--moving';
const movingElementParentClass = 'has-moving-children';
const DragHandle = sortableHandle(() => <div className="card__handle" />);
const SortableItem = sortableElement(cardProps => <Card {...cardProps} />);
const SortableList = sortableContainer(({ items, term, disable }) => {
	return (
		<ol className="card-list">
			{items.map((listItem, index) => (
				<SortableItem
					key={`__card${index}`}
					index={index}
					title={listItem.name}
					className={term ? '' : 'is--draggable'}
					titleExtra={
						<a
							href={`#/person/delete/${listItem.id}/`}
							title="Delete this person"
							className="button button--red button--xsmall"
						>
							Delete
							<span className="visuallyhidden"> this person</span>
						</a>
					}
					contentExtra={disable ? null : <DragHandle />}
					highlight={term}
					link={`#/person/view/${listItem.id}/`}
					metadata={{
						...(listItem.organization
							? { organization: listItem.organization }
							: {})
					}}
					avatar={listItem.picture}
				/>
			))}
		</ol>
	);
});

const List = () => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const state = useSelector(state => state.ListPage);
	const path = getUrlParams(location.pathname, pathPattern);
	const hash = getUrlParams(location.hash, hashPattern);
	const currentPage = parseInt(path.page) || 1;
	const pageStartIndex = state.listPeople.limit * (currentPage - 1);
	const items = state.listPeople.items;
	const searchInputRef = React.createRef();
	const addPersonInputRef = React.createRef();
	const [term, setTerm] = useState(path.term);
	const [isModalOpen, setModalOpen] = useState(false);
	const [promptVisible, setPromptVisible] = useState(true);
	const [pageItems, setItems] = useState(items);
	const [modalContent, setModalContent] = useState(items);
	const [activePerson, setActivePerson] = useState(state.viewPerson.data);
	const [addPersonFormValidated, setAddPersonFormValidated] = useState(false);
	const showPrompt =
		state.lastAction &&
		(state[state.lastAction].loading ||
			(state[state.lastAction].error && promptVisible));
	const needsModal =
		hash.action &&
		(['add', 'delete'].includes(hash.action.toLowerCase()) ||
			(hash.action === 'view' && !state.viewPerson.error));
	const onModalClose = () => {
		setModalOpen(false);
		history.push(location.pathname);
	};
	const onSubmitAddPerson = input => {
		onModalClose();
		dispatch(
			addPerson(
				{
					name: input ? input.value : addPersonInputRef.current.value,
					/*
						Setting the priority of the entry to current time in microseconds, to
						insure newly added record will be placed at the end of the list, even
						if no custom priority provided. This will increase the useful life of
						the prioritization precedure (with one update).
					*/
					priority:
						(((performance.timing &&
							performance.timing.navigationStart) ||
							Date.now()) +
							performance.now()) *
						1e3
				},
				term
			)
		);
	};
	const onSubmitDeletePerson = id => {
		onModalClose();
		dispatch(deletePerson({ id, term }));
	};
	const onTermChange = term => {
		setTerm(term);
	};
	const onStopTyping = term => {
		const termLength = term.trim().length;
		if (termLength === 0) {
			history.push('/list/');
		} else if (termLength > 1) {
			history.push(`/list/page/1/search/${term}/`);
		}
	};
	const onSortStart = ({ node, index, collection, isKeySorting }, event) => {
		document.documentElement.classList.add(grabbingElementClass);
		node.classList.add(movingElementClass);
		node.parentNode.classList.add(movingElementParentClass);
	};
	const onSortEnd = ({ oldIndex, newIndex }) => {
		document.documentElement.classList.remove(grabbingElementClass);
		document
			.getElementsByClassName(movingElementClass)[0]
			.classList.remove(movingElementClass);
		document
			.getElementsByClassName(movingElementParentClass)[0]
			.classList.remove(movingElementParentClass);
		if (oldIndex !== newIndex) {
			/*
				== Updating priority in presence of pagination only with one update ==

				Since Pipedrive's API does not support multiple updates with one query
				(to apply the new priorities of current-page persons), the only way to
				solve the problem was to use big decimal and post-decimal figures. But
				the obvious bug is that, maximum allowed length of decimals will limit 
				the prioritization.
				By the way, forget about having one update request per person, because
				it leads to have 100 requests at once if the page limit is set to 100.
				Maybe leveraging linked list data structure work. But I prefer to work
				on it in the future if needed.
			*/
			const portion =
				getMinimumDifference(
					pageItems.map(item => item.priority || 1)
				) / state.listPeople.limit;
			const prioritizedItem = pageItems[oldIndex];
			const newPriority =
				(pageItems[newIndex].priority || 1) +
				(newIndex < oldIndex ? -1 : 1) * portion;
			dispatch(
				updatePriority({
					id: prioritizedItem.id,
					priority: newPriority
				})
			);
			setItems(arrayMove(pageItems, oldIndex, newIndex));
		}
	};
	useEffect(() => {
		if (term) {
			if (term.trim().length > 1) {
				dispatch(
					searchPersons({
						...state.listPeople,
						term,
						start: pageStartIndex
					})
				);
			}
		} else {
			dispatch(
				fetchPersons({
					...state.listPeople,
					start: pageStartIndex
				})
			);
		}
		// eslint-disable-next-line
	}, [currentPage, term]);
	useEffect(() => {
		if (hash.action === 'view') {
			/*
				======= Check for missing details in current list data =======

				This will prevent useless requests. Pipedrive API gives almost
				all useful detail fields in the response of the list endpoint,
				but this is not true about search endpoint. So it is better to
				check for the presence of details, before starting a new call.
			*/
			const currentItem = pageItems.filter(
				item => parseInt(item.id) === parseInt(hash.id)
			);
			if (
				pageItems.length &&
				(!currentItem.length ||
					Object.values(customFilds).filter(
						x => !Object.keys(currentItem[0]).includes(x)
					).length)
			) {
				dispatch(fetchPerson({ id: hash.id }));
			} else {
				setActivePerson(currentItem[0]);
			}
		}
		// eslint-disable-next-line
	}, [hash.id, hash.action, pageItems]);
	useEffect(() => {
		switch (hash.action) {
			case 'add':
				setModalContent(addPersonModal);
				break;
			case 'delete':
				setModalContent(deletePersonModal);
				break;
			case 'view':
				setModalContent(viewPersonModal);
				break;
			default:
		}
		setModalOpen(needsModal);
		// eslint-disable-next-line
	}, [hash.action, needsModal, addPersonFormValidated, activePerson]);
	useEffect(() => {
		setItems(items);
	}, [items]);
	useEffect(() => {
		setActivePerson(state.viewPerson.data);
	}, [state.viewPerson.data]);
	useEffect(() => {
		setTerm(path.term);
	}, [path.term]);
	const addPersonModal = {
		id: 'modal--add-person',
		label: "Add new person to the people's list",
		title: 'Add New Person',
		content: (
			<Input
				type="text"
				name="name"
				placeholder="Enter the name of the person ..."
				containerClassName="add-person__input mv-5"
				required={true}
				autoFocus={true}
				ref={addPersonInputRef}
				validateOnStart={true}
				onValidate={errors => setAddPersonFormValidated(!errors.length)}
				onSubmit={ref => onSubmitAddPerson(ref)}
			/>
		),
		extraFooterContent: (
			<Button color="green">
				<button
					title="Add this person"
					onClick={() => onSubmitAddPerson()}
					disabled={!addPersonFormValidated}
				>
					Add
					<span className="visuallyhidden"> this person</span>
				</button>
			</Button>
		)
	};
	const deletePersonModal = {
		id: 'modal--delete-person',
		label: "Delete the person from the people's list",
		title: 'Delete Person',
		content: (
			<p>
				Are you sure that you want to delete this person?{' '}
				<em className="color--red">
					Please make sure first, because this action is not undoable.
				</em>
			</p>
		),
		extraFooterContent: (
			<Button color="red">
				<button
					title="Delete this person"
					onClick={() => onSubmitDeletePerson(hash.id)}
				>
					Delete
					<span className="visuallyhidden"> this person</span>
				</button>
			</Button>
		)
	};
	const viewPersonModal = activePerson && {
		id: 'modal--view-person',
		label: `Personal Information of ${activePerson && activePerson.name}`,
		title: 'Person Information',
		content: (
			<>
				<div className="text-align-center">
					<Avatar
						className="card__avatar mb-20"
						name={activePerson && activePerson.name}
						url={activePerson && activePerson.picture}
						size="large"
					/>
					<h3>{activePerson && activePerson.name}</h3>
					<span className="h3 color--green semibold">
						{activePerson && activePerson.phone}
					</span>
				</div>
				<hr />
				<Info
					className="mb-50"
					items={
						activePerson &&
						Object.keys(activePerson)
							.filter(
								item =>
									![
										'id',
										'priority',
										'picture',
										'phone',
										'name'
									].includes(item)
							)
							.reduce((obj, key) => {
								obj[key] = activePerson[key];
								return obj;
							}, {})
					}
				/>
			</>
		)
	};
	const title = "People's List" + (term ? ` - Results for "${term}"` : '');
	const titleExtra = (
		<Button size="small" color="green">
			<Link to="#/person/add/" title="Add a new person">
				Add new
				<span className="visuallyhidden"> person</span>
			</Link>
		</Button>
	);
	const search = (
		<div className="search__input-container" role="search">
			<label htmlFor="people-search-input" className="visuallyhidden">
				Search the people's list
			</label>
			<Input
				id="people-search-input"
				containerClassName="search__input-container"
				className="search__input"
				type="search"
				name="search"
				placeholder="Search for..."
				value={term}
				onChange={onTermChange}
				onStopTyping={onStopTyping}
				ref={searchInputRef}
				minLength={2}
			/>
		</div>
	);
	const navigation = (
		<Pagination
			currentPage={currentPage}
			groupCount={state.listPeople.groupCount}
			hasNextPage={state.listPeople.more_items_in_collection}
			basePath={
				'/list/page/{page}' + ((term ? '/search/' + term : '') + '/')
			}
			pathPageSelector="{page}"
		/>
	);
	const pageContent = (
		<>
			<p aria-live="polite" className="visuallyhidden">
				{pageItems.length
					? `Showing results ${pageStartIndex +
							1} to ${pageStartIndex + pageItems.length}`
					: 'No result found.'}
			</p>
			{pageItems.length ? (
				<SortableList
					term={term}
					items={pageItems}
					useDragHandle={true}
					hideSortableGhost={false}
					onSortStart={onSortStart}
					onSortEnd={onSortEnd}
					disable={state.prioritizePerson.loading}
					shouldCancelStart={() => term}
				/>
			) : state.listPeople.loading ? null : (
				<div className="text-align-center pv-50">
					<p className="h1 mb-30">
						<strong>No result found :(</strong>
					</p>
					{currentPage === 1 && !term ? null : (
						<Button>
							<Link to="/list/">Back to the index</Link>
						</Button>
					)}
				</div>
			)}
		</>
	);
	return (
		<>
			<Page
				title={title}
				titleExtra={titleExtra}
				search={search}
				navigation={navigation}
				pageContent={pageContent}
			/>
			{needsModal ? (
				<Modal
					pageTitle={
						hash.action === 'view' &&
						activePerson &&
						activePerson.name
					}
					open={isModalOpen}
					onClose={() => onModalClose()}
					loading={
						hash.action === 'view' &&
						(state.viewPerson.loading || !activePerson)
					}
					{...modalContent}
				/>
			) : null}
			{state.lastAction ? (
				<Prompt
					text={
						state[state.lastAction].error
							? state[state.lastAction].errorMsg
							: state[state.lastAction].loadingMsg
					}
					visible={showPrompt}
					type={state[state.lastAction].error ? 'error' : null}
					hasLoading={true}
					onClick={() =>
						!state[state.lastAction].loading &&
						setPromptVisible(false)
					}
				/>
			) : null}
		</>
	);
};

export default List;
