import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

const Button = ({ size, color, children, className, ...restProps }) => {
	const classNames = classnames(
		'button',
		{
			[`button--${size}`]: size
		},
		{
			[`button--${color}`]: color
		}
	);
	return (
		children != null &&
		children.constructor !== Array &&
		(typeof children === 'string' ? (
			<button
				className={classnames(classNames, { [className]: className })}
				{...restProps}
			>
				{children}
			</button>
		) : (
			React.cloneElement(children, {
				className: classnames(classNames, {
					[children.props.className]: children.props && children.props.className
				})
			})
		))
	);
};

Button.propTypes = {
	size: PropTypes.oneOfType([
		() => null,
		PropTypes.oneOf(['xsmall', 'small', 'default'])
	]),
	color: PropTypes.oneOfType([
		() => null,
		PropTypes.oneOf(['green', 'red', 'default'])
	])
};

Button.defaultProps = {
	size: null,
	color: null
};

export default Button;
