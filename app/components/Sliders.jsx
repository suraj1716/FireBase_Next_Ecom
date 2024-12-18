"use client"
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick"
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";

export default function FeaturedProductSlider({featuredProducts}){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <div className="flex flex-col justify-center w-screen overflow-hidden"> 
            
            <Slider {...settings}>
        {featuredProducts?.map((product)=>{
          return (
          <div>
              <div className=" flex flex-col-reverse justify-center  overflow-hidden md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-36 md:py-20 w-full">
              <div className="mt-15 flex-1 flex flex-col md:gap-8 md:px-36 gap-2">
                <h2 className="text-gray-500 text-xs md:text-base">NEW FASHION</h2>
                <div className="flex flex-col gap-4">
                <Link href={`/products/${product?.id}`}>
                <h1 className="md:text-4xl text-xl font-semibold">{product?.title}</h1>
                </Link>
                  <h1 className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">
                    
                      {product?.shortDescription}
                  </h1>
                  
                </div>
                  <div className="flex gap-4">
                  <Link href={`/checkout?type=buynow$productId=${product?.id}`}>
                  <Button className="bg-blue-500 text-white text-xs md:text-sm px-4  rounded-lg">
                    Buy Now
                    </Button>
                    </Link>
                  <AuthContextProvider>                    
                    <AddToCartButton productId={product?.id} type={"large"} />
                    <FavoriteButton productId={product?.id} />
                    </AuthContextProvider>

                  </div>
              </div>
          <div className="mt-10 flex flex-col justify-center">
          <Link href={`/products/${product?.id}`}>
              
              <img 
              className=" h-[rem] md:h-[25rem] object-contain"
              src={product?.featureImageURL} alt=""/>
              </Link>
          </div>
          

          </div>
          </div>
          )
        })}
      </Slider>
      
      </div>
       
      );
    }
    
    