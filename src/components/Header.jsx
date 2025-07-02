import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaHome, FaUser, FaShoppingCart ,FaSun,FaMoon} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

function Header({ onNameSearch }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = loggedUser?.id;

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const cartCount = useSelector(state =>
        state.cart.filter(item => item.user === userId).length
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const linkClass = ({ isActive }) =>
        `px-4 fw-semibold nav-link d-flex align-items-center ${isActive ? 'text-black' : 'text-white'}`;

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
    }, [theme]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg={theme === 'dark' ? 'dark' : 'danger'} data-bs-theme="dark" className="px-4">
                <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
                    <img src="/logo2.png" alt="Logo" style={{ height: 60, width: 60, objectFit: 'contain' }} className="me-2" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav" className="justify-content-end">
                    <Nav>
                        <NavLink to="/home" className={linkClass}>
                            <FaHome size={15} className="mx-1" /> Home
                        </NavLink>

                        <NavLink to="/dishes" className={linkClass}>
                            <FaInfoCircle size={15} className="mx-1" /> Dishes
                        </NavLink>

                        <NavLink to="/cart" className={linkClass}>
                            <FaShoppingCart size={15} className="mx-1" />
                            Cart&nbsp;
                            <span className="badge bg-white text-black">{cartCount}</span>
                        </NavLink>

                        {loggedUser && (
                            <NavDropdown title={loggedUser.name} id="user-nav-dropdown" className="text-white">
                                <NavDropdown.Item as={Link} to="/profile" className="d-flex align-items-center">
                                    <FaUser size={15} className="mx-1" /> Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/orderHistory" className="d-flex align-items-center">
                                    <FaInfoCircle size={15} className="mx-1" /> Your Orders
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center">
                                    <FaInfoCircle size={15} className="mx-1" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <button onClick={toggleTheme} className="btn btn-outline-light ms-3">
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>
                </Navbar.Collapse>
            </Navbar>

        </>
    );
}

export default Header;