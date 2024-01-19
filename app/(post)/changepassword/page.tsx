"use client";

import { changeCurrentPassword, checkIfPasswordMatch } from "@/app/lib/action";
import { ChangePassInputs } from "@/app/lib/definations";
import AddPostButton from "@/app/ui/dashboardui/AddPostButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
let initial = { status: "", message: "" };
function ChangePassword() {
  //   const {
  //     register,
  //     handleSubmit,
  //     getValues,
  //     reset,
  //     formState: { errors, isSubmitSuccessful },
  //   } = useForm<ChangePassInputs>();

  const { data: session } = useSession();
  //   const onSubmit: SubmitHandler<ChangePassInputs> = async (data) => {
  //     changeCurrentPassword(data);
  //   };

  //   useEffect(() => {
  //     if (isSubmitSuccessful) {
  //       reset();
  //     }
  //   }, [isSuccessful]);

  const [state, formAction] = useFormState(changeCurrentPassword, initial);
  if (state.status === "successful") {
    let form = document.getElementById("form") as HTMLFormElement;
    form?.reset();
  }
  return (
    <div className="w-full flex flex-col justify-center py-5">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        action={formAction}
        className="m-auto flex flex-col w-1/2"
        id="form"
      >
        <label htmlFor="lastPassword" className="m-auto">
          پسورد قبلی
        </label>
        <input
          type="password"
          //   {...register("oldPassword", {
          //     required: "پسورد قبلی را وارد کنید",
          //   })}
          name="oldPassword"
          id="lastPassword"
          className="m-auto my-2 input input-bordered  w-[255px] md:w-full md:max-w-xs"
        />
        <label htmlFor="newPassword" className="m-auto">
          پسورد جدید
        </label>
        <input
          type="password"
          //   {...register("newPassword", {
          //     required: "پسورد جدید را وارد کنید",
          //     minLength: {
          //       value: 6,
          //       message: "پسورد باید حداقل 6 کاراکتر باشد",
          //     },
          //   })}
          name="newPassword"
          id="newPassword"
          className="m-auto my-2 input input-bordered  w-[255px] md:w-full md:max-w-xs"
          required
        />
        {/* <p className="m-auto text-sm text-red-700">
          {errors.newPassword?.message}
        </p> */}
        <label
          htmlFor="confirmPassword input input-bordered w-full "
          className="m-auto"
        >
          تکرار پسورد جدید
        </label>
        <input
          type="password"
          //   {...register("confirmPassword", {
          //     required: "تکرار پسورد جدید را وارد کنید",
          //     validate: (value) => {
          //       const { newPassword } = getValues();
          //       if (value !== newPassword) {
          //         return "تکرار پسورد با پسورد برابر نیست";
          //       }
          //     },
          //   })}
          name="confirmPassword"
          id="confirmPassword"
          className="m-auto my-2 input input-bordered w-[255px] md:w-full md:max-w-xs"
          minLength={6}
          required
        />
        {/* <p className="m-auto text-sm text-red-700">
          {errors.confirmPassword?.message}
        </p> */}
        <input
          type="text"
          //   {...register("userId")}
          name="userId"
          id="userId"
          defaultValue={session?.user?.userId}
          hidden
        />
        <div className="m-auto">
          {/* <button
            typeof="submit"
            className="btn btn-wide bg-primary text-white"
          >
            تغییر پسورد
          </button> */}
          <AddPostButton title="تغییر پسورد" />
        </div>
      </form>

      <div className="m-auto">
        {state?.status === "error" ? (
          <div className=" m-auto flex flex-col justify-center gap-3">
            <div className="text-red-700 m-auto ">{state.message}</div>
            {state.message === "پسورد قبلی اشتباه است" && (
              <div dir="rtl" className="m-auto text-center my-4 ">
                پسورد خود را فراموش کرده اید؟
                <Link className="text-blue-800" href={"/forgotpass"}>
                  ریست پسورد
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-green-700">{state.message}</div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
