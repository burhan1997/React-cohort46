import React, { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import regularHeartIcon from "../assets/heart-regular.svg";
import solidHeartIcon from "../assets/heart-solid.svg";

const Product = ({ product }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorited = favorites.includes(product.id);

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => toggleFavorite(product.id)}>
        {isFavorited ? (
          <img src={solidHeartIcon} alt="Solid Heart" />
        ) : (
          <img src={regularHeartIcon} alt="Regular Heart" />
        )}
      </button>
    </div>
  );
};

export default Product;
