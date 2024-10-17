import React, { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import './nav.css'; // Make sure to add this file for styles

const Navbar = () => {
    const { cart } = useContext(CartContext);

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);


    return (
        <nav className="nav">
            <div className="navbar-container">
                <div className="site-title">
                    <Link to="/">ART GALLERY</Link>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/checkout">Checkout</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                <div className="navbar-actions">
                    <input type="text" placeholder="Search..." className="navbar-search" />
                    <div className="navbar-cart">
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                            {cartItemsCount > 0 && (
                                <span className="cart-count">{cartItemsCount}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
