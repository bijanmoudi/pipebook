import React from 'react';
import renderer from 'react-test-renderer';
import Info from './Info';

const props = {
	items: {
		hasNull: {
			organization: null,
			groups: 'Mike’s contacts'
		},
		noNull: {
			organization: 'Rockford Linear Actuation',
			groups: 'Mike’s contacts'
		}
	}
};

describe('Testing "Info" component', () => {
	it('Rendering without items', () => {
		const tree = renderer.create(<Info />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with items contaning null values', () => {
		const tree = renderer
			.create(<Info items={props.items.hasNull} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with items contaning no null value', () => {
		const tree = renderer
			.create(<Info items={props.items.noNull} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
