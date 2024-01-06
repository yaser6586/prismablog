import Link from "next/link";
import React from "react";
import { MdOutlineDoneOutline } from "react-icons/md";

function ResetSuccessfulPage() {
  return (
    <div className="w-full flex flex-col justify-center min-h-[300px]">
      <div className="m-auto text-2xl"> پسورد شما با موفقیت ریست شد</div>
      <div className="m-auto text-green-600">
        <MdOutlineDoneOutline size={45} />
      </div>
      <Link href="/signin" className="m-auto text-blue-600">
        بازگشت به صفحه ورود
      </Link>
    </div>
  );
}

export default ResetSuccessfulPage;
