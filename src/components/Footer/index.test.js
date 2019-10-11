import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

describe('Testing "Footer" component', () => {
	it('Rendering the footer', () => {
		const tree = renderer.create(<Footer />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
