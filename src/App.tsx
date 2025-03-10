/* eslint-disable */
// @ts-nocheck
import { Routes, Route } from "react-router";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

import "./App.scss";
import Home from "./routes/home/home.components";

const App = () => {
  return (
    <section>
      <Routes>
        <Route
          path="/"
          element={<Navigation />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="shop"
            element={<Shop />}
          />
          <Route
            path="signIn"
            element={<SignIn />}
          />
        </Route>
      </Routes>
    </section>
  );
};

export default App;

const Shop = () => {
  return (
    <>
      <p>I am SHOP :</p>
    </>
  );
};

