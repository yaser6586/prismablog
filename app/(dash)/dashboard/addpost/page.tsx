import { Children } from "react";
import { addPost } from "../../../lib/action";

async function page() {
  return (
    <div className="flex flex-col justify-center m-14  text-center">
      <form action={addPost} className="m-auto">
        <input
          type="text"
          placeholder="Type here"
          id="title"
          name="title"
          className="input input-bordered input-md w-full max-w-xs m-4 min-w-full"
          required
        />
        <textarea
          placeholder="Bio"
          id="body"
          name="body"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs m-4 min-h-[300px] min-w-full"
          required
        ></textarea>
        <div className="text-center m-10">
          <button type="submit" className="btn btn-info m-4 min-w-full ">
            add
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
