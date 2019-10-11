import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './Spinner';

const props = {
	size: 5,
	text: '',
	silent: true
};

describe('Testing "Spinner" component', () => {
	it('Rendering a loading spinner without text', () => {
		const tree = renderer.create(<Spinner text={props.text} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering a big silent spinner with default text', () => {
		const tree = renderer
			.create(<Spinner size={props.size} silent={props.silent} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
