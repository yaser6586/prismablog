import { addComment } from "@/app/lib/action";

import { CommentType } from "@/app/lib/definations";

import React, { useState } from "react";
import { BsSendArrowUp } from "react-icons/bs";
import Cm from "./Cm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";

async function Comment({
  postId,
  comments,
}: {
  postId: string;
  comments: CommentType[];
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="commentContainer w-full h-fit flex flex-col justify-center gap-1 ">
      <form action={addComment}>
        <div className="relative ">
          {session ? (
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="نظر خود را اینجا بنوسید"
              className="input input-bordered input-md w-full overflow-x-scroll pl-20"
              dir="rtl"
              maxLength={200}
            />
          ) : (
            <input
              type="text"
              name="comment"
              placeholder="برای ارسال کامنت باید به سایت وارد شوید"
              className="input input-bordered input-md w-full"
              dir="rtl"
            />
          )}

          <input
            type="text"
            id="userId"
            name="userId"
            className="hidden"
            value={session?.user.userId}
          />
          <input
            type="text"
            id="postId"
            name="postId"
            className="hidden"
            value={postId}
          />
          {session ? (
            <button
              type="submit"
              className="absolute left-3 top-2 text-blue-700"
              title="send comment"
            >
              <BsSendArrowUp
                size={35}
                style={{ transform: "rotate(-90deg)" }}
              />
            </button>
          ) : (
            <Link
              href={"/api/auth/signin"}
              className="absolute left-3 top-2 text-blue-700 btn btn-info btn-sm"
              title="برای ارسال کامنت باید به سایت وارد شوید"
            >
              ورود به سایت
            </Link>
          )}
        </div>
      </form>
      <div className="mt-10">
        {comments?.map((cm: CommentType, i: number) => (
          <Cm
            key={i}
            cm={cm}
            index={i}
            userId={session?.user.userId as string}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
