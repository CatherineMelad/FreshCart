import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="text-[#0dac0c] hover:underline">
              FreshCart
            </Link>
            . All rights reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 gap-5 text-sm text-gray-500">
            <Link to="/categories" className="hover:text-gray-900">
              Categories
            </Link>
            <Link to="/brands" className="hover:text-gray-900">
              Brands
            </Link>
            <a
              href="https://github.com/CatherineMelad/freshcart"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
              aria-label="FreshCart on GitHub"
            >
              <i className="fa-brands fa-github text-lg" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
