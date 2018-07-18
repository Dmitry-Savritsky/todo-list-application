import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import root from '../reducers';
import TaskEditPage from '../pages/TaskEditPage.jsx';
import MainPage from '../pages/MainPage.jsx';
import history from '../history/history';

require('typeface-roboto');

const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        root,
        router: routerReducer,
    }),
    applyMiddleware(middleware)
);

window.store = store;

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/categories/:id" component={MainPage} />
                <Route exact path="/task/:id" component={TaskEditPage} />
                <Route exact path="/" component={MainPage} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);