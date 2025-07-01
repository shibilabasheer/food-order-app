import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { FaShoppingCart } from 'react-icons/fa';

function DishCart() {
    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedUser.id;

    const [cartDishes, setCategoryDishes] = useState(JSON.parse(localStorage.getItem(`cart_${userId}`)) || [])
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = cartDishes.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cartDishes));
    }, [cartDishes]);

    const addItem = (item) => {

        const existingItem = cartDishes.find((cart) => cart.dish === item.dish);

        // console.log(item.dish)
        if (existingItem) {
            console.log("exist")
            setCategoryDishes(prev => prev.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ))

        }
        setTotal(total + item.price);
    };

    const removeItem = (item) => {

        const existingItem = cartDishes.find((cart) => cart.dish === item.dish);

        // console.log(item.dish)
        if (existingItem) {
            console.log("exist")
            setCategoryDishes(prev => prev.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ))

        }
        setTotal(total - item.price);
    };

    //localStorage.removeItem(`cart_${userId}`);

    return (
        <>
            <Container className='mt-4'>


                {cartDishes.length === 0 ? (
                    <>
                        <div className='text-center'>
                            <FaShoppingCart size={80} color="gray" className="mb-4" />
                            <h3 className="text-muted">Your cart is empty</h3>
                            <p className="text-secondary">Looks like you haven’t added anything yet.</p>
                            <Button variant="danger" className="mt-3" onClick={() => navigate('/home')}>
                                Browse Dishes
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="pb-3 text-center">Your Cart</h3>
                        <Table bordered hover size="sm" className="table-sm">

                            <tbody>
                                {cartDishes.map((item) => (

                                    <tr key={item.id} className="align-middle">

                                        <td className="text-center p-1"><img src={item.image} alt={item.name} width="60" /></td>
                                        <td className="text-center p-1">{item.name}</td>
                                        <td className="text-center p-1">{item.price}</td>
                                        <td className="text-center p-1"><Button size="sm" variant="outline-danger" className='m-2' onClick={() => removeItem(item)}>-</Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button size="sm" variant="outline-success" className='m-2' onClick={() => addItem(item)}>+</Button>
                                        </td>
                                        <td className="text-center p-1">{item.price * item.quantity}</td>
                                    </tr>
                                ))}
                                <tr className="fw-bold">
                                    <td colSpan="4" className="text-center p-1">Total</td>
                                    <td className="text-center p-1">₹{total}</td>

                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-center my-3 mt-4">
                            <Link to="/order" className="btn btn-danger">
                                Proceed to Order
                            </Link>
                        </div>

                    </>
                )}
            </Container>
        </>
    )
}

export default DishCart