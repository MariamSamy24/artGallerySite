import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import AdminOrderList from '../pages/AdminOrder/AdminOrderList';
import AdminContext from './AdminContext';

const AdminPanel = () => {
  const token = localStorage.getItem('token');
  const { activeTab } = useContext(AdminContext);

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-100">
        {token && (
          <div className='flex'>
            <Sidebar />
            {activeTab === 'products' && <ProductList token={token} />}
            {activeTab === 'orders' && <AdminOrderList token={token} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
