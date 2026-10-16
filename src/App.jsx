import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Layout from "./Layouts/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import Address from "./Pages/Address/Address";
import AllOrders from "./Pages/AllOrders/AllOrders";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import NotFound from "./Pages/NotFound/NotFound";
import ProtectedRoute from "./Auth/ProtectedRoute";
import GuestRoute from "./Auth/GuestRoute";
import AuthContextProvider from "./Contexts/AuthContext";
import Products from "./Pages/Products/Products";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

const guest = (page) => <GuestRoute>{page}</GuestRoute>;
const protectedPage = (page) => <ProtectedRoute>{page}</ProtectedRoute>;

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "login", element: guest(<Login />) },
      { path: "register", element: guest(<Register />) },
      { path: "cart", element: protectedPage(<Cart />) },
      { path: "address/:cartId", element: protectedPage(<Address />) },
      { path: "allorders", element: protectedPage(<AllOrders />) },
      { path: "categories", element: protectedPage(<Categories />) },
      { path: "brands", element: protectedPage(<Brands />) },
      { path: "product/:id", element: protectedPage(<ProductDetails />) },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
