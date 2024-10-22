import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="table-auto w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Stock</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id || index}>
            <td className="border px-4 py-2">
              <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover" />
            </td>
            <td className="border px-4 py-2">{product.title}</td>
            <td className="border px-4 py-2">${product.price}</td>
            <td className="border px-4 py-2">{product.category}</td>
            <td className="border px-4 py-2">{product.stock}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(product.id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
