import React from 'react';
//import List from '@material-ui/core/List'
//import ListItem from '@material-ui/core/ListItem';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import CategoryMover from './CategoryMover/CategoryMover.jsx';

const styles = {
    categoryList: {
        height: '500px',
        overflow: 'auto',
    },
};

const chosenItemStyle = {
    backgroundColor: '#5168ff',
    paddingTop: '0px',
};

const itemStyle = {
    backgroundColor: '#f1ff8a',
}

class TaskMoveCategoryList extends React.Component {
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
                let style = isSelected ? chosenItemStyle : itemStyle;

                return (

                    <ListItem
                        key={element.id}
                        nestedItems={nestedItems}
                        initiallyOpen={true}
                        style={style}
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

export default withStyles(styles)(TaskMoveCategoryList)

TaskMoveCategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
    parentCategoryId: PropTypes.string.isRequired,
    moveToCategoryHandler: PropTypes.func.isRequired,
}