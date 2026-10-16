import ProductSlider from "../ProductSlider/ProductSlider";

export default function RelatedProducts({
  relatedProducts,
  brandProducts,
  brandName,
}) {
  return (
    <>
      <ProductSlider
        title="Related Products"
        products={relatedProducts}
        className="mt-20"
      />
      <ProductSlider
        title={`More From ${brandName}`}
        products={brandProducts}
        className="mt-20"
      />
    </>
  );
}
