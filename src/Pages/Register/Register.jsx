import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../../api/client";
import { useAuth } from "../../Contexts/AuthContext";
import FormField from "../../Components/FormField/FormField";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { emailRule, passwordRule, phoneRule } from "../../utils/validation";

export default function Register() {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "+20",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(29, "Name must be less than 30 characters"),
      email: emailRule,
      password: passwordRule,
      rePassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
      phone: phoneRule,
    }),
    onSubmit: async (values) => {
      setApiError("");
      try {
        const { data } = await api.post("/auth/signup", values);
        login(data.token);
        navigate("/", { replace: true });
      } catch (error) {
        setApiError(getErrorMessage(error));
      }
    },
  });

  return (
    <form
      className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      {apiError && <ErrorMessage message={apiError} />}
      <p className="text-3xl font-thin mb-5">Register Now :</p>

      <FormField id="name" label="Your Name" formik={formik} />
      <FormField
        id="email"
        label="Your Email"
        type="email"
        formik={formik}
        placeholder="name@example.com"
      />
      <FormField
        id="password"
        label="Your Password"
        type="password"
        formik={formik}
      />
      <FormField
        id="rePassword"
        label="Repeat Password"
        type="password"
        formik={formik}
      />
      <FormField id="phone" label="Your Phone" type="tel" formik={formik} />

      <button
        disabled={formik.isSubmitting}
        type="submit"
        className="text-white btn focus:ring-4 focus:outline-none focus:ring-[#79ca70] rounded-lg text-lg px-4 py-2 text-center disabled:opacity-60"
      >
        {formik.isSubmitting ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          "Register"
        )}
      </button>
      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-[#0dac0c] hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
