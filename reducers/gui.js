import * as ACTIONS from '../constants/index';

const initialState = {
    isNestedAddOpened: false,
    nestedParentId: " ",
}

export default function gui(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.OPEN_NESTED_ADD_WINDOW: {
            return {
                ...state,
                isNestedAddOpened: true,
                nestedParentId: action.parentId,
            }
        }
        case ACTIONS.CLOSE_NESTED_ADD_WINDOW: {
            return {
                ...state,
                isNestedAddOpened: false
            }
        }
        default: return state;
    }
}