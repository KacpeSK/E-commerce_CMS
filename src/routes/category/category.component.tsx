/* eslint-disable */
// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import CategoriesContext from "../../contexts/categories.context";
import { Title, CategoryContainer } from "./category.styles";
import ProductCard from "../../components/product-card/product-card.components";

const Category = ({}) => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
