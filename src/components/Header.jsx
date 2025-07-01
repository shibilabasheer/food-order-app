
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { FaInfoCircle, FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { useEffect } from 'react';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedUser.id;

    const handleLogout = () => {

        dispatch(logout())
        navigate('/');
    }

    /*useEffect(()=>{

    },[cartCount])*/
    const cartDishes = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const cartCount = cartDishes.length;
    console.log(cartCount)

    const linkClass = ({ isActive }) =>
        `px-4 fw-semibold nav-link d-flex align-items-center ${isActive ? 'text-black' : 'text-white'}`;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="danger" data-bs-theme="dark" className="d-flex justify-content-between px-4 ">
                <div><img src="/logo2.png" alt="Logo" style={{ height: '60px', width: '60px', objectFit: 'contain' }} className="me-2" /></div>
                <Nav>
                    <NavLink to="/cart" className={linkClass}><FaShoppingCart size={15} className="mx-1" /> Cart <span className="badge bg-white ms-2 text-black">{cartCount}</span></NavLink>
                    <NavDropdown title={loggedUser.name} id="basic-nav-dropdown" className='text-white'>
                        <NavDropdown.Item as={Link} to="/profile" className={linkClass}><FaUser size={15} className="mx-1" />Profile</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/orderHistory" className={linkClass}><FaInfoCircle size={15} className="mx-1" />Your Orders</NavDropdown.Item>
                        <NavDropdown.Item onClick={handleLogout} className={linkClass}><FaInfoCircle size={15} className="mx-1" />Logout</NavDropdown.Item>   
                    </NavDropdown>
                </Nav>
            </Navbar>
        </>
    )

}

export default Header;