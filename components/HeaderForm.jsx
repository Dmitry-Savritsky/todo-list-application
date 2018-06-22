import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class HeaderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
            searchValue: "",
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        this.setState({
            isChecked: event.target.checked,
        });
        this.props.changeDoneHandler(event.target.checked);
    }

    handleSearchChange(event) {
        this.setState({
            searchValue: event.target.value,
        });
        this.props.searchFilterHandler(event.target.value);
    }

    render() {
        return (
            <Grid container justify='space-around' alignItems='flex-start'>
                <Grid item xs={6}>
                    <Typography variant={"display4"}> To-Do List</Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.isChecked}
                                value="checkedA"
                                onChange={this.handleCheckboxChange}
                            />
                        }
                        label="Show done"
                    />
                    <TextField
                        id="search"
                        label="Search"
                        type="search"
                        margin="normal"
                        value={this.state.searchValue}
                        onChange={this.handleSearchChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <MuiThemeProvider>
                        <LinearProgress mode="determinate" value={this.props.progressValue} />
                    </MuiThemeProvider>
                </Grid>
            </Grid>
        )
    }
}

HeaderForm.propTypes = {
    searchFilterHandler: PropTypes.func.isRequired,
    changeDoneHandler: PropTypes.func.isRequired,
    progressValue: PropTypes.number.isRequired,
}

