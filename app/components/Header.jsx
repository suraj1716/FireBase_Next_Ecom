import { Heart, LogOut, Search, ShoppingCart, UserCircle } from "lucide-react"
import Link from "next/link"
import LogoutButton from "../admin/components/LogOutButton"
import AuthContextProvider from "@/contexts/AuthContext"
import HeaderClientButtons from "./HeaderClientButtons"

export default function Header(){
    const menuList=[
        {
        name:"Home",
        link:"/"
    },
    {
        name:"About us",
        link:"/about-us"
    },
    {
        name:"Contact us",
        link:"/contact-us"
    },
]
return <nav className="sticky top-0 z-50 bg-white bg-opacity-65 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between">
    
    <img className="h-4 md:h-5" src="/file.svg" alt="Logo"/>
    <div className="md:flex gap-2 items-center font-semibold">
        {menuList?.map((item)=>{
            return (
            <Link href={item?.link}>
                <button className="text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
                {item?.name}
                </button>
            </Link>
            )    
    })}
    </div>
    <div className="flex items-center gap-1">
     <Link href={`/search`}>
          <button
            title="Search Products"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <Search size={14} />
          </button>
        </Link>

      <AuthContextProvider>
        <HeaderClientButtons/>
      </AuthContextProvider>

        <Link href={`/account`}>
          <button
            title="My Account"
            className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
          >
            <UserCircle size={14} />
          </button>
        </Link>
        
<AuthContextProvider>
        <LogoutButton size={14} />
        </AuthContextProvider>
        </div>

        

    {/* <Link href={"/login"}>
    <button className="bg-blue-600 px-5 font-bold py-2 rounded-full text-white">Login</button>
    </Link> */}
</nav> 
}