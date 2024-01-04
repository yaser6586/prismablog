"use client";

import { SignInInputs, SignUpInputs } from "@/app/lib/definations";

import { useForm, SubmitHandler } from "react-hook-form";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
function LoginForm() {
  const searchParams = useSearchParams();
  const LoginError = searchParams.get("error")
    ? "یوزر یا پسورد اشتباه است"
    : "";
  const Url = searchParams.get("callbackUrl");
  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm<SignInInputs>();
  const onSubmit: SubmitHandler<SignInInputs> = (data, event) => {
    event?.defaultPrevented;
    signIn("credentials", {
      username: data.username,
      password: data.password,
      callbackUrl: Url || "/",
    });
  };
  return (
    <div className=" text-center w-full m-auto relative">
      <form onSubmit={handleSubmit(onSubmit)} lang="en">
        <div className="flex flex-col justify-start mr-2">
          <label htmlFor="username" className="my-2 font-bold">
            نام کاربری
          </label>
          <input
            defaultValue=""
            {...register("username", {
              required: "لطفا فیلد یوزر را پر کنید",
            })}
            className="input input-bordered input-info w-3/4 md:w-full max-w-xs m-auto "
          />
          <p className="text-red-600 text-xs pt-1">
            {errors.username?.message}
          </p>
        </div>
        <div className="flex flex-col justify-center  mr-2 ">
          <label htmlFor="password" className="my-2 font-bold">
            پسورد
          </label>
          <input
            type="password"
            defaultValue=""
            {...register("password", {
              required: "لطفا فیلد پسورد را پر کنید",
            })}
            className="input input-bordered input-info  w-3/4 md:w-full max-w-xs m-auto "
          />
          <p className="text-red-600 text-xs pt-1">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <button className="btn btn-primary w-[200px] mt-10">ورود</button>
        </div>
        <div className="text-lg text-red-700 mt-10">{LoginError}</div>
      </form>
    </div>
  );
}

export default LoginForm;
