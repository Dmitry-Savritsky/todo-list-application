import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import App from '../components/App.jsx';

const mapStateToProps = state => ({
  categories: state.categories.categories,
  tasks: state.categories.tasks,
  gui: state.gui
});

const mapDispatchToProps = dispatch => ({
  addCategory: (id, parentId, title) => dispatch(ACTIONS.doAddCategory(id, parentId, title)),
  deleteCategory: (id) => dispatch(ACTIONS.doDeleteCategory(id)),
  closeNestedAddWindow: () => dispatch(ACTIONS.doCloseNestedAddWindow()),
  openNestedAddWindow: (parentId) => dispatch(ACTIONS.doOpenNestedAddWindow(parentId)),
  closeCategoryEditWindow: () => dispatch(ACTIONS.doCloseCategoryEditWindow()),
  openCategoryEditWindow: (editId, title) => dispatch(ACTIONS.doOpenCategoryEditWindow(editId, title)),
  editCategory: (id, title) => dispatch(ACTIONS.doEditCategory(id, title)),
  chooseCategory: (id) => dispatch(ACTIONS.doChooseCategory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);