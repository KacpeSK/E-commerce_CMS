import { useDispatch } from "react-redux";
import { CART_ACTION_TYPES } from "./cart.types";

import { store } from "../store";

// insternal functions

const addCartItem = (cartItems, itemToAdd) => {
  const itemFound = cartItems.findIndex((item) => item.id === itemToAdd.id);
  if (itemFound > -1) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};

const decCartItemQuantity = (cartItems, itemToDec) => {
  if (itemToDec.quantity > 0) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToDec.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return cartItems;
  }
};

const removeCartItem = (cartItems, itemToRemove) => {
  const newCartItems = cartItems.filter((e) => e.id !== itemToRemove.id);
  return newCartItems;
};

// end of internal functions

export const setIsCartOpen = () => {
  return { type: CART_ACTION_TYPES.IS_CART_OPEN };
};

export const useCartAction = () => {
  const dispatch = useDispatch();

  const setCartItems = (newCartItems) => {
    const newCount = newCartItems.reduce((acc, e) => acc + e.quantity, 0);
    const newTotal = newCartItems.reduce(
      (acc, e) => acc + e.quantity * e.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCount,
        cartTotal: newTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const currentStore = store.getState();
    const currentCartItems = currentStore.cart.cartItems;
    setCartItems(addCartItem(currentCartItems, productToAdd));
  };

  const decreaseItemQuantity = (productToDec) => {
    const currentStore = store.getState();
    const currentCartItems = currentStore.cart.cartItems;
    setCartItems(decCartItemQuantity(currentCartItems, productToDec));
  };

  const removeItemFromCart = (productToRemove) => {
    const currentStore = store.getState();
    const currentCartItems = currentStore.cart.cartItems;
    setCartItems(removeCartItem(currentCartItems, productToRemove));
  };

  return { addItemToCart, decreaseItemQuantity, removeItemFromCart };
};
