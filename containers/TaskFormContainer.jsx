import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import TaskForm from '../components/TaskForm/TaskForm.jsx';

const mapStateToProps = state => ({
    tasks: state.main.tasks,
    gui: state.gui,
});

const mapDispatchToProps = dispatch => ({
    addTask: (id, parentId, title, description, checked) => dispatch(ACTIONS.doAddTask(id, parentId, title, description, checked)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskForm);