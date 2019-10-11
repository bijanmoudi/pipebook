import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './Avatar';

const props = {
	url: 'http://placehold.it/200x200',
	name: 'Dulce Mays',
	link: 'https://www.google.com/search?q=Dulce+Mays'
};

describe('Testing "Avatar" component', () => {
	it('Rendering without image', () => {
		const tree = renderer.create(<Avatar name={props.name} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering without name', () => {
		const tree = renderer.create(<Avatar url={props.url} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with image, name, and link', () => {
		const tree = renderer
			.create(
				<Avatar name={props.name} url={props.url} link={props.link} />
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
