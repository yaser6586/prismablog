import Image from "next/image";
import Link from "next/link";
import React from "react";

import { IoEyeOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { LikeType, PostType } from "@/app/lib/definations";
import { getComment, likeNumber } from "@/app/lib/data";
import { AddViewPost, handleEditPost } from "@/app/lib/action";
import PostLinker from "./PostLinker";

async function Post({ postData }: { postData: PostType }) {
  const comments = await getComment(postData.id);
  const likeNumberData: LikeType[] = await likeNumber(postData.id);
  return (
    <div
      className="post flex flex-col w-[300px] h-[320px] border
     bg-white justify-center mx-auto my-3 rounded-lg shadow-md shadow-violet-500"
    >
      {postData.imageUrl ? (
        <Image
          alt="post image"
          src={postData.imageUrl}
          width={800}
          height={600}
          className="m-auto mt-0 w-full max-h-[170px] rounded-t-lg object-cover"
        />
      ) : (
        <Image
          alt="post image"
          src="/post.jpg"
          width={600}
          height={450}
          className="m-auto mt-0 w-full max-h-[170px] rounded-t-lg object-cover "
        />
      )}

      <div className={`text-l m-auto font-bold`}>{postData.title}</div>
      <p className={`m-auto text-xs justify-end `}>
        ...{postData.content?.slice(0, 35)}
      </p>

      <PostLinker postData={postData} />

      <div className="flex flex-row justify-between mx-4">
        <div className="flex flex-row ">
          <div>
            <AiOutlineLike />
          </div>
          <div className="text-[10px] mx-[3px] my-1 ">
            {likeNumberData.length}
          </div>
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
          <div className="text-[10px] mx-[3px]">{postData.view}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
