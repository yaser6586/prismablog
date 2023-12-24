import { getAllComments } from "@/app/lib/data";
import { CommentType } from "@/app/lib/definations";
import CommentsList from "@/app/ui/dashboardui/CommentsList";
import Link from "next/link";
import React from "react";
import { FcNext } from "react-icons/fc";

async function editComment({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.p === "string" ? Number(searchParams.p) : 0;
  const limit =
    typeof searchParams.l === "string" ? Number(searchParams.l) : 20;
  const comments: CommentType[] = await getAllComments(page, limit);
  const max = Math.ceil(comments.length) / limit;
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
      <div className="text-center flex justify-center m-8">
        {page > 0 && (
          <Link
            href={`http://localhost:3000/dashboard/editcomments?p=${
              page > 1 ? page - 1 : 0
            }`}
          >
            <FcNext size={30} style={{ transform: "rotate(-180deg)" }} />
          </Link>
        )}
        <h3 className="mt-2 text-sm">page {page + 1}</h3>
        {page < max && (
          <Link
            href={`http://localhost:3000/dashboard/editcomments?p=${
              page < max ? page + 1 : max
            }`}
            // className="btn btn-outline btn-accent m-5 "
          >
            <FcNext size={30} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default editComment;
