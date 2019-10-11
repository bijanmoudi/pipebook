import React from 'react';
import classnames from 'classnames';
import './index.scss';

const Footer = ({ className, ...restProps }) => {
	return (
		<footer
			className={classnames('footer', { [className]: className })}
			{...restProps}
		></footer>
	);
};

export default Footer;
