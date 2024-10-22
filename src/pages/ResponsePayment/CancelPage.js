import React from 'react';
import { Link } from 'react-router-dom';
import './CancelPage.css'; // Add custom styles here

const CancelPage = () => {
  return (
    <div className="cancel-page">
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. If you wish, you can try again.</p>
      <Link to="/checkout">
        <button className="retry-btn">Retry Payment</button>
      </Link>
    </div>
  );
};

export default CancelPage;
