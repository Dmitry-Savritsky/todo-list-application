import * as ACTIONS from '../constants/index';

export function addCategory(id, title) {
    return {
        type: ACTIONS.ADD_CATEGORY,
        id,
        title
    };
}

export function deleteCategory(id) {
    return {
        type: ACTIONS.DELETE_CATEGORY,
        id
    };
}

export function addNestedCategory(id, parentId, title) {
    return {
        type: ACTIONS.ADD_NESTED_CATEGORY,
        id,
        parentId,
        title
    }
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

export function changeShow(showState){
    return {
        type: ACTIONS.CHANGE_SHOW,
        showState
    }
}