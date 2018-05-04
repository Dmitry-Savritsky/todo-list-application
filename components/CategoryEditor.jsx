import React from 'react';

import { Form, FormGroup, FormControl } from 'react-bootstrap';

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

import PropTypes from 'prop-types';
import _ from 'lodash'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class CategoryEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.editTitle,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.editCategoryHandler = this.editCategoryHandler.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentWillReceiveProps(newProps) {

        if (!_.isEqual(this.props, newProps)) {

            this.setState({
                title: newProps.editTitle,
            });
        }
    }

    //TODO
    editCategoryHandler(event) {
        event.preventDefault();

        //generate action for adding a category

        this.props.editCategory(this.props.editId, this.state.title);

        //close window
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
            <RaisedButton key="1" label="Edit" primary={true} onClick={this.editCategoryHandler} />,
            <RaisedButton key="2" label="Cancel" primary={true} onClick={this.onClose} />
        ];

        return (
            <MuiThemeProvider>
                <Dialog
                    title="Edit category title"
                    actions={actions}
                    modal={true}
                    open={this.props.showWindow}>

                    <Form inline onSubmit={this.editCategoryHandler}>
                        <FormGroup>
                            <FormControl type="text" value={this.state.title} placeholder="Enter category title" onChange={this.handleNameChange} />
                        </FormGroup>
                    </Form>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

CategoryEditor.propTypes = {
    editCategory: PropTypes.func.isRequired,
    showWindow: PropTypes.bool.isRequired,
    closeWindow: PropTypes.func.isRequired,
    editTitle: PropTypes.string.isRequired,
    editId: PropTypes.string.isRequired,
}