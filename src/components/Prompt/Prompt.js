import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Spinner } from '../../components';
import './index.scss';

const Prompt = ({
	text,
	visible,
	type,
	hasLoading,
	onClick,
	className,
	...restProps
}) => {
	return (
		<div
			role="alert"
			className={classnames(
				'prompt',
				{ [className]: className },
				{ [`prompt--${type}`]: type },
				{ [`prompt--is-visible`]: visible }
			)}
			{...restProps}
		>
			<div className="prompt__inner" onClick={() => onClick()}>
				{hasLoading && !['success', 'error'].includes(type) ? (
					<Spinner
						text={text}
						silent={!visible}
						className="prompt__spinner"
					/>
				) : null}
				<span className="prompt__text">{text}</span>
			</div>
		</div>
	);
};

Prompt.propTypes = {
	text: PropTypes.oneOfType([() => null, PropTypes.string.isRequired]),
	visible: PropTypes.bool,
	type: PropTypes.oneOfType([
		() => null,
		PropTypes.oneOf(['success', 'error', 'default'])
	]),
	hasLoading: PropTypes.bool,
	onClick: PropTypes.func
};

Prompt.defaultProps = {
	text: null,
	visible: false,
	type: null,
	hasLoading: false,
	onClick: () => {}
};

export default Prompt;
