import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';
import './index.scss';

const Content = ({ title, titleExtra, search, navigation, pageContent }) => {
	return (
		<StickyContainer className="content">
			<Sticky>
				{({ style, isSticky }) => (
					<div
						className={classnames('content__header', {
							'content__header--is-sticked': isSticky
						})}
						style={style}
					>
						<div className="wrapper">
							<div className="content-header__inner">
								<div className="content-header__column content-header__column--title">
									<h1>{title}</h1>
									{titleExtra}
								</div>
								{search ? (
									<div className="content-header__column content-header__column--search">
										{search}
									</div>
								) : null}
								{navigation ? (
									<div className="content-header__column content-header__column--navigation">
										{navigation}
									</div>
								) : null}
							</div>
						</div>
					</div>
				)}
			</Sticky>
			<main className="content__body">
				<div className="wrapper">
					<div className="content-body__inner">{pageContent}</div>
				</div>
			</main>
		</StickyContainer>
	);
};

Content.propTypes = {
	title: PropTypes.string.isRequired,
	titleExtra: PropTypes.oneOfType([() => null, PropTypes.element]),
	search: PropTypes.oneOfType([() => null, PropTypes.element]),
	navigation: PropTypes.oneOfType([() => null, PropTypes.element]),
	pageContent: PropTypes.element.isRequired
};

Content.defaultProps = {
	title: null,
	titleExtra: null,
	search: null,
	navigation: null,
	pageContent: null
};

export default Content;
