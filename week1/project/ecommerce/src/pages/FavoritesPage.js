import React, { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import Product from "../components/Product";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const favoriteProductsData = await Promise.all(
          favorites.map(async (id) => {
            const response = await fetch(
              `https://fakestoreapi.com/products/${id}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch product details");
            }
            return response.json();
          })
        );
        setFavoriteProducts(favoriteProductsData);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  return (
    <div className="favorites-page">
      <h2>Favorites</h2>
      <div className="favorite-products">
        {favoriteProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
