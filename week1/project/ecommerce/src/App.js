import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList"; // Import ProductList component
import ProductDetail from "./components/ProductDetail"; // Ensure correct path

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((categories) => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const fetchCategories = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  };

  const fetchProducts = async (category) => {
    setLoading(true);
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
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
      <div className="App">
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
          </Routes>
        )}
        <ProductList products={products} /> {/* Render ProductList */}
      </div>
    </Router>
  );
}

export default App;
