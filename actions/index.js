import * as ACTIONS from '../constants/index';

//Categories
export function doAddCategory(id, parentId, title) {
    return {
        type: ACTIONS.CATEGORY_ADD,
        id,
        parentId,
        title
    };
}

export function doDeleteCategory(id) {
    return {
        type: ACTIONS.CATEGORY_DELETE,
        id
    };
}

export function doEditCategory(id, title) {
    return {
        type: ACTIONS.CATEGORY_EDIT,
        id,
        title
    }
}

//Tasks

export function doAddTask(id, parentId, name, description, checked) {
    return {
        type: ACTIONS.TASK_ADD,
        id,
        parentId,
        name,
        description,
        checked
    }
}

export function doEditTask(id, parentId, name, description, checked) {
    return {
        type: ACTIONS.TASK_EDIT,
        id,
        parentId,
        name,
        description,
        checked,
    }
}

export function doChangeCheckedTask(id, checked) {
    return {
        type: ACTIONS.TASK_CHANGE_CHECKED,
        id,
        checked
    }
}

//GUI

//Nested add window (for adding nested categories)
export function doOpenNestedAddWindow(parentId) {
    return {
        type: ACTIONS.NESTED_ADD_WINDOW_OPEN,
        parentId,
    }
}

export function doCloseNestedAddWindow() {
    return {
        type: ACTIONS.NESTED_ADD_WINDOW_CLOSE
    }
}

//Category edit window (to edit name of category)

export function doOpenCategoryEditWindow(editId, title) {
    return {
        type: ACTIONS.CATEGORY_EDIT_WINDOW_OPEN,
        editId,
        title,
    }
}

export function doCloseCategoryEditWindow() {
    return {
        type: ACTIONS.CATEGORY_EDIT_WINDOW_CLOSE,
    }
}

//Confirm delete window
export function doOpenConfirmDeleteWindow(deleteId, deleteCategoryTitle) {
    return {
        type: ACTIONS.CONFIRM_DELETE_WINDOW_OPEN,
        deleteCategoryTitle,
        deleteId,
    }
}

export function doCloseConfirmDeleteWindow() {
    return {
        type: ACTIONS.CONFIRM_DELETE_WINDOW_CLOSE,
    }
}

//Filters
export function doChangeSearchFilter(filter) {
    return {
        type: ACTIONS.SEARCH_FILTER_CHANGE,
        filter,
    }
}

export function doChangeShowDoneFilter(value) {
    return {
        type: ACTIONS.SHOW_DONE_FILTER_CHANGE,
        value,
    }
}
