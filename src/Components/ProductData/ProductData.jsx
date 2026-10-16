import Slider from "react-slick";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import Stars from "../Stars/Stars";
import WishlistButton from "../WishlistButton/WishlistButton";

export default function ProductData({ data }) {
  const settings = {
    customPaging: (i) => (
      <a>
        <img
          src={data.images[i]}
          alt={`${data.title} thumbnail ${i + 1}`}
          className="md:w-20 w-14 object-contain rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
        />
      </a>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: data.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-around">
      <div className="lg:w-1/2 mx-auto mb-34 md:mb-38">
        <Slider {...settings}>
          {data.images.map((img) => (
            <div key={img}>
              <img src={img} className="lg:max-w-md mx-auto" alt={data.title} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="mt-6 lg:w-1/2 sm:mt-8 lg:mt-0">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-5">
          {data.title}
        </h1>
        <p className="mb-6 text-gray-500">{data.description}</p>

        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
          <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            ${data.price}
          </p>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Stars rating={data.ratingsAverage} />
            <p className="text-sm font-medium leading-none text-gray-500">
              ({data.ratingsAverage})
            </p>
            <p className="text-sm font-medium leading-none text-gray-900">
              {data.ratingsQuantity} Reviews
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <AddToCartBtn id={data._id} className="" />
          </div>
          <WishlistButton product={data} variant="full" />
        </div>
        <hr className="my-6 md:my-8 border-gray-200" />
      </div>
    </div>
  );
}
