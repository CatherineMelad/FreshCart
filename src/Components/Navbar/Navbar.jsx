import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import { authContext } from "../../Contexts/AuthContext";

export default function Navbar() {
  let navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
    setIsLoggedIn(false);
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 shadow-lg  border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="text-[#0dac0c] font-stretch-extra-expanded uppercase flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Freshcart
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2 text-center"
                >
                  Logout
                </button>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to={"register"}
                  className="text-[#0dac0c] hover:text-white border border-[#0dac0c] hover:bg-[#0dac0c] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2 text-center mr-1"
                >
                  Register
                </Link>
                <Link
                  to={"login"}
                  className="text-[#0dac0c] hover:text-white border border-[#0dac0c] hover:bg-[#0dac0c] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2 text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {isLoggedIn && (
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-14"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0dac0c] md:p-0 "
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0dac0c] md:p-0 "
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/brands"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0dac0c] md:p-0 "
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/cart"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0dac0c] md:p-0 "
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/allorders"}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0dac0c] md:p-0 "
                  >
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
