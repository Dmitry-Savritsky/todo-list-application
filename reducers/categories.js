import * as ACTIONS from '../constants/index';

const initialState = {
    categories: [
        {
            title: "Category 1",
            id: "catID1",
            tasks: [{
                name: "task 1",
                id: "id1",
                checked: false,
                description: "description 1"
            }],
            nestedCategories: [
                {
                    title: "Category 1_1",
                    id: "catID1_1",
                    tasks: [{
                        name: "task 2",
                        id: "id2",
                        checked: false,
                        description: "description 2"
                    }],
                    nestedCategories: []
                },
                {
                    title: "Category 1_2",
                    id: "catID1_2",
                    tasks: [{
                    }],
                    nestedCategories: [
                        {
                            title: "Category 3_1",
                            id: "catID3_1",
                            tasks: [{
                                name: "task 3",
                                id: "id3",
                                checked: false,
                                description: "description 3"
                            }],
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
};

export default function categories(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_CATEGORY:
            return {
                ...state,
                categories: [
                    ...addCategory(state.categories, action.id, action.parentId, action.title)
                ]
            }

        case ACTIONS.DELETE_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...deleteCategory(state.categories, action.id)
                ],
            };
        }

        case ACTIONS.EDIT_CATEGORY: {
            return {
                ...state,
                categories: [
                    ...editCategory(state.categories, action.id, action.title)
                ],
            };
        }

        default:
            return state;
    }
}

function editCategory(categories, id, title) {
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
            element.nestedCategories = editCategory(element.nestedCategories, id, title);
            return element;
        });

        return result;
    }

}

function addCategory(categories, id, parentId, title) {

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
        ]

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
            element.nestedCategories = addCategory(element.nestedCategories, id, parentId, title);
            return element;
        });

        return result;
    }

}

function deleteCategory(category, id) {

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
            element.nestedCategories = deleteCategory(element.nestedCategories, id);
            return element;
        });
    }

    return result;
}