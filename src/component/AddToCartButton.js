import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Import the context
import { toast } from 'react-toastify';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Get addToCart function from context

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} has been added to your cart!`);
  };

  return (
    <button 
      onClick={handleAddToCart} 
      disabled={product.stock === 0} 
      style={{
        borderRadius: '10px',
        color: 'white',
        padding: '10px',
        backgroundColor: product.stock === 0 ? 'grey' : '#088395',
        cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
      }}
    >
      {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
