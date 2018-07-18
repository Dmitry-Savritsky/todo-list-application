import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ModalFormContainer from '../containers/ModalFormContainer.jsx';
import CategoryFormContainer from '../containers/CategoryFormContainer.jsx';
import TaskFormContainer from '../containers/TaskFormContainer.jsx';
import HeaderFormContainer from '../containers/HeaderFormContainer.jsx';

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiTypography: {
            body1: {
                fontSize: '16px',
            },
            title: {
                fontSize: '20px',
            }
        }
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
                <CssBaseline />
                <Grid container spacing={8}
                    justify='flex-start'
                    alignItems='flex-start'>

                    <Grid item xs={12}>
                        <HeaderFormContainer chosenCategoryId={this.props.chosenCategoryId} />
                    </Grid>

                    <Grid item xs={6}>
                        <CategoryFormContainer chosenCategoryId={this.props.chosenCategoryId} />
                    </Grid>

                    <Grid item xs={6}>
                        {taskForm}
                    </Grid>

                </Grid>

                <ModalFormContainer />

            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    chosenCategoryId: ownProps.match.params.id,
});

MainPage.propTypes = {
    chosenCategoryId: PropTypes.string,
}

export default connect(
    mapStateToProps,
)(MainPage);
