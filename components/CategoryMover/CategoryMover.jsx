import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Reply from 'material-ui/svg-icons/content/reply'
import styles from './CategoryMover.css';

export default class CategoryMover extends React.Component {
    constructor(props) {
        super(props);
        this.moveToCategory = this.moveToCategory.bind(this);
    }

    moveToCategory() {
        this.props.moveToCategoryHandler(this.id);
    }

    render() {

        let style;
        if (this.props.isSelected) style = styles.selected;
        else style = styles.notSelected;

        return (
            <Grid container alignItems="center">

                <h4 className={style}>
                    {this.props.title}
                </h4>

                {!this.props.isSelected && <Reply onClick={this.moveToCategoryHandler} />}

            </Grid>
        );
    }
}

CategoryMover.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    moveToCategoryHandler: PropTypes.func,
    isSelected: PropTypes.bool,
}