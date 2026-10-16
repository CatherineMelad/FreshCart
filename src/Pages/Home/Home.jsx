import { Link, useNavigate } from "react-router-dom";
import { useCategories, useProducts } from "../../hooks/useProducts";
import Hero from "../../Components/Hero/Hero";
import PerksStrip from "../../Components/PerksStrip/PerksStrip";
import CategoryBar from "../../Components/CategoryBar/CategoryBar";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import Product from "../../Components/Product/Product";
import ProductSkeleton from "../../Components/Skeletons/ProductSkeleton";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

export default function Home() {
  const navigate = useNavigate();

  const { data: categories } = useCategories();
  const featured = useProducts({ limit: 8 });
  const topRated = useProducts({ limit: 10, sort: "-ratingsAverage" });
  const bestSelling = useProducts({ limit: 10, sort: "-sold" });

  const featuredProducts = featured.data?.data ?? [];
  const topRatedProducts = topRated.data?.data ?? [];
  const bestSellingProducts = (bestSelling.data?.data ?? []).filter(
    (p) => p.sold > 0,
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-10">
      <Hero />
      <PerksStrip categoryCount={categories?.length} />
      <CategoryBar
        categories={categories}
        onSelect={(id) => navigate(`/products?category=${id}`)}
      />

      <ProductSlider title="Top rated" products={topRatedProducts} />
      <ProductSlider title="Best selling" products={bestSellingProducts} />

      <section className="mt-14">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Explore our products
        </h2>

        {featured.isLoading && <ProductSkeleton count={8} />}
        {featured.isError && (
          <ErrorMessage
            message="We couldn't load the products."
            onRetry={featured.refetch}
          />
        )}
        {featuredProducts.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0dac0c] px-6 py-3 font-semibold text-white hover:bg-[#0cbd0c] focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            See more products{" "}
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}
