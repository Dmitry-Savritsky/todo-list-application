import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import * as ACTIONS from '../actions';
import HeaderForm from '../components/HeaderForm/HeaderForm.jsx';

const mapStateToProps = (state) => ({
    progressValue: state.root.main.present.chosenCategoryProgress,
});

const mapDispatchToProps = dispatch => ({
    searchFilterHandler: (filter) => dispatch(ACTIONS.doChangeSearchFilter(filter)),
    changeDoneHandler: (value) => dispatch(ACTIONS.doChangeShowDoneFilter(value)),
    undoHandler: () => dispatch(ActionCreators.undo()),
    redoHandler: () => dispatch(ActionCreators.redo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderForm);