
import { React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { getCategories } from '../helpers/category';

function DishNavbar({ onNameSearch, onCategorySearch }) {

    const categories = getCategories();

    const [dishName, setDishName] = useState('');
    const [category, setCategory] = useState('');

    const handleSearchDishName = (e) => {
        const value = e.target.value;
        setDishName(value);
        onNameSearch(value);
    };

    const handleSearchDishCategory = (category) => {
        onCategorySearch(category);
    };

    return (
        <Navbar bg="secondary" data-bs-theme="dark" className="py-2">
            <Container fluid className="d-flex justify-content-between align-items-center flex-wrap">

                <Nav className="flex-wrap">
                    {categories.map((category, index) => (
                        <NavLink
                            className="nav-link px-3 text-white"
                            key={index} onClick={() => handleSearchDishCategory(category.id)}
                        >
                            {category.title}
                        </NavLink>
                    ))}
                </Nav>

                <Form className="d-flex mt-2 mt-lg-0">
                    <Form.Control
                        type="text"
                        size="md"
                        placeholder="Search dishes..."
                        className="ms-lg-3" value={dishName} onChange={handleSearchDishName}
                    />
                </Form>
            </Container>
        </Navbar>
    )
}

export default DishNavbar