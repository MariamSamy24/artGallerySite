import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CheckoutForm from '../component/CheckoutForm';

function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('/api/payment-methods');
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchUserData();
    fetchCartItems();
    fetchPaymentMethods();
  }, []);

  const handleCheckout = async (checkoutData) => {
    try {
      const response = await axios.post('/api/checkout', checkoutData);

      // Handle successful checkout
      console.log('Checkout successful:', response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      {/* <h2>Checkout</h2>
      <h3>User Information</h3>
      <p>Name: {user?.name}</p>
      <p>ID: {user?.id}</p>
      <h3>Cart Items</h3> */}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <CheckoutForm onSubmit={handleCheckout} />
      {error && <p>{error}</p>}
    </div>
  );
}

export default CheckoutPage;