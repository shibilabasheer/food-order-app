import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addCart, updateCart } from '../redux/slices/cartSlice';
import DishNavbar from '../components/DishNavbar';
import { FaConciergeBell } from 'react-icons/fa';

function Dishes() {

    const dispatch = useDispatch();
    const allDishes = useSelector(state => state.dishes);
    const [dishes, setDishes] = useState(allDishes);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedUser.id;
    const cartDishes = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    //console

    const handleCart = (dishId, dishPrice, dishName, dishImage) => {

        const existing = cartDishes.find(cart => cart.dish == dishId);

        if (existing) {

            dispatch(updateCart({ id: existing.id, user: userId, dish: dishId, price: dishPrice, name: dishName, image: dishImage, quantity: existing.quantity + 1 }));
            return;
        }

        const cartData = {
            id: Date.now(),
            user: loggedUser.id,
            dish: dishId,
            price: dishPrice,
            name: dishName,
            image: dishImage,
            price: dishPrice,
            quantity: 1
        }

        dispatch(addCart(cartData));
    }
    const handleNameSearch = (dishName) => {
        setSearchText(dishName);
        setSelectedCategory('');
    };

    const handleCategorySearch = (category) => {
        setSelectedCategory(category);
        setSearchText('');
    };

    useEffect(() => {

        let dishes = allDishes;
        if (searchText) {
            dishes = allDishes.filter(dish =>
                dish.name.toLowerCase().includes(searchText.toLowerCase())
            );
        } else if (selectedCategory) {

            dishes = allDishes.filter(dish =>
                String(dish.category) === String(selectedCategory)
            );
        }
        setDishes(dishes);
    }, [searchText, selectedCategory, allDishes]);

    return (
        <>
            <DishNavbar onNameSearch={handleNameSearch} onCategorySearch={handleCategorySearch} />
            <Container className="mt-3 mb-5">
                <h3 className="pb-3 text-center">Explore Our Dishes</h3>

                {dishes.length === 0 ? (
                    <div className='text-center'>
                        <FaConciergeBell size={80} color="gray" className="mb-4" />
                        <h3 className="text-muted">No Dishes Available</h3>
                        <p className="text-secondary">We’re curating the best dishes for you. Check back soon!</p>
                    </div>

                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {dishes.map(dish => (
                            <Col key={dish.id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={dish.image}
                                        style={{ height: '160px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{dish.name}</Card.Title>
                                        <Card.Text>
                                            {dish.details}
                                        </Card.Text>
                                        <Card.Text>₹{dish.price}</Card.Text>
                                        <Button variant="danger" onClick={() => handleCart(dish.id, dish.price, dish.name, dish.image)}>Add To Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

            </Container>
        </>
    )
}

export default Dishes