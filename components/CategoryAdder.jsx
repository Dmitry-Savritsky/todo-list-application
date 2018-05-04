import React from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class CategoryAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: " ",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addCategoryHandler = this.addCategoryHandler.bind(this);
    }

    addCategoryHandler(event) {
        event.preventDefault();
        const uuidv1 = require('uuid/v1');
        const id = uuidv1();

        this.props.addCategory(id, null, this.state.title);
        this.setState({ title: " " });
    }

    handleNameChange(event) {
        this.setState({ title: event.target.value });
    }

    render() {

        return (
            <Form inline onSubmit={this.addCategoryHandler}>
                <FormGroup>
                    <FormControl type="text" value={this.state.title} placeholder="Enter category title" onChange={this.handleNameChange} />
                </FormGroup>
                <FormGroup>
                    <Button bsStyle="primary" type="submit">Add</Button>
                </FormGroup>
            </Form>
        );
    }
}

CategoryAdder.propTypes = {
    addCategory: PropTypes.func.isRequired
}