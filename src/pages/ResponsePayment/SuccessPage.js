import React, { useEffect, useState ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext';

const SuccessPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [orderStatus, setOrderStatus] = useState(null); 
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const createOrder = async () => {
      try {
        debugger
        const orderData = JSON.parse(localStorage.getItem('orderData'));
        
        if (!orderData) {
          throw new Error('Cart information is missing');
        }

        const response = await axios.post(apiUrl +'/api/orders', orderData,
            { headers: { Authorization: `${token}` } }
          );

        if (response.status === 201) {
          debugger
          toast.success(`Order placed successfully`);
          setOrderStatus('success');
          localStorage.removeItem('orderData');
          clearCart(); 
        } else {
          throw new Error('Order creation failed');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        setOrderStatus('error');
      }
    };

    createOrder();
  }, []);

  const handleViewOrders = () => {
    navigate('/orders');
  };

  return (
    <div className="success-page">
      {orderStatus === 'success' ? (
        <>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your order has been placed successfully.</p>
          <button className="view-orders-btn" onClick={handleViewOrders}>
            View Your Orders
          </button>
        </>
      ) : orderStatus === 'error' ? (
        <>
          <h1>Something went wrong!</h1>
          <p>There was an issue creating your order. Please contact support.</p>
        </>
      ) : (
        <h1>Processing your order...</h1>
      )}
    </div>
  );
};

export default SuccessPage;
