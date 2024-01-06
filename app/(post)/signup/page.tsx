"use client";
import { createNewUser } from "@/app/lib/action";
import { SecureUser, SignUpInputs, UserType } from "@/app/lib/definations";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";

function SignUpPage() {
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [newUser, setNewUser] = useState<SecureUser | undefined>();
  const [isSuccessful, setIsSuccessful] = useState<string | undefined>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    reset,

    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const result = await createNewUser(data);
    result.message && setMessage(result.message);
    result.rest && setNewUser(result.rest);
    result.error && setError(result.error);
    result.status && setIsSuccessful(result.status);

    router.push("/signup#errorMessage");
  };
  useEffect(() => {
    if (isSuccessful && isSubmitSuccessful) {
      reset();
      setError("");
    }
  }, [isSuccessful]);

  return (
    <div className="min-h-screen text-center w-full relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="justify-center flex flex-col gap-3 mt-10 border-2 bg-slate-300 backdrop-blur-md bg-opacity-40 w-[350px]  md:w-[450px] min-h-[600px] m-auto relative text-center "
        lang="en"
      >
        <div className=" m-auto mb-2 font-bold">عضویت در سایت</div>
        <div className=" m-auto mb-2 ">
          {" "}
          قبلا در سایت عضو شده اید ؟{" "}
          <Link href={"signin"} className="text-blue-700">
            {" "}
            ورود به سایت
          </Link>
        </div>
        <div dir="rtl" className="flex flex-col justify-start mr-2 pt-2">
          <label htmlFor="name">نام </label>
          <input
            defaultValue=""
            {...register("name", {
              required: "لطفا فیلد نام را پر کنید",
              maxLength: {
                value: 20,
                message: "تعداد کاراکتر بیش از حد مجاز است",
              },
            })}
            className="input input-bordered input-info w-full max-w-xs m-auto  "
          />
          <p className="text-red-600 text-xs pt-1">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col justify-start mr-2 ">
          <label htmlFor="email">ایمیل </label>
          <input
            defaultValue=""
            {...register("email", {
              required: "لطفا ایمیل خود را وارد کنید",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "فرمت ایمیل اشتباه است",
              },
            })}
            className="input input-bordered input-info w-full max-w-xs m-auto"
          />
          <p className="text-red-600 text-xs pt-1">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col justify-start mr-2">
          <label htmlFor="username">یوزر</label>
          <input
            defaultValue=""
            {...register("username", {
              required: "لطفا فیلد یوزر را پر کنید",
              minLength: {
                value: 4,
                message: "یوزر باید حداقل 6 کاراکتر داشته باشد",
              },
              pattern: {
                value: /^[a-z\d]+$/,
                message: "فرمت یوزر اشتباه است ",
              },
            })}
            className="input input-bordered input-info w-full max-w-xs m-auto "
          />
          <p className="text-red-600 text-xs pt-1">
            {errors.username?.message}
          </p>
        </div>
        <div className="flex flex-col justify-center mr-2">
          <label htmlFor="password">پسورد</label>
          <input
            type="password"
            defaultValue=""
            {...register("password", {
              minLength: {
                value: 6,
                message: "تعداد کاراکتر نباید کمتر از 6 باشد",
              },
              required: "لطفا فیلد پسورد را پر کنید",
            })}
            className="input input-bordered input-info w-full max-w-xs m-auto "
          />
          <p className="text-red-600 text-xs pt-1">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex flex-col justify-center mr-2">
          <label htmlFor="confirmPassword">تکرار پسورد </label>
          <input
            type="password"
            defaultValue=""
            {...register("confirmPassword", {
              validate: (value) => {
                const { password } = getValues();
                if (value !== password)
                  return "تکرار پسورد با پسورد برابر نیست";
              },
              required: "لطفا فیلد  تکرار پسورد را پر کنید",
            })}
            className="input input-bordered input-info w-full max-w-xs m-auto"
          />
          <p className="text-red-600 text-xs pt-1">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-[200px] mt-5">
            عضویت
          </button>
        </div>
        <div>توجه : لطفا تمای فیلدها را با حروف انگلیسی پر کنید</div>
      </form>
      {/* {isSuccessful && (
        <div className="absolute top-10 right-[5%] md:right-[35%] w-[400px] h-[200px] bg-green-500 backdrop-blur-md bg-opacity-50 flex flex-col justify-center gap-2">
          <div className="font-bold">کاربر با موفقیت ایجاد شد</div>
          <div className="flex flex-row gap-2 px-36">
            <button
              className=" w-20 m-auto text-red-700 "
              onClick={() => setIsSuccessful(false)}
              title="بستن"
            >
              <IoClose size={30} />
            </button>{" "}
            <Link
              href={"/api/auth/signin"}
              className="m-auto text-blue-700 "
              title="رفتن به صفحه ورود"
            >
              <FaLongArrowAltRight size={30} />
            </Link>
          </div>
        </div>
      )} */}
      <div className="text-lg text-red-700 my-2" id="errorMessage">
        {error}
      </div>
      <div className="text-lg text-green-700 my-2" id="errorMessage">
        {message}
      </div>
      {newUser && (
        <div className="flex flex-col justify-center">
          <div className="m-auto" dir="rtl">
            {newUser?.name} عزیز خوش آمدید
          </div>
          <div className="m-auto my-2" id="errorMessage">
            <Link href={"/signin"} className="text-blue-700">
              {" "}
              رفتن به صفحه ورود
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
