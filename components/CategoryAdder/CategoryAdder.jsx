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

class CategoryAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            valid: false,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addCategoryHandler = this.addCategoryHandler.bind(this);
    }

    addCategoryHandler(event) {
        event.preventDefault();
        const uuidv1 = require('uuid/v1');
        const id = uuidv1();

        this.props.addCategoryHandler(id, null, this.state.title);
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
                        label='Enter category title'
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
                        onClick={this.addCategoryHandler}
                        disabled={!this.state.valid}>
                        Add
                        </Button>
                </Grid>
            </Grid>
        );
    }
}

CategoryAdder.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryAdder);