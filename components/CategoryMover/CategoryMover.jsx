import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Reply from '@material-ui/icons/Reply';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export default class CategoryMover extends React.Component {
    constructor(props) {
        super(props);
        this.moveToCategory = this.moveToCategory.bind(this);
    }

    moveToCategory() {
        this.props.moveToCategoryHandler(this.props.id);
    }

    render() {

        return (
            <Grid container alignItems="center" justify="space-between">
                <Grid item>
                    <Typography variant={"headline"}> {this.props.title}</Typography>
                </Grid>
                <Grid item>
                    {!this.props.isSelected &&
                        <IconButton onClick={this.moveToCategory}>
                            <Reply />
                        </IconButton>
                    }
                </Grid>
            </Grid>
        );
    }
}

CategoryMover.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    moveToCategoryHandler: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}