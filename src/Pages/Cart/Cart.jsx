import React, { useContext, useEffect } from "react";
import { cartContext } from "../../Contexts/CartContext";
import CartProduct from "../../Components/CartProduct/CartProduct";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const {
    getLoggedUserCart,
    clearCart,
    cartData,
    numOfCartItems,
    isLoading,
    cartId,
  } = useContext(cartContext);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (numOfCartItems === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold">
        Add Products To Your Cart
      </h1>
    );
  }




  return (
    <>
      <section className="bg-white antialiased ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartData?.products.map((product) => {
                  return <CartProduct product={product} />;
                })}
              </div>
              <button
                onClick={clearCart}
                className="text-red-500 mt-2 hover:text-red-600 font-semibold"
              >
                Clear Cart
              </button>
            </div>
            <div className="mx-auto sticky top-24 mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className=" space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                <p className="text-xl font-semibold text-gray-900 ">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Items
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {numOfCartItems}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        ${cartData?.totalCartPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Shipping
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        $0
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-base font-bold text-gray-900 ">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 ">
                      ${cartData?.totalCartPrice}
                    </dd>
                  </dl>
                </div>
                <Link
                  to={'/address/'+cartId}
                  className="flex w-full items-center justify-center rounded-lg bg-[#0dac0c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0cbd0c] focus:outline-none focus:ring-4 focus:ring-primary-300 "
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
