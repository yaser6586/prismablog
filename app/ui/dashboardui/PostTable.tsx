"use client";
import React, { use, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { deletePost, handleEditPost } from "@/app/lib/action";
import { PostType } from "@/app/lib/definations";
import AddPostButton from "./AddPostButton";
import { useFormState } from "react-dom";

const initial = {
  status: "",
  message: "",
};
function PostTable({ postData, index }: { postData: PostType; index: number }) {
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [state, formAction] = useFormState(handleEditPost, initial);

  return (
    <>
      <div className="border-b-[1px] border-slate-600 py-2">{index + 1}</div>
      <div className="border-b-[1px] border-slate-600 py-2">
        {postData.title}
      </div>
      <div className="border-b-[1px] border-slate-600 py-2">
        {postData.content?.slice(0, 10)}
      </div>
      <div className="border-b-[1px] border-slate-600 flex flex-col md:flex-row gap-5 py-2">
        <button
          className="text-blue-500"
          onClick={() => setShowEditDialog(true)}
        >
          <FaRegEdit size={30} />
        </button>
        <button className="text-red-600" onClick={() => setShowDelDialog(true)}>
          <RiDeleteBin5Line size={30} />
        </button>
        {showDelDialog && (
          <div
            className="absolute  w-[400px] h-[150px] bg-slate-400 backdrop-blur-sm 
          bg-opacity-10 top-1/2 right-10 md:top-32 md:right-[450px] flex flex-col justify-center"
          >
            <div className="m-auto">do you want to delete the post</div>
            <div className="flex flex-row m-auto">
              <button
                className="btn btn-info px-6 mr-1"
                onClick={() => {
                  deletePost(postData.id);
                  setShowDelDialog(false);
                }}
              >
                yes{" "}
              </button>
              <button
                className="btn btn-error"
                onClick={() => setShowDelDialog(false)}
              >
                cancel
              </button>
            </div>
          </div>
        )}
        {showEditDialog && (
          <div
            className=" m-auto top-10 w-full md:w-[650px] max-h-fit  absolute 
             bg-slate-400 backdrop-blur-md
          bg-opacity-10 left-0 md:top-0 md:left-80 pt-10 px-0 flex flex-col justify-center"
          >
            {/* prev */}

            <div className="flex flex-col justify-center m-14  text-center ">
              <form action={formAction} className="m-auto w-full">
                <label className="form-control w-full m-auto  ">
                  <div className="label">
                    <span className="label-text">
                      Pick the best category name
                    </span>
                  </div>
                  <select
                    className="select select-bordered w-full m-auto "
                    id="category"
                    name="category"
                  >
                    <option disabled defaultValue={postData.category as string}>
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
                  className="input input-bordered  w-full  "
                  defaultValue={postData.videoUrl as string}
                />
                <div className="m-auto flex flex-col md:w-full md:flex-row justify-between px-10 ">
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
                  className="input input-bordered input-md w-full  "
                  required
                  dir="rtl"
                  defaultValue={postData.title as string}
                />
                <input
                  type="text"
                  id="postId"
                  name="postId"
                  className="input input-bordered input-md w-full  "
                  defaultValue={postData.id}
                  hidden
                />
                <textarea
                  placeholder="مقدمه پست"
                  id="intro"
                  name="intro"
                  className="textarea textarea-bordered textarea-md w-full "
                  required
                  dir="rtl"
                  defaultValue={postData.intro as string}
                ></textarea>
                <textarea
                  placeholder="بدنه اصلی پست"
                  id="body"
                  name="body"
                  className="textarea textarea-bordered textarea-lg w-full   min-h-[200px] "
                  required
                  dir="rtl"
                  defaultValue={postData?.content as string}
                ></textarea>
                <textarea
                  placeholder="نتیجه گیری پست"
                  id="conclusion"
                  name="conclusion"
                  className="textarea textarea-bordered textarea-md w-full "
                  required
                  dir="rtl"
                  defaultValue={postData.conclusion as string}
                ></textarea>
                <div className="text-center my-2">
                  <AddPostButton title="update post" />{" "}
                  <button
                    className="btn btn-wide bg-error"
                    onClick={() => setShowEditDialog(false)}
                  >
                    close
                  </button>
                </div>
              </form>
              {state?.status === "error" ? (
                <div className="text-red-700">{state.message}</div>
              ) : (
                <div className="text-green-700">{state?.message}</div>
              )}
            </div>

            {/* end prev */}
          </div>
        )}
      </div>
    </>
  );
}

export default PostTable;
