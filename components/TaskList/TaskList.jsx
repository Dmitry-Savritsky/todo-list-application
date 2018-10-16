import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Paper from '@material-ui/core/Paper';

import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Task from '../Task/Task.jsx';

const styles = {
    taskList: {
        height: '470px',
        overflow: 'auto',
    },

    itemCommonStyle: {
        marginTop: '4px',
        marginBottom: '4px',
    }
};

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.createTaskList = this.createTaskList.bind(this);
    }

    createTaskList() {

        const list = this.props.tasks.map(
            (element) => {
                if (_.isEqual(this.props.categoryId, element.parentId))
                    if (!this.props.showDone || (this.props.showDone && element.checked))
                        if (element.name.startsWith(this.props.searchFilter) || this.props.searchFilter == '')
                            return (
                                <Paper elevation={5} style={styles.itemCommonStyle} key={element.id}>
                                    <ListItem
                                        key={element.id}>

                                        <Task title={element.name}
                                            id={element.id}
                                            isChecked={element.checked}
                                            onCheckHandler={this.props.onCheckHandler} />
                                    </ListItem>
                                </Paper>
                            );
                        else return null;
            }
        );

        return list;
    }

    render() {

        const taskList = this.createTaskList();

        return (

                <List className={this.props.classes.taskList}>
                    {taskList}
                </List>
        );
    }
}

TaskList.propTypes = {

    categoryId: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.shape({
        parentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    })),
    onCheckHandler: PropTypes.func.isRequired,
    searchFilter: PropTypes.string.isRequired,
    showDone: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TaskList);