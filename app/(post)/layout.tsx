import Link from "next/link";
import React from "react";
import { TiFolderAdd } from "react-icons/ti";
import { BiEdit, BiCommentError } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import { manrope, nunito, ptserif, smoochSans } from "../ui/font";
import SimpleNave from "../ui/dashboardui/SimplNav";
import { PiUserListBold } from "react-icons/pi";
import Footer from "../ui/main/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ">
      <SimpleNave />

      {children}
    </div>
  );
}

export default Layout;
