import Slider from "react-slick";
import Product from "../Product/Product";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export default function ProductSlider({
  title,
  products,
  className = "mt-12",
}) {
  if (!products.length) return null;
  return (
    <section className={className}>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="p-1 md:p-4">
            <Product product={product} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
