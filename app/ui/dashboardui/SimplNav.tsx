"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { PiSignIn } from "react-icons/pi";
// import { NotoKufiArabic } from "@/app/layout";

function SimpleNave() {
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
                <Link href={"#"} className="hover:text-black">
                  دسته بندی
                </Link>
              </button>
            </div>
            <div>
              <Link href={"search"} className="hover:text-black">
                جستجو
              </Link>
            </div>
            <div>
              <Link href={"#"} className="hover:text-black">
                درباره
              </Link>
            </div>
            {!session && (
              <div>
                <Link href={"signup"} className="hover:text-black">
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
                  <Link href={"dashboard"} className="hover:text-black">
                    داشبورد
                  </Link>
                </div>
              )}
              <div>
                <button onClick={toggleCatMenu}>
                  <Link
                    href={"javascript:void(0)"}
                    className="hover:text-black"
                  >
                    دسته بندی
                  </Link>
                </button>
              </div>
              <div>
                <Link href={"search"} className="hover:text-black">
                  جستجو
                </Link>
              </div>
              <div>
                <Link href={"#"} className="hover:text-black">
                  درباره
                </Link>
              </div>
              {!session && (
                <div>
                  <Link href={"signup"} className="hover:text-black">
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
         rounded-xl right-44 top-12 md:right-[250px]  lg:right-[450px]   "
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
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar mx-2 "
                >
                  <div className="w-10 rounded-full">
                    <div className="avatar placeholder">
                      <div className="bg-blue-900 text-neutral-content rounded-full w-12 flex flex-col justify-center align-middle">
                        <span className="text-[10px] mr-[6px] mb-1">
                          {session?.user.name?.slice(0, 2).toLocaleUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 mx-2  z-[1] p-2 shadow bg-slate-400 bg-opacity-40 backdrop-blur-md rounded-box w-52  "
                >
                  <li>
                    <Link href={""} className="justify-end">
                      پروفایل
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="justify-end"
                      href={""}
                      onClick={() => signOut()}
                    >
                      خروج
                    </Link>
                  </li>
                </ul>
              </div>
            </>
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
          {session !== null ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <div className="avatar placeholder">
                      <div className="bg-blue-900 text-neutral-content rounded-full w-12 flex flex-col justify-center align-middle">
                        <span className="text-[10px] mr-[6px] mb-1">
                          {session?.user.name?.slice(0, 2).toLocaleUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-400 bg-opacity-40 backdrop-blur-md rounded-box w-52 "
                >
                  <li>
                    <Link href={""} className="justify-between">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link href={""} onClick={() => signOut()}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </>
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
