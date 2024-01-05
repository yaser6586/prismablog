import Link from "next/link";
import React from "react";

function ResetEmailSent() {
  return (
    <div className="w-full flex flex-col justify-center min-h-[300px]">
      <div className="m-auto text-2xl">
        {" "}
        ایمیل ریست پسورد با موفقیت به آدرس ایمیل شما ارسال گردید
      </div>
      <Link href="/" className="m-auto text-blue-600">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default ResetEmailSent;
