import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminOrderDetails from './AdminOrderDetails'
  const AdminOrderList = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(process.env.REACT_APP_Paging || 10); 
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/orders/search?q=${searchTerm}&page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, token, orders]);

  const handleSearch = () => {
    setPage(1); 
    fetchOrders(searchTerm, 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
};

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId); 
  };

  const handleUpdateOrderStatus = (updatedOrder) => {
    debugger
    setOrders(orders.map(order => 
      order.id === updatedOrder.order.id ? updatedOrder.order : order
    ));
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">All Orders</h1>
      
      <div className="flex items-center w-full mb-4">
        <input
          type="text"
          className="flex-grow p-2 mr-2 border rounded-lg"
          placeholder="Search by order number or customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-md table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Order Number</th>
            <th className="px-4 py-2">Order Date</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Order Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2 border">{order.id}</td>
              <td className="px-4 py-2 border">{formatDate(order.order_date)}</td>
              <td className="px-4 py-2 border">{order.name}</td>
              <td className="px-4 py-2 border">{order.total_amount}</td>
              <td className="px-4 py-2 border">{order.status}</td>
              <td className="px-4 py-2 border">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                  onClick={() => handleViewDetails(order.id)} 
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 bg-gray-300 rounded-lg ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        
        <span className="text-lg">{`Page ${page} of ${totalPages}`}</span>
        
        <button
          className={`px-4 py-2 bg-gray-300 rounded-lg ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {selectedOrderId && (
      <AdminOrderDetails
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        token={token}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />
    )}
    </div>
  );
};

export default AdminOrderList;
