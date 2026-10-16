import { Link } from "react-router-dom";
import { useCart, useClearCart } from "../../hooks/useCart";
import CartProduct from "../../Components/CartProduct/CartProduct";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

function SummaryRow({ label, value, bold }) {
  const weight = bold ? "font-bold text-gray-900" : "font-normal text-gray-500";
  return (
    <dl className="flex items-center justify-between gap-4">
      <dt className={`text-base ${weight}`}>{label}</dt>
      <dd
        className={`text-base ${bold ? "font-bold" : "font-medium"} text-gray-900`}
      >
        {value}
      </dd>
    </dl>
  );
}

export default function Cart() {
  const { data: cart, isLoading, isError, refetch } = useCart();
  const clearCart = useClearCart();

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage message="We couldn't load your cart." onRetry={refetch} />
    );

  if (!cart?.numOfCartItems) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link
          to="/"
          className="inline-block mt-4 text-[#0dac0c] font-medium hover:underline"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const cartId = cart.cartId ?? cart.data?._id;
  const total = `$${cart.data.totalCartPrice}`;

  return (
    <section className="bg-white antialiased">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.data.products.map((product) => (
                <CartProduct key={product.product._id} product={product} />
              ))}
            </div>
            <button
              onClick={() => clearCart.mutate()}
              disabled={clearCart.isPending}
              className="text-red-500 mt-2 hover:text-red-600 font-semibold disabled:opacity-50"
            >
              Clear Cart
            </button>
          </div>

          <div className="mx-auto sticky top-24 mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>
              <div className="space-y-2">
                <SummaryRow label="Items" value={cart.numOfCartItems} />
                <SummaryRow label="Subtotal" value={total} />
                <SummaryRow label="Shipping" value="$0" />
              </div>
              <div className="border-t border-gray-200 pt-2">
                <SummaryRow label="Total" value={total} bold />
              </div>
              <Link
                to={"/address/" + cartId}
                className="flex w-full items-center justify-center rounded-lg bg-[#0dac0c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0cbd0c] focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
