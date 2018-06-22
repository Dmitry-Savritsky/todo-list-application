import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../ModalDialog.jsx';
import ConfirmDeleteDialog from '../ConfirmDeleteDialog.jsx';

export default class ModalForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <ModalDialog
                    isEditor={true}
                    actionHandler={this.props.editCategoryHandler}
                    showWindow={this.props.gui.isEditCategoryOpened}
                    closeWindow={this.props.closeCategoryEditWindow}
                    editId={this.props.gui.editId}
                    editTitle={this.props.gui.editTitle}
                />

                <ModalDialog
                    isEditor={false}
                    actionHandler={this.props.addCategoryHandler}
                    showWindow={this.props.gui.isNestedAddOpened}
                    closeWindow={this.props.closeNestedAddWindow}
                    nestedParentId={this.props.gui.nestedParentId} />

                <ConfirmDeleteDialog
                    actionHandler={this.props.deleteCategoryHandler}
                    showWindow={this.props.gui.isConfirmDeleteOpened}
                    closeWindow={this.props.closeConfirmDeleteWindow}
                    deleteId={this.props.gui.deleteId}
                    deleteCategoryTitle={this.props.gui.deleteCategoryTitle} />

            </div>
        );
    }
}

ModalForm.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired,
    editCategoryHandler: PropTypes.func.isRequired,
    deleteCategoryHandler: PropTypes.func.isRequired,

    closeNestedAddWindow: PropTypes.func.isRequired,
    closeCategoryEditWindow: PropTypes.func.isRequired,
    closeConfirmDeleteWindow: PropTypes.func.isRequired,
    
    gui: PropTypes.shape({
        isNestedAddOpened: PropTypes.bool.isRequired,
        isEditCategoryOpened: PropTypes.bool.isRequired,
        isConfirmDeleteOpened: PropTypes.bool.isRequired,
        nestedParentId: PropTypes.string.isRequired,
        editId: PropTypes.string.isRequired,
        editTitle: PropTypes.string.isRequired,
        deleteId: PropTypes.string.isRequired,
        deleteCategoryTitle: PropTypes.string.isRequired,
        searchFilter: PropTypes.string.isRequired,
        showDone: PropTypes.bool.isRequired,
    }),

}