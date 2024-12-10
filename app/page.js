import Image from "next/image";
import Header from "./components/Header";
import FeaturedProductSlider from "./components/Sliders";
import { getFeaturedProducts, getProducts } from "@/lib/firestore/products/read_server";
import Collections from "./components/Collections";
import { getCollections } from "@/lib/firestore/collections/read_server";
import Categories from "./components/Categories";
import { getCategories } from "@/lib/firestore/categories/read_server";
import ProductsGridview from "./components/Products";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import Brands from "./components/Brands";
import { getBrands } from "@/lib/firestore/brands/read_server";

export default async function Home() {
  const [featuredProducts, collections, categories, products, brands] =
  await Promise.all([
    getFeaturedProducts(),
    getCollections(),
    getCategories(),
    getProducts(),
    getBrands(),
  ]);

  return (
    <main className=" w-screen h-screen overflow-x-hidden overflow-y-auto">
    
      <Header/>
      <FeaturedProductSlider featuredProducts={featuredProducts} />
      <Collections collections={collections}/>
      <Categories categories={categories}/>
      <ProductsGridview products={products}/>
      <CustomerReviews />
      <Brands brands={brands}/>
      <Footer/>
      
      
     
     
    </main>
  );
}
