
import { NavLink , useNavigate} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch } from 'react-redux';  
import { logout } from '../redux/slices/userSlice';

function AdminHeader() {

    const dispatch = useDispatch();     
    const navigate = useNavigate();           

    const handleLogout = () => {
        dispatch(logout())
        navigate('/');
    }

    const linkClass = ({ isActive }) =>
        `px-4 fw-semibold nav-link d-flex align-items-center ${isActive ? 'text-black' : 'text-white'}`;

    return (
        <Navbar collapseOnSelect expand="lg" bg="danger" data-bs-theme="dark" className="px-4">
            <Container fluid className="d-flex align-items-center">
                <Navbar.Brand className="d-flex align-items-center">
                    <img src="/logo2.png" alt="Logo" style={{ height: '60px', width: '60px', objectFit: 'contain' }} className="me-2" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavLink onClick={handleLogout} className={linkClass}>
                            <FaInfoCircle size={15} className="mx-1" />
                            Logout
                        </NavLink>
                        <NavLink to="/profile" className={linkClass}>
                            <FaUser size={15} className="mx-1" />
                            Profile
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default AdminHeader;