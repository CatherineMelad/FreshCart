import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
  headers: {
    token: localStorage.getItem("token"),
  },
});

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const removeCartProduct = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await api.delete("/cart");
  return data;
};

export const updateCartProduct = async ({ productId, count }) => {
  const { data } = await api.put(`/cart/${productId}`, { count });
  return data;
};