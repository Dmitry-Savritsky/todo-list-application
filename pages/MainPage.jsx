import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ModalFormContainer from '../containers/ModalFormContainer.jsx';
import CategoryFormContainer from '../containers/CategoryFormContainer.jsx';
import TaskFormContainer from '../containers/TaskFormContainer.jsx';
import Header from '../components/Header.jsx';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} justify='space-around' alignItems='flex-start'>

                    <Grid item xs={12}>
                        <Header progressValue={this.props.progressValue} />
                    </Grid>

                    <Grid item xs={6}>
                        <CategoryFormContainer />
                    </Grid>

                    <Grid item xs={6}>
                        <TaskFormContainer />
                    </Grid>

                </Grid>

                <ModalFormContainer />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    progressValue: 50,
    category: state.main.categories,
});

export default connect(mapStateToProps)(MainPage);

MainPage.propTypes = {
    progressValue: PropTypes.number.isRequired,
}