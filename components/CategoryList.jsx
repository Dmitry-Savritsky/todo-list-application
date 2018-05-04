import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Category from './Category.jsx';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const categoriesList = createCategoryList(this.props.categories, this.props.deleteCategory,
            this.props.openNestedAddWindow, this.props.openCategoryEditWindow);

        return (

            <ListGroup>
                {categoriesList}
            </ListGroup>
        );
    }
}

function createCategoryList(categories, deleteCategoryHandler, openNestedAddWindow, openCategoryEditWindow) {

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
                        deleteCategory={deleteCategoryHandler}
                        openNestedAddWindow={openNestedAddWindow}
                        openCategoryEditWindow={openCategoryEditWindow} />

                    {nested && <ListGroup>
                        {createCategoryList(nested, deleteCategoryHandler, openNestedAddWindow, openCategoryEditWindow)}
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
    openNestedAddWindow: PropTypes.func.isRequired,
    openCategoryEditWindow: PropTypes.func.isRequired,
}