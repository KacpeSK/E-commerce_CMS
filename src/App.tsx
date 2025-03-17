/* eslint-disable */
// @ts-nocheck
import { Routes, Route } from "react-router";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop.component";

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
            path="auth"
            element={<Authentication />}
          />
        </Route>
      </Routes>
    </section>
  );
};

export default App;
