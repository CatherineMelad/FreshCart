import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import { useAuth } from "../../Contexts/AuthContext";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const statusColor = (ok) => (ok ? "text-green-600" : "text-red-600");

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SummaryRow({ label, children, className = "" }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className={className}>{children}</dd>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Order #{order._id.slice(-6)}
        </h3>
        <p className="text-sm text-gray-500 mt-2 sm:mt-0">
          Placed on: {formatDate(order.createdAt)}
        </p>
      </div>

      <ul className="divide-y divide-gray-200 mt-6">
        {order.cartItems.map((item) => (
          <li
            key={item._id ?? item.product._id}
            className="flex items-center gap-4 py-4"
          >
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-20 h-20 object-contain rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {item.product.title}
              </h4>
              <p className="text-sm text-gray-500">Qty: {item.count}</p>
              <p className="text-xs text-gray-400">
                {item.product.category?.name} | {item.product.brand?.name}
              </p>
            </div>
            <span className="font-semibold text-gray-900">${item.price}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
            Shipping Address
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {order.shippingAddress?.details}, {order.shippingAddress?.city}
            <br />
            <i className="fa-solid fa-phone text-xs"></i>{" "}
            {order.shippingAddress?.phone}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
            Order Summary
          </h4>
          <dl className="mt-2 space-y-1 text-sm">
            <SummaryRow label="Total" className="font-semibold text-[#0dac0c]">
              ${order.totalOrderPrice}
            </SummaryRow>
            <SummaryRow label="Payment">
              {order.paymentMethodType?.toUpperCase()}
            </SummaryRow>
            <SummaryRow label="Paid" className={statusColor(order.isPaid)}>
              {order.isPaid ? "Yes" : "No"}
            </SummaryRow>
            <SummaryRow
              label="Delivered"
              className={statusColor(order.isDelivered)}
            >
              {order.isDelivered ? "Yes" : "No"}
            </SummaryRow>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default function AllOrders() {
  const { userId } = useAuth();

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => api.get(`/orders/user/${userId}`).then((res) => res.data),
    enabled: Boolean(userId),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage message="We couldn't load your orders." onRetry={refetch} />
    );

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          My Orders
        </h2>

        {orders?.length ? (
          <>
            <p className="mt-2 text-gray-500">
              Below is a list of all your recent orders.
            </p>
            <div className="space-y-12 mt-10">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 text-center text-gray-500">
            <p>You haven&apos;t placed any orders yet.</p>
            <Link
              to="/"
              className="inline-block mt-3 text-[#0dac0c] font-medium hover:underline"
            >
              Start shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
