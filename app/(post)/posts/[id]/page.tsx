import React from "react";
import { getAllIds, getComment, getLike, getPost } from "../../../lib/data";
import { Metadata, ResolvingMetadata } from "next";
import Comment from "@/app/ui/main/Comment";
import { LikeType, PostType, Props } from "@/app/lib/definations";
import PostLike from "@/app/ui/main/PostLike";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { Content } from "next/font/google";

// export const dynamicParams = false;

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
    description: post?.content,
  };
}

// export async function generateStaticParams() {
//   const ids = await getAllIds();

//   return ids.map((id) => ({
//     id: id.id,
//   }));
// }

async function postDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await getPost(params.id);
  const comments = await getComment(post?.id as string);
  const session = await getServerSession(authOptions);
  const like = await getLike(session?.user.userId as string, post?.id!);

  return (
    <div className="w-full min-h-screen ">
      <div className="content flex flex-col justify-center mt-20 mx-1 md:mx-24 lg:mx-32">
        <div dir="rtl" className={`text-3xl mx-auto mt-2 pr-4`}>
          {post?.title}
        </div>

        <div className="md:mx-auto mt-10 min-h-screen bg-slate-100 min-w-full text-right p-10  ">
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
          {post?.videoUrl && <video src={`${post?.videoUrl}`}> ویدئو</video>}
          <p
            className="mt-8 min-h-fit font-thin text-lg whitespace-pre-wrap leading-8 "
            dir="rtl"
          >
            {" "}
            {post?.intro}
          </p>
          {post?.imageUrl2 && (
            <Image
              alt="post image"
              src={post.imageUrl2}
              width={1366}
              height={768}
              className="w-full h-[300px] px-0 mx-0  object-cover"
            />
          )}

          <p
            className="mt-8 min-h-fit font-thin text-lg whitespace-pre-wrap leading-8 "
            dir="rtl"
          >
            {" "}
            {post?.content}
          </p>
          <p
            className="mt-8 min-h-fit font-thin text-lg whitespace-pre-wrap leading-8 "
            dir="rtl"
          >
            <span className="text-center text-xl font-bold py-4 block">
              {" "}
              سخن پایانی
            </span>{" "}
            <br /> {post?.conclusion}
          </p>
        </div>
        {session && (
          <div className="mx-10 mt-2">
            <PostLike postData={post as PostType} likeData={like as LikeType} />
          </div>
        )}

        <div className="m-auto my-10 w-full text-center">
          <Comment postId={post?.id as string} comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default postDetail;
