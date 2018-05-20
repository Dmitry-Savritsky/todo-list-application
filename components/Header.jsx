import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
            searchValue: " ",
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        this.setState({
            isChecked: event.target.value,
        })
    }

    handleSearchChange(event) {
        this.setState({
            searchValue: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <Grid item xs={6}>
                    <h1>To-Do List</h1>
                </Grid>
                <Grid item xs={6}>
                    <Checkbox
                        checked={this.state.isChecked}
                        onChange={this.handleCheckboxChange}
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
                        <LinearProgress value={this.props.progressValue} />
                    </MuiThemeProvider>
                </Grid>
            </div>
        )
    }
}

Header.propTypes = {
    searchHandler: PropTypes.func,
    checkboxHandler: PropTypes.func,
    progressValue: PropTypes.number,
}