"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  function toggleCatMenu() {
    setShowCatMenu(!showCatMenu);
  }

  return (
    <div
      className="container relative flex flex-col 
    gap-10 min-w-full min-h-[450px]   bg-[url('/abstract.jpg')] bg-cover 
    bg-fixed overflow-x-auto text-slate-50"
    >
      <div className="topNav flex flex-row w-full justify-between  align-middle gap-7 my-4 ">
        <div className="logo pt-0">
          <Link href={"/"}>
            <Image alt="logo" src={"/logo1.png"} width={75} height={75} />
          </Link>
        </div>
        <div className="navContainer hidden md:block">
          <div className="nav flex flex-row-reverse gap-10  ">
            <div>
              <Link href={"/"} className="hover:text-black">
                صفحه اصلی
              </Link>
            </div>
            <div>
              <Link href={"dashboard"} className="hover:text-black">
                داشبورد
              </Link>
            </div>
            <div>
              <button onClick={toggleCatMenu}>
                <Link href={"#"} className="hover:text-black">
                  دسته بندی
                </Link>
              </button>
            </div>
            <div>
              <Link href={"#"} className="hover:text-black">
                درباره
              </Link>
            </div>
          </div>
        </div>
        {showMenu && (
          <div className="navMobil md:hidden ">
            <div className="nav flex flex-col gap-5 justify-center right-3 top-12 absolute bg-slate-400 backdrop-blur-md bg-opacity-40 w-40 h-44 text-center rounded-xl ">
              <div>
                <Link href={"/"} className="hover:text-black">
                  صفحه اصلی
                </Link>
              </div>
              <div>
                <Link href={"dashboard"} className="hover:text-black">
                  داشبورد
                </Link>
              </div>
              <div>
                <button onClick={toggleCatMenu}>
                  <Link href={"#"} className="hover:text-black">
                    دسته بندی
                  </Link>
                </button>
              </div>
              <div>
                <Link href={"#"} className="hover:text-black">
                  درباره
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* categories menu */}
        {showCatMenu && (
          <div
            className="categories absolute grid grid-cols-2 gap-4 bg-slate-400
         backdrop-blur-md bg-opacity-40 min-w-40 min-h-44 text-center justify-center
         rounded-xl right-44 top-12 md:right-[450px]  lg:right-[650px]  "
          >
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                تکنولوژی
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                خبر خوب
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                فیلم
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                گجت
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                بازی
              </Link>
            </div>
          </div>
        )}

        <div className="start hidden md:block">
          <button>get started</button>
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
      </div>
      <div
        className="flex flex-col justify-center "
        onClick={() => setShowCatMenu(false)}
      >
        <h1 className="text-5xl text-center font-bold m-auto tracking-tighter ">
          به <span className="text-yellow-500">وب سایت</span> تِک نکست خوش آمدید
        </h1>
        <p className=" m-auto my-2 text-center">
          در اینجا می توانیید از جدیدترین اخبار دنیاس تلنولوژی با خبر شوید{" "}
          <br /> در اینجا همه خبرها خبر خوب است
          <br />
          دنیای گجتها و تکنولوژی
        </p>
      </div>
    </div>
  );
}

export default Navbar;
