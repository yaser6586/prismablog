"use client";
import { CommentType } from "@/app/lib/definations";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { deleteComment } from "@/app/lib/action";
function CommentsList({
  commentData,
  index,
}: {
  commentData: CommentType;
  index: number;
}) {
  const [showDelMenu, setShowDelMenu] = useState(false);
  return (
    <>
      <div className="grid grid-cols-3 p-3 border-slate-400 border-b-[1px]">
        <div className="font-medium">{index + 1}</div>
        <div className="font-medium">{commentData.comment}</div>
        <div className="font-medium text-center">
          <div className="text-red-600 ">
            <button
              type="button"
              title="delete the comment"
              onClick={() => setShowDelMenu(true)}
            >
              {" "}
              <RiDeleteBin5Line size={30} />
            </button>
          </div>
        </div>
        {showDelMenu && (
          <div className="absolute w-[500px] h-[150px] top-3 right-72 backdrop-blur-lg bg-opacity-20 bg-slate-300 flex flex-col">
            <div className="m-auto">Do yo want to delete the comment ? </div>
            <div className="flex flex-row justify-center gap-3 m-auto">
              <div>
                <button
                  className="btn btn-info m-auto"
                  onClick={() => {
                    deleteComment(commentData.id);
                    setShowDelMenu(false);
                  }}
                >
                  Yes i do
                </button>
              </div>
              <div>
                <button className="btn btn-error m-auto">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CommentsList;
