import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import Pagination from './Pagination';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    short_description: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null,
  });

  const [nextPageHasProducts, setNextPageHasProducts] = useState(false);

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
        const nextPageResponse = await fetch(
          `http://localhost:5000/api/products?page=${page + 1}&limit=${rowsPerPage}`, 
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const nextPageData = await nextPageResponse.json();
        setNextPageHasProducts(nextPageData.products.length > 0);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, rowsPerPage, token, refresh]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowAddForm(false);
    setCurrentProductId(null);
    setNewProduct({
      title: '',
      short_description: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: null,
    });
    setRefresh((prev) => !prev);
  };

  const handleEditProduct = async (productId) => {
    setCurrentProductId(productId);
    setShowAddForm(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) throw new Error('Error deleting product');
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex-grow p-5">
      {showAddForm ? (
        <ProductForm 
          onAddProduct={handleAddProduct} 
          token={token} 
          onCancel={() => {
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
          }} 
          productId={currentProductId}
          setNewProduct={setNewProduct}
        />
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-4">Products</h3>
          <button
            onClick={() => {
              setShowAddForm(true);
              setCurrentProductId(null);
              setNewProduct({
                title: '',
                short_description: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                image: null,
              });
            }}
            className="bg-blue-500 text-white px-3 py-2 rounded mb-4"
          >
            Add Product
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && (
            <>
              <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
              <Pagination 
                page={page} 
                setPage={setPage} 
                hasProducts={nextPageHasProducts}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
