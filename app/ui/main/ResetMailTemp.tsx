import React from "react";

function ResetMailTemp({ name, token }: { name: string; token: string }) {
  return (
    <div className="w-full flex flex-col justify-center">
      <div dir="rtl" className="m-auto">
        سلام {name}
      </div>
      <div className="m-auto" dir="rtl">
        ` اخیرا کسی تقاضای ریست رمز کاربری شما را برای ما فرستاده است. اگر شما
        نبوده اید این ایمیل را نادیده بگیرید و اگر شما این در خواست را فرستاده
        اید از طریق اینک زیر پسورد خو را ریست کنید
        <br />
        <a dir="rtl" href={`https://teknext.ir/passwordReset/${token}`}>
          https://teknext.ir/passwordReset/${token}
        </a>
        <br />
        واحد امنیت سایت تک نکست`
      </div>
    </div>
  );
}

export default ResetMailTemp;
