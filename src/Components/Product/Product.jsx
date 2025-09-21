import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

export default function Product({ product }) {
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
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-3xl">
          <Link to={"/product/" + product._id}>
            <div className="relative">
              <div className="absolute" />
              <img
                src={product.imageCover}
                alt="Product Image"
                className="w-full object-cover relative"
              />
              <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full z-5 transform rotate-12">
                NEW
              </div>
            </div>
            <div className="p-6 pb-0">
              <h2 className="text-2xl font-bold  text-gray-800 mb-2 line-clamp-1">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-[#0dac0c]">
                  ${product.price}
                </span>

                <i className="fa-solid fa-heart text-2xl"></i>
              </div>
            </div>
          </Link>
          <AddToCartBtn id={product._id}/>
        </div>
      </div>
    </>
  );
}
