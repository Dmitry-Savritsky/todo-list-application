import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import App from '../components/App.jsx';

const mapStateToProps = state => ({
  categories: state.categories.categories,
  gui: state.gui
});

const mapDispatchToProps = dispatch => ({
  addCategory: (id, parentId, title) => dispatch(ACTIONS.addCategory(id, parentId, title)),
  deleteCategory: (id) => dispatch(ACTIONS.deleteCategory(id)),
  closeNestedAddWindow: () => dispatch(ACTIONS.closeNestedAddWindow()),
  openNestedAddWindow: (parentId) => dispatch(ACTIONS.openNestedAddWindow(parentId)),
  closeCategoryEditWindow: () => dispatch(ACTIONS.closeCategoryEditWindow()),
  openCategoryEditWindow: (editId, title) => dispatch(ACTIONS.openCategoryEditWindow(editId, title)),
  editCategory: (id, title) => dispatch(ACTIONS.editCategory(id, title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);