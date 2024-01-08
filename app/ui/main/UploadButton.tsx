"use client";

import { useFormStatus } from "react-dom";
import { RiImageAddLine } from "react-icons/ri";

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mb-4 hover:text-green-700 pr-3"
    >
      {pending ? (
        <progress className="progress w-10"></progress>
      ) : (
        <RiImageAddLine size={30} />
      )}
    </button>
  );
}

export default UploadButton;
