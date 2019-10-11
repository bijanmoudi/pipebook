import React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal';

const props = {
	id: 'new-person-modal',
	label: 'Add new person',
	title: 'Add new person',
	content: <input type="text" />,
	hasCloseButton: false,
	closeButtonContent: 'Close',
	closeButtonTitle: 'Close this modal',
	extraFooterContent: (
		<p>
			<span class="color-red">(*)</span> Required fields
		</p>
	),
	closeByOverlay: false,
	open: true,
	loading: true
};

describe('Testing "Modal" component', () => {
	it('Rendering closed modal', () => {
		const tree = renderer.create(<Modal id={props.id} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering loading modal', () => {
		const tree = renderer
			.create(<Modal id={props.id} open={props.open} loading={props.loading} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with customized footer and no title', () => {
		const tree = renderer
			.create(
				<Modal
					id={props.id}
					open={props.open}
					content={props.content}
					closeButtonContent={props.closeButtonContent}
					closeButtonTitle={props.closeButtonTitle}
					extraFooterContent={props.extraFooterContent}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Rendering with all props provided', () => {
		const tree = renderer
			.create(
				<Modal
					id={props.id}
					label={props.label}
					title={props.title}
					content={props.content}
					hasCloseButton={props.hasCloseButton}
					closeButtonContent={props.closeButtonContent}
					closeButtonTitle={props.closeButtonTitle}
					extraFooterContent={props.extraFooterContent}
					closeByOverlay={props.closeByOverlay}
					open={props.open}
					loading={props.loading}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
