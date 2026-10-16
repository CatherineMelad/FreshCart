import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Contexts/AuthContext";
import { useToggleWishlist, useWishlist } from "../../hooks/useWishlist";

export default function WishlistButton({
  product,
  variant = "icon",
  className = "",
}) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { data: wishlist = [] } = useWishlist();
  const { mutate, isPending } = useToggleWishlist();

  const isWishlisted = wishlist.some((p) => p._id === product._id);
  const label = isWishlisted ? "Remove from wishlist" : "Add to wishlist";

  function handleClick() {
    if (!isLoggedIn) {
      toast.info("Log in to save products to your wishlist");
      navigate("/login");
      return;
    }
    mutate({ product, isWishlisted });
  }

  const heart = (
    <i
      className={`${isWishlisted ? "fa-solid text-red-500" : "fa-regular text-gray-500"} fa-heart`}
      aria-hidden="true"
    ></i>
  );

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isWishlisted}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-60 ${className}`}
      >
        {heart}
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isWishlisted}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-60 ${className}`}
    >
      {heart}
    </button>
  );
}
