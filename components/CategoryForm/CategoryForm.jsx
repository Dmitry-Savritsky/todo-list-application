import React from 'react';
import PropTypes from 'prop-types';
import CategoryAdder from '../CategoryAdder.jsx';
import CategoryList from '../CategoryList.jsx';

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
                    deleteCategoryHandler={this.props.deleteCategoryHandler}
                    chooseCategoryHandler={this.props.chooseCategoryHandler}
                    chosenCategoryId={this.props.chosenCategoryId}
                    openNestedAddWindow={this.props.openNestedAddWindow}
                    openCategoryEditWindow={this.props.openCategoryEditWindow} />
            </div>
        );
    }
}

CategoryForm.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired,
    deleteCategoryHandler: PropTypes.func.isRequired,
    chooseCategoryHandler: PropTypes.func.isRequired,
    chosenCategoryId: PropTypes.string.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
}