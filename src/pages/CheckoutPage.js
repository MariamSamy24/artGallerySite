import React, { useEffect, useState } from 'react';
import CheckoutForm from '../component/CheckoutForm';

function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);


  return (
    <div>
      <h2>Checkout</h2>
      <h3>User Information</h3>
      <p>Name: {user?.name}</p>
      <p>ID: {user?.id}</p>
      <h3>Cart Items</h3>
      <ul>
        {(Array.isArray(cartItems) ? cartItems : []).map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <CheckoutForm  />
    </div>
  );
}

export default CheckoutPage;
