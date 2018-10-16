import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import CategoryForm from '../components/CategoryForm/CategoryForm.jsx';

const mapStateToProps = (state, ownProps) => ({
    categories: state.root.main.present.categories,
    chosenCategoryId: ownProps.chosenCategoryId,
    gui: state.root.gui,
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