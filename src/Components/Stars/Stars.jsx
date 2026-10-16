export default function Stars({ rating = 0, className = "" }) {
  const filled = Math.round(rating);
  return (
    <span
      className={`inline-flex gap-0.5 text-yellow-400 ${className}`}
      aria-label={`${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`${n <= filled ? "fa-solid" : "fa-regular"} fa-star`}
          aria-hidden="true"
        ></i>
      ))}
    </span>
  );
}
