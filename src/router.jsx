import { createHashRouter } from "react-router";
import Products from "./views/Products";
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import ShoppingCart from "./views/ShoppinCart";

import NotFound from "./views/NotFound";
import FrontendLayout from "./layout/FrontendLayout";
import Checkout from "./views/Checkout";
import Login from "./views/Login";

export const myRouter = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Product", element: <Products /> },
      { path: "Product/:id", element: <ProductDetail /> },
      { path: "ShoppingCart", element: <ShoppingCart /> },
      { path: "Checkout", element: <Checkout /> },
      { path: "Login", element: <Login /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
