/*global browser*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

browser.runtime.onMessage.addListener((newProduct) => {
  console.log("PRODUCT RECEIVED: ");
  console.log(newProduct);
  // setProduct(newProduct);
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
