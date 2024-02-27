import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/categories-preview.components";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(setCategories(categoriesArray));
      } catch (error) {
        console.error("Error loading CategoriesMap:", error);
      }
    };

    getCategoriesMap();
  }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={<CategoriesPreview />}
        />
        <Route
          path=":category"
          element={<Category />}
        />
      </Routes>
    </>
  );
};

export default Shop;
