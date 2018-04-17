import React from 'react';
import PropTypes from 'prop-types';
import CategoryAdder from './CategoryAdder.jsx';
import CategoryList from './CategoryList.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CategoryAdder addCategory={this.props.addCategory} />
                <CategoryList categories={this.props.categories} />
            </div>
        );
    }
}

App.propTypes = {
    addCategory: PropTypes.func.isRequired,
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
    }))
}