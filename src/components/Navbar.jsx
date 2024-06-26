import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from './AuthContext'; // Import AuthContext

const Navbar = () => {
    const navigate = useNavigate();
    const state = useSelector(state => state.handleCart);
    const authContext = useContext(AuthContext); // Use useContext to access AuthContext

    const handleLogout = () => {
        authContext.logout(); 
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">ELECTRONICS BY SK </NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        {authContext.loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/product">Components</NavLink>
                                </li>
                                
                            </>
                        ) : null}
                        <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                    </ul>
                    <div className="buttons text-center">
                        {authContext.loggedIn ? (
                            <button onClick={handleLogout} className="btn btn-outline-dark m-2">
                                <i className="fa fa-sign-out-alt mr-1"></i> Logout
                            </button>
                        ) : (
                            <>
                                <NavLink to="/" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-sign-out-alt mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>
                            </>
                        )}
                        {authContext.loggedIn && (
                            <>
                                <NavLink to="/name" className="btn btn-outline-dark m-2">
                                    <i className="bi bi-person-circle"></i> Profile
                                </NavLink>
                                <NavLink to="/cart" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
