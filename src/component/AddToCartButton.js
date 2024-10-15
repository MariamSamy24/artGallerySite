import React, { useState, useEffect } from 'react';

const AddToCartButton = ({ product }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    alert(`${product.title} added to the cart!`);
  };

  return (
    <button 
      onClick={addToCart} 
      disabled={product.stock === 0} 
      style={{
        borderRadius:'10px',
        color: 'white',
        padding:'10px',
        backgroundColor: product.stock === 0 ? 'grey' : '#088395', 
        cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
      }}
    >
      {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
