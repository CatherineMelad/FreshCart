// src/api/authService.js
import axios from "axios";

const API_URL = "https://ecommerce.routemisr.com/api/v1/auth";

// 🔹 Login
export async function loginRequest(values) {
  const { data } = await axios.post(`${API_URL}/signin`, values);
  localStorage.setItem("token", data.token);
  return data;
}

// 🔹 Register
export async function registerRequest(values) {
  const { data } = await axios.post(`${API_URL}/signup`, values);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// 🔹 Verify token (check if logged in)
export async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const { data } = await axios.get(`${API_URL}/verifyToken`, {
    headers: { token },
  });

  return {
    isLoggedIn: true,
    userId: data.decoded.id,
  };
}

// 🔹 Logout
export function logoutRequest() {
  localStorage.removeItem("token");
  return true;
}