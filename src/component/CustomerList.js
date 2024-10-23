import React, { useState, useEffect } from 'react';
import CustomerTable from './CustomerTable';

const CustomerList = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/customers', {
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) throw new Error('Error fetching customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
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
