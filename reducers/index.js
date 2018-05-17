import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import gui from './gui';

export default combineReducers({
    routing: routerReducer,
    categories,
    gui
});