import { useDispatch } from "react-redux";

import {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../store/cart/cart.reducer";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const decreaseItemHandler = () => dispatch(decreaseItemQuantity(cartItem));
  const increaseItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <>
      <div className="checkout-item-container">
        <div className="image-container">
          <img
            src={imageUrl}
            alt={name}
          />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div
            className="arrow"
            onClick={decreaseItemHandler}
          >
            &#10094;
          </div>
          <span className="value">{quantity}</span>
          <div
            className="arrow"
            onClick={increaseItemHandler}
          >
            &#10095;
          </div>
        </span>

        <span className="price">
          {price}€ <span className="sub-total">({price * quantity}€)</span>
        </span>
        <div
          className="remove-button"
          onClick={removeItemHandler}
        >
          &#10005;
        </div>
      </div>
    </>
  );
};

export default CheckoutItem;
