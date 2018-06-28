import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import history from '../../history/history';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class HeaderForm extends React.Component {
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

        const location = history.location;
        location.search = 'show_done=' + event.target.checked + '&&search=' + this.state.searchValue;
        history.push(location);
    }

    handleSearchChange(event) {
        this.setState({
            searchValue: event.target.value,
        });
        this.props.searchFilterHandler(event.target.value);

        const location = history.location;
        location.search = 'show_done=' + this.state.isChecked + '&&search=' + event.target.value;
        history.push(location);
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
                        className={styles.textField}
                    />
                </Grid>

                <Grid item xs={12}>
                    <MuiThemeProvider>
                        <LinearProgress mode="determinate"
                            value={getProgressValue(this.props.tasks, this.props.chosenCategoryId)} />
                    </MuiThemeProvider>
                </Grid>
            </Grid>
        )
    }
}

function getProgressValue(tasks, id) {

    let overallCount = 0;
    let completedCount = 0;

    tasks.forEach(element => {
        if (element.parentId == id) {
            overallCount += 1;
            if (element.checked) completedCount += 1;
        }
    });

    if (overallCount > 0) return Math.round(completedCount * 100 / overallCount);
    else return 100;
}

HeaderForm.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        parentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    })),
    chosenCategoryId: PropTypes.string,

    searchFilterHandler: PropTypes.func.isRequired,
    changeDoneHandler: PropTypes.func.isRequired,
    undoHandler: PropTypes.func.isRequired,
    redoHandler: PropTypes.func.isRequired,
}

export default withStyles(styles)(HeaderForm)

