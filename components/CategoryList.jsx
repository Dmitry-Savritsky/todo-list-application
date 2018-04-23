import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Category from './Category.jsx';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const categoriesList = createCategoryList(this.props.categories, this.props.deleteCategory);

        return (

            <ListGroup>
                {categoriesList}
            </ListGroup>
        );
    }
}

function createCategoryList(categories, deleteCategoryHandler) {

    const list = categories.map(
        function (element) {
            let nested;
            if (element.nestedCategories.length > 0) {
                nested = element.nestedCategories;
            }
            else nested = false;
            
            return (
                <ListGroupItem key={element.id}>
                    <Category title={element.title}
                        id={element.id}
                        deleteCategory={deleteCategoryHandler} />

                    {nested && <ListGroup>
                        {createCategoryList(nested, deleteCategoryHandler)}
                    </ListGroup>
                    }
                </ListGroupItem>
            );
        }
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
    })),
    deleteCategory: PropTypes.func.isRequired,
}