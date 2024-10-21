import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import './CheckoutForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('pk_test_9pePFBMMQhTe6BOWtatVfCNz');

function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleOrderCreation = async (paymentIntentId = null) => {
    debugger
    const ordersDetails = cart.map(item => ({
      product_id: item.id, 
      quantity: item.quantity,
      price: item.price,
  }));

    const orderData = {
      ordersDetails,
      user_name: name,
      user_Address: address,
      user_Telephone: telephone,
      payment_type: paymentMethod,
      paymentIntentId: paymentIntentId, 
    };

   
    const response = await axios.post(apiUrl +'/api/orders', orderData,
      { headers: { Authorization: `${token}` } }
    );
    clearCart(); 
    toast.success(`Order placed successfully`);
    return response.data;
  };

  const handleCashPayment = async () => {
    if (paymentMethod === 'Cash') {
      const orderDetails = await handleOrderCreation(); 
        debugger
      navigate('/order-confirmation', {
        state: { orderId: orderDetails.orderId, total: orderDetails.total, paymentType: 'Cash' },
      });
    }
  };

  const handleStripePayment = async () => {
    debugger
    if (paymentMethod === 'Stripe') {
      const cartItems = cart.map(item => ({
        product_id: item.id, 
        quantity: item.quantity,
        price: item.price,
    }));
  
      const response = await fetch( apiUrl+ '/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });
  
      const session = await response.json(); // Get the session ID from response
  
      // Redirect to Stripe Checkout
      const stripe = window.Stripe('pk_test_9pePFBMMQhTe6BOWtatVfCNz');
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id, // Use session ID here
      });
  
      if (error) {
        console.error("Error redirecting to checkout:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    if (paymentMethod === 'Cash') {
      handleCashPayment();
    } else if (paymentMethod === 'Stripe') {
      handleStripePayment();
    } else {
      toast.info(`Please select a payment method`);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="cart-review">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price} x {product.quantity} = ${product.price * product.quantity}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${calculateTotal()}</h3>
      </div>
{cart.length > 0 ?
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label htmlFor="telephone">Telephone:</label>
        <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />

        <label htmlFor="payment-method">Payment Method:</label>
        <select id="payment-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash on Delivery</option>
          <option value="Stripe">Credit Card (Stripe)</option>
        </select>

        <button type="submit">Place Order</button>
      </form>
      :""}
    </div>
  );
}

export default CheckoutForm;
