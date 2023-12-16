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
      <div className="topNav flex flex-row w-full justify-between align-middle gap-7 my-4 ">
        <div className="logo pt-0">
          <Link href={"/"}>
            <Image alt="logo" src={"/logo1.png"} width={75} height={75} />
          </Link>
        </div>
        <div className="navContainer hidden md:block">
          <div className="nav flex flex-row gap-10  ">
            <div>
              <Link href={"/"} className="hover:text-black">
                home
              </Link>
            </div>
            <div>
              <Link href={"dashboard"} className="hover:text-black">
                dashboard
              </Link>
            </div>
            <div>
              <button onClick={toggleCatMenu}>
                <Link href={"#"} className="hover:text-black">
                  categories
                </Link>
              </button>
            </div>
            <div>
              <Link href={"#"} className="hover:text-black">
                about
              </Link>
            </div>
          </div>
        </div>
        {showMenu && (
          <div className="navMobil md:hidden ">
            <div className="nav flex flex-col gap-5 justify-center right-3 top-12 absolute bg-slate-400 backdrop-blur-md bg-opacity-40 w-40 h-44 text-center rounded-xl ">
              <div>
                <Link href={"/"} className="hover:text-black">
                  home
                </Link>
              </div>
              <div>
                <Link href={"dashboard"} className="hover:text-black">
                  dashboard
                </Link>
              </div>
              <div>
                <button onClick={toggleCatMenu}>
                  <Link href={"#"} className="hover:text-black">
                    categories
                  </Link>
                </button>
              </div>
              <div>
                <Link href={"#"} className="hover:text-black">
                  about
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
         rounded-xl right-44 top-12 md:right-[250px]  lg:right-[500px]  "
          >
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                tech
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                good news
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                movies
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                gadgets
              </Link>
            </div>
            <div className="m-auto p-3">
              <Link href={"#"} className="hover:text-black">
                game
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
      <div className="text-center my-11" onClick={() => setShowCatMenu(false)}>
        <h1 className="text-5xl font-bold">
          welcome to my <span className="text-yellow-500">website</span>
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing <br /> elit. Nulla
          incidunt laborum minus illo voluptatibus laudantium <br />{" "}
          necessitatibus accusamus non doloremque amet!
        </p>
      </div>
    </div>
  );
}

export default Navbar;
