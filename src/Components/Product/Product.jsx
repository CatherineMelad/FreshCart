import { Link } from "react-router-dom";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import Stars from "../Stars/Stars";

export default function Product({ product }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <Link to={"/product/" + product._id}>
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full object-cover"
          />
          <div className="p-6 pb-0">
            <p className="text-sm text-[#0dac0c] mb-1">
              {product.category?.name}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#0dac0c]">
                ${product.price}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Stars rating={product.ratingsAverage} />
                {product.ratingsAverage}
              </span>
            </div>
          </div>
        </Link>
        <AddToCartBtn id={product._id} />
      </div>
    </div>
  );
}
