import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmationPage.css';

function OrderConfirmationPage() {
  debugger
  const location = useLocation();
  const { orderId, total, paymentType } = location.state || {};

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p>Order ID: {orderId}</p>
      <p>Total Amount: ${total}</p>
      <p>Payment Method: {paymentType}</p>
      <p>Your order is being processed and you will receive a confirmation email shortly.</p>
    </div>
  );
}


export default OrderConfirmationPage;
