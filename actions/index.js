import * as ACTIONS from '../constants/index';

//state
export function addCategory(id, parentId, title) {
    return {
        type: ACTIONS.ADD_CATEGORY,
        id,
        parentId,
        title
    };
}

export function deleteCategory(id) {
    return {
        type: ACTIONS.DELETE_CATEGORY,
        id
    };
}

export function editCategory(id, title) {
    return {
        type: ACTIONS.EDIT_CATEGORY,
        id,
        title
    }
}

export function addTask(id, categoryId, name, decription, checked) {
    return {
        type: ACTIONS.ADD_TASK,
        id,
        categoryId,
        name,
        decription,
        checked
    }
}

export function moveTask(id, categoryId) {
    return {
        type: ACTIONS.MOVE_TASK,
        id,
        categoryId
    }
}

export function changeShow(showState) {
    return {
        type: ACTIONS.CHANGE_SHOW,
        showState
    }
}

//NestedCategoryAdder

export function openNestedAddWindow(parentId) {
    return {
        type: ACTIONS.OPEN_NESTED_ADD_WINDOW,
        parentId,
    }
}

export function closeNestedAddWindow() {
    return {
        type: ACTIONS.CLOSE_NESTED_ADD_WINDOW
    }
}

//CategoryEditor

export function openCategoryEditWindow(editId, title) {
    return {
        type: ACTIONS.OPEN_CATEGORY_EDIT_WINDOW,
        editId,
        title,
    }
}

export function closeCategoryEditWindow() {
    return {
        type: ACTIONS.CLOSE_CATEGORY_EDIT_WINDOW,
    }
}
