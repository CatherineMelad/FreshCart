import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

export default function Address() {
      const [isLoading, setIsLoading] = useState(false);
      const [apiError, setApiError] = useState('');

      const {cartId} =useParams()

  function checkout() {
    setIsLoading(true)
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          'shippingAddress': values
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then(({ data }) => {
        location.href = data.session.url;
      }).finally(()=>{
        setIsLoading(false)
      })
  }

  const initialValues = {
    details: "",
    phone: "+20",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required.")
      .matches(
        /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/,
        " Please enter a valid egyption phone number"
      ),
  });

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      onSubmit: checkout,
      validationSchema,
    });

  return (
    <>
      <form
        className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
        onSubmit={handleSubmit}
      >
        {apiError && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {apiError}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-thin text-black "
          >
            Address Details
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.details}
            name="details"
            type="text"
            id="details"
            className={`shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#79ca70] focus:border-[#79ca70] block w-full p-2.5 ${
              touched.details && errors.details
                ? "focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500"
                : ""
            }`}
          />
          {touched.details && errors.details && (
            <p className="text-red-500 text-xs mt-1">{errors.details}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-thin text-black "
          >
            Your Phone
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            name="phone"
            type="tel"
            id="phone"
            className={`shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#79ca70] focus:border-[#79ca70] block w-full p-2.5 ${
              touched.phone && errors.phone
                ? "focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500"
                : ""
            }`}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-thin text-black "
          >
            Your City
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            name="city"
            type="text"
            id="city"
            className={`shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#79ca70] focus:border-[#79ca70] block w-full p-2.5 ${
              touched.city && errors.city
                ? "focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500"
                : ""
            }`}
          />
          {touched.city && errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        <div className="">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white btn focus:ring-4 focus:outline-none focus:ring-[#79ca70] font-thin rounded-lg text-lg px-4 py-2 text-center"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
