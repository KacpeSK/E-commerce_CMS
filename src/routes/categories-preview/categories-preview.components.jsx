import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector.jsx";
import CategoryPreview from "../../components/category-preview/category-preview.component.jsx";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={products}
          />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
