import * as ACTIONS from '../constants/index';

export const initialState = {
    categories: [
        {
            title: 'Category 1',
            id: 'catID1',
            nestedCategories: [
                {
                    title: 'Category 1_1',
                    id: 'catID1_1',
                    nestedCategories: [],
                },
            ],
        },
        {
            title: 'Category 2',
            id: 'catID2',
            nestedCategories: [],
        },
    ],

    tasks: [{
        parentId: 'catID1',
        id: 'id1',
        name: 'task 1',
        checked: false,
        description: 'description 1'
    },
    {
        parentId: 'catID1_1',
        id: 'id2',
        name: 'task 2',
        checked: true,
        description: 'description 2'
    },
    {
        parentId: 'catID1_1',
        id: 'id3',
        name: 'task 4',
        checked: false,
        description: 'description 2'
    },
    {
        parentId: 'catID2',
        id: 'id5',
        name: 'task 3',
        checked: false,
        description: 'description 3'
    },
    {
        parentId: 'catID2',
        id: 'id4',
        name: 'task 5',
        checked: true,
        description: 'description 4'
    },
    ],
};

/**
 * Reducer function. Specify how the application's state changes in response to actions sent to the store.
 * 
 * @param {Object} state Initial state of application.
 * @param {Object} action Action sent to the store.
 * @returns {Object} New state of application.
 */
export default function main(state = initialState, action) {
    switch (action.type) {

        case ACTIONS.CATEGORY_ADD:
            return {
                ...state,
                categories: [
                    ...applyAddCategory(state.categories, action.id, action.parentId, action.title),
                ],
            }

        case ACTIONS.CATEGORY_DELETE: {
            let category = findCategoryById(state.categories, action.id);
            let idArray = findNestedCategoriesId(category);
            let tasks = deleteTasks(state.tasks, idArray);

            return {
                ...state,
                categories: [
                    ...applyDeleteCategory(state.categories, action.id),
                ],
                tasks: [
                    ...tasks,
                ],
            };
        }

        case ACTIONS.CATEGORY_EDIT: {
            return {
                ...state,
                categories: [
                    ...applyEditCategory(state.categories, action.id, action.title),
                ],
            };
        }

        case ACTIONS.TASK_ADD: {
            return {
                ...state,
                tasks: [
                    ...applyAddTask(state.tasks, action.id, action.parentId, action.name, action.checked, action.description),
                ],
            };
        }

        case ACTIONS.TASK_EDIT: {
            return {
                ...state,
                tasks: [
                    ...applyEditTask(state.tasks, action.id, action.parentId, action.name, action.checked, action.description),
                ],
            };
        }

        case ACTIONS.TASK_CHANGE_CHECKED: {
            return {
                ...state,
                tasks: [
                    ...applyChangeCheckedTask(state.tasks, action.id, action.checked),
                ],
            };
        }

        default:
            return state;
    }
}

/**
 * Edits task with given arguments.
 * 
 * @param {Array} tasks Array of tasks objects.
 * @param {String} id Task id.
 * @param {String} parentId Id of parent category for the task.
 * @param {String} name New task name.
 * @param {Boolean} checked True if the task should be checked.
 * @param {String} description New description of task.
 * @returns {Array} New state of tasks array.
 */
function applyEditTask(tasks, id, parentId, name, checked, description) {
    let item = {
        id: '',
        parentId: '',
        name: '',
        checked: false,
        description: '',
    };

    let result = tasks.map(task => {
        if (task.id == id) {
            item.parentId = parentId;
            item.id = task.id;
            item.name = name;
            item.checked = checked;
            item.description = description;
            return item;
        }
        return task;
    });
    return result;
}

/**
 * Edits checked value of task.
 * 
 * @param {Array} tasks Array of tasks objects.
 * @param {String} id Task id.
 * @param {Boolean} checked True if the task should be checked.
 * @returns {Array} New state of tasks array.
 */
function applyChangeCheckedTask(tasks, id, checked) {

    let item = {
        id: '',
        parentId: '',
        name: '',
        checked: false,
        description: '',
    };

    let result = tasks.map(task => {
        if (task.id == id) {
            item.parentId = task.parentId;
            item.id = id;
            item.name = task.name;
            item.checked = checked;
            item.description = task.description;
            return item;
        }
        return task;
    });
    return result;

}

/**
 * Add new task to the array of tasks.
 * 
 * @param {Array} tasks Array of tasks objects.
 * @param {String} id Task id.
 * @param {String} parentId Id of parent category for the task.
 * @param {String} name Task name.
 * @param {Boolean} checked True if the task should be checked.
 * @param {String} description Description of task.
 * @returns {Array} New state of tasks array.
 */
function applyAddTask(tasks, id, parentId, name, checked, description) {
    let item = {
        parentId,
        id,
        name,
        description,
        checked
    };

    let result = [
        item,
        ...tasks,
    ];

    return result;
}

/**
 * Edits title value of category.
 * 
 * @param {Array} categories Array of categories objects.
 * @param {String} id Id of edited category.
 * @param {String} title New title of edited category.
 * @returns {Array} New state of categories array.
 */
function applyEditCategory(categories, id, title) {
    let result;
    let completed = false;

    let item = {
        title: '',
        id: '',
        nestedCategories: [],
    };

    let mapped = categories.map(element => {

        if (element.id == id) {
            item.title = title;
            item.id = id;
            item.nestedCategories = element.nestedCategories.slice();
            completed = true;

            return item;
        }
        return element;
    });

    if (completed) return mapped;

    else {
        result = mapped.map(element => {

            let mapItem = {
                title: element.title,
                id: element.id,
                nestedCategories: [],
            };

            mapItem.nestedCategories = applyEditCategory(element.nestedCategories, id, title);
            return mapItem;
        });

        return result;
    }

}


/**
 * Adds category as a child of category pointed by parentId.
 * 
 * @param {Array} categories Array of categories objects.
 * @param {String} id Id of new category.
 * @param {String} parentId Id of parent category (null - root).
 * @param {String} title Title of new category.
 * @returns {Array} New state of categories array.
 */
function applyAddCategory(categories, id, parentId, title) {

    let result;
    let completed = false;

    let item = {
        title: title,
        id: id,
        nestedCategories: [],
    };

    if (parentId == null) {

        result = [
            item,
            ...categories,
        ];

        return result;
    }

    let mapped = categories.map(element => {

        if (element.id == parentId) {

            let itemNested = [
                item,
                ...element.nestedCategories,
            ]

            let resItem = {
                title: element.title,
                id: element.id,
                nestedCategories: itemNested,
            }

            completed = true;
            return resItem;

        }
        return element;
    });

    if (completed) return mapped;

    else {
        result = mapped.map(element => {

            let mapItem = {
                title: element.title,
                id: element.id,
                nestedCategories: [],
            };

            mapItem.nestedCategories = applyAddCategory(element.nestedCategories, id, parentId, title);
            return mapItem;
        });

        return result;
    }

}

/**
 * Deletes category from the array of categories.
 * 
 * @param {Array} categories Array of categories objects.
 * @param {String} id Id of deleting category.
 * @returns {Array} New state of categories array.
 */
function applyDeleteCategory(categories, id) {

    let completed = false;
    let filtered;
    let result;

    filtered = categories.filter(element => {
        if (element.id == id) {
            completed = true;
        }
        return element.id != id;
    });

    result = filtered;

    if (!completed) {
        result = filtered.map(element => {
            let mapItem = {
                title: element.title,
                id: element.id,
                nestedCategories: [],
            };

            mapItem.nestedCategories = applyDeleteCategory(element.nestedCategories, id);
            return mapItem;
        });
    }

    return result;
}

/**
 * Founds category by it's id.
 * 
 * @param {Array} categories Array of categories objects.
 * @param {String} id Id of finding category.
 * @returns {Object} Founded category.
 */
function findCategoryById(categories, id) {
    let result = null;
    categories.forEach(element => {
        if (element.id == id) result = element;
    });

    if (result == null) {
        categories.forEach(element => {
            let stepResult = findCategoryById(element.nestedCategories, id);
            if (stepResult != null) result = stepResult;
        })
    }

    return result;
}

/**
 * Founds id's of nested categories for the 'category' parameter.
 * 
 * @param {Object} category Source category.
 * @returns {Array} Array of the id's of nested categories.
 */
function findNestedCategoriesId(category) {
    let result = [];
    result.push(category.id);
    category.nestedCategories.forEach(element => {
        result = result.concat(findNestedCategoriesId(element));
    });
    return result;
}

/**
 * Deletes tasks from array of tasks which belongs to the categories.
 * 
 * @param {Array} tasks Array of tasks objects.
 * @param {Array} idArray Array of the id's of categories.
 * @returns {Array} New state of tasks array.
 */
function deleteTasks(tasks, idArray) {
    return tasks.filter(element => {
        for (let i = 0; i < idArray.length; i++) {
            if (element.parentId == idArray[i]) return false;
        }
        return true;
    });
}