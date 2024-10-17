import React, { useState } from 'react';
import './CheckoutForm.css';

function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, address, telephone, paymentMethod });
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <label htmlFor="telephone">Telephone:</label>
      <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
      <label htmlFor="payment-method">Payment Method:</label>
      <select id="payment-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required><br/>
        <option value="">Select a payment method</option>
        {/* Add options for available payment methods */
        <option value="Cash">Cash</option>}
       { <option value="Credit Cards">Credit Cards</option>}
      </select><br/><br/><br/><br/><br/>
      <button type="submit">Place Order</button>
    </form>
  );
}

export default CheckoutForm;