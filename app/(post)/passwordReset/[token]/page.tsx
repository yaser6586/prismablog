"use client";

import { restPassFinalStep } from "@/app/lib/action";
import { RestPassInputs } from "@/app/lib/definations";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiAlarm } from "react-icons/bi";

function PasswordResetPage({ params }: { params: { token: string } }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm<RestPassInputs>();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSuccessful(true);
    }
  }, [isSuccessful]);

  const onSubmit: SubmitHandler<RestPassInputs> = async (data) => {
    const result = await restPassFinalStep(data);
    setError(result?.error);
  };

  return (
    <div className="flex-col justify-center align-middle">
      <div className="flex flex-col justify-center align-middle border-2 my-10 p-4 max-w-[350px]  md:max-w-[500px] m-auto border-blue-600">
        <div className="m-auto ">پسورد جدید خود را وارد کنید</div>
        <div className="m-auto mt-7 w-full text-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-3"
          >
            <label htmlFor="password">پسورد</label>
            <input
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "تعداد کاراکتر نباید کمتر از 6 باشد",
                },
                required: "لطفا فیلد پسورد را پر کنید",
              })}
              type="password"
              className="input input-primary m-auto w-[300px] md:w-[400px]"
            />
            <p className="text-red-600 text-xs pt-1">
              {errors.password?.message}
            </p>
            <label htmlFor="confirm">تکرار پسورد</label>
            <input
              {...register("confirm", {
                validate: (value) => {
                  const { password } = getValues();
                  if (value !== password)
                    return "تکرار پسورد با پسورد برابر نیست";
                },
                required: "لطفا فیلد  تکرار پسورد را پر کنید",
              })}
              type="password"
              className="input input-primary m-auto w-[300px]  md:w-[400px]"
            />
            <p className="text-red-600 text-xs pt-1">
              {errors.confirm?.message}
            </p>
            <input
              {...register("token", {
                required: "لطفا فیلد تکرار پشسورد را پر کنید",
                value: params.token,
              })}
              type="text"
              className="input input-primary m-auto  w-[400px]"
              hidden
            />
            <button type="submit" className="btn btn-primary max-w-sm m-auto">
              بازنشانی پسورد
            </button>
          </form>
        </div>
      </div>
      <div className="text-red-700 pt-3 m-auto text-center">{error}</div>
    </div>
  );
}

export default PasswordResetPage;
