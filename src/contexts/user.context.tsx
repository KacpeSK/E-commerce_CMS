/* eslint-disable */
// @ts-nocheck
import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as actual value you want to access
const UserContext = createContext({
  currentUser: undefined,
  setCurrentUser: () => undefined,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user && user.displayName) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user ? user : undefined);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
