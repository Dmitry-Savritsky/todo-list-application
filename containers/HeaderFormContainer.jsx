import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import HeaderForm from '../components/HeaderForm.jsx';

const mapStateToProps = (state) => ({
    progressValue: state.main.chosenCategoryProgress,
});

const mapDispatchToProps = dispatch => ({
    searchFilterHandler: (filter) => dispatch(ACTIONS.doChangeSearchFilter(filter)),
    changeDoneHandler: (value) => dispatch(ACTIONS.doChangeShowDoneFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderForm);