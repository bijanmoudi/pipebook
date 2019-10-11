import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

const Spinner = ({ size, text, silent, style, className, ...restProps }) => {
	return (
		<div
			className={classnames('spinner', { [className]: className })}
			style={{ ...style, ...(size ? { fontSize: size * 10 } : {}) }}
			{...restProps}
		>
			<span
				{...(silent ? {} : { role: 'alert' })}
				aria-busy="true"
				className="visuallyhidden"
			>
				{text}
			</span>
		</div>
	);
};

Spinner.propTypes = {
	size: PropTypes.number,
	text: PropTypes.string,
	silent: PropTypes.bool
};

Spinner.defaultProps = {
	size: null,
	text: 'Loading ...',
	silent: false
};

export default Spinner;
