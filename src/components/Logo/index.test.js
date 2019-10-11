import React from 'react';
import renderer from 'react-test-renderer';
import Logo from './Logo';

const props = {
	id: 'footer-logo',
	width: 50,
	color: '#000000'
};

describe('Testing "Logo" component', () => {
	it('Rendering default logo', () => {
		const tree = renderer.create(<Logo id={props.id} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering width custom color and custom width', () => {
		const tree = renderer
			.create(<Logo id={props.id} width={props.width} color={props.color} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
