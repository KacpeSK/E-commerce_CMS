//import { compose, createStore, applyMiddleware } from "redux";

import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: rootReducer,
  // if we add in a middleware we overide the default middlewares that come with toolkit as Thunk and...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWares),
});

/*
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistentReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistentReducer,
  undefined,
  composeEnhancers
);

export const persistor = persistStore(store);
*/
