"use client";

import { useFormStatus } from "react-dom";
import { RiImageAddLine } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mb-4 hover:text-green-700 pr-8"
      title="آپلود"
    >
      {pending ? (
        <progress className="progress w-14"></progress>
      ) : (
        <LuUpload size={30} />
      )}
    </button>
  );
}

export default UploadButton;
