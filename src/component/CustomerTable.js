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
            <td className="border px-4 py-2 align-top">
              {customer.orders && customer.orders.length > 0 ? (
                <div className="space-y-4">
                  {customer.orders.map((order, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-sm">
                      <h4 className="font-semibold text-lg mb-2">Order ID: {order.id}</h4>
                      <p className="text-sm mb-2">
                        <strong>Total:</strong> {order.total_amount} <br />
                        <strong>Status:</strong> {order.status} <br />
                        <strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}
                      </p>
                      <h5 className="font-semibold text-md mb-2">Order Details:</h5>
                      <ul className="space-y-2">
                        {order.order_details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-4">
                            <img
                              src={detail.imageUrl}
                              alt={detail.title}
                              className="w-12 h-12 object-cover rounded-md shadow"
                            />
                            <div>
                              <p className="text-sm font-medium">{detail.title}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {detail.quantity} - Price: {detail.price}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No orders</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
