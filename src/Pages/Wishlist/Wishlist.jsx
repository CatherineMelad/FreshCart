import { Link } from "react-router-dom";
import { useWishlist } from "../../hooks/useWishlist";
import Product from "../../Components/Product/Product";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

export default function Wishlist() {
  const { data: products, isLoading, isError, refetch } = useWishlist();

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage
        message="We couldn't load your wishlist."
        onRetry={refetch}
      />
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {products?.length ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500">
          <i className="fa-regular fa-heart text-5xl" aria-hidden="true"></i>
          <p className="mt-4">
            Your wishlist is empty. Tap the heart on any product to save it
            here.
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 font-medium text-[#0dac0c] hover:underline"
          >
            Browse products
          </Link>
        </div>
      )}
    </div>
  );
}
