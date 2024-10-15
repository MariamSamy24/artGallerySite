import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch categories for category filter
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/products/search`, {
        params: {
          q: searchQuery,
          minprice: minPrice,
          maxprice: maxPrice,
          category: selectedCategory,
          page: currentPage,
          limit: process.env.REACT_APP_Paging || 10,
        },
      });

      const { products, totalPages } = response.data;
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(); 
  }, [searchQuery, minPrice, maxPrice, currentPage, selectedCategory]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} added to the cart!`);
  };


  const renderProducts = () => {
    if (products.length === 0) {
      return <p>No products found</p>;
    }
    return products.map((product) => (
      <div key={product.id} className="product-card">
        <img src={product.imageUrl} alt={product.title} className="product-image" />
        <h3>{product.title}</h3>
        <p>{product.short_description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    ));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {/* Page numbers */}
        {[...Array(totalPages)].map((x, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

  const renderLoading = () => {
    return loading ? <p>Loading...</p> : null;
  };

  return (
    <div className="product-page">
      <h1>Products</h1>

      <div className="filter-section">
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-filter" >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="price-filter">
          <label>Price Range:</label>
          <div className="price-slider-container">
            <div className="range-bar"
              style={{
                left: `${(minPrice / 5000) * 100}%`,
                width: `${((maxPrice - minPrice) / 5000) * 100}%`,
              }}>
            </div>
            <input type="range" className="price-slider" min="0" max="5000"
              value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="range" className="price-slider" min="0" max="5000"  value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
          <div className="price-range-values">
            <span>Min: ${minPrice}</span>
            <span>Max: ${maxPrice}</span>
          </div>
        </div>
      </div>

      {renderLoading()}

      <div className="product-list">{renderProducts()}</div>

      {renderPagination()}
    </div>
  );
}

export default ProductPage;