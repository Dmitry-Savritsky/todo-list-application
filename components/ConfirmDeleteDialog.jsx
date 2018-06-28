import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import history from '../history/history';

export default class ConfirmDeleteDialog extends React.Component {
    constructor(props) {
        super(props);

        this.actionHandler = this.actionHandler.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    actionHandler(event) {
        event.preventDefault();
        this.props.actionHandler(this.props.deleteId);
        this.props.closeWindow();
        history.push('/');
    }

    //on closing
    onClose() {
        this.props.closeWindow();
    }

    render() {

        const actions = [
            <RaisedButton key="1" label="Delete category" primary={true} onClick={this.actionHandler} />,
            <RaisedButton key="2" label="Cancel" primary={true} onClick={this.onClose} />
        ];

        return (
            <MuiThemeProvider>
                <Dialog
                    title={"Are you sure you want to delete " + this.props.deleteCategoryTitle + "?"}
                    actions={actions}
                    modal={true}
                    open={this.props.showWindow}>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

ConfirmDeleteDialog.propTypes = {
    actionHandler: PropTypes.func.isRequired,
    deleteCategoryTitle: PropTypes.string.isRequired,
    showWindow: PropTypes.bool.isRequired,
    closeWindow: PropTypes.func.isRequired,
    deleteId: PropTypes.string.isRequired,
}