"use client";
import { handleDeleteUploadedPhoto } from "@/app/lib/action";
import { SessionUser, UserType } from "@/app/lib/definations";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function DeleteUploadedPic() {
  const { data: session } = useSession();
  const [status, setStatus] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  return (
    <div>
      <button
        onClick={async () => {
          const result = await handleDeleteUploadedPhoto(
            // session?.user.imgUrl as string,
            session?.user.userId as string
          );
          setStatus(result.status);
          setMessage(result.message);
        }}
        className="text-red-700"
      >
        <RiDeleteBin6Line size={40} />
      </button>

      {status && status === "successful" ? (
        <div className="text-green-700">{message}</div>
      ) : (
        <div className="text-red-700">{message}</div>
      )}
    </div>
  );
}

export default DeleteUploadedPic;
