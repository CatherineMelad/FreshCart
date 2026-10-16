import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { api, getErrorMessage } from "../../api/client";
import FormField from "../../Components/FormField/FormField";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { phoneRule } from "../../utils/validation";

export default function Address() {
  const [apiError, setApiError] = useState("");
  const { cartId } = useParams();

  const formik = useFormik({
    initialValues: { details: "", phone: "+20", city: "" },
    validationSchema: Yup.object({
      details: Yup.string().required("Details is required"),
      city: Yup.string().required("City is required"),
      phone: phoneRule,
    }),
    onSubmit: async (values) => {
      setApiError("");
      try {
        const { data } = await api.post(
          `/orders/checkout-session/${cartId}`,
          { shippingAddress: values },
          { params: { url: window.location.origin } },
        );
        window.location.assign(data.session.url);
      } catch (error) {
        setApiError(
          getErrorMessage(
            error,
            "We couldn't start the checkout. Please try again.",
          ),
        );
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
      <p className="text-3xl font-thin mb-5">Shipping Address :</p>

      <FormField id="details" label="Address Details" formik={formik} />
      <FormField id="phone" label="Your Phone" type="tel" formik={formik} />
      <FormField id="city" label="Your City" formik={formik} />

      <button
        disabled={formik.isSubmitting}
        type="submit"
        className="text-white btn focus:ring-4 focus:outline-none focus:ring-[#79ca70] rounded-lg text-lg px-4 py-2 text-center disabled:opacity-60"
      >
        {formik.isSubmitting ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
}
