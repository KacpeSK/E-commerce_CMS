import { useSelector } from "react-redux";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector.jsx";
import CategoryPreview from "../../components/category-preview/category-preview.component.jsx";
import Spinner from "../../components/spinner/spinner.component.jsx";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const isLoading = useSelector(selectCategoriesIsLoading);
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={products}
            />
          );
        })
      )}
    </>
  );
};

export default CategoriesPreview;
