import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";
import regularHeartIcon from "../assets/heart-regular.svg";
import solidHeartIcon from "../assets/heart-solid.svg";

const ProductList = ({ products }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorited = (productId) => favorites.includes(productId);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </Link>
          <div className="product-details">
            <Link to={`/product/${product.id}`}>
              <h3 className="product-title">{product.title}</h3>
            </Link>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
          </div>
          <button onClick={() => toggleFavorite(product.id)}>
            {isFavorited(product.id) ? (
              <img src={solidHeartIcon} alt="Solid Heart" />
            ) : (
              <img src={regularHeartIcon} alt="Regular Heart" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
