"use client";
import { deleteComment } from "@/app/lib/action";
import { CommentType } from "@/app/lib/definations";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

function DeleteYourComment({
  commentId,
  index,
}: {
  commentId: string;
  index: number;
}) {
  return (
    <button
      className="m-auto basis-1/12 text-red-600 flex justify-end"
      onClick={() => deleteComment(commentId)}
    >
      <RiDeleteBin5Line size={25} />
    </button>
  );
}

export default DeleteYourComment;
