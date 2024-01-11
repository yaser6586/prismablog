import React from "react";
import { useFormStatus } from "react-dom";

function AddPostButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className=" btn btn-wide bg-primary mb-4 text-slate-50 hover:text-green-700 pr-8"
      title="آپلود"
    >
      {pending ? <progress className="progress w-14"></progress> : title}
    </button>
  );
}

export default AddPostButton;
