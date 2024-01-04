import { getUserOfComment } from "@/app/lib/data";
import { CommentType, UserType } from "@/app/lib/definations";
import React, { useEffect, useState } from "react";
import DeleteYourComment from "./DeletYourComment";

export default async function Cm({
  cm,
  index,
  userId,
}: {
  cm: CommentType;
  index: number;
  userId: string;
}) {
  const user = await getUserOfComment(cm.userId);

  return (
    <div className="flex justify-center flex-row-reverse border-b-2 border-slate-300 py-2 text-right text-xs">
      <div className="m-auto  basis-1/12">
        <div className="avatar placeholder" title={`${user?.name}`}>
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            <span className="text-xs">
              {user?.name?.slice(0, 2).toLocaleUpperCase()}
            </span>
          </div>
        </div>{" "}
      </div>
      <div className=" m-auto  flex basis-11/12 justify-end" dir="rtl">
        <div className="m-auto basis-11/12 flex flex-col">
          <h1 className="font-semibold text-blue-600">{user?.name}</h1>
          <div className="mt-1">{cm.comment}</div>
        </div>
        {userId === cm.userId ? (
          <DeleteYourComment commentId={cm.id} index={index} />
        ) : (
          <div className="m-auto basis-1/12 "></div>
        )}
      </div>
    </div>
  );
}
