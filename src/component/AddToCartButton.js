import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AddToCartButton = ({ product }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const getCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const addToCart = () => {
    const currentCart = getCartFromLocalStorage();

    const existingProduct = currentCart.find((item) => item.id === product.id);
    let updatedCart;
    
    if (existingProduct) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);

    toast.success(`${product.title} has been added to your cart!`);
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
