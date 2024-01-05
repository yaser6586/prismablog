"use client";
import { resetPasswordEmail } from "@/app/lib/action";
import React, { useState } from "react";

function forgetPassPage() {
  const [error, setError] = useState<string | undefined>();
  async function handleSubmit(data: FormData) {
    const result = await resetPasswordEmail(data);
    setError(result.error);
  }
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="flex flex-col m-auto my-3 h-[300px] justify-center align-middle w-[500px] border-2 border-blue-700">
        <div className="m-auto mt-4 ">
          برای دریافت ایمیل حاوی لینک ریست پسورد ایمیل خود را وارد نمایید
        </div>
        <div className="m-auto mt-7 w-full ">
          <form
            action={handleSubmit}
            className="m-auto text-center flex-col gap-2 "
          >
            <div>
              <input
                type="email"
                name="email"
                className="input input-primary  w-[400px] my-3"
              />
            </div>
            <div>
              <input
                type="submit"
                value="ارسال"
                className="btn btn-primary mx-3 min-w-[200px] "
              />
            </div>
          </form>
        </div>
      </div>
      <div className="text-center text-red-700 py-5">{error}</div>
    </div>
  );
}

export default forgetPassPage;
