import { createSlice } from "@reduxjs/toolkit";

// cartItems FUNCTIONS

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

// INITIAL STATE

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

// REDUCER

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = !state.isCartOpen;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    decreaseItemQuantity(state, action) {
      state.cartItems = decCartItemQuantity(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
