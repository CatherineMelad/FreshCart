import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import ProductData from "../../Components/ProductData/ProductData";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

const fetchProducts = (params) =>
  api.get("/products", { params }).then((res) => res.data.data);

export default function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get(`/products/${id}`).then((res) => res.data.data),
  });

  const categoryId = product?.category?._id;
  const brandId = product?.brand?._id;

  const { data: related = [] } = useQuery({
    queryKey: ["products", { category: categoryId }],
    queryFn: () => fetchProducts({ "category[in]": categoryId }),
    enabled: Boolean(categoryId),
  });

  const { data: fromBrand = [] } = useQuery({
    queryKey: ["products", { brand: brandId }],
    queryFn: () => fetchProducts({ brand: brandId }),
    enabled: Boolean(brandId),
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage
        message="We couldn't load this product."
        onRetry={refetch}
      />
    );

  return (
    <section className="bg-white antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <ProductData data={product} />
        <RelatedProducts
          relatedProducts={related.filter((p) => p._id !== product._id)}
          brandProducts={fromBrand.filter((p) => p._id !== product._id)}
          brandName={product.brand?.name}
        />
      </div>
    </section>
  );
}
