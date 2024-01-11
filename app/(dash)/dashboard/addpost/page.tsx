"use client";
import { addPost } from "../../../lib/action";

import AddPostButton from "@/app/ui/dashboardui/AddPostButton";

import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
const initial = {
  status: "",
  message: "",
};

async function AddPostPage() {
  const { data: session } = useSession();
  const [state, formAction] = useFormState(addPost, initial);
  return (
    <div className="flex flex-col justify-center m-14  text-center">
      <form action={formAction} className="m-auto w-full">
        <label className="form-control md:w-full m-auto ml-4 ">
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
            <option>goodnews</option>
            <option>movie</option>
            <option>gadgets</option>
            <option>game</option>
          </select>
        </label>
        <input
          type="url"
          name="videoUrl"
          id="url"
          placeholder="آدرس لینک ویدئو"
          className="input input-bordered w-[283px] md:w-full  ml-4 my-4"
        />
        <div className="m-auto py-4 flex flex-col md:w-full md:flex-row justify-between px-10 ">
          <div>
            <label htmlFor="image1">عکس اول</label>
            <input
              type="file"
              name="image1"
              id="image1"
              accept=".jpg, .jpeg, .png"
              className="pl-3"
            />
          </div>
          <div>
            <label htmlFor="image2">عکس دوم</label>
            <input
              type="file"
              name="image2"
              id="image2"
              accept=".jpg, .jpeg, .png"
              className="pl-3"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="تایتل پست"
          id="title"
          name="title"
          className="input input-bordered input-md w-full  m-4 "
          required
          dir="rtl"
        />
        <input
          type="text"
          id="userId"
          name="userId"
          className="input input-bordered input-md w-full m-4 "
          defaultValue={session?.user.userId}
          hidden
        />
        <textarea
          placeholder="مقدمه پست"
          id="intro"
          name="intro"
          className="textarea textarea-bordered textarea-md w-full   m-4 "
          required
          dir="rtl"
        ></textarea>
        <textarea
          placeholder="بدنه اصلی پست"
          id="body"
          name="body"
          className="textarea textarea-bordered textarea-lg w-full  m-4 min-h-[300px] "
          required
          dir="rtl"
        ></textarea>
        <textarea
          placeholder="نتیجه گیری پست"
          id="conclusion"
          name="conclusion"
          className="textarea textarea-bordered textarea-md w-full m-4 "
          required
          dir="rtl"
        ></textarea>
        <div className="text-center m-10">
          <AddPostButton title="add post" />
        </div>
      </form>
      {state?.status === "error" ? (
        <div className="text-red-700">{state.message}</div>
      ) : (
        <div className="text-green-700">{state?.message}</div>
      )}
    </div>
  );
}

export default AddPostPage;
