import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import ModalForm from '../components/ModalForm/ModalForm.jsx'

const mapStateToProps = state => ({
    gui: state.root.gui,
});

const mapDispatchToProps = dispatch => ({
    addCategoryHandler: (id, parentId, title) => dispatch(ACTIONS.doAddCategory(id, parentId, title)),
    editCategoryHandler: (id, title) => dispatch(ACTIONS.doEditCategory(id, title)),
    deleteCategoryHandler: (id) => dispatch(ACTIONS.doDeleteCategory(id)),
    closeNestedAddWindow: () => dispatch(ACTIONS.doCloseNestedAddWindow()),
    closeCategoryEditWindow: () => dispatch(ACTIONS.doCloseCategoryEditWindow()),
    closeConfirmDeleteWindow: () => dispatch(ACTIONS.doCloseConfirmDeleteWindow()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalForm);