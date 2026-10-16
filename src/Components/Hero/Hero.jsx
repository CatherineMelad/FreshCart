import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const tiles = [
  { icon: "fa-bag-shopping", label: "Shop" },
  { icon: "fa-truck-fast", label: "Delivered" },
  { icon: "fa-tags", label: "Great deals" },
  { icon: "fa-shield-halved", label: "Secure" },
];

export default function Hero() {
  const { isLoggedIn } = useAuth();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0dac0c] to-[#086b08] text-white">
      <div
        className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/5"
        aria-hidden="true"
      />

      <div className="relative grid items-center gap-8 p-8 md:p-14 md:grid-cols-2">
        <div>
          <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Welcome to FreshCart
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Everything you need, delivered to your door.
          </h1>
          <p className="mt-4 max-w-md text-white/85">
            Browse top-rated products, pay securely and track every order in one
            place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="rounded-lg bg-white px-5 py-2.5 font-semibold text-[#086b08] hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              Shop now
            </Link>
            {!isLoggedIn && (
              <Link
                to="/register"
                className="rounded-lg border border-white/70 px-5 py-2.5 font-semibold hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                Create account
              </Link>
            )}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-4" aria-hidden="true">
          {tiles.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/10 py-8 backdrop-blur-sm"
            >
              <i className={`fa-solid ${icon} text-3xl`}></i>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
