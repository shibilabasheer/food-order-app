import React, { useState ,useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaInfoCircle, FaHome, FaUser, FaUsers, FaBars ,FaMoon , FaSun} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Sidebar.css';

function AdminHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const linkClass = ({ isActive }) =>
        `fw-semibold px-4 nav-link d-flex align-items-center ${isActive ? 'text-black' : 'text-white'}`;

    const dropdownItemClass = 'd-flex align-items-center gap-2';

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
    }, [theme]);

    return (
        <Navbar bg={theme === 'dark' ? 'dark' : 'danger'} expand="lg" variant="dark" expanded={expanded} className="px-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/products">
                    <img src="/logo2.png" alt="Logo" style={{ height: '50px', width: '50px', objectFit: 'contain' }} className="me-2" />
                </Navbar.Brand>

                {/* Toggle button for small devices */}
                <Navbar.Toggle onClick={() => setExpanded(prev => !prev)} aria-controls="admin-navbar-nav" />

                <Navbar.Collapse id="admin-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <NavLink to="/products" className={linkClass}>
                            <FaInfoCircle className="me-2" /> Dishes
                        </NavLink>
                        <NavLink to="/allorders" className={linkClass}>
                            <FaBars className="me-2" /> Orders
                        </NavLink>

                        <NavLink to="/allusers" className={linkClass}>
                            <FaUsers className="me-2" /> Users
                        </NavLink>

                        <NavDropdown title={<span className="text-white">Admin</span>} id="admin-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/adminprofile" className={dropdownItemClass}>
                                <FaUser /> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout} className={dropdownItemClass}>
                                <FaInfoCircle /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <button onClick={toggleTheme} className="btn btn-outline-light ms-3">
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminHeader;
