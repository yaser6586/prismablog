"use client";
import { AddViewPost } from "@/app/lib/action";
import { PostType } from "@/app/lib/definations";

import { useRouter } from "next/navigation";
import React from "react";
import { PiReadCvLogoBold } from "react-icons/pi";

function PostLinker({ postData }: { postData: PostType }) {
  const router = useRouter();
  return (
    <>
      {/* <Link href={`/${postData.id}`} className="flex flex-row gap-1"> */}
      <button
        className="  btn  btn-wide bg-primary m-auto my-2  text-white"
        onClick={() => {
          AddViewPost(postData.id);
          router.push(`/posts/${postData.id}`);
        }}
      >
        بخوانید
        <PiReadCvLogoBold size={15} />
      </button>
      {/* </Link> */}
    </>
  );
}

export default PostLinker;
