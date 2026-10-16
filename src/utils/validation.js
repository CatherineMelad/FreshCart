import * as Yup from "yup";

export const emailRule = Yup.string()
  .required("Email is required")
  .email("Please enter a valid email address");

export const passwordRule = Yup.string()
  .required("Password is required")
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "Password must be at least 8 characters and contain an uppercase letter, a lowercase letter and a number",
  );

export const phoneRule = Yup.string()
  .required("Phone number is required")
  .matches(
    /^(\+|00)[1-9][0-9 \-().]{7,32}$/,
    "Please enter a valid phone number including the country code",
  );
