import React from "react";
import Product from "../Product/Product";
import Slider from "react-slick";

export default function RelatedProsucts({ relatedProducts ,brandProducts , brandName}) {
    
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
    <h2 className="mt-20 text-3xl font-semibold">Related Products</h2>
      <Slider {...settings}>

        {relatedProducts.map((product, index) => {
          return <div className="p-4"><Product key={index} product={product} /></div> ;
        })}
      </Slider>
          <h2 className="mt-20 text-3xl font-semibold">More From {brandName}</h2>
      <Slider {...settings}>

        {brandProducts.map((product, index) => {
          return <div className="p-1 md:p-4"><Product key={index} product={product} /></div> ;
        })}
      </Slider>
    </>
  );
}
