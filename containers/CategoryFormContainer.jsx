import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import CategoryForm from '../components/CategoryForm/CategoryForm.jsx';

const mapStateToProps = state => ({
    categories: state.main.categories,
    chosenCategoryId: state.main.chosenCategoryId,
});

const mapDispatchToProps = dispatch => ({
    addCategoryHandler: (id, parentId, title) => dispatch(ACTIONS.doAddCategory(id, parentId, title)),
    chooseCategoryHandler: (id) => dispatch(ACTIONS.doChooseCategory(id)),
    openNestedAddWindow: (parentId) => dispatch(ACTIONS.doOpenNestedAddWindow(parentId)),
    openCategoryEditWindow: (editId, title) => dispatch(ACTIONS.doOpenCategoryEditWindow(editId, title)),
    openConfirmDeleteWindow: (deleteId, deleteTitle) => dispatch(ACTIONS.doOpenConfirmDeleteWindow(deleteId, deleteTitle)),
    editCategory: (id, title) => dispatch(ACTIONS.doEditCategory(id, title)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoryForm);