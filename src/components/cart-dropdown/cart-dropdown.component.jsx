import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <p>Hello from cart dropdown</p>
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
