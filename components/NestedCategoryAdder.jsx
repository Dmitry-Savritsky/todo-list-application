import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
        this.props.addCategory(id, this.props.nestedParentId, this.state.title);

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

        const actions = [
            <RaisedButton key="1" label="Add" primary={true} onClick={this.addCategoryHandler} />,
            <RaisedButton key="2" label="Cancel" primary={true} onClick={this.onClose} />
        ];

        return (
            <MuiThemeProvider>
                <Dialog
                    title="Add nested category"
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

NestedCategoryAdder.propTypes = {
    addCategory: PropTypes.func.isRequired,
    showWindow: PropTypes.bool.isRequired,
    closeWindow: PropTypes.func.isRequired,
    nestedParentId: PropTypes.string.isRequired,
}