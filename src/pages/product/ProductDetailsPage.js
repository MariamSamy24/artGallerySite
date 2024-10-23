import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../../component/AddToCartButton';


const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const apiUrl = process.env.REACT_APP_API_URL; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${id}`);
        debugger
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }



  return (
    <div className="container p-6 mx-auto">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="w-1/2 pl-8">
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-lg">{product.description}</p>

          <p className="mb-2 text-xl font-semibold">Price: ${product.price}</p>
          <p className={`text-lg mb-4 ${product.stock > 0 ? 'text-green-700' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <AddToCartButton product={product} className="add-to-cart-btn"/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
