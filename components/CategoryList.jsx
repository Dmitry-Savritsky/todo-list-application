import React from 'react';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PropTypes from 'prop-types';
import Category from './Category.jsx';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const categoriesList = createCategoryList(this.props.categories, this.props.deleteCategory,
            this.props.openNestedAddWindow, this.props.openCategoryEditWindow);

        return (

            <MuiThemeProvider>
                <List>
                    {categoriesList}
                </List>
            </MuiThemeProvider>
        );
    }
}

function createCategoryList(categories, deleteCategoryHandler, openNestedAddWindow, openCategoryEditWindow) {

    if (categories == null) return [];

    const list = categories.map(
        function (element) {
            let nested;

            if (element.nestedCategories.length > 0) {
                nested = element.nestedCategories;
            }
            else nested = null;

            let nestedItems = createCategoryList(nested, deleteCategoryHandler, openNestedAddWindow, openCategoryEditWindow);

            return (

                <ListItem
                    key={element.id}
                    nestedItems={nestedItems}
                    initiallyOpen={true}>

                    <Category title={element.title}
                        id={element.id}
                        deleteCategory={deleteCategoryHandler}
                        openNestedAddWindow={openNestedAddWindow}
                        openCategoryEditWindow={openCategoryEditWindow} />
                </ListItem>
            );
        }
    );

    return list;
}

CategoryList.propTypes = {
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
    deleteCategory: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
}