import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../Components/Product/Product";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { useQuery } from "@tanstack/react-query";

export default function Home() {


  function getAllProducts(){
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
  }

  const {data , isLoading} = useQuery({
    queryKey:['products'],
    queryFn:getAllProducts,
    select:(data)=>data.data.data
  })

  

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 max-w-screen-xl mx-auto">
        {data?.map((product, index) => {
          return <Product key={index} product={product} />;
        })}
      </div>
    </>
  );
}
