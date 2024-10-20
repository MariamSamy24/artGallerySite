import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminOrderDetails = ({ orderId, onClose,token }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState('');
  
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders/${orderId}`,{
            headers: {
                Authorization: `${token}`,
            },
        });
        setOrderDetails(response.data);
        setStatus(response.data.status);  
      } catch (error) {
        console.error('Error fetching order details', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${apiUrl}/api/orders/${orderId}`, {  status },
        { headers: { Authorization: `${token}` } } );  
      const updatedOrder = { ...orderDetails, status };
      setOrderDetails(updatedOrder);
      toast.success("Order update Status Successfully!");
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Order Details</h2>
        
        <p><strong>Customer Name:</strong> {orderDetails.order.user_name}</p>
        <p><strong>Customer Telephone:</strong> {orderDetails.order.user_Telephone}</p>
        <p><strong>Customer Address:</strong> {orderDetails.order.user_Address}</p>
        <p><strong>Total Amount:</strong> {orderDetails.order.total_Amount}</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Purchased Products</h3>
          <ul className="mt-2">
            {orderDetails.orders_details && orderDetails.orders_details.map(product => (
              <li key={product.id} className="py-2 border-b">
                <span>{product.title} (Qty: {product.quantity}) - ${product.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Order Status</h3>
          <div className="flex items-center mt-2 space-x-2">
            <select
              className="p-2 border rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              className="px-4 py-2 text-white bg-green-500 rounded-lg"
              onClick={handleUpdateStatus}
            >
              Update Status
            </button>
          </div>
        </div>

        <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetails;

