import React from 'react';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash'

import PropTypes from 'prop-types';

import CategoryMover from './CategoryMover/CategoryMover.jsx'

export default class TaskMoveCategoryList extends React.Component {
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

                let isSelected = _.isEqual(element.id, this.props.parentCategoryId);

                return (

                    <ListItem
                        key={element.id}
                        nestedItems={nestedItems}
                        initiallyOpen={true}
                    >
                        <CategoryMover
                            title={element.title}
                            id={element.id}
                            moveToCategoryHandler={this.props.moveToCategoryHandler}
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

TaskMoveCategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
    parentCategoryId: PropTypes.string.isRequired,
    moveToCategoryHandler: PropTypes.func,
}