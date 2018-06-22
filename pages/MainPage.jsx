import React from 'react';
import Grid from '@material-ui/core/Grid';
import ModalFormContainer from '../containers/ModalFormContainer.jsx';
import CategoryFormContainer from '../containers/CategoryFormContainer.jsx';
import TaskFormContainer from '../containers/TaskFormContainer.jsx';
import HeaderFormContainer from '../containers/HeaderFormContainer.jsx';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} justify='space-around' alignItems='flex-start'>

                    <Grid item xs={12}>
                        <HeaderFormContainer />
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