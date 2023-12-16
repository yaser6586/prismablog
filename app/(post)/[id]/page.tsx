import React from "react";
import { getPost } from "../../lib/data";

async function postDetail({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  return (
    <div className="w-full h-screen ">
      <div className="content flex flex-col justify-center mt-20">
        <div className="text-3xl mx-auto mt-2">{post?.title}</div>
        <p className="mx-auto mt-10">{post?.content}</p>
      </div>
    </div>
  );
}

export default postDetail;
