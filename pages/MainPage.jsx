import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as ACTIONS from '../actions';

import ModalFormContainer from '../containers/ModalFormContainer.jsx';
import CategoryFormContainer from '../containers/CategoryFormContainer.jsx';
import TaskFormContainer from '../containers/TaskFormContainer.jsx';
import HeaderFormContainer from '../containers/HeaderFormContainer.jsx';


const theme = createMuiTheme({
    palette: {
        //type: 'dark',
        background: {
            // default: 'black',
        },
        // primary: { main: purple[500] }, // Purple and green play nicely together.
        //secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let categoryIsChosen = !_.isNil(this.props.chosenCategoryId);
        let taskForm = categoryIsChosen && <TaskFormContainer chosenCategoryId={this.props.chosenCategoryId} />;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <Grid
                        container
                        spacing={8}
                        justify='center'
                        alignItems='flex-start'
                    >

                        <Grid item xs={11}>
                            <HeaderFormContainer 
                            chosenCategoryId={this.props.chosenCategoryId}
                            location = {this.props.location} />
                        </Grid>


                        <Grid item xs={5}>
                            <CategoryFormContainer chosenCategoryId={this.props.chosenCategoryId} />
                        </Grid>

                        <Grid item xs={5}>
                            {taskForm}
                        </Grid>

                    </Grid>

                    <ModalFormContainer />

                </div >
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    chosenCategoryId: ownProps.match.params.id,
});

const mapDispatchToProps = dispatch => ({
    showDoneFilterChange: (showDone) => dispatch(ACTIONS.doChangeShowDoneFilter(showDone)),
    searchFilterChange: (search) => dispatch(ACTIONS.doChangeSearchFilter(search)),
});

MainPage.propTypes = {
    chosenCategoryId: PropTypes.string,
    location: PropTypes.object,
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));
