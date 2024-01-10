import { getProfileOfUser } from "@/app/lib/data";
import { ProfileType, UserOfProfile } from "@/app/lib/definations";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function ProfileAvatar({ profile }: { profile: UserOfProfile }) {
  return (
    <>
      <div className="dropdown dropdown-end pt-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full" title={`${profile.name}`}>
            <Image
              alt="Tailwind CSS Navbar component"
              src={`${profile.ImgUrl}`}
              width={40}
              height={40}
              blurDataURL="/preload.jpg"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 mx-2  z-[1] p-2 shadow bg-slate-400 bg-opacity-40 backdrop-blur-md rounded-box w-52  "
        >
          <li>
            <Link
              href={`/profile/${profile.profileId}`}
              className="justify-end"
            >
              پروفایل
            </Link>
          </li>

          <li>
            <Link className="justify-end" href={""} onClick={() => signOut()}>
              خروج
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ProfileAvatar;
