/* eslint-disable */
// @ts-nocheck
import { useContext } from "react";
import { Outlet, Link } from "react-router";
import UserContext from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const HandleSignOut = async () => {
    const response = await signOutUser();
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to={"/"}>
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to={"/shop"}>SHOP</NavLink>
          {currentUser ? (
            <NavLink
              as="span"
              onClick={HandleSignOut}
            >
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to={"/auth"}>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CardDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;

const Logo = () => {
  return (
    <svg
      width="50px"
      height="39px"
      viewBox="0 0 50 39"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {/* Generator: Sketch 53.2 (72643) - https://sketchapp.com */}
      <title>Group</title>
      <desc>Created with Sketch.</desc>
      <g
        id="WiP"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Artboard"
          transform="translate(-90.000000, -38.000000)"
        >
          <g
            id="Group"
            transform="translate(90.000000, 38.000000)"
          >
            <polygon
              id="Rectangle"
              fill="#808282"
              points="3 14 25 26.5 47 14 40.855176 39 9.08421785 39"
            ></polygon>
            <polygon
              id="Triangle"
              fillOpacity="0.262838724"
              fill="#101A1A"
              points="25 8 40 39 10 39"
            ></polygon>
            <circle
              id="Oval"
              fill="#5E6363"
              cx="2"
              cy="9"
              r="2"
            ></circle>
            <circle
              id="Oval"
              fill="#5E6363"
              cx="25"
              cy="2"
              r="2"
            ></circle>
            <circle
              id="Oval"
              fill="#5E6363"
              cx="48"
              cy="9"
              r="2"
            ></circle>
          </g>
        </g>
      </g>
    </svg>
  );
};
