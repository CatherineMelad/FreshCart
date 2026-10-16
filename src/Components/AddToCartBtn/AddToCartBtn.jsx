import { useAddToCart } from "../../hooks/useCart";

export default function AddToCartBtn({ id, className = "m-4" }) {
  const { mutate, isPending } = useAddToCart();

  return (
    <div className={className}>
      <button
        onClick={() => mutate(id)}
        disabled={isPending}
        className="w-full text-[#0dac0c] hover:text-white border border-[#0dac0c] hover:bg-[#0dac0c] focus:ring-4 focus:outline-none focus:ring-green-300 font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <i className="fa-solid fa-spinner fa-spin"></i>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
