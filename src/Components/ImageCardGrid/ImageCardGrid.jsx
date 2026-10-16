import { Link } from "react-router-dom";

export default function ImageCardGrid({ title, items = [], getLink }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => {
          const card = (
            <div className="h-full bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </div>
            </div>
          );
          return getLink ? (
            <Link key={item._id} to={getLink(item)}>
              {card}
            </Link>
          ) : (
            <div key={item._id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
