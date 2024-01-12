"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignIn } from "react-icons/pi";
import { Session } from "next-auth";
import { ProfileType, UserOfProfile } from "@/app/lib/definations";
import ProfileAvatar from "../main/ProfileAvatar";
// import { NotoKufiArabic } from "@/app/layout";

function SimpleNave({ profile }: { profile: UserOfProfile }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const { data: session } = useSession();

  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  function toggleCatMenu() {
    setShowCatMenu(!showCatMenu);
  }

  return (
    <div
      className={`container flex flex-col 
    gap-10 min-w-full  bg-[url('/abstract.jpg')]  bg-cover 
    bg-fixed relative text-slate-50 `}
    >
      <div
        className={` kufi topNav flex flex-row w-full justify-between align-middle gap-7 my-4 `}
      >
        <div className="logo">
          <Link href={"/"}>
            <Image alt="logo" src={"/logo1.png"} width={75} height={75} />
          </Link>
        </div>
        <div className="navContainer hidden md:block">
          <div className="nav flex flex-row-reverse gap-10  ">
            <div>
              <Link href="/" className="hover:text-black">
                صفحه اصلی
              </Link>
            </div>
            {session && session.user.role === "ADMIN" && (
              <div>
                <Link href={"/dashboard"} className="hover:text-black">
                  داشبورد
                </Link>
              </div>
            )}
            <div>
              <button onClick={toggleCatMenu}>
                <Link
                  href={"#"}
                  className="hover:text-black"
                  onClick={(e) => e.preventDefault()}
                >
                  دسته بندی
                </Link>
              </button>
            </div>
            <div>
              <Link href={"/search"} className="hover:text-black">
                جستجو
              </Link>
            </div>
            <div>
              <Link href={"/about"} className="hover:text-black">
                درباره
              </Link>
            </div>
            {!session && (
              <div>
                <Link href={"/signup"} className="hover:text-black">
                  عضویت در سایت
                </Link>
              </div>
            )}
          </div>
        </div>
        {showMenu && (
          <div className="navMobil z-50 md:hidden ">
            <div className="nav flex flex-col gap-5 justify-center right-3 top-12 absolute bg-slate-400 backdrop-blur-md bg-opacity-40 w-40 h-56 text-center rounded-xl ">
              <div>
                <Link href={"/"} className="hover:text-black">
                  صفحه اصلی
                </Link>
              </div>
              {session && session.user.role === "ADMIN" && (
                <div>
                  <Link href={"/dashboard"} className="hover:text-black">
                    داشبورد
                  </Link>
                </div>
              )}
              <div>
                <button onClick={toggleCatMenu}>
                  <Link
                    href={"#"}
                    className="hover:text-black"
                    onClick={(e) => e.preventDefault()}
                  >
                    دسته بندی
                  </Link>
                </button>
              </div>
              <div>
                <Link href={"/search"} className="hover:text-black">
                  جستجو
                </Link>
              </div>
              <div>
                <Link href={"/about"} className="hover:text-black">
                  درباره
                </Link>
              </div>
              {!session && (
                <div>
                  <Link href={"/signup"} className="hover:text-black">
                    عضویت در سایت
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        {/* categories menu */}
        {showCatMenu && (
          <div
            className="categories z-50 absolute grid grid-cols-2 gap-4 bg-slate-400
         backdrop-blur-md bg-opacity-40 min-w-40 min-h-44 text-center justify-center
         rounded-xl right-44 top-12 md:right-[350px]  lg:right-[550px]   "
          >
            <div className="m-auto p-3" onClick={() => setShowCatMenu(false)}>
              <Link href={"/categories/tech"} className="hover:text-black">
                تکنولوژی
              </Link>
            </div>
            <div className="m-auto p-3" onClick={() => setShowCatMenu(false)}>
              <Link href={"/categories/goodnews"} className="hover:text-black">
                خبر خوب
              </Link>
            </div>
            <div className="m-auto p-3" onClick={() => setShowCatMenu(false)}>
              <Link href={"/categories/movie"} className="hover:text-black">
                فیلم
              </Link>
            </div>
            <div className="m-auto p-3" onClick={() => setShowCatMenu(false)}>
              <Link href={"/categories/gadgets"} className="hover:text-black">
                گجت
              </Link>
            </div>
            <div className="m-auto p-3" onClick={() => setShowCatMenu(false)}>
              <Link href={"/categories/game"} className="hover:text-black">
                بازی
              </Link>
            </div>
          </div>
        )}

        <div className="start hidden md:block">
          {session ? (
            <ProfileAvatar profile={profile as UserOfProfile} />
          ) : (
            <button
              className="pr-3"
              onClick={() => signIn()}
              title="ورود به سایت"
            >
              <PiSignIn size={35} />
            </button>
          )}
        </div>

        <div
          className="menu-toggle md:hidden mx-4 "
          onClick={() => {
            toggleMenu();
            setShowCatMenu(false);
          }}
        >
          {!showMenu ? <RxHamburgerMenu size={30} /> : <IoClose size={30} />}
        </div>
        <div
          className="start absolute top-2 right-[45vw] md:hidden "
          onClick={() => {
            setShowCatMenu(false);
            setShowMenu(false);
          }}
        >
          {session ? (
            <ProfileAvatar profile={profile as UserOfProfile} />
          ) : (
            <button
              className="pr-3"
              onClick={() => signIn()}
              title="ورود به سایت"
            >
              <PiSignIn size={35} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleNave;
