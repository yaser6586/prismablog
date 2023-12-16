import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiReadCvLogoBold } from "react-icons/pi";

function Post({ postData }: { postData: PostType }) {
  return (
    <div className="post flex flex-col w-[300px] h-[350px] border bg-slate-50 justify-center mx-auto ">
      <div className="text-2xl m-auto">{postData.title}</div>
      <Image
        alt="post image"
        src={"/post.jpg"}
        width={250}
        height={150}
        className="m-auto"
      />
      <p className="m-auto">{postData.content?.slice(0, 25)}</p>
      <button className="  btn  btn-info btn-xs w-auto  m-auto my-2 ">
        <Link
          href={`/${postData.id}`}
          className="flex flex-row gap-1 text-white"
        >
          read
          <PiReadCvLogoBold size={15} />
        </Link>
      </button>
    </div>
  );
}

export default Post;
