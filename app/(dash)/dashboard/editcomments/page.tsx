import { getAllComments } from "@/app/lib/data";
import { CommentType } from "@/app/lib/definations";
import CommentsList from "@/app/ui/dashboardui/CommentsList";
import React from "react";

async function editComment() {
  const comments: CommentType[] = await getAllComments();
  return (
    <div className="w-full min-h-screen relative">
      <div className="comContainer flex flex-col ">
        <div className="grid grid-cols-3 p-3 border-slate-400 border-b-[1px]">
          <div className="font-medium">index</div>
          <div className="font-medium">comment</div>
          <div className="font-medium text-center">operations</div>
        </div>
        {comments?.map((cm: CommentType, i: number) => (
          <CommentsList key={cm.id} commentData={cm} index={i} />
        ))}
      </div>
    </div>
  );
}

export default editComment;
