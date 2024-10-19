import React from 'react';
import Sidebar from './Sidebar';
import ProductList from './ProductList';

const AdminPanel = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow bg-gray-100">
        {token && (
          <div className='flex'>
            <Sidebar />
            <ProductList token={token} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
