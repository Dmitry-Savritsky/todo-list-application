import React from 'react';
//import List from '@material-ui/core/List'
//import ListItem from '@material-ui/core/ListItem';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import history from '../../history/history';
import Category from '../Category/Category.jsx';

import './CategoryList.css';

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

class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.createCategoryList = this.createCategoryList.bind(this);
        this.categoryClickHandler = this.categoryClickHandler.bind(this);
    }

    categoryClickHandler(id) {
        history.push('/categories/' + id);
    }

    createCategoryList(category) {
        if (_.isNil(category)) return [];

        const list = category.map(

            (element) => {
                let nested;

                if (element.nestedCategories.length > 0) {
                    nested = element.nestedCategories;
                }
                else nested = null;

                let nestedItems = this.createCategoryList(nested);
                let isSelected = _.isEqual(element.id, this.props.chosenCategoryId);
                let style = isSelected ? chosenItemStyle : itemStyle;

                return (

                    <ListItem
                        key={element.id}
                        nestedItems={nestedItems}
                        initiallyOpen={true}
                        onClick={() => this.categoryClickHandler(element.id)}
                        style={style}
                    >
                        <Category title={element.title}
                            id={element.id}
                            openNestedAddWindow={this.props.openNestedAddWindow}
                            openCategoryEditWindow={this.props.openCategoryEditWindow}
                            openConfirmDeleteWindow={this.props.openConfirmDeleteWindow}
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
                <List className={this.props.classes.categoryList}>
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
    chosenCategoryId: PropTypes.string,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
    openConfirmDeleteWindow: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryList)

