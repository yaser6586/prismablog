"use client";
import { ProfileType, UserType } from "@/app/lib/definations";
import Image from "next/image";
import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { FaRegEdit, FaSleigh } from "react-icons/fa";
import { useSession } from "next-auth/react";
import UploadForm from "./UploadForm";
import { changProfile, uploadAvatar } from "@/app/lib/action";
import { GrClose } from "react-icons/gr";
import { TfiSave } from "react-icons/tfi";
import { AiOutlineCloseSquare } from "react-icons/ai";

import DeleteUploadedPic from "./DeleteUploadedPic";

function Profile({
  profileData,
  user,
}: {
  profileData: ProfileType;
  user: UserType;
}) {
  const [showAddAvatarMenu, setShowAddAvatarMenu] = useState(false);
  const [showChangeProfileMenu, setShowChangeProfileMenu] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const { data: session } = useSession();

  let content;
  if (!session) {
    content = (
      <div className="m-auto flex justify-center min-h-screen w-full relative">
        <div className=" m-auto flex flex-col justify-center w-11/12 lg:w-/2 md:w-2/3 border-2 min-h-screen ">
          <div className="m-auto text-3xl">پروفایل</div>
          <div className="m-auto flex flex-col justify-center">
            <div className="avatar m-auto">
              <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Image
                  alt="profile pic"
                  src={`${profileData?.user.imgUrl}`}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
          <div className="m-auto text-2xl">نام : {profileData?.name}</div>
          <div className="m-auto text-2xl">بیو : {profileData?.bio}</div>
          <div className="m-auto"></div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="m-auto flex justify-center min-h-screen w-full relative">
        <div className=" m-auto flex flex-col justify-center w-11/12 lg:w-/2 md:w-2/3 border-2 min-h-screen ">
          <div className="m-auto text-3xl">پروفایل</div>
          <div className="m-auto flex flex-col justify-center">
            <div className="avatar m-auto">
              <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Image
                  alt="profile pic"
                  src={`${profileData.user.imgUrl}`}
                  width={200}
                  height={200}
                />
              </div>
            </div>
            {session?.user.userId === profileData.userId && (
              <button
                onClick={() => setShowAddAvatarMenu(true)}
                className="m-auto mt-2"
                title="اضافه کردن عکس"
              >
                <FcAddImage size={40} />
              </button>
            )}
          </div>
          <div className="m-auto text-2xl">نام : {profileData?.name}</div>
          <div className="m-auto text-2xl">بیو : {profileData?.bio}</div>
          <div className="m-auto">
            {session?.user.userId === profileData.userId && (
              <button
                onClick={() => {
                  setShowChangeProfileMenu(true);
                }}
              >
                <FaRegEdit size={40} />
              </button>
            )}
          </div>
        </div>
        {showAddAvatarMenu && (
          <div
            className="flex flex-col justify-center bg-slate-400 w-[300px] h-[200px] gap-0
           align-middle absolute top-1/3 right-1/2.1 backdrop-blur-md bg-opacity-40 rounded-lg"
          >
            <div className="m-auto border-b-2 w-full text-center hover:text-black cursor-pointer">
              <UploadForm onSubmit={uploadAvatar as () => any} />
            </div>
            <div className="m-auto border-b-2 w-full text-center hover:text-black cursor-pointer">
              <DeleteUploadedPic />
            </div>
            <div className="m-auto  text-center hover:text-black cursor-pointer ">
              <button
                className="text-red-700"
                onClick={() => setShowAddAvatarMenu(false)}
              >
                <GrClose size={30} />
              </button>
            </div>
          </div>
        )}
        {showChangeProfileMenu && (
          <div className="flex flex-col justify-center w-full md:w-1/2  top-52  bg-slate-400 backdrop-blur-md bg-opacity-40 absolute">
            <form
              action={async (data) => {
                const result = await changProfile(data);
                setError(result?.status);
                setMessage(result?.message);
              }}
              className="m-auto flex flex-col justify-center gap-3 w-full px-2"
            >
              <label htmlFor="" className="pt-2 text-center w-full ">
                {" "}
                توجه : فیلدهایی را که نمی خواهید آپدید کنید را خالی بگذارید
              </label>
              <label htmlFor="name" className="m-auto w-full text-center">
                نام
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full "
                maxLength={20}
                defaultValue={profileData.name}
              />
              <label htmlFor="bio" className="m-auto">
                بیو
              </label>
              <input
                type="text"
                name="bio"
                className="input input-bordered w-full "
                maxLength={400}
                defaultValue={profileData.bio as string}
              />
              <label htmlFor="email" className="m-auto">
                ایمیل
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full "
                defaultValue={user.email as string}
              />
              <input
                type="text"
                name="userId"
                defaultValue={session?.user.userId}
                hidden
              />
              {error && (
                <>
                  {error === "error" && (
                    <>
                      <div className="text-center text-red-600">{error}</div>
                      <div className="text-center text-red-600">{message}</div>
                    </>
                  )}
                  {error === "successful" && (
                    <>
                      <div className="text-center text-green-600">{error}</div>
                      <div className="text-center text-green-600">
                        {message}
                      </div>
                    </>
                  )}
                </>
              )}
              <div className="flex flex-row m-auto my-3 gap-4 text-green-700">
                {error !== "successful" ? (
                  <button type="submit" className="m-auto ">
                    <TfiSave size={35} />
                  </button>
                ) : null}
                <button
                  onClick={() => {
                    setShowChangeProfileMenu(false);
                    setError("");
                    setMessage("");
                  }}
                  type="submit"
                  className="m-auto text-red-600 "
                >
                  <AiOutlineCloseSquare size={45} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
  return content;
}

export default Profile;
