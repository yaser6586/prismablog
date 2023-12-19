"use client";
import { addComment } from "@/app/lib/action";
import { getComment } from "@/app/lib/data";
import { CommentType } from "@/app/lib/definations";
import { stringify } from "querystring";
import React, { useState } from "react";
import { BsSendArrowUp } from "react-icons/bs";

function Comment({
  postId,
  comments,
}: {
  postId: string;
  comments: CommentType[];
}) {
  const [comment, setComment] = useState("");

  return (
    <div className="commentContainer w-full h-fit flex flex-col justify-center gap-4">
      <div className="relative ">
        <input
          type="text"
          placeholder="نظر خود را اینجا بنوسید"
          className="input input-bordered input-md w-full"
          dir="rtl"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="absolute left-3 top-2"
          onClick={() => {
            addComment(comment, postId);
            setComment("");
          }}
        >
          <BsSendArrowUp size={35} style={{ transform: "rotate(-90deg)" }} />
        </button>
      </div>

      <div className=" m-auto w-full">
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-200"
        >
          <div className="collapse-title text-sm font-medium "></div>
          <div className="collapse-content">
            {comments?.map((cm) => (
              <p
                className="border-b-2 border-slate-300 py-2 text-right text-xs"
                dir="rtl"
              >
                {cm.comment}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
