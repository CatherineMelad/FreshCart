import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import ImageCardGrid from "../../Components/ImageCardGrid/ImageCardGrid";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";

export default function Categories() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/categories").then((res) => res.data.data),
  });

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <ErrorMessage
        message="We couldn't load the categories."
        onRetry={refetch}
      />
    );

  return <ImageCardGrid title="Categories" items={data} />;
}
