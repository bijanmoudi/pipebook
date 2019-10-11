import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Pagination from './Pagination';

const props = {
	currentPage: 1,
	groupCount: 3,
	hasNextPage: false,
	basePath: '/page/{page}',
	pathPageSelector: '{page}'
};

describe('Testing "Pagination" component', () => {
	it('Rendering default pagination', () => {
		const tree = renderer
			.create(
				<Router>
					<Pagination {...props} />
				</Router>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
