import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import allCategories from "./fake-data/all-categories";
import allProducts from "./fake-data/all-products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <CategoryList
        categories={allCategories}
        onSelectCategory={handleCategorySelect}
      />
      <ProductList products={allProducts} selectedCategory={selectedCategory} />
    </div>
  );
}

export default App;
