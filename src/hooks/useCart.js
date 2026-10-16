import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api, getErrorMessage } from "../api/client";

export const CART_KEY = ["cart"];

const EMPTY_CART = { numOfCartItems: 0, cartId: null, data: null };

async function fetchCart() {
  try {
    const { data } = await api.get("/cart");
    return data;
  } catch (error) {
    if (error.response?.status === 404) return EMPTY_CART;
    throw error;
  }
}

export function useCart({ enabled = true } = {}) {
  return useQuery({ queryKey: CART_KEY, queryFn: fetchCart, enabled });
}

function mergeIntoCart(queryClient, response) {
  queryClient.setQueryData(CART_KEY, (old) => ({
    ...old,
    numOfCartItems: response.numOfCartItems,
    cartId: response.cartId ?? response.data?._id ?? old?.cartId,
    data: response.data,
  }));
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) =>
      api.post("/cart", { productId }).then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, count }) =>
      api.put(`/cart/${productId}`, { count }).then((res) => res.data),
    onSuccess: (data) => mergeIntoCart(queryClient, data),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) =>
      api.delete(`/cart/${productId}`).then((res) => res.data),
    onSuccess: (data) => mergeIntoCart(queryClient, data),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.delete("/cart"),
    onSuccess: () => queryClient.setQueryData(CART_KEY, EMPTY_CART),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
