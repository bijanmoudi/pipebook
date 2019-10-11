import React from 'react';
import renderer from 'react-test-renderer';
import Prompt from './Prompt';

const props = {
	text: 'An error occured',
	type: 'error',
	hasLoading: true
};

describe('Testing "Prompt" component', () => {
	it('Rendering loading Prompt without text', () => {
		const tree = renderer
			.create(<Prompt hasLoading={props.hasLoading} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering failed Prompt', () => {
		const tree = renderer
			.create(<Prompt text={props.text} type={props.type} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
