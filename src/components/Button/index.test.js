import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

const props = {
	size: 'small',
	color: 'green',
	text: 'Click Me',
	onClick: () => {},
	children: <button onClick={() => {}}>Click Me!</button>
};

describe('Testing "Button" component', () => {
	it('Rendering wrapping elements', () => {
		const tree = renderer
			.create(<Button size={props.size}>{props.children}</Button>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering creating element', () => {
		const tree = renderer
			.create(
				<Button onClick={props.onClick} color={props.color}>
					Click Me!
				</Button>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
