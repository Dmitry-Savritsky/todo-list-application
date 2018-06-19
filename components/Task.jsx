import React from 'react';
import PropTypes from 'prop-types';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.isChecked,
        }

        this.onCheck = this.onCheck.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    onCheck() {
        this.props.onCheckHandler(this.props.id, this.state.isChecked);
    }

    handleCheckboxChange(event) {
        this.setState({
            isChecked: event.target.checked,
        });

        this.onCheck();
    }

    render() {

        return (
            <Grid container alignItems="center" direction="row" justify="flex-start">

                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.isChecked}
                                value="checkedA"
                                onChange={this.handleCheckboxChange}
                            />
                        }
                    />
                </Grid>

                <Grid item >
                    <h3>{this.props.title}</h3>
                </Grid>

                <Grid item >
                    <Link to={'/task/' + this.props.id}>
                        < ImageEdit />
                    </Link>
                </Grid>

            </Grid>

        );
    }
}

Task.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onCheckHandler: PropTypes.func.isRequired,
}