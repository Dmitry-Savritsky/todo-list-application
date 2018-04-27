import React from 'react';
import { Button, Form, FormGroup, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class NestedCategoryAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: " ",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addCategoryHandler = this.addCategoryHandler.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    addCategoryHandler(event) {
        event.preventDefault();
        //generate id for the new nested category
        const uuidv1 = require('uuid/v1');
        const id = uuidv1();

        //generate action for adding a category
        this.props.addNestedCategory(id, this.props.nestedParentId, this.state.title);

        this.setState({ title: " " });
        this.props.closeWindow();
    }
    //on closing
    onClose() {
        this.setState({ title: " " });
        this.props.closeWindow();
    }

    handleNameChange(event) {
        this.setState({ title: event.target.value });
    }

    render() {

        return (
            <Modal show={this.props.showWindow} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add nested category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form inline onSubmit={this.addCategoryHandler}>
                        <FormGroup>
                            <FormControl type="text" value={this.state.title} placeholder="Enter category title" onChange={this.handleNameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button bsStyle="primary" type="submit">Add</Button>
                        </FormGroup>
                    </Form>
                </Modal.Body>

            </Modal>
        );
    }
}

NestedCategoryAdder.propTypes = {
    addNestedCategory: PropTypes.func.isRequired,
    showWindow: PropTypes.bool.isRequired,
    closeWindow: PropTypes.func.isRequired,
    nestedParentId: PropTypes.string.isRequired,
}