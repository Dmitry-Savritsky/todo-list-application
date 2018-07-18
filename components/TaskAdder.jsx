import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

export default class TaskAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
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

        this.props.addTaskHandler(id, this.props.parentId, this.state.title, desc, checked);

        this.setState({ title: "" });
    }

    handleNameChange(event) {
        this.setState({ title: event.target.value });
    }

    render() {

        return (
            <Form >
                <Grid container justify="flex-start" alignItems="center" spacing={8}>
                    <Grid item>
                        <FormControl
                            type="text"
                            value={this.state.title}
                            placeholder="Enter task title"
                            onChange={this.handleNameChange} />
                    </Grid>

                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={this.addTaskHandler}>
                            Add
                        </Button>
                    </Grid>
                    
                </Grid>
            </Form>
        );
    }
}

TaskAdder.propTypes = {
    addTaskHandler: PropTypes.func.isRequired,
    parentId: PropTypes.string,
}