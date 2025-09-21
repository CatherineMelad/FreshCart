import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data , isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (data) => data.data.data
  });
   
  if(isLoading){
    return <LoadingScreen/>
  }
  console.log(data);

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
