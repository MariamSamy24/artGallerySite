import React from 'react';
import CustomerOrderDetails from './CustomerOrderDetails';

const CustomerTable = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return <p>No customers found</p>;
  }

  return (
    <table className="table-auto w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Order History</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="border px-4 py-2">{customer.name}</td>
            <td className="border px-4 py-2">{customer.email}</td>
            <td className="border px-4 py-2">
              {customer.orders && customer.orders.orders && customer.orders.orders.length > 0 ? (
                <CustomerOrderDetails orders={customer.orders.orders} />
              ) : (
                <p>No orders</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
