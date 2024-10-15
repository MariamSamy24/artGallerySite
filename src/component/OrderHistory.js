import React, { useState } from 'react';  
import './styles.css';  
import './OrderHistory.css';  

const OrderHistory = () => {  
    const [orders] = useState([  
        { date: '5/9/2022', total: '€4.094,99', status: 'Pending' },  
        { date: '5/9/2022', total: '€1.660,00', status: 'shipped' },  
        { date: '12/7/2021', total: '€147,59', status: 'shipped' },  
        { date: '6/14/2021', total: '€35,90', status: 'Pending' },  
        { date: '6/14/2021', total: '€35,90', status: 'shipped' },  
        { date: '5/18/2021', total: '€566,81', status: 'Pending' },  
        { date: '5/20/2021', total: '€159,48', status: 'delivered' },  
        { date: '5/18/2021', total: '€130,56', status: 'delivered' },  
        { date: '5/18/2021', total: '€378,26', status: 'delivered' },  
    ]);  

    const [searchTerm, setSearchTerm] = useState('');  
    const [fromDate, setFromDate] = useState('');  
    const [toDate, setToDate] = useState('');  
    const [showOrderHistory, setShowOrderHistory] = useState(false);  
    const [filteredOrders, setFilteredOrders] = useState(orders);  
    const [selectedOrder, setSelectedOrder] = useState(null); // حالة لتحديد الطلب المحدد  

    const handleSearch = () => {  
        const filtered = orders.filter(order => {  
            const orderDate = new Date(order.date);  
            const startDate = new Date(fromDate);  
            const endDate = new Date(toDate);  

            const dateMatch = (!fromDate || orderDate >= startDate) && (!toDate || orderDate <= endDate);  
            const statusMatch = !searchTerm || order.status.toLowerCase().includes(searchTerm.toLowerCase());  

            return dateMatch && statusMatch;  
        });  

        setFilteredOrders(filtered);  
    };  

    const toggleOrderHistory = () => {  
        setShowOrderHistory(!showOrderHistory);  
    };  

    const handleViewDetails = (order) => {  
        setSelectedOrder(order); // تعيين الطلب المختار  
    };  

    const closeDetails = () => {  
        setSelectedOrder(null); // إعادة تعيين الطلب المختار  
    };  

    return (  
        <div className="order-history">  
            <div className="user-icon" onClick={toggleOrderHistory} style={{ cursor: 'pointer' }}>  
                👤  
            </div>  
            <br /><br />  
            {showOrderHistory && (  
                <>  
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
                        <input  
                            type="text"  
                            placeholder="Search by status"  
                            value={searchTerm}  
                            onChange={(e) => setSearchTerm(e.target.value)}  
                        />  
                        <button onClick={handleSearch}>Search</button>  
                    </div>  
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
                                    <td>{order.date}</td>  
                                    <td>{order.total}</td>  
                                    <td>  
                                        {order.status}   
                                        <button onClick={() => handleViewDetails(order)}>View details</button>  
                                    </td>  
                                </tr>  
                            ))}  
                        </tbody>  
                    </table>  
                    <button className="show-more">Show next 10 orders</button>  
                </>  
            )}  
            {selectedOrder && (  
                <div className="order-details">  
                    <h2>Order Details</h2>  
                    <p>Date: {selectedOrder.date}</p>  
                    <p>Total: {selectedOrder.total}</p>  
                    <p>Status: {selectedOrder.status}</p>  
                    <button onClick={closeDetails}>Close</button>  
                </div>  
            )}  
        </div>  
    );  
};  

export default OrderHistory;