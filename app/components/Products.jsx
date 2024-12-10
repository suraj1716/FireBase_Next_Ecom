import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";

export default function ProductsGridview({ products }) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p[-5]">
        <h1 className="text-center font-semibold text-lg">Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} keys={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <div className="relative w-full">
        <img
          src={product?.featureImageURL}
          alt={product?.title}
          className="rounded-lg h-48 w-full object-cover"
        />
        <div className="absolute top-0 right-0">
          <AuthContextProvider>
          <FavoriteButton productId={product?.id}/>
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
      <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
      </Link>
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.shortDescription}
      </p>
      <div className="flex gap-3 items-center">
      <Rating size="small" name="product-rating" defaultValue={2.5} precision={0.5} readOnly />
      <h1 className="text-xs text-gray-500">(0)</h1>
      </div>
      <div className="">
        <h2 className="text-green-500 text-sm font-semibold">
          ₹ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-600">
            ₹ {product?.price}
          </span>
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
      <Link href={`/checkout?type=buynow$productId=${product?.id}`}>
                  <Button className="bg-blue-500 text-white text-xs md:text-sm px-4 rounded-lg">
                    Buy Now
                    </Button>
                    </Link>
        <AuthContextProvider>
          <AddToCartButton productId={product?.id} />
        </AuthContextProvider>
      </div>
    </div>
  );
}
