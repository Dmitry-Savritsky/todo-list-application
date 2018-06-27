import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo';
import main from './main';
import gui from './gui';

export default combineReducers({
    main: undoable(main, {
        filter: distinctState(),
        limit: 10,
    }),
    gui,
});