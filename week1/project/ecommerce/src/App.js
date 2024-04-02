import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import FavoritesPage from "./pages/FavoritesPage"; // Import FavoritesPage
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Navbar from "./components/Navbar"; // Import Navbar component

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  const fetchProducts = async (category) => {
    setLoading(true);
    let url = apiUrl;
    if (category) {
      url = `${apiUrl}/category/${category}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  return (
    <Router>
      <FavoritesProvider>
        <div className="App">
          <Navbar /> {/* Render the Navbar component */}
          {error && <p>Error: {error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <CategoryList
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                    selectedCategory={selectedCategory}
                  />
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          )}
          <ProductList products={products} />
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
