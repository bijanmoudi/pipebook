import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

const Info = ({ items, className, ...restProps }) => {
	return items && Object.keys(items).length ? (
		<ul
			className={classnames('info', { [className]: className })}
			{...restProps}
		>
			{Object.keys(items).map(
				(item, key) =>
					items[item] && (
						<li key={`__info${key}`} className="info__item">
							<span className="info__title">
								<strong>{item}</strong>
								<span className="visuallyhidden">:</span>
							</span>
							<span className="info__content">{items[item]}</span>
						</li>
					)
			)}
		</ul>
	) : null;
};

Info.propTypes = {
	items: PropTypes.object
};

Info.defaultProps = {
	items: null
};

export default Info;
