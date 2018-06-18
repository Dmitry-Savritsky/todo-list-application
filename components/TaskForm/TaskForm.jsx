import React from 'react';
import PropTypes from 'prop-types';
import TaskAdder from '../TaskAdder.jsx';
import TaskList from '../TaskList.jsx';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <TaskAdder addTaskHandler={this.props.addTask}
                    parentId={this.props.gui.chosenCategoryId} />

                <TaskList categoryId={this.props.gui.chosenCategoryId}
                    tasks={this.props.tasks}
                />
            </div>
        );
    }
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,

    gui: PropTypes.shape({
        isNestedAddOpened: PropTypes.bool.isRequired,
        isEditCategoryOpened: PropTypes.bool.isRequired,
        nestedParentId: PropTypes.string.isRequired,
        editId: PropTypes.string.isRequired,
        editTitle: PropTypes.string.isRequired,
        chosenCategoryId: PropTypes.string.isRequired,
    }),

    tasks: PropTypes.arrayOf(PropTypes.shape({
        parentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    })),
}