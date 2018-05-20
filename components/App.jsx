import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CategoryAdder from './CategoryAdder.jsx';
import CategoryList from './CategoryList.jsx';
import NestedCategoryAdder from './NestedCategoryAdder.jsx';
import CategoryEditor from './CategoryEditor.jsx';
import TaskList from './TaskList.jsx';
import TaskAdder from './TaskAdder.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} justify='space-around' alignItems='flex-start'>

                    <Grid item xs={6}>
                        <h1>To-Do List</h1>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={true}
                                    value="checkedA"
                                />
                            }
                            label="Show done"
                        />

                        <TextField
                            id="search"
                            label="Search"
                            type="search"
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <CategoryAdder addCategory={this.props.addCategory} />

                        <CategoryList
                            categories={this.props.categories}
                            deleteCategoryHandler={this.props.deleteCategory}
                            chooseCategoryHandler={this.props.chooseCategory}
                            chosenCategoryId={this.props.gui.chosenCategoryId}
                            openNestedAddWindow={this.props.openNestedAddWindow}
                            openCategoryEditWindow={this.props.openCategoryEditWindow} />
                    </Grid>

                    <Grid item xs={6}>
                        <TaskAdder addTask={this.props.addTask} />

                        <TaskList categoryId={this.props.gui.chosenCategoryId}
                            tasks={this.props.tasks} />
                    </Grid>
                </Grid>

                <CategoryEditor
                    showWindow={this.props.gui.isEditCategoryOpened}
                    closeWindow={this.props.closeCategoryEditWindow}
                    editCategory={this.props.editCategory}
                    editId={this.props.gui.editId}
                    editTitle={this.props.gui.editTitle} />

                <NestedCategoryAdder
                    addCategory={this.props.addCategory}
                    showWindow={this.props.gui.isNestedAddOpened}
                    closeWindow={this.props.closeNestedAddWindow}
                    nestedParentId={this.props.gui.nestedParentId} />

            </div>
        );
    }
}

App.propTypes = {
    addCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    chooseCategory: PropTypes.func.isRequired,

    addTask: PropTypes.func.isRequired,

    progressValue: PropTypes.number.isRequired,

    openNestedAddWindow: PropTypes.func.isRequired,
    closeNestedAddWindow: PropTypes.func.isRequired,

    openCategoryEditWindow: PropTypes.func.isRequired,
    closeCategoryEditWindow: PropTypes.func.isRequired,

    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        nestedCategories: PropTypes.array,
    })),

    tasks: PropTypes.arrayOf(PropTypes.shape({
        parentId: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
        checked: PropTypes.bool,
        description: PropTypes.string
    })),

    gui: PropTypes.shape({
        isNestedAddOpened: PropTypes.bool.isRequired,
        isEditCategoryOpened: PropTypes.bool.isRequired,
        nestedParentId: PropTypes.string.isRequired,
        editId: PropTypes.string.isRequired,
        editTitle: PropTypes.string.isRequired,
        chosenCategoryId: PropTypes.string.isRequired,
    }),
}