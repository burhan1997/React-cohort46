import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <div className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
