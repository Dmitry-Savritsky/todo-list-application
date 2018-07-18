import { combineReducers } from 'redux';
import undoable, { excludeAction } from 'redux-undo';
import main from './main';
import gui from './gui';
import * as ACTIONS from '../constants/index';

const excludedActions =
    [ACTIONS.LOCATION_CHANGE,
    ACTIONS.CATEGORY_EDIT_WINDOW_CLOSE,
    ACTIONS.CATEGORY_EDIT_WINDOW_OPEN,
    ACTIONS.CONFIRM_DELETE_WINDOW_CLOSE,
    ACTIONS.CONFIRM_DELETE_WINDOW_OPEN,
    ACTIONS.NESTED_ADD_WINDOW_CLOSE,
    ACTIONS.NESTED_ADD_WINDOW_OPEN,
    ACTIONS.SEARCH_FILTER_CHANGE,
    ACTIONS.SHOW_DONE_FILTER_CHANGE];

export default combineReducers({
    main: undoable(main, {
        filter: excludeAction(excludedActions),
        limit: 10,
        initTypes: ['@@redux/INIT', '@@INIT'],
    }),
    gui,
});