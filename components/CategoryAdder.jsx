import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

export default class CategoryAdder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addCategoryHandler = this.addCategoryHandler.bind(this);
    }

    addCategoryHandler(event) {
        event.preventDefault();
        const uuidv1 = require('uuid/v1');
        const id = uuidv1();

        this.props.addCategoryHandler(id, null, this.state.title);
        this.setState({ title: "" });
    }

    handleNameChange(event) {
        this.setState({ title: event.target.value });
    }

    render() {

        return (
            <Form>
                <Grid container justify="flex-start" alignItems="center" spacing={8}>
                    <Grid item>
                        <FormControl
                            type="text"
                            value={this.state.title}
                            placeholder="Enter category title"
                            onChange={this.handleNameChange}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={this.addCategoryHandler}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        );
    }
}

CategoryAdder.propTypes = {
    addCategoryHandler: PropTypes.func.isRequired
}