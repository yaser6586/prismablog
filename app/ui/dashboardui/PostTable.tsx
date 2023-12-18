"use client";
import React, { use, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { deletePost, handleEditPost } from "@/app/lib/action";

function PostTable({ postData, index }: { postData: PostType; index: number }) {
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState(postData.content);

  return (
    <>
      <div className="border-b-2 border-slate-600 py-2">{index + 1}</div>
      <div className="border-b-2 border-slate-600 py-2">{postData.title}</div>
      <div className="border-b-2 border-slate-600 py-2">
        {postData.content?.slice(0, 10)}
      </div>
      <div className="border-b-2 border-slate-600 flex flex-col md:flex-row gap-5 py-2">
        <button
          className="text-blue-500"
          onClick={() => setShowEditDialog(true)}
        >
          <FaRegEdit size={30} />
        </button>
        <button className="text-red-600" onClick={() => setShowDelDialog(true)}>
          <RiDeleteBin5Line size={30} />
        </button>
        {showDelDialog && (
          <div
            className="absolute  w-[400px] h-[150px] bg-slate-400 backdrop-blur-sm 
          bg-opacity-10 top-1/2 right-10 md:top-32 md:right-[450px] flex flex-col justify-center"
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
        {showEditDialog && (
          <div
            className=" m-auto top-10 left-1/4 w-[300px] h-[450px] md:w-[650px] md:h-[550px]  absolute 
             bg-slate-400 backdrop-blur-md
          bg-opacity-10  md:top-0 md:right-80 pt-10 px-0 flex flex-col justify-center"
          >
            <div className="text-center">
              <input
                name="title"
                className="input input-bordered px-10 input-md w-[270px] max-w-xs md:min-w-[500px] "
                required
                value={title as string}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="text-center">
              <textarea
                name="body"
                className="textarea textarea-bordered textarea-lg mx-auto max-w-xs  min-h-[300px]  md:min-w-[500px]"
                required
                value={body as string}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center m-auto">
              <button
                className="btn btn-info m-4  "
                onClick={() => {
                  handleEditPost(postData.id, title, body as string);
                  setTimeout(() => {
                    setShowEditDialog(false);
                  }, 2000);
                }}
              >
                update
              </button>
              <button
                className="btn btn-error"
                onClick={() => setShowEditDialog(false)}
              >
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostTable;
