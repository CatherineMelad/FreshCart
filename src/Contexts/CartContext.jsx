import axios from "axios";
import { createContext, useState } from "react";
export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [isLoading, setiIsLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  

  async function getLoggedUserCart() {
    setiIsLoading(true)
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setCartId(data.cartId);
    setCartData(data.data);
    setNumOfCartItems(data.numOfCartItems);
    setiIsLoading(false)
  }

  async function removeCartProduct(productId) {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setCartData(data.data);
    setNumOfCartItems(data.numOfCartItems);
  }

  async function clearCart() {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    setCartData(null);
    setNumOfCartItems(0);
  }





  return (
    <cartContext.Provider
      value={{
        getLoggedUserCart,
        removeCartProduct,
        clearCart,
        cartId,
        cartData,
        setCartData,
        numOfCartItems,
        isLoading
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
