import React from 'react';

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
              {customer.orders && customer.orders.length > 0 ? (
                <ul>
                  {customer.orders.map((order, index) => (
                    <li key={index}>
                      Order ID: {order.id}, Total: {order.total_amount}, Date: {new Date(order.order_date).toLocaleDateString()}, Status: {order.status}
                    </li>
                  ))}
                </ul>
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
