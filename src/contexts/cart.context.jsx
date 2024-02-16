import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseItemQuantity = (productToDec) => {
    setCartItems(decCartItemQuantity(cartItems, productToDec));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, e) => acc + e.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc, e) => acc + e.quantity * e.price, 0));
  }, [cartItems]);

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
