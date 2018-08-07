import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default class TaskEditControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container justify='center' spacing={16}>

                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.props.saveChangesHandler}
                        size='large'
                        disabled={this.props.isDisabled}>
                        Save changes
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.props.cancelHandler}
                        size='large'>
                        Cancel
                    </Button>
                </Grid>

            </Grid>
        );
    }
}

TaskEditControl.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    saveChangesHandler: PropTypes.func.isRequired,
    cancelHandler: PropTypes.func.isRequired,
}