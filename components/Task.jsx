import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange() {
        this.props.onCheckHandler(this.props.id, this.props.isChecked);
    }

    render() {

        return (
            <Grid container
                alignItems="center"
                direction="row"
                justify="flex-start"
                spacing={8}>

                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.isChecked}
                                value="checkedA"
                                onChange={this.handleCheckboxChange}
                            />
                        }
                    />
                </Grid>

                <Grid item >
                    <Typography variant={"display1"}> {this.props.title}</Typography>
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