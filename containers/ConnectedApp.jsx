import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import App from '../components/App.jsx';

const mapStateToProps = state => ({
  categories: state.categories.categories,
  gui: state.gui
});

const mapDispatchToProps = dispatch => ({
  addCategory: (id, title) => dispatch(ACTIONS.addCategory(id, title)),
  deleteCategory: (id) => dispatch(ACTIONS.deleteCategory(id)),
  addNestedCategory: (id, parentId, title) => dispatch(ACTIONS.addNestedCategory(id, parentId, title)),
  closeNestedAddWindow: () => dispatch(ACTIONS.closeNestedAddWindow()),
  openNestedAddWindow: (parentId) => dispatch(ACTIONS.openNestedAddWindow(parentId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);