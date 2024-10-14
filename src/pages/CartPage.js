import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(()   => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);   

      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      {/* Cart items */}
    </div>
  );
}

export default CartPage;