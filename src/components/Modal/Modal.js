import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from '../../components';
import { randomString } from '../../utils';
import './index.scss';

const Modal = ({
	id,
	label,
	title,
	content,
	pageTitle,
	hasCloseButton,
	closeButtonContent,
	closeButtonTitle,
	extraFooterContent,
	closeByOverlay,
	open,
	loading,
	onOpen,
	onClose,
	className,
	...restProps
}) => {
	id = id || `modal--${randomString()}`;
	const [isOpen, setOpen] = useState(open);
	const handleEscape = e => {
		e.key === 'Escape' && handleClose();
	};
	const handleClose = () => {
		setOpen(false);
		document.title.replace(` - ${pageTitle}`, '');
		onClose();
	};
	useEffect(() => {
		if (isOpen && !loading) {
			setTimeout(
				() => (document.title += pageTitle ? ` - ${pageTitle}` : '')
			);
			onOpen();
		}
		// eslint-disable-next-line
	}, [isOpen, loading]);
	// eslint-disable-next-line
	useEffect(() => {
		const previousActiveElement = document.activeElement;
		setOpen(open);
		window.addEventListener('keyup', handleEscape);
		if (open) {
			document.documentElement.style.overflow = 'hidden';
			document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
		}
		return () => {
			window.removeEventListener('keyup', handleEscape);
			document.getElementsByTagName('body')[0].style.overflow = 'hidden';
			document.documentElement.style.overflowY = 'scroll';
			previousActiveElement.focus();
		};
	});
	return isOpen ? (
		<div
			id={id}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`${id}__label`}
			onClick={e => {
				e.preventDefault();
				e.target === e.currentTarget && closeByOverlay && handleClose();
			}}
			className={classnames(
				'modal',
				{ [className]: className },
				{ 'modal--is-loading': loading }
			)}
			{...restProps}
		>
			{label || title ? (
				<span
					id={`${id}__label`}
					className="visuallyhidden"
					aria-live="polite"
				>
					{label || title}
				</span>
			) : null}
			<div className="modal__inner">
				<header className="modal__header">
					<h2 className="modal__title">{title}</h2>
					<button
						className="modal__close"
						title="Close this modal"
						onClick={handleClose}
					>
						<span className="visuallyhidden">Close</span>
					</button>
				</header>
				{content ? (
					<section role="main" className="modal__content">
						{content}
					</section>
				) : null}
				{hasCloseButton || extraFooterContent ? (
					<footer className="modal__footer">
						{extraFooterContent}
						{hasCloseButton ? (
							<Button>
								<button
									title={
										closeButtonTitle || 'Back to the list'
									}
									onClick={handleClose}
								>
									{closeButtonContent || (
										<>
											Back
											<span className="visuallyhidden">
												{' '}
												to the list
											</span>
										</>
									)}
								</button>
							</Button>
						) : null}
					</footer>
				) : null}
			</div>
		</div>
	) : null;
};

Modal.propTypes = {
	id: PropTypes.oneOfType([() => null, PropTypes.string]),
	label: PropTypes.oneOfType([() => null, PropTypes.string]),
	title: PropTypes.oneOfType([() => null, PropTypes.string]),
	content: PropTypes.oneOfType([() => null, PropTypes.string]),
	pageTitle: PropTypes.oneOfType([() => null, PropTypes.string]),
	hasCloseButton: PropTypes.bool,
	closeButtonContent: PropTypes.oneOfType([() => null, PropTypes.element]),
	closeButtonTitle: PropTypes.oneOfType([() => null, PropTypes.string]),
	extraFooterContent: PropTypes.oneOfType([() => null, PropTypes.element]),
	closeByOverlay: PropTypes.bool,
	open: PropTypes.bool,
	loading: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func
};

Modal.defaultProps = {
	id: null,
	label: null,
	title: null,
	content: null,
	pageTitle: null,
	hasCloseButton: true,
	closeButtonContent: null,
	closeButtonTitle: null,
	extraFooterContent: null,
	closeByOverlay: true,
	open: false,
	loading: false,
	onOpen: () => {},
	onClose: () => {}
};

export default Modal;
