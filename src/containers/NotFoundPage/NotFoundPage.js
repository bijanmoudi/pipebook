import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Page } from '../../components';
import './index.scss';

const NotFoundPage = () => {
	const title = 'Page not found';
	const pageContent = (
		<div className="text-align-center pv-50">
			<p className="h1 mb-30">
				<strong>
					Sorry, we couldn't find what you are looking for :(
				</strong>
			</p>
			<Button>
				<Link to="/">Back to home</Link>
			</Button>
		</div>
	);
	return <Page title={title} pageContent={pageContent} />;
};

export default NotFoundPage;
