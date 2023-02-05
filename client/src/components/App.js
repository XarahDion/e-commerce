import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import ProductDetails from "./ProductDetails";
import ConfirmationPage from "./ConfirmationPage";
import ProductPage from "./ProductPage";
import AboutPage from "./AboutPage";
import Cart from "./Cart";
import { CartContext } from "./CartContext";
import usePersistedState from "../hooks/usePersistedState";
import OrderPage from "./OrderPage";
import SubHeader from "./SubHeader";
import ErrorPage from "./ErrorPage";

const App = () => {
  const { cart } = useContext(CartContext);
  const [orderId, setorderId] = usePersistedState(null, "orderId");

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header cart={cart} />
      <SubHeader />
      <Main>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/product-page/:cat"} element={<ProductPage />} />
          <Route path={"/products/:productId"} element={<ProductDetails />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/order"} element={<OrderPage setorderId={setorderId} />} />
          {orderId ?
            <Route path={"/confirmation"} element={<ConfirmationPage orderId={orderId} />} />
            : <Route path={"/confirmation"} element={<ErrorPage />} />
          }
          <Route path={"*"} element={<ErrorPage />} />
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  background-color: var(--background-color);
`;

export default App;
