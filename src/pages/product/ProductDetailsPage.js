import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../../component/AddToCartButton';


const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${id}`);
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
      <div className="flex flex-col md:flex-row">
        <div className="w-full mb-6 md:w-1/2 md:mb-0">
          <img
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">{product.name}</h1>
          <p className="mb-4 text-base md:text-lg">{product.description}</p>

          <p className="mb-2 text-lg font-semibold md:text-xl">Price: ${product.price}</p>
          <p className={`text-lg mb-4 ${product.stock > 0 ? 'text-green-700' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <div className="mt-4">
            <AddToCartButton product={product} className="add-to-cart-btn"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
