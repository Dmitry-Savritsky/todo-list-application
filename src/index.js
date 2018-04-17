import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ConnectedApp from '../containers/ConnectedApp.jsx';
import rootReducer from '../reducers'

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root'),
);