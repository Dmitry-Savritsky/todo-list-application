import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import TaskMove from '../TaskMove/TaskMove.jsx';
import NestedListItem from '../NestedListItem/NestedListItem.jsx';

const styles = {
    categoryList: {
        height: '560px',
        overflow: 'auto',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
};

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.createCategoryList = this.createCategoryList.bind(this);
    }

    createCategoryList(category, level) {

        if (category == null) return null;

        const list = category.map(

            (element) => {
                let nested;

                if (element.nestedCategories.length > 0) {
                    nested = element.nestedCategories;
                }
                else nested = null;

                let nestedItems = this.createCategoryList(nested, level + 1);

                let isSelected = _.isEqual(element.id, this.props.parentCategoryId);

                const child = (
                    <TaskMove
                        title={element.title}
                        id={element.id}
                        moveToCategoryHandler={this.props.moveToCategoryHandler}
                        isSelected={isSelected} />
                );

                return (
                    <div key={element.id}>
                        <NestedListItem
                            nested={nestedItems}
                            child={child}
                            isSelected={isSelected}
                            nestedLevel={level}
                            title={element.title}
                        />
                    </div>
                );
            }
        );

        return list;
    }

    render() {

        const categoriesList = this.createCategoryList(this.props.categories, 0);

        return (

            <MuiThemeProvider>
                <Paper elevation = {5}>
                    <List className={this.props.classes.categoryList} disablePadding>
                        {categoriesList}
                    </List>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(Test)

Test.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),
    parentCategoryId: PropTypes.string.isRequired,
    moveToCategoryHandler: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}