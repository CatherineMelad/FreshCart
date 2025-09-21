import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import RelatedProsucts from "../../Components/RelatedProsucts/RelatedProsucts";
import Product from "../../Components/Product/Product";
import ProductData from "../../Components/ProductData/ProductData";

export default function ProductDetails() {
  let { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([])
  const [brandProducts, setBrandProducts] = useState([])
  const [brandName, setBrandName] = useState(null)

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductData(data.data);
    getRelatedProducts(data.data.category._id)
    getBrandProducts(data.data.brand._id)
    setBrandName(data.data.brand.name)
  }

    async function getRelatedProducts(categoryId) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
   );
    setRelatedProducts(data.data);
    
  }
      async function getBrandProducts(brandId) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
   );
    setBrandProducts(data.data);
    
  }



  return (
    <>
      <section className=" bg-white  antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">

          <ProductData data={productData}/>
          <RelatedProsucts relatedProducts={relatedProducts} brandProducts={brandProducts} brandName={brandName}/>

        </div>
        
      </section>
      
    </>
  );
}
