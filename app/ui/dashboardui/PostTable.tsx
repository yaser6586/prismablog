"use client";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { deletePost } from "@/app/lib/action";

function PostTable({ postData, index }: { postData: PostType; index: number }) {
  const [showDelDialog, setShowDelDialog] = useState(false);

  return (
    <>
      <div className="border-b-2 border-slate-600 py-2">{index + 1}</div>
      <div className="border-b-2 border-slate-600 py-2">{postData.title}</div>
      <div className="border-b-2 border-slate-600 py-2">
        {postData.content?.slice(0, 10)}
      </div>
      <div className="border-b-2 border-slate-600 flex flex-col md:flex-row gap-5 py-2">
        <button className="text-blue-500">
          <FaRegEdit size={30} />
        </button>
        <button className="text-red-600" onClick={() => setShowDelDialog(true)}>
          <RiDeleteBin5Line size={30} />
        </button>
        {showDelDialog && (
          <div
            className="absolute w-[400px] h-[150px] bg-slate-400 backdrop-blur-sm 
          bg-opacity-10 top-1/2 right-10 md:top-1/2 md:right-96 flex flex-col justify-center"
          >
            <div className="m-auto">do you want to delete the post</div>
            <div className="flex flex-row m-auto">
              <button
                className="btn btn-info px-6 mr-1"
                onClick={() => {
                  deletePost(postData.id);
                  setShowDelDialog(false);
                }}
              >
                yes{" "}
              </button>
              <button
                className="btn btn-error"
                onClick={() => setShowDelDialog(false)}
              >
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostTable;
