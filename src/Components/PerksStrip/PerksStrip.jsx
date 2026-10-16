export default function PerksStrip({ categoryCount }) {
  const perks = [
    {
      icon: "fa-truck-fast",
      title: "Free shipping",
      text: "$0 delivery on every order",
    },
    {
      icon: "fa-lock",
      title: "Secure checkout",
      text: "Payments handled by Stripe",
    },
    {
      icon: "fa-boxes-stacked",
      title: categoryCount ? `${categoryCount} categories` : "Big selection",
      text: "Find what you need fast",
    },
    {
      icon: "fa-receipt",
      title: "Order tracking",
      text: "See all your orders in one place",
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {perks.map(({ icon, title, text }) => (
        <div
          key={title}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-[#0dac0c]">
            <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
