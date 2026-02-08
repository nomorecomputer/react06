import { Outlet, RouterProvider } from "react-router";
import { Router } from "react-router";
import { myRouter } from "./router";
import axios from "axios";
import { CartCountProvider } from "./CartCountContext";

export const API_PATH = import.meta.env.VITE_API_PATH;
export const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME;
// eslint-disable-next-line react-refresh/only-export-components
export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE });
export const setApiToken = (token) => {
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
  }).defaults.headers.common["Authorization"] = token;
};

function App() {
  return (
    <CartCountProvider>
      <RouterProvider router={myRouter}></RouterProvider>
    </CartCountProvider>
  );
}

export default App;
