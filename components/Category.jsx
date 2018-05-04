import React from 'react';
import PropTypes from 'prop-types';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import ActionDelete from 'material-ui/svg-icons/action/delete'

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
        this.props.deleteCategory(this.props.id);
    }

    openWindow() {
        this.props.openNestedAddWindow(this.props.id);
    }

    render() {

        return (
            <div>
                <div>{this.props.title}</div>
                <ImageEdit onClick={this.editCategory} />
                <ActionDelete onClick={this.deleteCategory} />
                <ContentAddCircleOutline onClick={this.openWindow} />
            </div>
        );
    }
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
}