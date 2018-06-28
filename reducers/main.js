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
               //chosenCategoryProgress: recalcCategoryProgress(state.tasks, action.id),
            }
        }

        case ACTIONS.CATEGORY_ADD:
            return {
                ...state,
                categories: [
                    ...applyAddCategory(state.categories, action.id, action.parentId, action.title)
                ],
               // chosenCategoryProgress: recalcCategoryProgress(state.tasks, state.chosenCategoryId),
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
              //  chosenCategoryProgress: recalcCategoryProgress(state.tasks, state.chosenCategoryId),
            };
        }

        case ACTIONS.CATEGORY_EDIT: {
            return {
                ...state,
                categories: [
                    ...applyEditCategory(state.categories, action.id, action.title)
                ],
               // chosenCategoryProgress: recalcCategoryProgress(state.tasks, state.chosenCategoryId),
            };
        }

        case ACTIONS.TASK_ADD: {

            let tempTasks = applyAddTask(state.tasks, action.id, action.parentId, action.name, action.description, action.checked);
           // let tempProgress = recalcCategoryProgress(tempTasks, state.chosenCategoryId);

            return {
                ...state,
                tasks: [
                    ...tempTasks,
                ],
               // chosenCategoryProgress: tempProgress,
            };
        }

        case ACTIONS.TASK_EDIT: {
            return {
                ...state,
                tasks: [
                    ...applyEditTask(state.tasks, action.id, action.parentId, action.name, action.checked, action.description)
                ],
               // chosenCategoryProgress: recalcCategoryProgress(state.tasks, state.chosenCategoryId),
            };
        }

        case ACTIONS.TASK_CHANGE_CHECKED: {
            return {
                ...state,
                tasks: [
                    ...applyChangeCheckedTask(state.tasks, action.id, action.checked)
                ],
                //chosenCategoryProgress: recalcCategoryProgress(state.tasks, state.chosenCategoryId),
            };
        }

        default:
            return state;
    }
}

function applyEditTask(tasks, id, parentId, name, checked, description) {
    let result = tasks.map(task => {
        if (task.id == id) {
            task.parentId = parentId;
            task.name = name;
            task.checked = checked;
            task.description = description;
        }
        return task;
    });
    return result;
}

function applyChangeCheckedTask(tasks, id, checked) {
    let result = tasks.map(task => {
        if (task.id == id) {
            task.checked = !checked;
        }
        return task;
    });
    return result;
}

function applyAddTask(tasks, id, parentId, name, description, checked) {
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

    let mapped = categories.map(element => {
        if (element.id == id) {
            element.title = title;
            completed = true;
        }
        return element;
    });

    if (completed) return mapped;

    else {
        result = mapped.map(element => {
            element.nestedCategories = applyEditCategory(element.nestedCategories, id, title);
            return element;
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
        tasks: [],
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
            element.nestedCategories = [
                item,
                ...element.nestedCategories
            ]
            completed = true;
        }
        return element;
    });

    if (completed) return mapped;

    else {
        result = mapped.map(element => {
            element.nestedCategories = applyAddCategory(element.nestedCategories, id, parentId, title);
            return element;
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
            element.nestedCategories = applyDeleteCategory(element.nestedCategories, id);
            return element;
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
/*
function recalcCategoryProgress(tasks, id) {

    let overallCount = 0;
    let completedCount = 0;

    tasks.forEach(element => {
        if (element.parentId == id) {
            overallCount += 1;
            if (element.checked) completedCount += 1;
        }
    });

    if (overallCount > 0) return (completedCount / overallCount) * 100;
    else return 100;
}*/