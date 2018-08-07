
import * as actions from './index';
import * as constants from '../constants/index';

//Category testing
describe('CATEGORY_ADD_ACTION', () => {
    it('Should create an action to add category', () => {
        const id = 'testID';
        const parentId = 'parID';
        const title = 'TEST';

        const expectedResult = {
            type: constants.CATEGORY_ADD,
            id,
            parentId,
            title
        }
        expect(actions.doAddCategory(id, parentId, title)).toEqual(expectedResult);
    })
});

describe('CATEGORY_DELETE_ACTION', () => {
    it('Should create an action to delete category', () => {
        const id = 'testID';

        const expectedResult = {
            type: constants.CATEGORY_DELETE,
            id,
        }
        expect(actions.doDeleteCategory(id)).toEqual(expectedResult);
    })
});

describe('CATEGORY_EDIT_ACTION', () => {
    it('Should create an action to edit category', () => {
        const id = 'testID';
        const title = 'newTitle';

        const expectedResult = {
            type: constants.CATEGORY_EDIT,
            id,
            title,
        }
        expect(actions.doEditCategory(id, title)).toEqual(expectedResult);
    })
});

//Task testing

describe('TASK_ADD_ACTION', () => {
    it('Should create an action to add task', () => {
        const id = 'testID';
        const parentId = 'parentID';
        const name = 'newName';
        const description = 'test description';
        const checked = false;

        const expectedResult = {
            type: constants.TASK_ADD,
            id,
            parentId,
            name,
            description,
            checked
        }
        expect(actions.doAddTask(id, parentId, name, description, checked)).toEqual(expectedResult);
    })
});

describe('TASK_EDIT_ACTION', () => {
    it('Should create an action to edit task', () => {
        const id = 'testID';
        const parentId = 'parentID';
        const name = 'newName';
        const description = 'test description';
        const checked = false;

        const expectedResult = {
            type: constants.TASK_EDIT,
            id,
            parentId,
            name,
            description,
            checked
        }
        expect(actions.doEditTask(id, parentId, name, description, checked)).toEqual(expectedResult);
    })
});

describe('TASK_CHANGE_CHECKED_ACTION', () => {
    it('Should create an action to change checked value in task', () => {
        const id = 'testID';
        const checked = false;

        const expectedResult = {
            type: constants.TASK_CHANGE_CHECKED,
            id,
            checked
        }
        expect(actions.doChangeCheckedTask(id, checked)).toEqual(expectedResult);
    })
});

//GUI testing

//Nested add window (for adding nested categories)
describe('NESTED_ADD_WINDOW_OPEN_ACTION', () => {
    it('Should create an action to open nested add window', () => {
        const parentId = 'test';

        const expectedResult = {
            type: constants.NESTED_ADD_WINDOW_OPEN,
            parentId,
        }
        expect(actions.doOpenNestedAddWindow(parentId)).toEqual(expectedResult);
    })
});

describe('NESTED_ADD_WINDOW_CLOSE_ACTION', () => {
    it('Should create an action to close nested add window', () => {

        const expectedResult = {
            type: constants.NESTED_ADD_WINDOW_CLOSE,
        }
        expect(actions.doCloseNestedAddWindow()).toEqual(expectedResult);
    })
});

//Category edit window (to edit name of category)

describe('CATEGORY_EDIT_WINDOW_OPEN_ACTION', () => {
    it('Should create an action to open category edit window', () => {
        const editId = 'test';
        const title = 'testTitle';

        const expectedResult = {
            type: constants.CATEGORY_EDIT_WINDOW_OPEN,
            editId,
            title,
        }
        expect(actions.doOpenCategoryEditWindow(editId, title)).toEqual(expectedResult);
    })
});

describe('CATEGORY_EDIT_WINDOW_CLOSE_ACTION', () => {
    it('Should create an action to close category edit window', () => {

        const expectedResult = {
            type: constants.CATEGORY_EDIT_WINDOW_CLOSE,
        }
        expect(actions.doCloseCategoryEditWindow()).toEqual(expectedResult);
    })
});

//Confirm delete window

describe('CONFIRM_DELETE_WINDOW_OPEN_ACTION', () => {
    it('Should create an action to open confirm delete window', () => {
        const deleteId = 'test';
        const deleteCategoryTitle = 'testTitle';

        const expectedResult = {
            type: constants.CONFIRM_DELETE_WINDOW_OPEN,
            deleteCategoryTitle,
            deleteId,
        }
        expect(actions.doOpenConfirmDeleteWindow(deleteId,deleteCategoryTitle)).toEqual(expectedResult);
    })
});

describe('CONFIRM_DELETE_WINDOW_CLOSE_ACTION', () => {
    it('Should create an action to close confirm delete window', () => {

        const expectedResult = {
            type: constants.CONFIRM_DELETE_WINDOW_CLOSE,
        }
        expect(actions.doCloseConfirmDeleteWindow()).toEqual(expectedResult);
    })
});

//Filters

describe('SEARCH_FILTER_CHANGE_ACTION', () => {
    it('Should create an action to change search filter', () => {

        const filter = 'searchValue';

        const expectedResult = {
            type: constants.SEARCH_FILTER_CHANGE,
            filter,
        }
        expect(actions.doChangeSearchFilter(filter)).toEqual(expectedResult);
    })
});

describe('SHOW_DONE_FILTER_CHANGE_ACTION', () => {
    it('Should create an action to change show done filter', () => {

        const value = true;

        const expectedResult = {
            type: constants.SHOW_DONE_FILTER_CHANGE,
            value,
        }
        expect(actions.doChangeShowDoneFilter(value)).toEqual(expectedResult);
    })
});