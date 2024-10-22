import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [noOrdersMessage, setNoOrdersMessage] = useState('');  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchOrders = async (filters = {}) => {
        try {
            const token = localStorage.getItem('token');
            const { fromDate, toDate, status } = filters;

            const params = {
                fromDate: fromDate || '',
                toDate: toDate || '',
                status: status || '',
            };

            const response = await axios.get(`${apiUrl}/api/orders/user`, {
                headers: {
                    Authorization: `${token}`,
                },
                params: params,
            });

            if (!response.data.orders || response.data.orders.length === 0) {
                setNoOrdersMessage('No orders found for this user');  
                setFilteredOrders([]);
            } else {
                setNoOrdersMessage('');  
                setOrders(response.data.orders);  
                setFilteredOrders(response.data.orders); 
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setNoOrdersMessage('Error fetching orders'); 
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [apiUrl]);

    const handleSearch = () => {
        fetchOrders({
            fromDate: fromDate,
            toDate: toDate,
            status: status,
        });
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true); // Open the modal
    };

    const closeDetails = () => {
        setSelectedOrder(null);
        setIsModalOpen(false); // Close the modal
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className="order-history">
            <div className="search-bar">
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
                <select placeholder="Search by status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>

                <button onClick={handleSearch}>Search</button>
            </div>

            {noOrdersMessage ? (
                <div className="no-orders-message">{noOrdersMessage}</div>
            ) : (
            <table>
                <thead>
                    <tr>
                        <th>Order date</th>
                        <th>Total</th>
                        <th>Order status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{formatDate(order.order_date)}</td>
                            <td>{order.total_amount}</td>
                            <td>
                                {order.status}
                                <button onClick={() => handleViewDetails(order)}>View details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            
            {isModalOpen && selectedOrder && (
                <div className="modal-overlay" onClick={closeDetails}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Order Details</h2>
                            <button className="close-button" onClick={closeDetails}>X</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Date:</strong> {formatDate(selectedOrder.order_date)}</p>
                            <p><strong>Total:</strong> {selectedOrder.total_amount}</p>
                            <p><strong>Status:</strong> {selectedOrder.status}</p>
                            
                            <div className="order-items-container">
                                {selectedOrder.order_details.length > 0 ? (
                                    <table className="order-details-table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.order_details.map((detail, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={detail.imageUrl} alt={detail.title} className="order-item-image" />
                                                    </td>
                                                    <td>{detail.title}</td>
                                                    <td>{detail.quantity}</td>
                                                    <td>{detail.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No items in this order.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
