import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import App from '../components/App.jsx';

const mapStateToProps = state => ({
  categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
  addCategory: (id, title) => dispatch(ACTIONS.addCategory(id, title)),
  deleteCategory: (id) => dispatch(ACTIONS.deleteCategory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);