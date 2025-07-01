import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { getAdminCredentials } from '../helpers/auth';
import { useNavigate , NavLink} from 'react-router-dom';
import { login } from '../redux/slices/userSlice';

function Login() {

  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminCredentials = getAdminCredentials();
    const savedUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    const user = savedUsers.find((item)=> item.email === form.email && item.password === form.password)
    console.log(user)

    if (adminCredentials.email == form.email && adminCredentials.password == form.password) {
      dispatch(login({ email:form.email, role: adminCredentials.role }));
      navigate('/products')
    }

    else if (user) {
      dispatch(login(user));
      navigate('/home');
    }

    else alert('Invalid email or password');
  }


  return (

    <Container fluid className="vh-100">
      <Row className="h-100">

        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div className="w-75">

            <img src="/logo.png" style={{ width: '100px', marginBottom: '20px' }} className="d-block mx-auto" alt="logo" />

            <h2 className="mb-4 text-center text-danger fw-semibold">Login</h2>

            <Form onSubmit={handleSubmit} action="">
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </Form.Group>

              <Button variant="danger" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <NavLink to="/register" className="mt-4">New member ? Register here</NavLink>
          </div>
        </Col>

        <Col md={6} className="p-0 d-none d-md-block">
          <img src="/login.png" alt="Login image" className="w-100 h-100 object-fit-cover" style={{ objectFit: 'cover' }} />
        </Col>

      </Row>
    </Container>
  )
}

export default Login