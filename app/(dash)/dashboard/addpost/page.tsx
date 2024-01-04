import { Children } from "react";
import { addPost } from "../../../lib/action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

async function page() {
  const user = await getServerSession(authOptions);

  return (
    <div className="flex flex-col justify-center m-14  text-center">
      <form action={addPost} className="m-auto">
        <label className="form-control  min-w-full m-auto ml-4 ">
          <div className="label">
            <span className="label-text">Pick the best category name</span>
          </div>
          <select
            className="select select-bordered"
            id="category"
            name="category"
          >
            <option disabled defaultValue={"tech"}>
              select one category
            </option>
            <option>tech</option>
            <option>good news</option>
            <option>movie</option>
            <option>gadgets</option>
            <option>game</option>
          </select>
        </label>
        <input
          type="url"
          name="url"
          id="url"
          placeholder="enter image url address here"
          className="input input-bordered w-full min-w-full ml-4 my-4"
        />
        <input
          type="text"
          placeholder="Type title of post"
          id="title"
          name="title"
          className="input input-bordered input-md w-full max-w-xs m-4 min-w-full"
          required
        />
        <input
          type="text"
          placeholder="Type title of post"
          id="userId"
          name="userId"
          className="input input-bordered input-md w-full max-w-xs m-4 min-w-full"
          value={user?.user.userId}
          hidden
        />
        <textarea
          placeholder="body of post"
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
