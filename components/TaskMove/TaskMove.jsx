import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Reply from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';

export default class TaskMove extends React.Component {
    constructor(props) {
        super(props);
        this.moveToCategory = this.moveToCategory.bind(this);
    }

    moveToCategory() {
        this.props.moveToCategoryHandler(this.props.id);
    }

    render() {

        return (
            <Grid container
                alignItems='center'
                justify='space-between'
                direction='row'>

                    {!this.props.isSelected &&
                        <IconButton onClick={this.moveToCategory}>
                            <Reply />
                        </IconButton>
                    }
                    {this.props.isSelected &&
                        <div style={{ paddingTop: '24px', paddingBottom: '24px' }} />
                    }
            </Grid>
        );
    }
}

TaskMove.propTypes = {
    id: PropTypes.string.isRequired,
    moveToCategoryHandler: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}