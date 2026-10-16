export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="max-w-md mx-auto my-10 p-4 text-sm text-red-800 rounded-lg bg-red-50 text-center"
    >
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-3 font-semibold underline">
          Try again
        </button>
      )}
    </div>
  );
}
