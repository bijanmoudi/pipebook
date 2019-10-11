import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Testing "Header" component', () => {
	it('Rendering the header', () => {
		const tree = renderer.create(<Header />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
