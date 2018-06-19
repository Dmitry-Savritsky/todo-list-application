import * as ACTIONS from '../constants/index';

const initialState = {
    isNestedAddOpened: false,
    isEditCategoryOpened: false,
    isConfirmDeleteOpened: false,
    editId: " ",
    editTitle: " ",
    nestedParentId: " ",
    chosenCategoryId: " ",
    deleteId: " ",
    deleteCategoryTitle: " ",
}

export default function gui(state = initialState, action) {
    switch (action.type) {
        //add window
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

        //edit window
        case ACTIONS.OPEN_CATEGORY_EDIT_WINDOW: {
            return {
                ...state,
                isEditCategoryOpened: true,
                editId: action.editId,
                editTitle: action.title
            }
        }

        case ACTIONS.CLOSE_CATEGORY_EDIT_WINDOW: {
            return {
                ...state,
                isEditCategoryOpened: false,
            }
        }

        case ACTIONS.OPEN_CONFIRM_DELETE_WINDOW: {
            return {
                ...state,
                isConfirmDeleteOpened: true,
                deleteCategoryTitle: action.deleteCategoryTitle,
                deleteId: action.deleteId,
            }
        }

        case ACTIONS.CLOSE_CONFIRM_DELETE_WINDOW: {
            return {
                ...state,
                isConfirmDeleteOpened: false,
            }
        }

        case ACTIONS.CHOOSE_CATEGORY: {
            return {
                ...state,
                chosenCategoryId: action.id,
            }
        }

        default: return state;
    }
}