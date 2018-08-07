import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }

    editCategory() {
        this.props.openCategoryEditWindow(this.props.id, this.props.title);
    }

    deleteCategory() {
        this.props.openConfirmDeleteWindow(this.props.id, this.props.title);
    }

    openWindow() {
        this.props.openNestedAddWindow(this.props.id);
    }

    render() {

        return (
            <Grid container justify='flex-end'>
                <Grid item>
                    <IconButton onClick={this.editCategory}>
                        <EditIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={this.deleteCategory} color='secondary'>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={this.openWindow} color='primary'>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
    openConfirmDeleteWindow: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}