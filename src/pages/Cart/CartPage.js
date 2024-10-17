import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartPage.css';

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useContext(CartContext);

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
          <button onClick={() => updateCartQuantity(product.id, product.quantity - 1)}
            disabled={product.quantity === 1}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => updateCartQuantity(product.id, product.quantity + 1)}
             disabled={product.quantity >= product.stock}>+</button>
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
