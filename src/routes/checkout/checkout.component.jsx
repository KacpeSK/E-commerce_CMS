import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button from "../../components/button/button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return (
          <CheckoutItem
            key={item.id}
            cartItem={item}
          />
        );
      })}
      <h2 className="total">Total: {cartTotal}€</h2>
      <Button>Pay</Button>
    </div>
  );
};

export default Checkout;

const CheckoutItemOld = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, decreaseItemQuantity, removeItemFromCart } =
    useContext(CartContext);
  return (
    <>
      <div className="checkout-item">
        <img
          src={imageUrl}
          alt={name}
        />
        <span className="name">{name}</span>
        <span
          onClick={() => {
            decreaseItemQuantity(cartItem);
          }}
        >
          -
        </span>
        <span>{quantity}</span>
        <span
          onClick={() => {
            addItemToCart(cartItem);
          }}
        >
          +
        </span>
        <span className="price">{price}€</span>
        <span>SubTotal: {price * quantity} €</span>
        <span
          onClick={() => {
            removeItemFromCart(cartItem);
          }}
        >
          X
        </span>
      </div>
    </>
  );
};
