import { useState } from "react";
import { useRemoveCartItem, useUpdateCartItem } from "../../hooks/useCart";

const stepButton =
  "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:hover:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-100";

export default function CartProduct({ product }) {
  const item = product.product;
  const update = useUpdateCartItem();
  const remove = useRemoveCartItem();

  const [draft, setDraft] = useState(null);

  const changeTo = (count) => update.mutate({ productId: item._id, count });
  const adding = update.isPending && update.variables.count > product.count;
  const subtracting =
    update.isPending && update.variables.count < product.count;

  function commitDraft() {
    const count = Number.parseInt(draft, 10);
    setDraft(null);
    if (Number.isInteger(count) && count >= 1 && count !== product.count)
      changeTo(count);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <img className="w-24" src={item.imageCover} alt={item.title} />

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={product.count === 1 || update.isPending}
              onClick={() => changeTo(product.count - 1)}
              className={stepButton}
            >
              <i
                className={
                  subtracting ? "fas fa-spinner fa-spin" : "fa-solid fa-minus"
                }
              ></i>
            </button>
            <input
              type="text"
              inputMode="numeric"
              aria-label="Quantity"
              value={draft ?? product.count}
              onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
              onBlur={() => draft !== null && commitDraft()}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={update.isPending}
              onClick={() => changeTo(product.count + 1)}
              className={stepButton}
            >
              <i
                className={
                  adding ? "fas fa-spinner fa-spin" : "fa-solid fa-plus"
                }
              ></i>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900">
              ${product.price * product.count}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <div>
            <h1 className="font-semibold text-xl mb-1">{item.title}</h1>
            <h2 className="text-gray-500 text-sm">{item.category?.name}</h2>
            <h2 className="text-sm text-gray-500">
              <span className="font-semibold text-black">From: </span>
              {item.brand?.name}
            </h2>
            <p className="font-bold text-gray-900 mt-1">
              <span>Price: </span>${product.price}
            </p>
          </div>

          <button
            type="button"
            disabled={remove.isPending}
            onClick={() => remove.mutate(item._id)}
            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
          >
            <i
              className={`me-1.5 ${remove.isPending ? "fas fa-spinner fa-spin" : "fa-solid fa-xmark"}`}
            ></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
