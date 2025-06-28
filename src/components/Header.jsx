
import Nav from 'react-bootstrap/Nav';
import { NavLink , useNavigate} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch } from 'react-redux';  
import { logout } from '../redux/slices/userSlice';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();   

    const handleLogout = () => {
        
        dispatch(logout())
        navigate('/');
    }     

    const linkClass = ({ isActive }) =>
        `px-4 fw-semibold nav-link d-flex align-items-center ${isActive ? 'text-black' : 'text-white'}`;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="danger" data-bs-theme="dark" className="d-flex justify-content-between px-4 ">
                <div><img src="/logo2.png" alt="Logo" style={{ height: '60px', width: '60px', objectFit: 'contain' }} className="me-2" /></div>
                <Nav>
                    <NavLink to="/profile" className={linkClass}><FaUser size={15} className="mx-1" /> Profile </NavLink>
                    <NavLink onClick={handleLogout} className={linkClass}> <FaInfoCircle size={15} className="mx-1" />Logout</NavLink>
                </Nav>
            </Navbar>
        </>
    )

}

export default Header;