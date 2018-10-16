import axios from 'axios';
import * as ACTIONS from '../constants/index';

/**
 * Action creator. Creates CATEGORY_ADD action object.
 * 
 * @param {String} id Id of new category.
 * @param {String} parentId Id of parent category (parentId = null if the parent category is root).
 * @param {String} title Title of category.
 * 
 * @returns {Object} Action to add category. 
 */
export function doAddCategory(id, parentId, title) {
    return {
        type: ACTIONS.CATEGORY_ADD,
        id,
        parentId,
        title
    };
}

/**
 * Action creator. Creates CATEGORY_DELETE action object.
 * 
 * @param {String} id Id of category that need to be deleted.
 * 
 * @returns {Object} Action to delete category.
 */
export function doDeleteCategory(id) {
    return {
        type: ACTIONS.CATEGORY_DELETE,
        id
    };
}

/**
 * Action creator. Creates CATEGORY_EDIT action object.
 * 
 * @param {String} id Id of category that need to be edited.
 * @param {String} title New title of category.
 * 
 * @returns {Object} Action to edit category.
 */
export function doEditCategory(id, title) {
    return {
        type: ACTIONS.CATEGORY_EDIT,
        id,
        title
    }
}

/**
 * Action creator. Creates TASK_ADD action object.
 * 
 * @param {String} id Id of new task.
 * @param {String} parentId Id of parent category of new task.
 * @param {String} name Task name.
 * @param {String} description Task description.
 * @param {Boolean} checked If the task should be initially checked.
 * 
 * @returns {Object} Action to add task.
 */
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

/**
 * Action creator. Creates TASK_EDIT action object.
 * 
 * @param {String} id Id of task that need to be edited.
 * @param {String} parentId Id of parent category of this task.
 * @param {String} name New name of task.
 * @param {String} description New description of task.
 * @param {Boolean} checked New state of checked property of task.
 * 
 * @returns {Object} Action to edit task.
 */
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

/**
 * Action creator. Creates TASK_CHANGE_CHECKED action object.
 * 
 * @param {String} id Id of task that need to be edited.
 * @param {Boolean} checked New 'checked' property of task.
 * 
 * @returns {Object} Action to edit 'checked' property of task.
 */
export function doChangeCheckedTask(id, checked) {
    return {
        type: ACTIONS.TASK_CHANGE_CHECKED,
        id,
        checked
    }
}

/**
 * Action creator. Creates NESTED_ADD_WINDOW_OPEN action object.
 * 
 * @param {String} parentId Id of parent category for which window should be opened.
 * 
 * @returns {Object} Action to open 'nested add' window.
 */
export function doOpenNestedAddWindow(parentId) {
    return {
        type: ACTIONS.NESTED_ADD_WINDOW_OPEN,
        parentId,
    }
}

/**
 * Action creator. Creates NESTED_ADD_WINDOW_CLOSE action object.
 * 
 * @returns {Object} Action to close 'nested add' window.
 */
export function doCloseNestedAddWindow() {
    return {
        type: ACTIONS.NESTED_ADD_WINDOW_CLOSE
    }
}

/**
 * Action creator. Creates CATEGORY_EDIT_WINDOW_OPEN action object.
 * 
 * @param {String} editId Id of category that need to be edited.
 * @param {String} title Current title of category.
 * 
 * @returns {Object} Action to open 'category edit' window.
 */
export function doOpenCategoryEditWindow(editId, title) {
    return {
        type: ACTIONS.CATEGORY_EDIT_WINDOW_OPEN,
        editId,
        title,
    }
}

/**
 * Action creator. Creates CATEGORY_EDIT_WINDOW_CLOSE action object.
 * 
 * @returns {Object} Action to close 'category edit' window.
 */
export function doCloseCategoryEditWindow() {
    return {
        type: ACTIONS.CATEGORY_EDIT_WINDOW_CLOSE,
    }
}

/**
 * Action creator. Creates CONFIRM_DELETE_WINDOW_OPEN action object.
 * 
 * @param {String} deleteId Id of category that need to be deleted.
 * @param {String} deleteCategoryTitle Title of category that need to be deleted.
 * 
 * @returns {Object} Action to open 'confirm delete' window.
 */
export function doOpenConfirmDeleteWindow(deleteId, deleteCategoryTitle) {
    return {
        type: ACTIONS.CONFIRM_DELETE_WINDOW_OPEN,
        deleteCategoryTitle,
        deleteId,
    }
}

/**
 * Action creator. Creates CONFIRM_DELETE_WINDOW_CLOSE action object.
 * 
 * @returns {Object} Action to close 'confirm delete' window.
 */
export function doCloseConfirmDeleteWindow() {
    return {
        type: ACTIONS.CONFIRM_DELETE_WINDOW_CLOSE,
    }
}

/**
 * Action creator. Creates SEARCH_FILTER_CHANGE action object.
 * 
 * @param {String} filter New value of 'search' filter.
 * 
 * @returns {Object} Action to change 'search' filter.
 */
export function doChangeSearchFilter(filter) {
    return {
        type: ACTIONS.SEARCH_FILTER_CHANGE,
        filter,
    }
}

/**
 * Action creator. Creates SHOW_DONE_FILTER_CHANGE action object.
 * 
 * @param {String} value New value of 'show done' filter.
 * 
 * @returns {Object} Action to change 'show done' filter.
 */
export function doChangeShowDoneFilter(value) {
    return {
        type: ACTIONS.SHOW_DONE_FILTER_CHANGE,
        value,
    }
}

/**
 * Action creator. Creates DB_START_LOAD_STATE action object.
 * 
 * @returns {Object} Action to load state from DB.
 */

export function doStartLoadState() {
    return {
        type: ACTIONS.DB_START_LOAD_STATE,
    }
}

/**
 * Action creator. Creates DB_SET_LOADED_STATE action object.
 * 
 * @returns {Object} Action to set loaded state.
 */

export function doSetLoadedState(state){
    return {
        type: ACTIONS.DB_SET_LOADED_STATE,
        state,
    }
}

/**
 * Makes API call to load state on page refresh.
 * 
 */
export function doGetState() {
    return function (dispatch) {
        dispatch(doStartLoadState());
        return axios.get("http://localhost:4000/state/load").then(res => {
            return res.data.state;
        }).then((state) => {
            dispatch(doSetLoadedState(state));
        },
        
        );
    };
}