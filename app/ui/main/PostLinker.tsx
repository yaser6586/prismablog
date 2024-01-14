"use client";
import { AddViewPost } from "@/app/lib/action";
import { PostType } from "@/app/lib/definations";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiReadCvLogoBold } from "react-icons/pi";

function PostLinker({ postData }: { postData: PostType }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <button className="btn  btn-wide bg-slate-500 m-auto my-2  text-white flex flex-row gap-1 disabled">
          <span className="loading loading-dots loading-md"></span>
        </button>
      ) : (
        <Link
          href={`/posts/${postData.slug}`}
          onClick={() => {
            setLoading(true);
            AddViewPost(postData.slug);
          }}
          className="  btn  btn-wide bg-primary m-auto my-2  text-white flex flex-row gap-1"
        >
          بخوانید
          <PiReadCvLogoBold size={15} />
        </Link>
      )}
    </>
  );
}

export default PostLinker;
