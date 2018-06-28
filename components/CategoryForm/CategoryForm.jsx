import React from 'react';
import PropTypes from 'prop-types';
import CategoryAdder from '../CategoryAdder.jsx';
import CategoryList from '../CategoryList/CategoryList.jsx';

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <CategoryAdder addCategoryHandler={this.props.addCategoryHandler} />

                <CategoryList
                    categories={this.props.categories}
                    chosenCategoryId={this.props.chosenCategoryId}
                    openNestedAddWindow={this.props.openNestedAddWindow}
                    openCategoryEditWindow={this.props.openCategoryEditWindow}
                    openConfirmDeleteWindow={this.props.openConfirmDeleteWindow} />
            </div>
        );
    }
}

CategoryForm.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired,
    chosenCategoryId: PropTypes.string,
    openCategoryEditWindow: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openConfirmDeleteWindow: PropTypes.func.isRequired,

    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
}