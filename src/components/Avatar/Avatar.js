import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getAbbr } from '../../utils';
import './index.scss';

const Avatar = ({
	url,
	name,
	size,
	link,
	focusable,
	className,
	...restProps
}) => {
	const abbr = name ? getAbbr(name) : null;
	const WrapperElement = link ? 'a' : 'div';
	const [loadedURL, setURL] = useState(null);
	const loaderImg = new Image();
	const setImageURL = () => {
		setURL(url);
	};
	useEffect(() => {
		if (url) {
			loaderImg.src = url;
			loaderImg.addEventListener('load', setImageURL);
			return () => {
				loaderImg.removeEventListener('load', setImageURL);
			};
		}
	});
	return (
		<figure
			className={classnames(
				'avatar',
				{ 'avatar--is-loading': !loadedURL && url },
				{ [`avatar--${size}`]: size },
				{ [className]: className }
			)}
			{...restProps}
		>
			<WrapperElement
				title={name}
				className="avatar__wrapper"
				{...(link ? { href: link } : {})}
				{...(link && !focusable ? { tabIndex: '-1' } : {})}
			>
				{abbr ? <abbr className="avatar__abbreviation">{abbr}</abbr> : null}
				{url && loadedURL ? (
					<div
						role="img"
						aria-label={`${name}'s Avatar`}
						className="avatar__image"
						style={{
							backgroundImage: `url(${loadedURL})`
						}}
					/>
				) : null}
			</WrapperElement>
		</figure>
	);
};

Avatar.propTypes = {
	url: PropTypes.oneOfType([() => null, PropTypes.string]),
	name: PropTypes.oneOfType([() => null, PropTypes.string]),
	link: PropTypes.oneOfType([() => null, PropTypes.string]),
	size: PropTypes.oneOfType([
		() => null,
		PropTypes.oneOf(['large', 'default'])
	]),
	focusable: PropTypes.bool
};

Avatar.defaultProps = {
	url: null,
	name: null,
	link: null,
	size: null,
	focusable: false
};

export default Avatar;
