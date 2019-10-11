import React from 'react';
import renderer from 'react-test-renderer';
import Content from './Content';

const props = {
	title: 'Sample Page',
	titleExtra: <a href="#">?</a>,
	search: <input name="search" type="search" placeholder="Search ..." />,
	navigation: (
		<ol>
			<li>
				<a href="#1">Page1</a>
			</li>
			<li>
				<a href="#2">Page2</a>
			</li>
		</ol>
	),
	pageContent: <p>Page content goes here ...</p>
};

describe('Testing "Content" component', () => {
	it('Rendering a simple page', () => {
		const tree = renderer
			.create(
				<Content title={props.title} pageContent={props.pageContent} />
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering a rich page', () => {
		const tree = renderer
			.create(
				<Content
					title={props.title}
					titleExtra={props.titleExtra}
					search={props.search}
					navigation={props.navigation}
					pageContent={props.pageContent}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
