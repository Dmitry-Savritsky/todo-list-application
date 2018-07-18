import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
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

        return (
            <Dialog
                open={this.props.showWindow}
                onClose={this.onClose}
            >
                <DialogTitle >
                    {"Are you sure you want to delete " + this.props.deleteCategoryTitle + "?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.actionHandler} color="primary">
                        Delete category
                    </Button>
                    <Button onClick={this.onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>
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