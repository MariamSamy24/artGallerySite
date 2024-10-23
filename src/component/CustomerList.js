import React, { useState, useEffect } from 'react';
import CustomerTable from './CustomerTable';

const CustomerList = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchCustomersWithOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/customers`, {
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) throw new Error('Error fetching customers');
        const customerData = await response.json();

        const customersWithOrders = await Promise.all(
          customerData.map(async (customer) => {
            const ordersResponse = await fetch(
              `${apiUrl}/api/orders/user?user_id=${customer.id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (!ordersResponse.ok) {
              throw new Error(`Error fetching orders for customer ${customer.id}`);
            }
            const orders = await ordersResponse.json();
            return { ...customer, orders };
          })
        );

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
