import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider} from '@material-ui/core/styles';
import * as ACTIONS from '../actions';

import ModalFormContainer from '../containers/ModalFormContainer.jsx';
import CategoryFormContainer from '../containers/CategoryFormContainer.jsx';
import TaskFormContainer from '../containers/TaskFormContainer.jsx';
import HeaderFormContainer from '../containers/HeaderFormContainer.jsx';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadStateFromDB();
    }

    render() {
        let categoryIsChosen = !_.isNil(this.props.chosenCategoryId);
        let taskForm = categoryIsChosen && <TaskFormContainer chosenCategoryId={this.props.chosenCategoryId} />;
        let progress = this.props.isLoading && <CircularProgress size={100} />
        let main = !this.props.isLoading && <div>
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
                        location={this.props.location} />
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

        return (
            <MuiThemeProvider>
                {progress}
                {main}
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    chosenCategoryId: ownProps.match.params.id,
    isLoading: state.root.gui.showLoading,
});

const mapDispatchToProps = dispatch => ({
    loadStateFromDB: () => dispatch(ACTIONS.doGetState()),
});

MainPage.propTypes = {
    chosenCategoryId: PropTypes.string,
    location: PropTypes.object,
    loadStateFromDB: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
