import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", "list", params],
    queryFn: () => api.get("/products", { params }).then((res) => res.data),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((res) => res.data.data),
    staleTime: 5 * 60 * 1000,
  });
}
