import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import styles from './Category.css';

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
        this.props.deleteCategoryHandler(this.props.id);
    }

    openWindow() {
        this.props.openNestedAddWindow(this.props.id);
    }

    render() {

        let style;
        if (this.props.isSelected) style = styles.selected;
        else style = styles.notSelected;

        return (
            <Grid container alignItems="center">

                <h4 className={style}>
                    {this.props.title}
                </h4>
                <ImageEdit onClick={this.editCategory} />

                <ActionDelete onClick={this.deleteCategory} />
                <ContentAddCircleOutline onClick={this.openWindow} />
            </Grid>
        );
    }
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteCategoryHandler: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}