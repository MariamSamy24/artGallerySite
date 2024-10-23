import React, { useState, useEffect } from 'react';
import CustomerTable from './CustomerTable';

const CustomerList = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomersWithOrders = async () => {
      setLoading(true);
      try {
        // Fetch customers
        const customersResponse = await fetch('http://localhost:5000/api/customers', {
          headers: {
            Authorization: token,
          },
        });
        if (!customersResponse.ok) throw new Error('Error fetching customers');
        const customerData = await customersResponse.json();

        // Fetch orders
        const ordersResponse = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: token,
          },
        });
        if (!ordersResponse.ok) throw new Error('Error fetching orders');
        const { orders } = await ordersResponse.json();

        // Map orders to the respective customers
        const customersWithOrders = customerData.map((customer) => {
          const customerOrders = orders.filter(order => order.user_id === customer.id);
          return { ...customer, orders: customerOrders };
        });

        setCustomers(customersWithOrders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomersWithOrders();
  }, [token]);

  return (
    <div className="flex-grow p-5">
      <h3 className="text-2xl font-bold mb-4">Customers</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && customers.length > 0 ? (
        <CustomerTable customers={customers} />
      ) : (
        <p>No customers found</p>
      )}
    </div>
  );
};

export default CustomerList;
