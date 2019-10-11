import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card';

const props = {
	title: 'Dulce Mays',
	titleExtra: (
		<a href="#help" className="button">
			?
		</a>
	),
	highlight: 'Dul',
	link: 'https://www.google.com/search?q=Dulce+Mays',
	metadata: {
		organization: 'Rockford Linear Actuation'
	},
	avatar: 'http://placehold.it/200x200',
	contentExtra: <div className="card__handle" />,
	elementType: 'div'
};

describe('Testing "Card" component', () => {
	it('Rendering the default', () => {
		const tree = renderer
			.create(
				<Card
					title={props.title}
					titleExtra={props.titleExtra}
					link={props.link}
					avatar={props.avatar}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with highlighted text', () => {
		const tree = renderer
			.create(
				<Card
					title={props.title}
					link={props.link}
					avatar={props.avatar}
					highlight={props.highlight}
					metadata={props.metadata}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering as a draggable "div"', () => {
		const tree = renderer
			.create(
				<Card
					title={props.title}
					link={props.link}
					avatar={props.avatar}
					contentExtra={props.contentExtra}
					elementType={props.elementType}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
