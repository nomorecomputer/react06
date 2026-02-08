import { createContext, useContext, useEffect, useState } from "react";
import { api, API_PATH } from "./App";

const CartCountContext = createContext();
const getcarInitCount = () => {
  try {
    const getCarCount = async () => {
      const response = await api.get(`/api${API_PATH}/cart`);
      return response.data.data.carts.length;
    };
    return getCarCount();
  } catch (error) {
    console.log(error);
  }
};

export const CartCountProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(5);

  const syncCartCount = () => {
    setCartCount(getcarInitCount());
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getcarInitCount());
  }, []);
  return (
    <CartCountContext.Provider value={{ cartCount, syncCartCount }}>
      {children};
    </CartCountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCarCount = () => useContext(CartCountContext);
