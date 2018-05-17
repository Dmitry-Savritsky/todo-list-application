import React from 'react';
import PropTypes from 'prop-types';
import ImageEdit from 'material-ui/svg-icons/image/edit';

export default class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
        }

        this.onCheck = this.onCheck.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    onCheck() {

    }

    editTask() {
        //this.props.openCategoryEditWindow(this.props.id, this.props.title);
    }

    handleCheckboxChange(event) {
        this.setState({
            isChecked: event.target.checked,
        });

        //this.props.onCheckHandler(this.props.id, this.state.isChecked);
    }

    render() {

        return (
            <div>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.handleCheckboxChange} />
                <div>{this.props.title}</div>
                <ImageEdit onClick={this.editTask} />
            </div>
        );
    }
}

Task.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onCheckHandler: PropTypes.func,
    onEditHandler: PropTypes.func,
}