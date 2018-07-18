import * as ACTIONS from '../constants/index';

const initialState = {
    categories: [
        {
            title: "Category 1",
            id: "catID1",
            nestedCategories: [
                {
                    title: "Category 1_1",
                    id: "catID1_1",
                    nestedCategories: []
                },
                {
                    title: "Category 1_2",
                    id: "catID1_2",
                    nestedCategories: [
                        {
                            title: "Category 3_1",
                            id: "catID3_1",
                            nestedCategories: []
                        },
                    ]
                }
            ]
        },
        {
            title: "Category 2",
            id: "catID2",
            nestedCategories: [],
        },
    ],

    tasks: [{
        parentId: "catID1",
        id: "id1",
        name: "task 1",
        checked: false,
        description: "description 1"
    },
    {
        parentId: "catID1_1",
        id: "id2",
        name: "task 2",
        checked: true,
        description: "description 2"
    },
    {
        parentId: "catID1_1",
        id: "id3",
        name: "task 4",
        checked: false,
        description: "description 2"
    },
    {
        parentId: "catID2",
        id: "id5",
        name: "task 3",
        checked: false,
        description: "description 3"
    },
    {
        parentId: "catID2",
        id: "id4",
        name: "task 5",
        checked: true,
        description: "description 4"
    },
    ],
    chosenCategoryId: "",
    chosenCategoryProgress: 0,
};

export default function main(state = initialState, action) {
    switch (action.type) {

        case ACTIONS.CATEGORY_CHOOSE: {
            return {
                ...state,
                chosenCategoryId: action.id,
            }
        }

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

function applyEditTask(tasks, id, parentId, name, checked, description) {
    let item = {
        id: "",
        parentId: "",
        name: "",
        checked: false,
        description: "",
    };

    let result = tasks.map(task => {
        if (task.id == id) {
            item.parentId = parentId;
            item.id = task.id;
            item.name = name;
            item.checked = !checked;
            item.description = description;
            return item;
        }
        return task;
    });
    return result;
}

function applyChangeCheckedTask(tasks, id, checked) {

    let item = {
        id: "",
        parentId: "",
        name: "",
        checked: false,
        description: "",
    };

    let result = tasks.map(task => {
        if (task.id == id) {
            item.parentId = task.parentId;
            item.id = id;
            item.name = task.name;
            item.checked = !checked;
            item.description = task.description;
            return item;
        }
        return task;
    });
    return result;

}

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

function applyEditCategory(categories, id, title) {
    let result;
    let completed = false;

    let item = {
        title: "",
        id: "",
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

function applyDeleteCategory(category, id) {

    let completed = false;
    let filtered;
    let result;

    filtered = category.filter(element => {
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

function findCategoryById(category, id) {
    let result = null;
    category.forEach(element => {
        if (element.id == id) result = element;
    });

    if (result == null) {
        category.forEach(element => {
            let stepResult = findCategoryById(element.nestedCategories, id);
            if (stepResult != null) result = stepResult;
        })
    }

    return result;
}

function findNestedCategoriesId(category) {
    let result = [];
    result.push(category.id);
    category.nestedCategories.forEach(element => {
        result = result.concat(findNestedCategoriesId(element));
    });
    return result;
}

function deleteTasks(tasks, idArray) {
    return tasks.filter(element => {
        for (let i = 0; i < idArray.length; i++) {
            if (element.parentId == idArray[i]) return false;
        }
        return true;
    });
}