import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types';

export default class TaskAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: " ",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addTaskHandler = this.addTaskHandler.bind(this);
    }

    addTaskHandler(event) {
        event.preventDefault();
        const uuidv1 = require('uuid/v1');
        const id = uuidv1();

        let desc = " ";
        let checked = false;

        this.props.addTask(id, this.props.parentId, this.state.title, desc, checked);

        this.setState({ title: " " });
    }

    handleNameChange(event) {
        this.setState({ title: event.target.value });
    }

    render() {

        return (
            <Form inline>
                <FormGroup>
                    <FormControl type="text" value={this.state.title} placeholder="Enter task title" onChange={this.handleNameChange} />
                </FormGroup>
                <FormGroup>
                    <MuiThemeProvider>
                        <RaisedButton label="Add" primary={true} onClick={this.addTaskHandler} />
                    </MuiThemeProvider>
                </FormGroup>
            </Form>
        );
    }
}

TaskAdder.propTypes = {
    addTask: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
}