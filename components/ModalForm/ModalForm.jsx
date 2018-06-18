import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '../ModalDialog.jsx';

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

            </div>
        );
    }
}

ModalForm.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired,
    editCategoryHandler: PropTypes.func.isRequired,

    closeNestedAddWindow: PropTypes.func.isRequired,
    closeCategoryEditWindow: PropTypes.func.isRequired,

    gui: PropTypes.shape({
        isNestedAddOpened: PropTypes.bool.isRequired,
        isEditCategoryOpened: PropTypes.bool.isRequired,
        nestedParentId: PropTypes.string.isRequired,
        editId: PropTypes.string.isRequired,
        editTitle: PropTypes.string.isRequired,
        chosenCategoryId: PropTypes.string.isRequired,
    }),

}