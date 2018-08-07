import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        this.props.onCheckHandler(this.props.id, event.target.checked);
    }

    render() {

        return (
            <Grid container
                alignItems='center'
                direction='row'
                justify='space-between'
                spacing={8}>

                <Grid item>
                    <Grid container alignItems='baseline'>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.isChecked}
                                        value='checkedA'
                                        onChange={this.handleCheckboxChange}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item >
                            <ListItemText primary={this.props.title} />
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item >
                    <Link to={'/task/' + this.props.id}>
                        <IconButton >
                            <EditIcon />
                        </IconButton>
                    </Link>
                </Grid >

            </Grid >

        );
    }
}

Task.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onCheckHandler: PropTypes.func.isRequired,
}