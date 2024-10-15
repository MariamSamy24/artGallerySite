import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Clear the cart from localStorage
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      return <p>Your cart is empty</p>;
    }

    return cart.map((product) => (
      <div key={product.id} className="cart-item">
        <p>{product.title}</p>
        <p>Price: ${product.price}</p>
        <button onClick={() => removeFromCart(product.id)}>Remove</button>
      </div>
    ));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart">{renderCartItems()}</div>
      {cart.length > 0 && (
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartPage;