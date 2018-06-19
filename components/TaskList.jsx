import React from 'react';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';

import PropTypes from 'prop-types';
import Task from './Task.jsx';

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.createTaskList = this.createTaskList.bind(this);
    }

    createTaskList() {

        const list = this.props.tasks.map(
            (element) => {
                if (_.isEqual(this.props.categoryId, element.parentId))
                    return (
                        <ListItem
                            key={element.id}>

                            <Task title={element.name}
                                id={element.id}
                                isChecked={element.checked}
                                onCheckHandler={this.props.onCheckHandler} />
                        </ListItem>
                    );
                else return null;
            }
        );

        return list;
    }

    render() {

        const taskList = this.createTaskList();

        return (
            <MuiThemeProvider>
                <List>
                    {taskList}
                </List>
            </MuiThemeProvider>
        );
    }
}

TaskList.propTypes = {

    categoryId: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
        parentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
    })),

    onCheckHandler: PropTypes.func.isRequired,
}