import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/userSlice';
import { useNavigate , NavLink} from 'react-router-dom';
import { Row, Col, Form, Button, Container } from 'react-bootstrap'

function Register() {

    const [form, setForm] = useState({ id: Date.now(),name: '', email: '', password: '', role: 'user' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form));
        navigate('/home');
    };

    return (


        <Container fluid className="vh-100">
            <Row className="h-100">

                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <div className="w-75">

                        <img src="/logo.png" style={{ width: '100px', marginBottom: '20px' }} className="d-block mx-auto" alt="logo" />

                        <h2 className="mb-4 text-center text-danger fw-semibold">Register</h2>

                        <Form onSubmit={handleSubmit} action="">
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            </Form.Group>

                            <Button variant="danger" type="submit" className="w-100">
                                Register
                            </Button>
                        </Form>
                         <NavLink to="/" className="mt-4">Already have an account ? Login here</NavLink>
                    </div>
                </Col>

                <Col md={6} className="p-0 d-none d-md-block">
                    <img src="/login.png" alt="Login image" className="w-100 h-100 object-fit-cover" style={{ objectFit: 'cover' }} />
                </Col>

            </Row>
        </Container>
    )
}

export default Register