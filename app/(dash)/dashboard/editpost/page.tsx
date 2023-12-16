import { getAllPosts } from "@/app/lib/data";
import PostTable from "@/app/ui/dashboardui/PostTable";
import React from "react";

async function editPost() {
  const posts: PostType[] = await getAllPosts();
  return (
    <div className="flex flex-col relative">
      <div className="grid grid-cols-4 my-4 ml-2 border-b-2 border-slate-600 font-bold">
        <div>index</div>
        <div>title</div>
        <div>body</div>
        <div>operations</div>
      </div>
      <div
        className="w-full h-fit grid
       grid-cols-4 pl-2  "
      >
        {posts.reverse().map((pt, i) => (
          <PostTable key={1} postData={pt} index={i} />
        ))}
      </div>
    </div>
  );
}

export default editPost;
