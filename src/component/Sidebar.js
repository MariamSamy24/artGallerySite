import React, { useContext } from 'react';
import AdminContext from './AdminContext';
import { FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(AdminContext);

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
      </div>
      <ul className="flex-grow mt-8">
        <li>
          <button
            className={`flex items-center w-full p-4 text-left hover:bg-gray-700 rounded-none ${
              activeTab === 'products' ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveTab('products')}
          >
            <FaBox className="mr-3" /> Products
          </button>
        </li>
        <li>
          <button
            className={`flex items-center w-full p-4 text-left hover:bg-gray-700 rounded-none ${
              activeTab === 'orders' ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart className="mr-3" /> Orders
          </button>
        </li>
        <li>
          <button
            className={`flex items-center w-full p-4 text-left hover:bg-gray-700 rounded-none ${
              activeTab === 'customers' ? 'bg-blue-600' : ''
            }`}
            onClick={() => setActiveTab('customers')}
          >
            <FaUsers className="mr-3" /> Customers
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
