import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import * as ACTIONS from '../actions';
import HeaderForm from '../components/HeaderForm/HeaderForm.jsx';

const mapStateToProps = (state, ownProps) => ({
    tasks: state.root.main.present.tasks,
    chosenCategoryId: ownProps.chosenCategoryId,
    canUndo: state.root.main.past.length > 0,
    canRedo: state.root.main.future.length > 0,
});

const mapDispatchToProps = dispatch => ({
    searchFilterHandler: (filter) => dispatch(ACTIONS.doChangeSearchFilter(filter)),
    changeDoneHandler: (value) => dispatch(ACTIONS.doChangeShowDoneFilter(value)),
    undoHandler: () => dispatch(ActionCreators.undo()),
    redoHandler: () => dispatch(ActionCreators.redo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderForm);