import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TaskAdder from '../TaskAdder/TaskAdder.jsx';
import TaskList from '../TaskList/TaskList.jsx';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Grid container direction='column'>
                    <Grid item>
                        <TaskAdder addTaskHandler={this.props.addTaskHandler}
                            parentId={this.props.chosenCategoryId} />
                    </Grid>
                    <Grid item>
                        <TaskList categoryId={this.props.chosenCategoryId}
                            tasks={this.props.tasks}
                            onCheckHandler={this.props.changeCheckedTaskHandler}
                            searchFilter={this.props.gui.searchFilter}
                            showDone={this.props.gui.showDone}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

TaskForm.propTypes = {
    addTaskHandler: PropTypes.func.isRequired,
    changeCheckedTaskHandler: PropTypes.func.isRequired,
    chosenCategoryId: PropTypes.string,

    gui: PropTypes.shape({
        isNestedAddOpened: PropTypes.bool.isRequired,
        isEditCategoryOpened: PropTypes.bool.isRequired,
        isConfirmDeleteOpened: PropTypes.bool.isRequired,
        nestedParentId: PropTypes.string.isRequired,
        editId: PropTypes.string.isRequired,
        editTitle: PropTypes.string.isRequired,
        deleteId: PropTypes.string.isRequired,
        deleteCategoryTitle: PropTypes.string.isRequired,
        searchFilter: PropTypes.string.isRequired,
        showDone: PropTypes.bool.isRequired,
    }),

    tasks: PropTypes.arrayOf(PropTypes.shape({
        parentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    })),
}