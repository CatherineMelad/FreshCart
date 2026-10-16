import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/brands", label: "Brands" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
  { to: "/allorders", label: "My Orders" },
];

const outlineBtn =
  "text-[#0dac0c] hover:text-white border border-[#0dac0c] hover:bg-[#0dac0c] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2 text-center";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const { data: cart } = useCart({ enabled: isLoggedIn });
  const { data: wishlist } = useWishlist();
  const badges = {
    "/cart": cart?.numOfCartItems ?? 0,
    "/wishlist": wishlist?.length ?? 0,
  };

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 shadow-lg border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="text-[#0dac0c] font-stretch-extra-expanded uppercase flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Freshcart
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2 text-center"
              >
                Logout
              </button>
              <button
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
                className="inline-flex items-center w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <i className="fa-solid fa-bars text-lg" aria-hidden="true"></i>
              </button>
            </>
          ) : (
            <div className="flex gap-1">
              <Link to="/register" className={outlineBtn}>
                Register
              </Link>
              <Link to="/login" className={outlineBtn}>
                Login
              </Link>
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 md:mr-14 ${
              menuOpen ? "flex" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0dac0c] md:p-0 ${
                        isActive ? "text-[#0dac0c]" : "text-gray-900"
                      }`
                    }
                  >
                    {label}
                    {badges[to] > 0 && (
                      <span className="bg-[#0dac0c] text-white text-xs rounded-full min-w-5 h-5 px-1 inline-flex items-center justify-center">
                        {badges[to]}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
