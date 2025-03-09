/* eslint-disable */
// @ts-nocheck
import CategoryItem from "../category-items/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory">
      {categories.map((category) => {
        return (
          <CategoryItem
            key={category.id}
            category={category}
          />
        );
      })}
    </div>
  );
};

export default Directory;
