import React from 'react';
import PropTypes from 'prop-types';
import CategoryAdder from './CategoryAdder.jsx';
import CategoryList from './CategoryList.jsx';
import NestedCategoryAdder from './NestedCategoryAdder.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NestedCategoryAdder addNestedCategory={this.props.addNestedCategory}
                    showWindow={this.props.gui.isNestedAddOpened}
                    closeWindow={this.props.closeNestedAddWindow}
                    nestedParentId={this.props.gui.nestedParentId} />

                <CategoryAdder addCategory={this.props.addCategory} />

                <CategoryList categories={this.props.categories}
                    deleteCategory={this.props.deleteCategory}
                    openNestedAddWindow={this.props.openNestedAddWindow} />
            </div>
        );
    }
}

App.propTypes = {
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    addNestedCategory: PropTypes.func.isRequired,

    openNestedAddWindow: PropTypes.func.isRequired,
    closeNestedAddWindow: PropTypes.func.isRequired,

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
        nestedParentId: PropTypes.string.isRequired,
    }),
}