import { uploadAvatar } from "@/app/lib/action";
import React from "react";
import { useFormState } from "react-dom";
import UploadButton from "./UploadButton";
import { error } from "console";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const initial = {
  status: "",
  message: "",
};
function UploadForm({ onSubmit }: { onSubmit: () => any }) {
  const [state, formAction] = useFormState(onSubmit, initial);
  const { data: session } = useSession();
  return (
    <div>
      <form action={formAction} className="flex flex-row justify-center gap-3">
        <input
          type="file"
          name="file"
          id="file"
          accept=".jpg, .jpeg, .png"
          className="pl-3"
        />
        <input
          type="text"
          name="userId"
          id="userId"
          defaultValue={session?.user.userId}
          hidden
        />
        <UploadButton />
      </form>
      {state?.status === "error" ? (
        <div className="text-red-700">{state?.message}</div>
      ) : (
        <div className="text-green-700">{state?.message}</div>
      )}
    </div>
  );
}

export default UploadForm;
