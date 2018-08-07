import * as ACTIONS from '../constants/index';
import history from '../history/history';

export const initialState = {
    isNestedAddOpened: false,
    isEditCategoryOpened: false,
    isConfirmDeleteOpened: false,
    editId: ' ',
    editTitle: ' ',
    nestedParentId: ' ',
    deleteId: ' ',
    deleteCategoryTitle: ' ',
    searchFilter: '',
    showDone: false,
}

/**
 * Reducer function. Specify how the application's state changes in response to actions sent to the store.
 * 
 * @param {Object} state Initial state of application.
 * @param {Object} action Action sent to the store.
 * @returns {Object} New state of application.
 */
export default function gui(state = initialState, action) {
    switch (action.type) {
        //add window
        case ACTIONS.NESTED_ADD_WINDOW_OPEN: {
            return {
                ...state,
                isNestedAddOpened: true,
                nestedParentId: action.parentId,
            }
        }
        case ACTIONS.NESTED_ADD_WINDOW_CLOSE: {
            return {
                ...state,
                isNestedAddOpened: false
            }
        }

        //edit window
        case ACTIONS.CATEGORY_EDIT_WINDOW_OPEN: {
            return {
                ...state,
                isEditCategoryOpened: true,
                editId: action.editId,
                editTitle: action.title
            }
        }

        case ACTIONS.CATEGORY_EDIT_WINDOW_CLOSE: {
            return {
                ...state,
                isEditCategoryOpened: false,
            }
        }

        //confirm delete window
        case ACTIONS.CONFIRM_DELETE_WINDOW_OPEN: {
            return {
                ...state,
                isConfirmDeleteOpened: true,
                deleteCategoryTitle: action.deleteCategoryTitle,
                deleteId: action.deleteId,
            }
        }

        case ACTIONS.CONFIRM_DELETE_WINDOW_CLOSE: {
            return {
                ...state,
                isConfirmDeleteOpened: false,
            }
        }

        //show done checkbox
        case ACTIONS.SHOW_DONE_FILTER_CHANGE: {
            return {
                ...state,
                showDone: action.value,
            }
        }
        //search filter
        case ACTIONS.SEARCH_FILTER_CHANGE: {
            return {
                ...state,
                searchFilter: action.filter,
            }
        }

        case ACTIONS.QUERY_UPDATE: {
            const location = history.location;
            location.search = 'show_done=' + state.showDone + '&search=' + state.searchFilter;
            history.push(location);

            return state;
        }

        default: return state;
    }
}