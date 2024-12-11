"use client"
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick"

export default function Collections({collections}){
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
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
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 3,
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

      if(collections.length===0){
        return <></>
      }

      return (
        <div className="overflow-hidden md:p-10 p-5"> 
          <div className="flex justify-center w-full mb-7">
        <h1 className="text-lg font-semibold">Shop By Collection</h1>
      </div>
            <Slider {...settings}>

        {(collections?.length <= 3 
        ? [...collections,...collections, ...collections]
        : collections
      )?.map((collection)=>{
          return (
          <div className="px-2 " >
              <div className="flex gap-4 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-7 rounded-xl w-full h-full">
              <div className="flex flex-col gap-10">
                
                <div className="flex flex-col gap-4">
                <h1 className="md:text-lg text-base font-semibold">{collection?.title}</h1>
                  <h1 className="text-gray-500 md:text-sm text-xs max-w-96 line-clamp-2">
                      {collection?.subTitle}
                  </h1>
                  
                </div>
                  <div className="flex gap-4">
                  <Link href={`/collections/${collection?.id}`}>
                      <button className="bg-blue-500 text-white text-xs md:text-sm px-8 py-2 rounded-lg">
                        SHOP NOW
                      </button>
                    </Link>
                  
                
                  </div>
              </div>
          <div className="w-full ml-4">
              <img 
              className="h-[4rem] md:h-[9rem]"
              src={collection?.imageURL} alt={collection?.title}/>
          </div>
          

          </div>
          </div>
          )
        })}
      </Slider>
      
      </div>
       
      );
    }
    
    