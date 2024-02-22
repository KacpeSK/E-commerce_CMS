import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoriesMap) return; // Check if categoriesMap is available

    // Ensure the category exists in categoriesMap before setting products
    if (categoriesMap[category]) {
      setProducts(categoriesMap[category]);
    } else {
      // Handle non-existent category (redirect, show a message, etc.)
      console.error(`Category "${category}" not found`);
    }
  }, [category, categoriesMap]);

  return (
    <>
      <div className="category-page-container">
        <h2 className="category-container-title">{category.toUpperCase()}</h2>
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Category;
