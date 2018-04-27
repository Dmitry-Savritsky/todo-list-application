import { combineReducers } from 'redux';
import categories from './categories';
import gui from './gui';

export default combineReducers({
    categories,
    gui
});