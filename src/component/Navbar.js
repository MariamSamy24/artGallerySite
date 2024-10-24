import React, { useContext } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext'; // Import UserContext for login state
import './nav.css';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleOrderHistoryClick = () => {
        if (user) {
            navigate('/orders');
        } else {
            navigate('/login');
        }
    };

    const handleCheckoutClick = () => {
        if (user) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="nav">
            <div className="navbar-container">
                <div className="site-title">
                    <Link to="/">ART GALLERY</Link>
                </div>


                {
                    user !== null && user.name === "Admin" ? (
                        <ul className="navbar-links">
                            <li>
                                <Link to="/admin-panel">Admin Panel</Link>
                            </li>
                            {user ? (
                                    <>
                                        <li className="navbar-username">
                                            <a href='#'>Welcome, {user.name}</a>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="logout-button">
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                )}
                        </ul>
                    ) : (
                        <>
                            <ul className="navbar-links">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/shop">Shop</Link>
                                </li>
                                <li>
                                    <a onClick={handleCheckoutClick} style={{ cursor: 'pointer' }}>Checkout</a>
                                </li>
                                <li>
                                    <a onClick={handleOrderHistoryClick} style={{ cursor: 'pointer' }}>
                                        OrderHistory
                                    </a>
                                </li>
                                {user ? (
                                    <>
                                        <li className="navbar-username">
                                            <a href='#'>Welcome, {user.name}</a>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="logout-button">
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                )}
                            </ul>
                            <div className="navbar-actions">
                             
                                <div className="navbar-cart">
                                    <Link to="/cart">
                                        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                                        {cartItemsCount > 0 && (
                                            <span className="cart-count">{cartItemsCount}</span>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
                }


            </div>
        </nav>
    );
};

export default Navbar;
