import CategoryItem from "../category-item/category-item";

import "./category-menu-styles.scss";

const CategoryMenu = ({ categories }) => {
  return (
    <div className="category-menu">
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

export default CategoryMenu;
