import * as ACTIONS from '../constants/index';

import gui, { initialState } from './gui';

describe('gui reducer', () => {

    it('should return the initial state for unknown action', () => {
        expect(
            gui(undefined, {})
        ).toEqual(initialState);
    });

    //nested add window
    it('should change state of isNestedAddOpened for NESTED_ADD_WINDOW_OPEN action', () => {
        const testParentId = "testID";

        const expected = {
            ...initialState,
            isNestedAddOpened: true,
            nestedParentId: testParentId,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.NESTED_ADD_WINDOW_OPEN,
                parentId: testParentId,
            })
        ).toEqual(expected);
    });

    it('should change state of isNestedAddOpened for NESTED_ADD_WINDOW_CLOSE action', () => {

        const expected = {
            ...initialState,
            isNestedAddOpened: false,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.NESTED_ADD_WINDOW_CLOSE,
            })
        ).toEqual(expected);
    });

    //edit window
    it('should change state of isEditCategoryOpened for CATEGORY_EDIT_WINDOW_OPEN action', () => {
        const testId = "testID";
        const testTitle = "testTitle";

        const expected = {
            ...initialState,
            isEditCategoryOpened: true,
            editId: testId,
            editTitle: testTitle,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.CATEGORY_EDIT_WINDOW_OPEN,
                editId: testId,
                title: testTitle,
            })
        ).toEqual(expected);
    });

    it('should change state of isEditCategoryOpened for CATEGORY_EDIT_WINDOW_CLOSE action', () => {

        const expected = {
            ...initialState,
            isEditCategoryOpened: false,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.CATEGORY_EDIT_WINDOW_CLOSE,
            })
        ).toEqual(expected);
    });

    //confirm delete window
    it('should change state of isConfirmDeleteOpened for CONFIRM_DELETE_WINDOW_OPEN action', () => {
        const testId = "testID";
        const testTitle = "testTitle";

        const expected = {
            ...initialState,
            isConfirmDeleteOpened: true,
            deleteCategoryTitle: testTitle,
            deleteId: testId,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.CONFIRM_DELETE_WINDOW_OPEN,
                deleteCategoryTitle: testTitle,
                deleteId: testId,
            })
        ).toEqual(expected);
    });

    it('should change state of isConfirmDeleteOpened for CONFIRM_DELETE_WINDOW_CLOSE action', () => {

        const expected = {
            ...initialState,
            isConfirmDeleteOpened: false,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.CONFIRM_DELETE_WINDOW_CLOSE,
            })
        ).toEqual(expected);
    });

    //filters
    it('should change state of showDone for SHOW_DONE_FILTER_CHANGE action', () => {
        const isDone = false;

        const expected = {
            ...initialState,
            showDone: isDone,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.SHOW_DONE_FILTER_CHANGE,
                value: isDone,
            })
        ).toEqual(expected);
    });

    it('should change state of searchFilter for SEARCH_FILTER_CHANGE action', () => {
        const filterValue = "filterExample";

        const expected = {
            ...initialState,
            searchFilter: filterValue,
        }

        expect(
            gui(undefined, {
                type: ACTIONS.SEARCH_FILTER_CHANGE,
                filter: filterValue,
            })
        ).toEqual(expected);
    });

});