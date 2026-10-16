import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { api, getErrorMessage } from "../api/client";
import { useAuth } from "../Contexts/AuthContext";

export const WISHLIST_KEY = ["wishlist"];

export function useWishlist() {
  const { isLoggedIn } = useAuth();
  return useQuery({
    queryKey: WISHLIST_KEY,
    queryFn: () => api.get("/wishlist").then((res) => res.data.data),
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
  });
}

export function useToggleWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, isWishlisted }) =>
      isWishlisted
        ? api.delete(`/wishlist/${product._id}`)
        : api.post("/wishlist", { productId: product._id }),

    onMutate: async ({ product, isWishlisted }) => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_KEY });
      const previous = queryClient.getQueryData(WISHLIST_KEY);
      queryClient.setQueryData(WISHLIST_KEY, (old = []) =>
        isWishlisted
          ? old.filter((p) => p._id !== product._id)
          : [...old, product],
      );
      return { previous };
    },

    onError: (error, _variables, context) => {
      queryClient.setQueryData(WISHLIST_KEY, context?.previous);
      toast.error(getErrorMessage(error));
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: WISHLIST_KEY }),
  });
}
