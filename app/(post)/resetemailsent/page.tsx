import Link from "next/link";
import React from "react";
import { MdOutlineDoneOutline } from "react-icons/md";

function ResetEmailSent() {
  return (
    <div className="w-full flex flex-col justify-center min-h-[300px]">
      <div className="m-auto text-2xl flex flex-col justify-center text-center">
        {" "}
        ایمیل ریست پسورد با موفقیت به آدرس ایمیل شما ارسال گردید
        <br />
        لطفا پوشه اسپم را هم چک کنید
        <br />
        <div className="text-green-700 m-auto my-4">
          <MdOutlineDoneOutline size={45} />
        </div>
      </div>
      <Link href="/" className="m-auto text-blue-600">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default ResetEmailSent;
