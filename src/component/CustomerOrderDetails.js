import React, { useState } from 'react';

const CustomerOrderDetails = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-lg">Order ID: {order.id}</h4>
            <button
              onClick={() => toggleOrderDetails(order.id)}
              className="text-slate-100 hover:text-slate-300 font-medium focus:outline-none"
            >
              {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          <p className="text-sm mb-2">
            <strong>Total:</strong> {order.total_amount} <br />
            <strong>Status:</strong> {order.status} <br />
            <strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}
          </p>
          
          {expandedOrderId === order.id && (
            <div>
              <h5 className="font-semibold text-md mb-2">Order Details:</h5>
              <ul className="space-y-2">
                {order.order_details.map((detail, idx) => (
                  <li key={idx} className="flex items-center space-x-4">
                    <img
                      src={detail.imageUrl}
                      alt={detail.title}
                      className="w-12 h-12 object-cover rounded-md shadow"
                    />
                    <div>
                      <p className="text-sm font-medium">{detail.title}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {detail.quantity} - Price: {detail.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerOrderDetails;
