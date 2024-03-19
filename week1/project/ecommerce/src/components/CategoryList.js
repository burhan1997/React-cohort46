import React from "react";
import "../CategoryList.css";

const CategoryList = ({ categories, onSelectCategory, selectedCategory }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={
              selectedCategory === category
                ? "category-button selected"
                : "category-button"
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
