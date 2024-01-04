import { searchPost } from "@/app/lib/data";
import { PostType } from "@/app/lib/definations";
import Post from "@/app/ui/main/Post";
import React from "react";
import { CiSearch } from "react-icons/ci";

async function search({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = searchParams.search as string;
  const result = await searchPost(searchQuery);

  return (
    <div className="w-full min-h-screen text-center relative">
      <div className="w-full text-center py-10">
        <form className="flex justify-center">
          <div className=" md:min-w-[600px] relative  ">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="جستجو در مطالب"
              className="input input-ghost w-full  bg-slate-300"
              maxLength={50}
              dir="rtl"
              defaultValue={searchQuery}
            />
            <button className="absolute left-1 top-1">
              <CiSearch size={35} />
            </button>
          </div>
        </form>
      </div>
      <div dir="rtl">نتیجه جستجو برای : {searchQuery}</div>
      <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4 min-h-screen p-3 ">
        {result?.map((rs: PostType, i: number) => (
          <Post key={i} postData={rs} />
        ))}
      </div>
      {searchQuery && result.length === 0 && (
        <div
          className="m-auto text-2xl  text-center absolute top-1/3 w-full  "
          dir="rtl"
        >
          هیچ نتیجه ای برای <span className="text-blue-700">{searchQuery}</span>{" "}
          پیدا نشد
        </div>
      )}
    </div>
  );
}

export default search;
