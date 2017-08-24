import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import gameReducers from './dashboard/dashboardReducers';
import {devToolsEnhancer} from 'redux-devtools-extension';

import Dashboard from './dashboard/Dashboard';
import '../css/main.scss';

let store = createStore(gameReducers, devToolsEnhancer());
render(
	<Provider store={store}>
		<Dashboard/>
	</Provider>,
	document.getElementById('app')
);

