import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './index.scss';

const Pagination = ({
	currentPage,
	groupCount,
	hasNextPage,
	basePath,
	pathPageSelector,
	className,
	...restProps
}) => {
	const prevGroupPermitted = currentPage > groupCount;
	const prevPagePermitted = currentPage > 1;
	const nextPagePermitted = hasNextPage;
	const nextGroupPermitted = false; // Always disabled, because Pipedrive's API doesn't provide total count
	const currentPageIndex =
		currentPage % groupCount === 0 ? groupCount : currentPage % groupCount;
	const countOfPrevPagesInGroup = currentPageIndex - 1;
	const countOfNextPagesInGroup = groupCount - countOfPrevPagesInGroup - 1; // Again because of not having the total count, there will be a UI flash
	const getPath = page => {
		return basePath.replace(pathPageSelector, page);
	};
	return (
		<nav aria-label="Pagination">
			<ol
				className={classnames('pagination', {
					[className]: className
				})}
				{...restProps}
			>
				<li className="pagination__item pagination__item--previous-group">
					<Link
						to={
							prevGroupPermitted
								? getPath(currentPage - groupCount)
								: '#'
						}
						className={classnames('pagination__link', {
							'pagination__link--is-disabled': !prevGroupPermitted
						})}
						title="Previous set of pages"
						aria-disabled={!prevGroupPermitted}
						{...(prevGroupPermitted ? {} : { tabIndex: '-1' })}
					>
						<span className="visuallyhidden">
							Previous set of pages
						</span>
					</Link>
				</li>
				<li className="pagination__item pagination__item--previous-page">
					<Link
						to={prevPagePermitted ? getPath(currentPage - 1) : '#'}
						className={classnames('pagination__link', {
							'pagination__link--is-disabled': !prevPagePermitted
						})}
						title="Previous page"
						aria-disabled={!prevPagePermitted}
						{...(prevPagePermitted ? {} : { tabIndex: '-1' })}
					>
						<span className="visuallyhidden">Previous page</span>
					</Link>
				</li>
				{countOfPrevPagesInGroup
					? Array.apply(null, Array(countOfPrevPagesInGroup)).map(
							(item, i) => {
								const page =
									currentPage - countOfPrevPagesInGroup + i;
								return (
									<li
										key={`__prevpage${i}`}
										className="pagination__item"
									>
										<Link
											to={getPath(page)}
											className="pagination__link"
										>
											<span className="visuallyhidden">
												page #
											</span>
											{page}
										</Link>
									</li>
								);
							}
					  )
					: null}
				<li className="pagination__item pagination__item--is-active">
					<Link
						to={getPath(currentPage)}
						className="pagination__link"
						aria-current="page"
						tabIndex="-1"
					>
						<span className="visuallyhidden">page #</span>
						{currentPage}
					</Link>
				</li>
				{countOfNextPagesInGroup
					? Array.apply(null, Array(countOfNextPagesInGroup)).map(
							(item, i) => {
								const page = currentPage + i + 1;
								return (
									<li
										key={`__nextpage${i}`}
										className="pagination__item"
									>
										<Link
											to={
												nextPagePermitted
													? getPath(page)
													: '#'
											}
											className={classnames(
												'pagination__link',
												{
													'pagination__link--is-disabled': !nextPagePermitted
												}
											)}
											aria-disabled={!nextPagePermitted}
											{...(nextPagePermitted
												? {}
												: { tabIndex: '-1' })}
										>
											<span className="visuallyhidden">
												page #
											</span>
											{page}
										</Link>
									</li>
								);
							}
					  )
					: null}
				<li className="pagination__item pagination__item--next-page">
					<Link
						to={nextPagePermitted ? getPath(currentPage + 1) : '#'}
						className={classnames('pagination__link', {
							'pagination__link--is-disabled': !nextPagePermitted
						})}
						title="Next page"
						aria-disabled={!nextPagePermitted}
						{...(nextPagePermitted ? {} : { tabIndex: '-1' })}
					>
						<span className="visuallyhidden">Next page</span>
					</Link>
				</li>
				<li className="pagination__item pagination__item--next-group">
					<Link
						to={
							nextGroupPermitted
								? getPath(currentPage + groupCount)
								: '#'
						}
						className={classnames('pagination__link', {
							'pagination__link--is-disabled': !nextGroupPermitted
						})}
						title="Next set of pages"
						aria-disabled={!nextGroupPermitted}
						{...(nextGroupPermitted ? {} : { tabIndex: '-1' })}
					>
						<span className="visuallyhidden">
							Next set of pages
						</span>
					</Link>
				</li>
			</ol>
		</nav>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	groupCount: PropTypes.number.isRequired,
	hasNextPage: PropTypes.bool.isRequired,
	basePath: PropTypes.string.isRequired,
	pathPageSelector: PropTypes.string.isRequired
};

Pagination.defaultProps = {
	currentPage: 1,
	groupCount: 3,
	hasNextPage: false,
	basePath: '/page/{page}',
	pathPageSelector: '{page}'
};

export default Pagination;
