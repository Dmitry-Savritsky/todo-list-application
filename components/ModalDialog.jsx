import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { DialogContent } from '@material-ui/core';

export default class ModalDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    actionHandler(event) {
        event.preventDefault();
        //generate id for the new nested category

        if (this.props.isEditor) {
            this.props.actionHandler(this.props.editId, this.state.title);
        }
        else {
            const uuidv1 = require('uuid/v1');
            const id = uuidv1();

            this.props.actionHandler(id, this.props.nestedParentId, this.state.title);
        }

        this.setState({ title: " " });
        this.props.closeWindow();
    }

    UNSAFE_componentWillReceiveProps(newProps) {

        if (!_.isEqual(this.props, newProps) && this.props.isEditor) {

            this.setState({
                title: newProps.editTitle,
            });
        }
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
        let windowTitle;
        let buttonLabel;

        if (this.props.isEditor) {
            windowTitle = "Edit category title";
            buttonLabel = "Edit";
        }
        else {
            windowTitle = "Add nested category";
            buttonLabel = "Add";
        }

        return (

            <Dialog
                open={this.props.showWindow}
                onClose={this.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {windowTitle}
                </DialogTitle>

                <DialogContent>

                    <Form inline onSubmit={this.addCategoryHandler}>
                        <FormGroup>
                            <FormControl type="text" value={this.state.title} placeholder="Enter category title" onChange={this.handleNameChange} />
                        </FormGroup>
                    </Form>

                </DialogContent>

                <DialogActions>
                    <Button onClick={this.actionHandler} color="primary">
                        {buttonLabel}
                    </Button>
                    <Button onClick={this.onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>

        );
    }
}

ModalDialog.propTypes = {
    isEditor: PropTypes.bool.isRequired, // switches from adder(false) to editor(true) 
    actionHandler: PropTypes.func.isRequired,
    showWindow: PropTypes.bool.isRequired,
    closeWindow: PropTypes.func.isRequired,

    editTitle: PropTypes.string,
    nestedParentId: PropTypes.string,
    editId: PropTypes.string,
}