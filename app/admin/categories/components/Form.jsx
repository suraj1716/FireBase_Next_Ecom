"use client";

import { getCategory } from "@/lib/firestore/categories/read_server";
import { createNewCategory, updateCategory } from "@/lib/firestore/categories/write";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router=useRouter()

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id });
      if (!res) {
        toast.error("Category not found");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key, value) => {
    setData((preData) => {
      return {
        ...(preData ?? {}),
        [key]: value,
      };
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewCategory({ data: data, image: image });
      toast.success("category successfully created");
      setData(null);
      setImage(null);
   
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };


  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCategory({ data: data, image: image });
      toast.success("category successfully Updated");
      setData(null);
      setImage(null);
      router.push(`/admin/categories`)
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Category</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate(); 
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="category-name text-gray-500 text-sm">
            Image<span className="text-red-500">*</span>
            {""}
          </label>
          <div className="flex justify-center items-center p-2">
            {image && <img className="h-20" src={URL.createObjectURL(image)} />}
          </div>
          <input
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            id="category-image"
            name="category-image"
            type="file"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category-name text-gray-500 text-sm">
            Name<span className="text-red-500">*</span>
            {""}
          </label>
          <input
            id="category-name"
            name="category-name"
            type="text"
            value={data?.name ?? ""}
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
            placeholder="Enter name"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category-name text-gray-500 text-sm">
            Slug<span className="text-red-500">*</span>
            {""}
          </label>
          <input
            id="category-slug"
            name="category-slug"
            type="text"
            value={data?.slug ?? ""}
            onChange={(e) => {
              handleData("slug", e.target.value);
            }}
            placeholder="Enter name"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          color="primary"
          type="submit"
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}
