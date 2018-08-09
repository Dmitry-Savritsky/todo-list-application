import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CategoryAdder from '../CategoryAdder/CategoryAdder.jsx';
import CategoryList from '../CategoryList/CategoryList.jsx';

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Grid container direction='column'>
                <Grid item>
                    <CategoryAdder addCategoryHandler={this.props.addCategoryHandler} />
                </Grid>
                <Grid item>
                    <CategoryList
                        categories={this.props.categories}
                        chosenCategoryId={this.props.chosenCategoryId}
                        openNestedAddWindow={this.props.openNestedAddWindow}
                        openCategoryEditWindow={this.props.openCategoryEditWindow}
                        openConfirmDeleteWindow={this.props.openConfirmDeleteWindow}
                        gui={this.props.gui} />
                </Grid>
            </Grid>
        );
    }
}

CategoryForm.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired,
    chosenCategoryId: PropTypes.string,
    openCategoryEditWindow: PropTypes.func.isRequired,
    openNestedAddWindow: PropTypes.func.isRequired,
    openConfirmDeleteWindow: PropTypes.func.isRequired,

    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),

    gui: PropTypes.object,
}