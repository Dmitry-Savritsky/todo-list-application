import React from 'react';
import List from 'material-ui/List/List'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import history from '../../history/history';
import Category from '../Category/Category.jsx';
import NestedListItem from '../NestedListItem/NestedListItem.jsx';

const styles = {

    categoryList: {
        height: '470px',
        overflow: 'auto',
    },
};

class CategoryList extends React.Component {
    constructor(props) {
        super(props);

        this.createCategoryList = this.createCategoryList.bind(this);
        this.categoryClickHandler = this.categoryClickHandler.bind(this);
    }

    categoryClickHandler(id) {
        history.push('/categories/' + id);
        
        const location = history.location;
        location.search = 'show_done=' + this.props.gui.showDone + '&search=' + this.props.gui.searchFilter;
        history.push(location);
    }

    createCategoryList(category, level) {
        if (_.isNil(category)) return null;

        const list = category.map(

            (element) => {
                let nested;

                if (element.nestedCategories.length > 0) {
                    nested = element.nestedCategories;
                }
                else nested = null;

                let nestedItems = this.createCategoryList(nested, level + 1);
                let isSelected = _.isEqual(element.id, this.props.chosenCategoryId);

                const child = (
                    <Category
                        title={element.title}
                        id={element.id}
                        openNestedAddWindow={this.props.openNestedAddWindow}
                        openCategoryEditWindow={this.props.openCategoryEditWindow}
                        openConfirmDeleteWindow={this.props.openConfirmDeleteWindow}
                        isSelected={isSelected} />
                );

                return (
                    <div key={element.id}
                    >
                        <NestedListItem
                            nested={nestedItems}
                            child={child}
                            isSelected={isSelected}
                            nestedLevel={level}
                            title={element.title}
                            onClickHandler={() => this.categoryClickHandler(element.id)}
                        />
                    </div >
                );
            }
        );

        return list;
    }

    render() {

        const categoriesList = this.createCategoryList(this.props.categories, 0);

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

    gui: PropTypes.object,

    chosenCategoryId: PropTypes.string,
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
    openConfirmDeleteWindow: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryList)

