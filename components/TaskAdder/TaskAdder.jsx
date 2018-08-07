import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import getNameValidationState from '../../utils/index';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});


class TaskAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            valid: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addTaskHandler = this.addTaskHandler.bind(this);
    }

    addTaskHandler(event) {
        event.preventDefault();
        const uuidv1 = require('uuid/v1');
        const id = uuidv1();

        let desc = ' ';
        let checked = false;

        this.props.addTaskHandler(id, this.props.parentId, this.state.title, desc, checked);

        this.setState({
            title: '',
            valid: false,
        });
    }

    handleNameChange(event) {
        this.setState({ title: event.target.value });
        this.setState({ valid: getNameValidationState(event.target.value) })
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify='flex-start' alignItems='baseline' spacing={8}>
                <Grid item>
                    <TextField
                        label='Enter task name'
                        value={this.state.title}
                        onChange={this.handleNameChange}
                        margin='normal'
                        className={classes.textField}
                    />
                </Grid>

                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={this.addTaskHandler}
                        disabled={!this.state.valid}>
                        Add
                        </Button>
                </Grid>

            </Grid>
        );
    }
}

TaskAdder.propTypes = {
    classes: PropTypes.object.isRequired,
    addTaskHandler: PropTypes.func.isRequired,
    parentId: PropTypes.string,
}

export default withStyles(styles)(TaskAdder);