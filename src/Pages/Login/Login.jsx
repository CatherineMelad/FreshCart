import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../../api/client";
import { useAuth } from "../../Contexts/AuthContext";
import FormField from "../../Components/FormField/FormField";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { emailRule, passwordRule } from "../../utils/validation";

export default function Login() {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({ email: emailRule, password: passwordRule }),
    onSubmit: async (values) => {
      setApiError("");
      try {
        const { data } = await api.post("/auth/signin", values);
        login(data.token);
        navigate(pathname === "/login" ? "/" : pathname, { replace: true });
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
      <p className="text-3xl font-thin mb-5">Login Now :</p>

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

      <button
        disabled={formik.isSubmitting}
        type="submit"
        className="text-white btn focus:ring-4 focus:outline-none focus:ring-[#79ca70] rounded-lg text-lg px-4 py-2 text-center disabled:opacity-60"
      >
        {formik.isSubmitting ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          "Login"
        )}
      </button>
      <p className="mt-4 text-sm text-gray-500">
        New here?{" "}
        <Link to="/register" className="text-[#0dac0c] hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
