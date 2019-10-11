import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

const props = {
	value: 'Dulce',
	hasReset: false,
	containerClassName: 'search__input',
	ref: React.createRef()
};

describe('Testing "Input" component', () => {
	it('Rendering without default value but with custom container class', () => {
		const tree = renderer
			.create(
				<Input
					ref={props.ref}
					containerClassName={props.containerClassName}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with default value and without reset button', () => {
		const tree = renderer
			.create(
				<Input
					ref={props.ref}
					value={props.value}
					hasReset={props.hasReset}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
