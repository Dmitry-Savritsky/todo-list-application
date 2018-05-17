import * as ACTIONS from '../constants/index';

//state
export function doAddCategory(id, parentId, title) {
    return {
        type: ACTIONS.ADD_CATEGORY,
        id,
        parentId,
        title
    };
}

export function doDeleteCategory(id) {
    return {
        type: ACTIONS.DELETE_CATEGORY,
        id
    };
}

export function doEditCategory(id, title) {
    return {
        type: ACTIONS.EDIT_CATEGORY,
        id,
        title
    }
}

export function doAddTask(id, categoryId, name, decription, checked) {
    return {
        type: ACTIONS.ADD_TASK,
        id,
        categoryId,
        name,
        decription,
        checked
    }
}

export function doMoveTask(id, categoryId) {
    return {
        type: ACTIONS.MOVE_TASK,
        id,
        categoryId
    }
}

//NestedCategoryAdder

export function doOpenNestedAddWindow(parentId) {
    return {
        type: ACTIONS.OPEN_NESTED_ADD_WINDOW,
        parentId,
    }
}

export function doCloseNestedAddWindow() {
    return {
        type: ACTIONS.CLOSE_NESTED_ADD_WINDOW
    }
}

//CategoryEditor

export function doOpenCategoryEditWindow(editId, title) {
    return {
        type: ACTIONS.OPEN_CATEGORY_EDIT_WINDOW,
        editId,
        title,
    }
}

export function doCloseCategoryEditWindow() {
    return {
        type: ACTIONS.CLOSE_CATEGORY_EDIT_WINDOW,
    }
}


export function doChooseCategory(id) {
    return {
        type: ACTIONS.CHOOSE_CATEGORY,
        id,
    }
}

//Tasks

//export function doChangeTaskList
