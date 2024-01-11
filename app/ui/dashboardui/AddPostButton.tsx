import React from "react";
import { useFormStatus } from "react-dom";

function AddPostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className=" btn btn-wide bg-primary mb-4 hover:text-green-700 pr-8"
      title="آپلود"
    >
      {pending ? <progress className="progress w-14"></progress> : " add post"}
    </button>
  );
}

export default AddPostButton;
