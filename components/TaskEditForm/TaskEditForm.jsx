import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    paper: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
};

class TaskEditForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper elevation={5} style={styles.paper}>

                <Grid container justify='flex-start' direction='column' spacing={16}>
                    <Grid item xs={8} >
                        <TextField
                            id='name'
                            margin='normal'
                            value={this.props.name}
                            onChange={this.props.nameChangeHandler}
                        />
                    </Grid>

                    <Grid item xs={8}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.props.checkbox}
                                    value='checkedA'
                                    onChange={this.props.checkboxChangeHandler}
                                />
                            }
                            label='Done'
                        />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField
                            id='description'
                            margin='normal'
                            value={this.props.description}
                            onChange={this.props.descriptionChangeHandler}
                            multiline={true}
                        />
                    </Grid>
                </Grid>
                
            </Paper>
        );
    }
}

TaskEditForm.propTypes = {
    nameChangeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    checkboxChangeHandler: PropTypes.func.isRequired,
    checkbox: PropTypes.bool.isRequired,
    descriptionChangeHandler: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TaskEditForm)
