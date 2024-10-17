import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartPage.css';

function CartPage() {
  // Access global cart, updateCartQuantity, and removeFromCart from CartContext
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Render cart items
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
          {/* Decrease and Increase quantity buttons */}
          <button onClick={() => updateCartQuantity(product.id, product.quantity - 1)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => updateCartQuantity(product.id, product.quantity + 1)}>+</button>
        </div>

        {/* Total for each product */}
        <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>

        {/* Remove item from cart */}
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
