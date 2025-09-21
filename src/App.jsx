import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ProtectedAuthRoute from "./Auth/ProtectedAuthRoute";
import AuthContextProvider from "../src/Contexts/AuthContext";
import NotFound from "./Pages/NotFound/NotFound";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { ToastContainer } from 'react-toastify';
import CartContextProvider from "./Contexts/CartContext";
import Address from "./Pages/Address/Address";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllOrders from "./Pages/allOrders/allOrders";


const queryClient = new QueryClient()


function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "login",
          element: (
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuthRoute>
              <Register />
            </ProtectedAuthRoute>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
                {
          path: "address/:cartId",
          element: (
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          ),
        },
                {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
    <QueryClientProvider client={queryClient}>
    
      <AuthContextProvider>
      <CartContextProvider>
                <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
      </CartContextProvider>

      </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
