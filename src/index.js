import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import Root from './Root';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
serviceWorker.unregister();
