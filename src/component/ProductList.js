import React, { useState, useEffect } from 'react';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

  // Fetch products when page, rowsPerPage, or token changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products?page=${page}&limit=${rowsPerPage}`, 
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) throw new Error('Error fetching products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, rowsPerPage, token]);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('short_description', newProduct.short_description);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('stock', newProduct.stock);
    formData.append('image', newProduct.image);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding product');
      }

      setPage(1);
      setShowAddForm(false);
      setNewProduct({
        title: '',
        short_description: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null,
      });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error deleting product');
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="flex-grow p-8">
      {showAddForm ? (
        <form onSubmit={handleAddProduct} className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Short Description</label>
            <input
              type="text"
              className="w-full p-2 border"
              value={newProduct.short_description}
              onChange={(e) => setNewProduct({ ...newProduct, short_description: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              className="w-full p-2 border"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              className="w-full p-2 border"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              required
            >
              <option disabled>Select Category</option>
              {validCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {error && <p className="text-red-600">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              className="w-full p-2 border"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              className="w-full p-2 border"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-4">Products</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 text-white px-3 py-2 rounded mb-4"
          >
            Add Product
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && (
            <>
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
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border px-4 py-2">
                        <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover" />
                      </td>
                      <td className="border px-4 py-2">{product.title}</td>
                      <td className="border px-4 py-2">${product.price}</td>
                      <td className="border px-4 py-2">{product.category}</td>
                      <td className="border px-4 py-2">{product.stock}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <button onClick={handlePrevPage} disabled={page === 1} className="bg-gray-300 px-4 py-2 rounded">
                  Previous
                </button>
                <button onClick={handleNextPage} className="bg-gray-300 px-4 py-2 rounded ml-2">
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
