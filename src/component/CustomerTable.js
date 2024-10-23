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
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="border px-4 py-2">{customer.name}</td>
            <td className="border px-4 py-2">{customer.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
