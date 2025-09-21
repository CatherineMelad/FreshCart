import axios from "axios";
import React from "react";
import { toast, Zoom } from "react-toastify";

export default function AddToCartBtn({id}) {
      async function addToCart(productId) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }
  return (
    <>
      <div className="m-4 ">
        <button
          onClick={() => addToCart(id)}
          className="w-full  text-[#0dac0c] hover:text-white border border-[#0dac0c] hover:bg-[#0dac0c] focus:ring-4 focus:outline-none focus:ring-green-300 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
