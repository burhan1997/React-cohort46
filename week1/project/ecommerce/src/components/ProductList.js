import React from "react";

// my purpose in this block is to filter the list of products based on a selected category. normalizeCategory function takes a category string as input and converts it to lowercase. It ensures consistency in the comparison of category strings.
const ProductList = ({ products, selectedCategory }) => {
  const normalizeCategory = (category = "") => category.toLowerCase();

  const selectedCategoryNormalized = selectedCategory
    ? selectedCategory.toLowerCase().replace("fake: ", "")
    : "";

  const filteredProducts = products.filter((product) => {
    const productCategory = normalizeCategory(product.category);
    return productCategory.includes(selectedCategoryNormalized);
  });


  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
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
      ))}
    </div>
  );
};

export default ProductList;
