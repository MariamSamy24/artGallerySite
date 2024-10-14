import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductPage() {
  const { id } = useParams();   

  const [product, setProduct] = useState(null);

  useEffect(()   => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("/api/products/${id}");
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;   

  }

  return (
    <div>   

      {/* Product details */}
    </div>
  );
}

export default ProductPage;