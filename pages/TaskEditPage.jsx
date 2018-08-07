import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from '../history/history';
import * as ACTIONS from '../actions';
import TaskMoveList from '../components/TaskMoveList/TaskMoveList.jsx';
import TaskEditForm from '../components/TaskEditForm/TaskEditForm.jsx';
import TaskEditControl from '../components/TaskEditControl/TaskEditControl.jsx';
import getNameValidationState from '../utils/index';

class TaskEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentId: this.props.task.parentId,
            name: this.props.task.name,
            isChecked: this.props.task.checked,
            description: this.props.task.description,
            valid: getNameValidationState(this.props.task.name),
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.moveToCategoryHandler = this.moveToCategoryHandler.bind(this);
        this.saveChangesHandler = this.saveChangesHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }

    handleCheckboxChange(event) {
        this.setState({
            isChecked: event.target.checked,
        })
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
            valid: getNameValidationState(event.target.value),
        })
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value,
        })
    }

    saveChangesHandler() {
        this.props.saveChangesHandler(this.props.task.id, this.state.parentId,
            this.state.name, this.state.description, this.state.isChecked);
        history.push('/categories/' + this.state.parentId);
    }

    cancelHandler() {
        history.push('/categories/' + this.props.task.parentId);
    }

    moveToCategoryHandler(id) {
        this.setState({
            parentId: id,
        });
    }

    render() {
        return (
            <Grid container justify='center' spacing={8}>
                <CssBaseline />
                <Grid container justify='center'>
                    <Grid item >
                        <Typography variant={'display3'}> {this.props.task.name}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={8} justify='center'>
                    <Grid item xs={5}>
                        <TaskMoveList categories={this.props.categories}
                            parentCategoryId={this.state.parentId}
                            moveToCategoryHandler={this.moveToCategoryHandler} />
                    </Grid>

                    <Grid item xs={5}>
                        <Grid container spacing={8} justify='center' direction='column'>

                            <Grid item>
                                <TaskEditForm
                                    nameChangeHandler={this.handleNameChange}
                                    name={this.state.name}
                                    checkboxChangeHandler={this.handleCheckboxChange}
                                    checkbox={this.state.isChecked}
                                    descriptionChangeHandler={this.handleDescriptionChange}
                                    description={this.state.description} />
                            </Grid>

                            <Grid item>
                                <TaskEditControl
                                    isDisabled={!this.state.valid}
                                    saveChangesHandler={this.saveChangesHandler}
                                    cancelHandler={this.cancelHandler} />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        )

    }
}

const mapStateToProps = (state, ownProps) => ({
    task: state.root.main.present.tasks.find(task => task.id === ownProps.match.params.id),
    categories: state.root.main.present.categories,
});

const mapDispatchToProps = dispatch => ({
    saveChangesHandler: (id, parentId, name, description, isChecked) => dispatch(ACTIONS.doEditTask(id, parentId, name, description, isChecked)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskEditPage));

TaskEditPage.propTypes = {
    task: PropTypes.shape({
        parentId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    }),
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
    match: PropTypes.any,
    saveChangesHandler: PropTypes.func.isRequired,
}