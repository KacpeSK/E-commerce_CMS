import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context.jsx";
import ProductCard from "../../components/product-card/product-card.component.jsx";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <>
      <div className="products-container">
        {products ? (
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
              />
            );
          })
        ) : (
          <p>No products</p>
        )}
      </div>
    </>
  );
};

export default Shop;