import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import ModalForm from '../components/ModalForm/ModalForm.jsx'

const mapStateToProps = state => ({
    gui: state.gui,
});

const mapDispatchToProps = dispatch => ({
    addCategoryHandler: (id, parentId, title) => dispatch(ACTIONS.doAddCategory(id, parentId, title)),
    editCategoryHandler: (id, title) => dispatch(ACTIONS.doEditCategory(id, title)),
    closeNestedAddWindow: () => dispatch(ACTIONS.doCloseNestedAddWindow()),
    closeCategoryEditWindow: () => dispatch(ACTIONS.doCloseCategoryEditWindow()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalForm);