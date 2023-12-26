"use client";
import { AddViewPost } from "@/app/lib/action";
import { PostType } from "@/app/lib/definations";
import Link from "next/link";
import React from "react";
import { PiReadCvLogoBold } from "react-icons/pi";

function PostLinker({ postData }: { postData: PostType }) {
  return (
    <>
      <Link href={`/${postData.id}`} className="flex flex-row gap-1">
        <button
          className="  btn bg-blue-700 btn-xs w-auto  m-auto my-2  text-white"
          onClick={() => AddViewPost(postData.id)}
        >
          بیشتر
          <PiReadCvLogoBold size={15} />
        </button>
      </Link>
    </>
  );
}

export default PostLinker;
