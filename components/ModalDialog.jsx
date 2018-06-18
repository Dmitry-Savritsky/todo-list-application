import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import _ from 'lodash'

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

        const actions = [
            <RaisedButton key="1" label={buttonLabel} primary={true} onClick={this.actionHandler} />,
            <RaisedButton key="2" label="Cancel" primary={true} onClick={this.onClose} />
        ];

        return (
            <MuiThemeProvider>
                <Dialog
                    title={windowTitle}
                    actions={actions}
                    modal={true}
                    open={this.props.showWindow}>

                    <Form inline onSubmit={this.addCategoryHandler}>
                        <FormGroup>
                            <FormControl type="text" value={this.state.title} placeholder="Enter category title" onChange={this.handleNameChange} />
                        </FormGroup>
                    </Form>
                </Dialog>
            </MuiThemeProvider>
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