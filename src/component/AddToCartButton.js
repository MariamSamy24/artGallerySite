import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext'; 
import { toast } from 'react-toastify';

const AddToCartButton = ({ product }) => {
  const { cart, addToCart } = useContext(CartContext); 
  const [isDisabled, setIsDisabled] = useState(false);



  useEffect(() => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct && existingProduct.quantity >= product.stock) {
      setIsDisabled(true); 
    } else {
      setIsDisabled(false); 
    }
  }, [cart, product]);

  const handleAddToCart = () => {
    if (!isDisabled) {
      addToCart(product);
      toast.success(`${product.title} has been added to your cart!`);
    }
  };

  return (
    <button 
      onClick={handleAddToCart} 
      disabled={isDisabled ||product.stock === 0} 
      style={{
        borderRadius: '10px',
        color: 'white',
        padding: '10px',
        backgroundColor: product.stock === 0 ? 'grey' : isDisabled ? "#e74c3c": '#088395',
        cursor: isDisabled? 'not-allowed' : 'pointer',
      }}
    >
      {product.stock === 0 ? 'Sold Out' : isDisabled ? 'Max Reached' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;