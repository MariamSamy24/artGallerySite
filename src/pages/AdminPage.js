import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchAdminData   
 = async () => {
      try {
        const productsResponse = await axios.get('/api/admin/products');
        const ordersResponse = await axios.get('/api/admin/orders');
        const customersResponse = await axios.get('/api/admin/customers');

        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      {/* Admin dashboard */}
    </div>
  );
}

export default AdminPage;