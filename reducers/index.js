import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import main from './main';
import gui from './gui';

export default combineReducers({
    routing: routerReducer,
    main,
    gui
});