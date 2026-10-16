import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategories, useProducts } from "../../hooks/useProducts";
import Product from "../../Components/Product/Product";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";
import Pagination from "../../Components/Pagination/Pagination";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const PAGE_SIZE = 12;
const SEARCH_DELAY_MS = 400;

const SORTS = {
  "": "Featured",
  price: "Price: low to high",
  "-price": "Price: high to low",
  "-ratingsAverage": "Top rated",
  "-sold": "Best selling",
};

const controlClass =
  "w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#79ca70] focus:ring-[#79ca70]";

const digitsOnly = (value) => value.replace(/[^\d.]/g, "");

export default function Products() {
  const [params, setParams] = useSearchParams();
  const listRef = useRef(null);
  const searchTimer = useRef(null);

  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const brand = params.get("brand") ?? "";
  const min = params.get("min") ?? "";
  const max = params.get("max") ?? "";
  const sortParam = params.get("sort") ?? "";
  const sort = Object.hasOwn(SORTS, sortParam) ? sortParam : "";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const [search, setSearch] = useState(q);
  const [minInput, setMinInput] = useState(min);
  const [maxInput, setMaxInput] = useState(max);

  const { data: categories } = useCategories();

  const apiParams = { limit: PAGE_SIZE, page };
  if (q.trim()) apiParams.keyword = q.trim();
  if (category) apiParams["category[in]"] = category;
  if (brand) apiParams.brand = brand;
  if (sort) apiParams.sort = sort;
  if (min) apiParams["price[gte]"] = min;
  if (max) apiParams["price[lte]"] = max;

  const { data, isLoading, isError, isPlaceholderData, refetch } =
    useProducts(apiParams);
  const products = data?.data ?? [];
  const pageCount = data?.metadata?.numberOfPages ?? 1;

  const hasFilters = Boolean(q || category || brand || sort || min || max);

  useEffect(() => {
    const timer = searchTimer;
    return () => clearTimeout(timer.current);
  }, []);

  function update(changes, { keepPage = false } = {}) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(changes).forEach(([key, value]) =>
          value ? next.set(key, value) : next.delete(key),
        );
        if (!keepPage) next.delete("page");
        return next;
      },
      { replace: true },
    );
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => update({ q: value }),
      SEARCH_DELAY_MS,
    );
  }

  function commitPrice() {
    update({ min: minInput, max: maxInput });
  }

  function clearFilters() {
    clearTimeout(searchTimer.current);
    setSearch("");
    setMinInput("");
    setMaxInput("");
    setParams({}, { replace: true });
  }

  function changePage(n) {
    update({ page: n > 1 ? String(n) : "" }, { keepPage: true });
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
        <div className="relative">
          <i
            className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          ></i>
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products"
            aria-label="Search products"
            className={`${controlClass} pl-9`}
          />
        </div>
        <select
          value={category}
          onChange={(e) => update({ category: e.target.value })}
          aria-label="Filter by category"
          className={controlClass}
        >
          <option value="">All categories</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => update({ sort: e.target.value })}
          aria-label="Sort products"
          className={controlClass}
        >
          {Object.entries(SORTS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-500">Price</span>
        <input
          inputMode="decimal"
          value={minInput}
          onChange={(e) => setMinInput(digitsOnly(e.target.value))}
          onBlur={commitPrice}
          onKeyDown={(e) => e.key === "Enter" && commitPrice()}
          placeholder="Min"
          aria-label="Minimum price"
          className={`${controlClass} !w-24`}
        />
        <span className="text-gray-400">–</span>
        <input
          inputMode="decimal"
          value={maxInput}
          onChange={(e) => setMaxInput(digitsOnly(e.target.value))}
          onBlur={commitPrice}
          onKeyDown={(e) => e.key === "Enter" && commitPrice()}
          placeholder="Max"
          aria-label="Maximum price"
          className={`${controlClass} !w-24`}
        />

        {brand && (
          <button
            onClick={() => update({ brand: "" })}
            className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm text-[#0a850a] hover:bg-green-100"
          >
            Filtered by brand{" "}
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        )}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm font-medium text-[#0dac0c] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <section ref={listRef} className="mt-6 scroll-mt-28">
        {!isLoading && !isError && (
          <p className="mb-4 text-sm text-gray-500" aria-live="polite">
            {products.length === 0
              ? "No products found"
              : `Page ${page} of ${pageCount}`}
          </p>
        )}

        {isLoading && <ProductSkeleton count={PAGE_SIZE} />}
        {isError && (
          <ErrorMessage
            message="We couldn't load the products."
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && products.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            <i
              className="fa-regular fa-face-frown text-4xl"
              aria-hidden="true"
            ></i>
            <p className="mt-3">
              Nothing matches your filters. Try a different keyword or category.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div
            className={`grid md:grid-cols-2 xl:grid-cols-4 gap-5 transition-opacity ${
              isPlaceholderData ? "opacity-60" : ""
            }`}
          >
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}

        {!isError && (
          <Pagination page={page} pageCount={pageCount} onChange={changePage} />
        )}
      </section>
    </div>
  );
}
