import React, { useEffect, useState } from 'react';
import CheckoutForm from '../component/CheckoutForm';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);

 
  return (
    <div>
      <ul>
        {cartItems.map((item) => (
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
