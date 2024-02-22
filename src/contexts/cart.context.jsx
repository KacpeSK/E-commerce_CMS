import { createContext, useReducer } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  decreaseItemQuantity: () => {},
  removeItemFromCart: () => {},
});

//ACTION TYPES

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  IS_CART_OPEN: "IS_CART_OPEN",
};

// INITIAL STATE

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

// REDUCER

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer.`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.IS_CART_OPEN });
  };

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
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseItemQuantity = (productToDec) => {
    setCartItems(decCartItemQuantity(cartItems, productToDec));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    decreaseItemQuantity,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
