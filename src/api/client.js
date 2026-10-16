import axios from "axios";

export const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.token = token;
  return config;
});

export function getErrorMessage(
  error,
  fallback = "Something went wrong. Please try again.",
) {
  return error?.response?.data?.message || fallback;
}
