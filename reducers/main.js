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
            tasks: [{
                name: "task 3",
                id: "id3",
                checked: false,
                description: "description 3"
            },
            {
                name: "task 4",
                id: "id4",
                checked: true,
                description: "description 4"
            },
            ],
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

    ],
};

export default function main(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_CATEGORY:
            return {
                ...state,
                categories: [
                    ...applyAddCategory(state.categories, action.id, action.parentId, action.title)
                ]
            }

        case ACTIONS.DELETE_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...applyDeleteCategory(state.categories, action.id)
                ],
            };
        }

        case ACTIONS.EDIT_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...applyEditCategory(state.categories, action.id, action.title)
                ],
            };
        }

        case ACTIONS.ADD_TASK: {
            return {
                ...state,
                tasks: [
                    ...applyAddTask(state.tasks, action.id, action.parentId, action.name, action.description, action.checked)
                ],
            };
        }

        case ACTIONS.EDIT_TASK: {
            return {
                ...state,
                tasks: [
                    ...applyEditTask(state.tasks, action.id, action.parentId, action.name, action.checked, action.description)
                ],
            }
        }

        case ACTIONS.CHANGE_CHECKED_TASK: {
            return {
                ...state,
                tasks: [
                    ...changeCheckedTask(state.tasks, action.id, action.checked)
                ],
            }
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
    });
    return result;
}

function changeCheckedTask(tasks, id, checked) {
    let result = tasks.map(task => {
        if (task.id == id) {
            task.checked = checked;
        }
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
        if (element.id == id) completed = true;
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