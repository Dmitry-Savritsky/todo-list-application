import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    categoryList: {
        height: '580px',
        overflow: 'auto',
    },

    chosenItemStyle: {
        backgroundColor: '#5168ff',
        paddingTop: '0px',
    },

    itemStyle: {
        backgroundColor: '#f1ff8a',
    }
};


class NestedListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({
            open: true,
        });
    }

    close() {
        this.setState({
            open: false,
        });
    }


    render() {

        const openIcon = (
            <IconButton onClick={this.open}>
                <ExpandMore />
            </IconButton>
        );

        const closeIcon = (
            <IconButton onClick={this.close}>
                <ExpandLess />
            </IconButton>
        )

        const needCollapse = !_.isNull(this.props.nested);

        const collapse = (
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                {this.props.nested}
            </Collapse>);

        const nestedPart = needCollapse && collapse;

        const level = this.props.nestedLevel;

        const itemCommonStyle = {
            marginLeft: 20 * level,
            marginTop: '4px',
            marginBottom: '4px',
        }

        const notChosenItemStyle = {
            backgroundColor: '#2F9C95',
        }

        const chosenItemStyle = {
            backgroundColor: '#5FA8D3',
        }

        const withoutCollapseItemStyle = {
            paddingLeft: '24px',
        }

        const withCollapseItemStyle = {
            paddingLeft: '0px',
        }

        let isChosenStyle = this.props.isSelected ? chosenItemStyle : notChosenItemStyle;
        let isNeedCollapseStyle = needCollapse ? withCollapseItemStyle : withoutCollapseItemStyle;

        let itemStyle = Object.assign({}, itemCommonStyle, isChosenStyle, isNeedCollapseStyle);

        return (
            <div>
                <Paper elevation={8} style={itemStyle}>
                    <ListItem style={isNeedCollapseStyle}
                        onClick={this.props.onClickHandler}>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Grid container direction='row' alignItems='baseline'>
                                    <Grid item>
                                        {needCollapse && (this.state.open ? closeIcon : openIcon)}
                                    </Grid>
                                    <Grid item>
                                        <ListItemText primary={this.props.title} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item >
                                {this.props.child}
                            </Grid>
                        </Grid>
                    </ListItem>
                </Paper>

                <List disablePadding>
                    {nestedPart}
                </List>

            </div>
        );
    }
}

export default withStyles(styles)(NestedListItem)

NestedListItem.propTypes = {
    nested: PropTypes.array,
    nestedLevel: PropTypes.number.isRequired,
    child: PropTypes.object,
    isSelected: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func,
}