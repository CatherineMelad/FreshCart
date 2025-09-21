import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from '../../Contexts/AuthContext';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext)

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setApiError("");

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );      
      localStorage.setItem('token' , data.token);
      setIsLoggedIn(true)
      navigate(location.pathname == '/login' ? '/' : location.pathname);
    } catch (error) {
      const errorMes =
        error.response.data.message ||
        "Something went wrong. Please try again.";
      setApiError(errorMes);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        " Please enter a valid email address"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter and one number"
      ),
  });

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      onSubmit,
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

        <p className="text-3xl font-thin mb-5">Login Now :</p>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-thin text-black "
          >
            Your Email
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            type="email"
            id="email"
            className={`shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#79ca70] focus:border-[#79ca70] block w-full p-2.5 ${
              touched.email && errors.email
                ? "focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500"
                : ""
            }`}
            placeholder="name@flowbite.com"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-thin text-black"
          >
            Your Password
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            type="password"
            id="password"
            className={`shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#79ca70] focus:border-[#79ca70] block w-full p-2.5 ${
              touched.password && errors.password
                ? "focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500"
                : ""
            }`}
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white btn focus:ring-4 focus:outline-none focus:ring-[#79ca70] font-thin rounded-lg text-lg px-4 py-2 text-center"
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
