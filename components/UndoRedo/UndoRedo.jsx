import React from 'react';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

export default class UndoRedo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={8}>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.props.undoHandler}
                        disabled={!this.props.canUndo}
                        size='large'>
                        Undo
                    <Undo />
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={this.props.redoHandler}
                        disabled={!this.props.canRedo}
                        size='large'>
                        Redo
                    <Redo />
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

UndoRedo.propTypes = {
    canUndo: PropTypes.bool.isRequired,
    canRedo: PropTypes.bool.isRequired,
    undoHandler: PropTypes.func.isRequired,
    redoHandler: PropTypes.func.isRequired,
}