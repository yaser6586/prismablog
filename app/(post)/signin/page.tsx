import LoginForm from "@/app/ui/main/LoginForm";
import Link from "next/link";
import React from "react";

function login() {
  return (
    <div className="w-full flex justify-center align-middle">
      <div className="flex flex-col w-[400px] md:w-[400px] h-[400px] bg-slate-300 backdrop-blur-2xl bg-opacity-40 m-auto mt-8">
        <LoginForm />
        <div dir="rtl" className="m-auto text-center font-bold">
          در سایت عضو نشده اید؟{" "}
          <Link className="text-blue-800" href={"/signup"}>
            عضویت در سایت
          </Link>
        </div>
      </div>
    </div>
  );
}

export default login;
