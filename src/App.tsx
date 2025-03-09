/* eslint-disable */
// @ts-nocheck
import { Routes, Route } from "react-router";

import "./App.scss";
import Home from "./routes/home/home.components";

const App = () => {
  return (
    <section>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
      </Routes>
    </section>
  );
};

export default App;

