import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';
import AddToCartButton from '../../component/AddToCartButton';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

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
        <AddToCartButton product={product} />
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
    <div>
    <div className="product-page">
      <div className="filter-section">
        <input className='search'
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="category-filter">
          <h4>Category</h4>
          <label className="category-item">
            <input
              type="radio"
              value=""
              checked={selectedCategory === ''}
              onChange={() => setSelectedCategory('')}
            />
            All Categories
          </label>
          {categories.map((category, index) => (
            <label key={index} className="category-option">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              {category}
            </label>
          ))}
        </div>

        <div className="price-filter">
          <h4>Price Range</h4>
          <div className="price-slider-container">
            <div
              className="range-bar"
              style={{
                left: `${(minPrice / 5000) * 100}%`,
                width: `${((maxPrice - minPrice) / 5000) * 100}%`,
              }}
            ></div>

            <input
              type="range"
              className="price-slider"
              min="0"
              max="5000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="range"
              className="price-slider"
              min="0"
              max="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="price-range-values">
            <span>Min: ${minPrice}</span>
            <span>Max: ${maxPrice}</span>
          </div>
        </div>
      </div>

      <div className="product-list">
        {renderLoading()}
        {renderProducts()}
      </div>
    </div>
    {renderPagination()}

    </div>
  );
}

export default ProductPage;
