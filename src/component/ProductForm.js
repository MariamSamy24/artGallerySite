import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAddProduct, token, onCancel, productId }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    short_description: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });

  const validCategories = ['painting', 'sculpture', 'photography'];

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          headers: {
            Authorization: token,
          },
        });
        const productData = await response.json();
        setNewProduct(productData);
      } else {
        setNewProduct({
          title: '',
          short_description: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image: null,
        });
      }
    };

    fetchProduct();
  }, [productId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    try {
      const method = productId ? 'PUT' : 'POST';
      const response = await fetch(`http://localhost:5000/api/products${productId ? `/${productId}` : ''}`, {
        method,
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const productData = await response.json();
      if (!response.ok) throw new Error(productData.message);
      onAddProduct(productData);
    } catch (error) {
      console.error('Error adding/updating product:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-3">
      <h3 className="text-xl font-bold mb-3">{productId ? 'Edit Product' : 'Add New Product'}</h3>

      <div className="mb-3">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full p-2 border"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Short Description</label>
        <input
          type="text"
          className="w-full p-2 border"
          value={newProduct.short_description}
          onChange={(e) => setNewProduct({ ...newProduct, short_description: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          className="w-full p-2 border"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Category</label>
        <select
          className="w-full p-2 border"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {validCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Stock</label>
        <input
          type="number"
          className="w-full p-2 border"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          className="w-full p-2 border"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
        />
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {productId ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
