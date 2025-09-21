import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';


export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });

    if(isLoading){
      return <LoadingScreen/>
    }

  console.log(data);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
