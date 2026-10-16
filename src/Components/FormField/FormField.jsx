export default function FormField({
  id,
  label,
  type = "text",
  formik,
  ...rest
}) {
  const error = formik.touched[id] && formik.errors[id];

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm text-black">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        {...formik.getFieldProps(id)}
        {...rest}
        className={`shadow-xs bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-[#79ca70] focus:border-[#79ca70] ${
          error
            ? "border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300"
        }`}
      />
      {error && (
        <p role="alert" className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
