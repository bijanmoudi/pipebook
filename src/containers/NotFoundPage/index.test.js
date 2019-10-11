import React from 'react';
import renderer from 'react-test-renderer';
import NotFoundPage from './NotFoundPage';

describe('Testing "NotFoundPage" component', () => {
	it('Rendering view', () => {
		const tree = renderer.create(<NotFoundPage />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
