import { getPostByCat } from "@/app/lib/data";
import { Category, PostType } from "@/app/lib/definations";
import Post from "@/app/ui/main/Post";
import React from "react";

async function page({ params }: { params: { category: Category } }) {
  const posts = await getPostByCat(params.category);
  function convertToPer(cat: Category): string {
    switch (cat) {
      case "tech":
        return "تکنولوژی";
        break;
      case "gadgets":
        return "گجت";
        break;
      case "goodnews":
        return "خبر خوب";
        break;
      case "movie":
        return "فیلم و سریال";
        break;

      default:
        return "بازی";
        break;
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <div className="m-auto text-lg font-bold py-10">
        لیست پست های مرتبط با :{" "}
        <span className="text-blue-700 text-xl">
          {convertToPer(params.category)}
        </span>
      </div>
      <div className="m-auto grid grid-cols-1  justify-center md:grid-cols-2 lg:grid-cols-4 min-h-screen p-3 gap-3 ">
        {posts.map((pt: PostType) => (
          <Post key={pt.id} postData={pt} />
        ))}
      </div>
    </div>
  );
}

export default page;
