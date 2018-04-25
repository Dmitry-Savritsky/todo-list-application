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
                    ...state.categories,
                    {
                        title: action.title,
                        id: action.id,
                        tasks: [],
                        nestedCategories: [],
                    }
                ]
            }

        case ACTIONS.DELETE_CATEGORY:
            {
                return {
                    ...state,
                    categories: [
                        ...deleteCategory(state.categories, action.id)
                    ],
                };
            }
        default:
            return state;
    }
}

function deleteCategory(category, id) {

    let flag = false;
    let filtered;
    let result;

    filtered = category.filter(element => {
        if (element.id == id) flag = true;
        return element.id != id;
    });

    result = filtered;

    if (!flag) {
        result = filtered.map(element => {
            element.nestedCategories = deleteStep(element.nestedCategories, id);
            return element;
        });
    }

    return result;
}

function deleteStep(category, id) {
    let stepResult = category;
    let flag = false;

    stepResult = category.filter(element => {
        if (element.id == id) flag = true;
        return element.id != id;
    });

    if (!flag) {
        stepResult = stepResult.map(element => {
            element.nestedCategories = deleteStep(element.nestedCategories, id);
            return element;
        });
    }
    return stepResult;
}