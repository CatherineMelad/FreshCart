import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import ImageCardGrid from "../../Components/ImageCardGrid/ImageCardGrid";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

export default function Brands() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: () => api.get("/brands").then((res) => res.data.data),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage message="We couldn't load the brands." onRetry={refetch} />
    );

  return (
    <ImageCardGrid
      title="Brands"
      items={data}
      getLink={(b) => `/products?brand=${b._id}`}
    />
  );
}
