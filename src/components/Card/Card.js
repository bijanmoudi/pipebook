import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import stringReplace from 'react-string-replace';
import { Avatar } from '../../components';
import './index.scss';

const Card = ({
	title,
	titleExtra,
	highlight,
	link,
	metadata,
	avatar,
	contentExtra,
	elementType,
	className,
	...restProps
}) => {
	const ElementType = elementType;
	const highlightedtitle = !highlight
		? title
		: stringReplace(title, highlight, (match, i) => (
				<span key={`__highlight${i}`} className="highlighted">
					{match}
				</span>
		  ));
	return (
		<ElementType
			className={classnames('card', { [className]: className })}
			{...restProps}
		>
			<div className="card__inner">
				<div className="card__column card__column--image">
					<Avatar
						className="card__avatar"
						name={title}
						url={avatar}
						link={link}
					/>
				</div>
				<div className="card__column card__column--info">
					<div className="card__header">
						<h3 className="card__title">
							{link ? (
								<a href={link}>{highlightedtitle}</a>
							) : (
								<span>{highlightedtitle}</span>
							)}
						</h3>
						{titleExtra && (
							<div className="card__header-extra">
								{titleExtra}
							</div>
						)}
					</div>
					{metadata && Object.keys(metadata).length ? (
						<ul className="card__meta">
							{Object.keys(metadata).map((meta, i) => (
								<li
									key={`__meta${i}`}
									className={classnames(
										'card__meta-item',
										`card__meta-item--${meta}`
									)}
								>
									<span>{metadata[meta]}</span>
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>
			{contentExtra}
		</ElementType>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	titleExtra: PropTypes.oneOfType([() => null, PropTypes.element]),
	highlight: PropTypes.oneOfType([() => null, PropTypes.string]),
	link: PropTypes.oneOfType([() => null, PropTypes.string]),
	metadata: PropTypes.oneOfType([() => null, PropTypes.object]),
	avatar: PropTypes.oneOfType([() => null, PropTypes.string]),
	contentExtra: PropTypes.oneOfType([() => null, PropTypes.element]),
	elementType: PropTypes.string
};

Card.defaultProps = {
	title: null,
	titleExtra: null,
	highlight: null,
	link: null,
	metadata: null,
	avatar: null,
	contentExtra: null,
	elementType: 'li'
};

export default Card;
