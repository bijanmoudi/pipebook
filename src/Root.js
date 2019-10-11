import React from 'react';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import { ListPage, NotFoundPage } from './containers';
import './index.scss';

const Root = ({ store }) => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Redirect exact from="/" to="/list/" />
					<Route path="/list/" component={ListPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default Root;
