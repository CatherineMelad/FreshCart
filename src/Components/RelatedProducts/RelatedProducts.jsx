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

function ProductSlider({ title, products }) {
  if (!products.length) return null;
  return (
    <>
      <h2 className="mt-20 text-3xl font-semibold">{title}</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="p-1 md:p-4">
            <Product product={product} />
          </div>
        ))}
      </Slider>
    </>
  );
}

export default function RelatedProducts({
  relatedProducts,
  brandProducts,
  brandName,
}) {
  return (
    <>
      <ProductSlider title="Related Products" products={relatedProducts} />
      <ProductSlider
        title={`More From ${brandName}`}
        products={brandProducts}
      />
    </>
  );
}
