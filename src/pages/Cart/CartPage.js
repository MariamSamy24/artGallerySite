import React, { useState, useEffect } from 'react';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  
  const updateQuantity = (productId, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Clear from localStorage
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  const renderCartItems = () => {
    if (cart.length === 0) {
      return <p>Your cart is empty</p>;
    }

    return cart.map((product) => (
      <div key={product.id} className="cart-item">
        <div className="product-info">
          <img src={product.imageUrl} alt={product.title} className="cart-item-image" />
          <div className="product-details">
            <p>{product.title}</p>
            <p>Price: ${product.price}</p>
          </div>
        </div>

        <div className="quantity-control">
          <button onClick={() => updateQuantity(product.id, 'decrease')}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => updateQuantity(product.id, 'increase')}>+</button>
        </div>

        <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>

        <button className="remove-btn" onClick={() => removeFromCart(product.id)}>
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart">{renderCartItems()}</div>
      {cart.length > 0 && (
        <div className="total">
          <h2>Total: ${calculateTotal()}</h2>
        </div>
      )}

      {cart.length > 0 && (
        <button className="clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default CartPage;
