import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.openWindow = this.openWindow.bind(this);
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
                <Button bsStyle="primary" >Edit category name</Button>
                <Button bsStyle="danger" onClick={this.deleteCategory}>Delete category</Button>
                <Button bsStyle="primary" onClick={this.openWindow}>Add nested category</Button>
            </div>
        );
    }
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
}