export default function CategoryBar({ categories = [], selected, onSelect }) {
  if (!categories.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Shop by category
      </h2>
      <div className="flex gap-5 overflow-x-auto pb-3">
        {categories.map((category) => {
          const active = selected === category._id;
          return (
            <button
              key={category._id}
              onClick={() => onSelect(active ? "" : category._id)}
              aria-pressed={active}
              className="group flex w-24 shrink-0 flex-col items-center gap-2 focus:outline-none"
            >
              <img
                src={category.image}
                alt=""
                className={`h-20 w-20 rounded-full object-cover ring-2 ring-offset-2 transition group-hover:scale-105 group-focus-visible:ring-[#0dac0c] ${
                  active ? "ring-[#0dac0c]" : "ring-transparent"
                }`}
              />
              <span
                className={`text-center text-sm leading-tight ${
                  active ? "font-semibold text-[#0dac0c]" : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
