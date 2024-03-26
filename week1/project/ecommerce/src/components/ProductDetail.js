import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductDetails(id)
      .then((product) => {
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const fetchProductDetails = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    return response.json();
  };

  return (
    <div className="product-detail">
      {loading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.title} />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
