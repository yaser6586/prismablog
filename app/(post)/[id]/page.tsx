import React from "react";
import { getComment, getLike, getPost } from "../../lib/data";
import { Metadata, ResolvingMetadata } from "next";
import Comment from "@/app/ui/main/Comment";
import { LikeType, PostType, Props } from "@/app/lib/definations";
import PostLike from "@/app/ui/main/PostLike";
import Image from "next/image";
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const post = await getPost(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post?.title,
  };
}

async function postDetail({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const comments = await getComment(post?.id as string);
  const like = await getLike(post?.authorId!, post?.id!);
  return (
    <div className="w-full min-h-screen ">
      <div className="content flex flex-col justify-center mt-20 mx-10 md:mx-24 lg:mx-32">
        <div className="text-3xl mx-auto mt-2">{post?.title}</div>

        <p className="mx-auto mt-10 min-h-screen bg-slate-100 min-w-full text-right p-10  ">
          {post?.imageUrl ? (
            <Image
              alt="post image"
              src={post.imageUrl}
              width={1366}
              height={768}
              className="w-full h-[300px] px-0 mx-0  object-cover"
            />
          ) : (
            <Image
              alt="post image"
              src={"/post.jpg"}
              width={1366}
              height={768}
              className="w-full h-[300px] px-0 mx-0  object-cover mb-20"
            />
          )}
          <p className="mt-8"> {post?.content}</p>
        </p>
        <div className="mx-10 mt-2">
          <PostLike postData={post as PostType} likeData={like as LikeType} />
        </div>

        <div className="m-auto my-10 w-full text-center">
          <Comment postId={post?.id as string} comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default postDetail;
