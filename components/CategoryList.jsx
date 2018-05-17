import React from 'react';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash'

import PropTypes from 'prop-types';
import Category from './Category/Category.jsx';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.createCategoryList = this.createCategoryList.bind(this);
    }

    createCategoryList(category) {
        if (category == null) return [];

        const list = category.map(

            (element) => {
                let nested;

                if (element.nestedCategories.length > 0) {
                    nested = element.nestedCategories;
                }
                else nested = null;

                let nestedItems = this.createCategoryList(nested);

                let isSelected = _.isEqual(element.id, this.props.chosenCategoryId);

                return (

                    <ListItem
                        key={element.id}
                        nestedItems={nestedItems}
                        initiallyOpen={true}
                        onClick={() => this.props.chooseCategoryHandler(element.id)}
                    >

                        <Category title={element.title}
                            id={element.id}
                            deleteCategoryHandler={this.props.deleteCategoryHandler}
                            openNestedAddWindow={this.props.openNestedAddWindow}
                            openCategoryEditWindow={this.props.openCategoryEditWindow}
                            isSelected={isSelected} />
                    </ListItem>
                );
            }
        );

        return list;
    }

    render() {

        const categoriesList = this.createCategoryList(this.props.categories);

        return (

            <MuiThemeProvider>
                <List>
                    {categoriesList}
                </List>
            </MuiThemeProvider>
        );
    }
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
    chosenCategoryId: PropTypes.string.isRequired,
    deleteCategoryHandler: PropTypes.func.isRequired,
    chooseCategoryHandler: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
}

