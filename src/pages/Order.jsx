import React, { useState } from 'react'
import { Container, Form, Button,Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Order() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const cartDishes = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];

  const [showModal, setShowModal] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const [form, setForm] = useState({
    name: user.name,
    address: '',
    phone: '',
    payment: 'cod'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      date: new Date(),
      items: cartDishes,
      total: cartDishes.reduce((sum, item) => sum + item.price * item.quantity, 0),
      customer: form,
    };

    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem(`orders`, JSON.stringify([...allOrders, order]));
    localStorage.setItem(`orders_${user.id}`, JSON.stringify([...existingOrders, order]));
    console.log(localStorage.getItem('orders'))

    localStorage.removeItem(`cart_${user.id}`);
 
    setPlacedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false)
    navigate('/home')
  }


  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h3 className='text-center mb-3'>Delivery Details</h3>
      <Form onSubmit={handlePlaceOrder}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select
            name="payment"
            value={form.payment}
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
          </Form.Select>
        </Form.Group>
        <Button varint="primary" type="submit" className="w-100">
          Place Order
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Order Confirmed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {placedOrder && (
            <>
              <p>Thank you, <strong>{placedOrder.customer.name}</strong></p>
              <p>Your order <strong>#{placedOrder.id}</strong> was placed on{' '}
                {new Date(placedOrder.date).toLocaleString()}.</p>
              <h6>Order Summary:</h6>
              <ul>
                {placedOrder.items.map(item => (
                  <li key={item.dish}>
                    {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="fw-bold">Total: ₹{placedOrder.total}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Order