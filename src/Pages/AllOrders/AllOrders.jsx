import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

import { authContext } from "../../Contexts/AuthContext";

export default function AllOrders() {
  const { userId } = useContext(authContext);

  function getOrder() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: getOrder,
    select: (data) => data.data,
  });

    if(isLoading){
      return <LoadingScreen/>
    }

  console.log(data);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          📦 My Orders
        </h2>
        <p className="mt-2 text-gray-500">
          Below is a list of all your recent orders.
        </p>

        <div className="space-y-12 mt-10">
          {data?.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order._id.slice(-6)}
                </h3>
                <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                  Placed on :{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Items */}
              <ul className="divide-y divide-gray-200 mt-6">
                {order.cartItems.map((item) => (
                  <li
                    key={item.product._id}
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
                        {item.product.category.name} | {item.product.brand.name}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${item.price}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Shipping Address
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.shippingAddress.details},{" "}
                    {order.shippingAddress.city}
                    <br />
                    📞 {order.shippingAddress.phone}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Order Summary
                  </h4>
                  <dl className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt>Total</dt>
                      <dd className="font-semibold text-indigo-600">
                        ${order.totalOrderPrice}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Payment</dt>
                      <dd>{order.paymentMethodType.toUpperCase()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Paid</dt>
                      <dd
                        className={
                          order.isPaid ? "text-green-600" : "text-red-600"
                        }
                      >
                        {order.isPaid ? "Yes" : "No"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Delivered</dt>
                      <dd
                        className={
                          order.isDelivered ? "text-green-600" : "text-red-600"
                        }
                      >
                        {order.isDelivered ? "Yes" : "No"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
