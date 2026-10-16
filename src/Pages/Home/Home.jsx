import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import Product from "../../Components/Product/Product";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data.data),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage
        message="We couldn't load the products."
        onRetry={refetch}
      />
    );

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-screen-xl mx-auto px-4">
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
