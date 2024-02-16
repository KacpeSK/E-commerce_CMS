import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button from "../../components/button/button.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-item-container">
      {cartItems.map((item) => {
        return (
          <CheckoutItem
            key={item.id}
            cartItem={item}
          />
        );
      })}
      <Button>Pay</Button>
      <h2>Total: {cartTotal}€</h2>
    </div>
  );
};

export default Checkout;

const removeItem = () => {
  console.log("remove Item");
};

const CheckoutItem = ({ cartItem }) => {
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
