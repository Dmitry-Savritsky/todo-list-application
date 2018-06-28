import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import history from '../history/history';
import * as ACTIONS from '../actions';
import TaskMoveCategoryList from '../components/TaskMoveCategoryList.jsx';

class TaskEditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentId: this.props.task.parentId,
            name: this.props.task.name,
            isChecked: this.props.task.checked,
            description: this.props.task.description,
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
        })
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value,
        })
    }

    saveChangesHandler() {
        this.props.saveChangesHandler(this.props.task.id, this.state.parentId,
            this.state.name, this.state.isChecked, this.state.description);
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
            <Grid container>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"display4"}> {this.props.task.name}</Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={3}>
                        <TaskMoveCategoryList
                            categories={this.props.categories}
                            parentCategoryId={this.state.parentId}
                            moveToCategoryHandler={this.moveToCategoryHandler} />
                    </Grid>

                    <Grid item xs={9}>
                        <Grid container justify="flex-end" spacing={16}>
                            <Grid item>
                                <MuiThemeProvider>
                                    <RaisedButton label="Save changes" primary={true} onClick={this.saveChangesHandler} />
                                </MuiThemeProvider>
                            </Grid>
                            <Grid item>
                                <MuiThemeProvider>
                                    <RaisedButton label="Cancel" primary={true} onClick={this.cancelHandler} />
                                </MuiThemeProvider>
                            </Grid>

                        </Grid>

                        <Grid container justify="flex-start" direction="column" spacing={16}>
                            <Grid item xs={9} >

                                <TextField
                                    id="name"
                                    margin="normal"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </Grid>

                            <Grid item xs={9}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.isChecked}
                                            value="checkedA"
                                            onChange={this.handleCheckboxChange}
                                        />
                                    }
                                    label="Done"
                                />
                            </Grid>

                            <Grid item xs={9}>
                                <TextField
                                    id="description"
                                    margin="normal"
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChange}
                                    multiline={true}
                                />
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
    saveChangesHandler: (id, parentId, name, isChecked, description) => dispatch(ACTIONS.doEditTask(id, parentId, name, isChecked, description)),
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