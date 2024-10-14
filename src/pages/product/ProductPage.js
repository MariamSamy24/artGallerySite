import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchProducts = async () => {
    try {
      debugger
      const response = await axios.get(`${apiUrl}/api/products/search`, {
        params: {
          q: searchQuery,
          minprice: minPrice,
          maxprice: maxPrice,
          page: currentPage,
          limit: process.env.REACT_APP_Paging || 10,
          
        }
      });
      
      const { products, totalPages,totalProducts } = response.data;
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => { fetchProducts() }, [searchQuery, minPrice, maxPrice, currentPage]);


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

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    );
  };

  const renderLoading = () => {
    return loading ? <p>Loading...</p> : null;
  };return (
    <div className="product-page">
      <h1>Products</h1>
      
      <div className="filter-section">
        <input type="text" placeholder="Search..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        <input type="number" placeholder="Min Price" value={minPrice}  
          onChange={(e) => setMinPrice(e.target.value)}/>
        <input type="number" placeholder="Max Price" value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)} />
        <button onClick={fetchProducts}>Apply Filters</button>
      </div>

      {renderLoading()}

      <div className="product-list">{renderProducts()}</div>

      {renderPagination()}
    </div>
  );
}

export default ProductPage;