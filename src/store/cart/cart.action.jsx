import { CART_ACTION_TYPES } from "./cart.types";

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};

export const decreaseItemQuantity = (cartItems, productToDec) => {
  const newCartItems = decCartItemQuantity(cartItems, productToDec);
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems };
};
