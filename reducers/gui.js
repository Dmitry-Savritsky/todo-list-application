import * as ACTIONS from '../constants/index';

const initialState = {
    isNestedAddOpened: false,
    isEditCategoryOpened: false,
    isConfirmDeleteOpened: false,
    editId: " ",
    editTitle: " ",
    nestedParentId: " ",
    deleteId: " ",
    deleteCategoryTitle: " ",
    searchFilter: "",
    showDone: false,
}

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

        case ACTIONS.SHOW_DONE_FILTER_CHANGE: {
            return {
                ...state,
                showDone: action.value,
            }
        }

        case ACTIONS.SEARCH_FILTER_CHANGE: {
            return {
                ...state,
                searchFilter: action.filter,
            }
        }

        default: return state;
    }
}