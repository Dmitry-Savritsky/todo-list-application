import React from 'react';
import PropTypes from 'prop-types';
import CategoryAdder from './CategoryAdder.jsx';
import CategoryList from './CategoryList.jsx';
import NestedCategoryAdder from './NestedCategoryAdder.jsx';
import CategoryEditor from './CategoryEditor.jsx';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CategoryEditor
                    showWindow={this.props.gui.isEditCategoryOpened}
                    closeWindow={this.props.closeCategoryEditWindow}
                    editCategory={this.props.editCategory}
                    editId={this.props.gui.editId}
                    editTitle={this.props.gui.editTitle} />

                <NestedCategoryAdder
                    addCategory={this.props.addCategory}
                    showWindow={this.props.gui.isNestedAddOpened}
                    closeWindow={this.props.closeNestedAddWindow}
                    nestedParentId={this.props.gui.nestedParentId} />

                <CategoryAdder addCategory={this.props.addCategory} />

                <CategoryList
                    categories={this.props.categories}
                    deleteCategory={this.props.deleteCategory}
                    openNestedAddWindow={this.props.openNestedAddWindow}
                    openCategoryEditWindow={this.props.openCategoryEditWindow} />

            </div>
        );
    }
}

App.propTypes = {
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,

    openNestedAddWindow: PropTypes.func.isRequired,
    closeNestedAddWindow: PropTypes.func.isRequired,

    openCategoryEditWindow: PropTypes.func.isRequired,
    closeCategoryEditWindow: PropTypes.func.isRequired,

    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            checked: PropTypes.bool,
            description: PropTypes.string
        })),
        nestedCategories: PropTypes.array,
    })),

    gui: PropTypes.shape({
        isNestedAddOpened: PropTypes.bool.isRequired,
        isEditCategoryOpened: PropTypes.bool.isRequired,
        nestedParentId: PropTypes.string.isRequired,
        editId: PropTypes.string.isRequired,
        editTitle: PropTypes.string.isRequired,
    }),
}