import React, { useEffect, Suspense } from 'react';
import classnames from 'classnames';
import { Footer, Header, Spinner } from '../../components';
import './index.scss';

const Content = React.lazy(() => import('../Content'));

const Page = ({
	title,
	titleExtra,
	search,
	navigation,
	pageContent,
	className,
	...restProps
}) => {
	useEffect(() => {
		document.title = `Pipebook — ${title}`;
	});
	return (
		<div
			className={classnames('container', { [className]: className })}
			{...restProps}
		>
			<Header />
			<Suspense
				fallback={
					<div className="content content--is-loading">
						<Spinner text={`${title} is loading ...`} />
					</div>
				}
			>
				<Content
					title={title}
					titleExtra={titleExtra}
					search={search}
					navigation={navigation}
					pageContent={pageContent}
				/>
			</Suspense>
			<Footer />
		</div>
	);
};

export default Page;
