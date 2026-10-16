const base =
  "min-w-9 h-9 px-3 rounded-lg border text-sm font-medium transition";

export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${base} border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        Prev
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={`${base} ${
            n === page
              ? "border-[#0dac0c] bg-[#0dac0c] text-white"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        className={`${base} border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        Next
      </button>
    </nav>
  );
}
