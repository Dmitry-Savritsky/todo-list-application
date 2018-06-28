import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import TaskForm from '../components/TaskForm/TaskForm.jsx';

const mapStateToProps = (state, ownProps) => ({
    tasks: state.root.main.present.tasks,
    gui: state.root.gui,
    chosenCategoryId: ownProps.chosenCategoryId,
});

const mapDispatchToProps = dispatch => ({
    addTaskHandler: (id, parentId, title, description, checked) => dispatch(ACTIONS.doAddTask(id, parentId, title, description, checked)),
    changeCheckedTaskHandler: (id, isChecked) => dispatch(ACTIONS.doChangeCheckedTask(id, isChecked)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskForm);