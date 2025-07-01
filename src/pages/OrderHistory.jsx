import React from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { FaShoppingBag } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function OrderHistory() {

    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedUser.id;
    console.log(userId)
    const orders = JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
    console.log(orders)

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    return (
        <Container className='mt-4'>

            {orders.length === 0 ? (
                <>
                    <div className='text-center'>
                        <FaShoppingBag size={80} color="gray" className="mb-4" />
                        <h3 className="text-muted">No Order History</h3>
                        <p className="text-secondary">You haven’t placed any orders yet. Start exploring delicious dishes now!</p>
                        <Button variant="danger" className="mt-3" onClick={() => navigate('/home')}>
                            Browse Dishes
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="pb-3 text-center">Your Orders</h3>
                    <Table bordered hover size="sm" className="table-sm">
                        <thead>
                            <tr>
                                <th className="text-center p-1">Date</th>
                                <th className='text-center p-1'>Items</th>
                                <th className="text-center p-1">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const formattedDate = new Date(order.date).toLocaleDateString(
                                    "en-US",
                                    dateOptions
                                );

                                return (
                                    <>
                                        <tr key={index} className="align-middle">

                                            <td className="text-center p-1">{formattedDate}</td>
                                            <td>

                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <td>Image</td>
                                                            <td>Dish</td>
                                                            <td>Price</td>
                                                            <td>Quantity</td>
                                                            <td>Total</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.items.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td><img src={item.image} alt={item.name} width="60" /></td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.quantity * item.price}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </td>
                                            <td className="text-center p-1">{order.total}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    )
}

export default OrderHistory