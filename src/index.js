import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import rootReducer from '../reducers'
import TaskEditPage from '../pages/TaskEditPage.jsx';
import MainPage from '../pages/MainPage.jsx';

const store = createStore(rootReducer);
const history = syncHistoryWithStore(createBrowserHistory(), store);
window.store = store;

render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route path="/task/:id" component={TaskEditPage} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);