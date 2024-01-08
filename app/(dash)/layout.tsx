import Link from "next/link";
import React from "react";
import { TiFolderAdd } from "react-icons/ti";
import { BiEdit, BiCommentError } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
// import { manrope, notoKufi, nunito, ptserif, smoochSans } from "../ui/font";
import SimpleNave from "../ui/dashboardui/SimplNav";
import { PiUserListBold } from "react-icons/pi";
import SimpleHeroSection from "../ui/dashboardui/simpleHeroSection";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ">
      <div>
        <SimpleHeroSection />
      </div>
      <div lang="fa" className="flex flex-col md:flex-row font-sans">
        <div className="sidbar basis-1/4   min-h-screen  text-blue-800 hidden md:block ">
          <div className={` flex flex-col justify-center  `}>
            <Link
              href="/dashboard/addpost"
              className="m-auto p-4 w-full text-center  hover:text-black "
            >
              <div className="flex flex-row justify-center">
                <div className="basis-1/3  pl-16">
                  <TiFolderAdd size={30} />
                </div>
                <div className="basis-2/3 text-xl text-left tracking-tighter ">
                  {" "}
                  new post
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/editpost"
              className="m-auto p-4  hover:text-black w-full text-center"
            >
              <div className="flex flex-row justify-center">
                <div className="basis-1/3  pl-16">
                  <FaRegListAlt size={25} />
                </div>
                <div className="basis-2/3 text-xl text-left tracking-tighter">
                  {" "}
                  edit post
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/editcomments"
              className="m-auto p-4  hover:text-black w-full text-center"
            >
              <div className="flex flex-row justify-center">
                <div className="basis-1/3  pl-16">
                  <BiCommentError size={25} />
                </div>
                <div className="basis-2/3 text-xl text-left tracking-tighter">
                  {" "}
                  comments
                </div>
              </div>
            </Link>

            <Link
              href={"#"}
              className="m-auto p-4  hover:text-black w-full text-center"
            >
              <div className="flex flex-row justify-center">
                <div className="basis-1/3  pl-16 mt-1">
                  <PiUserListBold size={25} />
                </div>
                <div className="basis-2/3 text-xl tracking-tighter text-left ">
                  {" "}
                  list of users
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-row w-full h-full  md:hidden  ">
          <button className="btn btn-info rounded-b-xl rounded-t-none text-slate-50">
            <Link href={"/dashboard/addpost"} title="add post">
              <TiFolderAdd size={35} />
            </Link>
          </button>
          <button
            className="btn btn-info rounded-b-xl rounded-t-none text-slate-50"
            name="addpost"
          >
            <Link href={"/dashboard/editpost"} title="edit posts">
              <FaRegListAlt size={30} />
            </Link>
          </button>
          <button className="btn btn-info rounded-b-xl rounded-t-none text-slate-50">
            <Link href={"/dashboard/editcomments"} title="comments">
              <BiCommentError size={30} />
            </Link>
          </button>
          <button className="btn btn-info rounded-b-xl rounded-t-none text-slate-50">
            <Link href={""} title="list of users">
              <PiUserListBold size={30} />
            </Link>
          </button>
        </div>
        <div className="main basis-3/4 bg-slate-100 min-h-screen ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
