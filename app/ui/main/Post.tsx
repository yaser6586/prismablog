import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiReadCvLogoBold } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { PostType } from "@/app/lib/definations";
import { getComment } from "@/app/lib/data";

async function Post({ postData }: { postData: PostType }) {
  const comments = await getComment(postData.id);
  return (
    <div
      className="post flex flex-col w-[300px] h-[320px] border
     bg-white justify-center mx-auto my-3 rounded-lg"
    >
      {postData.imageUrl ? (
        <Image
          alt="post image"
          src={postData.imageUrl}
          width={300}
          height={150}
          className="m-auto mt-0 w-full max-h-[170px] rounded-t-lg "
        />
      ) : (
        <Image
          alt="post image"
          src="/post.jpg"
          width={300}
          height={150}
          className="m-auto mt-0 w-full max-h-[170px] rounded-t-lg "
        />
      )}

      <div className={`text-l m-auto font-bold`}>{postData.title}</div>
      <p className={`m-auto text-xs justify-end `}>
        ...{postData.content?.slice(0, 35)}
      </p>
      <button className="  btn  btn-info btn-xs w-auto  m-auto my-2 ">
        <Link
          href={`/${postData.id}`}
          className="flex flex-row gap-1 text-white"
        >
          بیشتر
          <PiReadCvLogoBold size={15} />
        </Link>
      </button>
      <div className="flex flex-row justify-between mx-4">
        <div className="flex flex-row ">
          <div>
            <AiOutlineLike />
          </div>
          <div className="text-[10px] mx-[3px] my-1 ">230</div>
        </div>
        <div className="flex flex-row">
          <div>
            <GoComment />
          </div>
          <div className="text-[10px] mx-[3px]">{comments.length}</div>
        </div>
        <div className="flex flex-row">
          <div>
            <IoEyeOutline />
          </div>
          <div className="text-[10px] mx-[3px]">1k</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
