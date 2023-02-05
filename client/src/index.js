import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CartProvider } from "./components/CartContext";
import { ProductProvider } from "./components/ProductContext"

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
