import * as ACTIONS from '../constants/index';

import main, { initialState } from './main';

describe('main reducer', () => {

    it('should return the initial state for unknown action', () => {
        expect(
            main(undefined, {})
        ).toEqual(initialState);
    });

    //adding a category
    it('should add category for CATEGORY_ADD action', () => {
        expect(
            main({
                categories: [],
                tasks: [],
            }, {
                    type: ACTIONS.CATEGORY_ADD,
                    id: "testID",
                    parentId: null,
                    title: 'Added category',
                })
        ).toEqual({
            categories: [
                {
                    title: 'Added category',
                    id: "testID",
                    nestedCategories: [],
                },
            ],
            tasks: [],
        });
    });

    it('should add nested category for CATEGORY_ADD action', () => {

        const init = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [
                        {
                            title: "Category 1_1",
                            id: "catID1_1",
                            nestedCategories: [],
                        },
                    ],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [],
        }

        expect(
            main(init, {
                type: ACTIONS.CATEGORY_ADD,
                id: "testID",
                parentId: "catID1_1",
                title: "New category",
            })
        ).toEqual({
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [
                        {
                            title: "Category 1_1",
                            id: "catID1_1",
                            nestedCategories: [
                                {
                                    title: "New category",
                                    id: "testID",
                                    nestedCategories: [],
                                }
                            ],
                        },
                    ],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [],
        });
    });

    //editing a category
    it('should change category for CATEGORY_EDIT action', () => {
        const init = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [
                        {
                            title: "Category 1_1",
                            id: "catID1_1",
                            nestedCategories: [],
                        },
                    ],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [],
        }

        const expected = {

            categories: [
                {
                    title: "Changed category",
                    id: "catID1",
                    nestedCategories: [
                        {
                            title: "Category 1_1",
                            id: "catID1_1",
                            nestedCategories: [],
                        },
                    ],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [],
        }

        expect(
            main(init, {
                type: ACTIONS.CATEGORY_EDIT,
                id: "catID1",
                title: "Changed category",
            })
        ).toEqual(expected);
    });

    //add task
    it('should add task for TASK_ADD action', () => {

        const init = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [],
        }

        const expected = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID2",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            }],
        }

        expect(
            main(init, {
                type: ACTIONS.TASK_ADD,
                id: "TestID",
                parentId: "catID2",
                name: "Task example name",
                description: "Description",
                checked: false,
            })
        ).toEqual(expected);
    });

    //edit task
    it('should change task for TASK_EDIT action', () => {

        const init = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID1",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            },
            {
                parentId: "catID1",
                id: "TestID2",
                name: "Another example",
                checked: false,
                description: "Description",
            }
            ],
        }

        const expected = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID1",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            },
            {
                parentId: "catID1",
                id: "TestID2",
                name: "Changed name",
                checked: false,
                description: "Description",
            }
            ],
        }

        expect(
            main(init, {
                type: ACTIONS.TASK_EDIT,
                id: "TestID2",
                parentId: "catID1",
                name: "Changed name",
                description: "Description",
                checked: false,
            })
        ).toEqual(expected);
    });

    //edit checkbox of task
    it('should change checkbox status of task for TASK_CHANGE_CHECKED action', () => {

        const init = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID1",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            },
            {
                parentId: "catID1",
                id: "TestID2",
                name: "Another example",
                checked: false,
                description: "Description",
            }
            ],
        }

        const expected = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID1",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            },
            {
                parentId: "catID1",
                id: "TestID2",
                name: "Another example",
                checked: true,
                description: "Description",
            }
            ],
        }

        expect(
            main(init, {
                type: ACTIONS.TASK_CHANGE_CHECKED,
                id: "TestID2",
                checked: true,
            })
        ).toEqual(expected);
    });

    //delete category and it's tasks
    //edit checkbox of task
    it('should delete category and it\'s tasks for CATEGORY_DELETE action', () => {

        const init = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
                {
                    title: "Category 2",
                    id: "catID2",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID1",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            },
            {
                parentId: "catID2",
                id: "TestID2",
                name: "Another example",
                checked: false,
                description: "Description",
            },
            {
                parentId: "catID2",
                id: "TestID3",
                name: "Another example 2" ,
                checked: true,
                description: "Description 2",
            }
            ],
        }

        const expected = {
            categories: [
                {
                    title: "Category 1",
                    id: "catID1",
                    nestedCategories: [],
                },
            ],
            tasks: [{
                parentId: "catID1",
                id: "TestID",
                name: "Task example name",
                checked: false,
                description: "Description",
            },
            ],
        }

        expect(
            main(init, {
                type: ACTIONS.CATEGORY_DELETE,
                id: "catID2",
            })
        ).toEqual(expected);
    });

});