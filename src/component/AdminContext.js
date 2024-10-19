import React, { createContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AdminContext.Provider value={{ activeTab, setActiveTab, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
