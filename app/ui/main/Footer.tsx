import React from "react";
import { nunito, ptserif, smoochSans } from "../font";
import { Inter } from "next/font/google";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });
function Footer() {
  return (
    <div className="mt-6 m-auto">
      <footer
        className={`${inter.className} footer footer-center p-10 bg-base-200 text-base-content rounded `}
      >
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaInstagram size={27} />
            </a>
            <a>
              <FaYoutube size={27} />
            </a>
            <a>
              <FaTelegramPlane size={27} />
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2023 - All right reserved by TechNext</p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
