import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Category from './Category.jsx';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const categoriesList = createCategoryList(this.props.categories);

        return (
            <ListGroup>
                {categoriesList}
            </ListGroup>
        );
    }
}

function createCategoryList(categories) {
    const list = categories.map(
        element =>
            <ListGroupItem key={element.id}>
                <Category title={element.title} id={element.id} />
            </ListGroupItem>
    );

    return list;
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            checked: PropTypes.bool,
            description: PropTypes.string
        })),
        nestedCategories: PropTypes.array,
    }))
}