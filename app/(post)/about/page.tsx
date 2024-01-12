"use client";
import { contactUsForm } from "@/app/lib/action";
import AddPostButton from "@/app/ui/dashboardui/AddPostButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
// import { IoClose } from "react-icons/io5";

// const initial = {
//   status: "",
//   message: "",
// };
function page() {
  // const [state, formAction] = useFormState(contactUsForm, initial);

  return (
    <div className="flex  justify-center flex-col md:flex-row-reverse gap-3 ">
      <div className="mt-10 mx-2 basis-1/2 text-start" dir="rtl">
        {" "}
        <div className="text-lg">درباره سایت :</div>
        <div className="m-auto" dir="rtl">
          در آذر ماه 1402 تصمیم به راه اندازی سایتی گرفتم که هر روزه اخباری از
          دنیای تکنولوژی قرار بدهم چیزی که سالها پیش علاقه داشتم انجام بدهم اما
          علاقه اصلی من فارغ از تولید محتوا طراحی وبسایتی پیشرفته بود که تمام
          کاراهای طراحی و کد نویسی و پیاده سازی آن از صفر تا صد را خودم انجام
          دهم پس از حدود نزدیک دو سال آموزش و یادگیری در زمینه html و css و
          react بلاخره موفق شدم با رجوع به سایت های یادگیری متعدد این وبسایت را
          با فریم ورک next js راهندازی کنم امیدوارم که از مطالب سایت راضی باشید
          <br />{" "}
          <span className="font-bold">طراح و ادمین سایت : یاسر حسینی</span>
        </div>
        <div className="m-auto my-4" dir="rtl">
          <span className="font-bold">قابلیت های سایت :</span> شما قابلیت عضویت
          در سایت را دارید و میتوانید پس از عضویت کامنت بگذارید و پستها را لایک
          کنید همچنین میتوانید پروفایل سایر اعضای سایت راببینید شما میتوانید در
          قسمت پروفایل خود روی آواتار خود عکس قرار دهید و بیو و نام خود را تغییر
          دهید
        </div>
        <div className="m-auto flex flex-row justify-between gap-10 border-2 rounded-3xl w-full">
          <div className="avatar m-auto p-2">
            <div className="w-60 rounded-full ">
              <Image
                alt="admin pic"
                src="/me.jpg"
                width={400}
                height={400}
                className="hover:scale-125 transition ease-linear duration-300 "
              />
            </div>
          </div>

          <div className="m-auto flex flex-col w-full justify-center">
            <div className="m-auto text-2xl font-bold text-center w-full">
              یاسر حسینی
            </div>
            <div className="m-auto text-center">
              {" "}
              مهندس نرم افزار <br /> توسعه دهنده فرانت اند <br /> React NextJs
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto basis-1/2 mt-10 flex flex-col justify-center gap-2 px-10 ">
        <div className="m-auto text-start" dir="rtl">
          <span className="text-xl font">تماس با ما</span> <br />
          موضوع یا مطلب خاصی مد نظر شما است که در قالب مقاله در تک نکست منتشر
          شود؟ <br />
          در هنگام مرور صفحات سایت متوجه مشکل خاصی شده اید؟
          <br /> پیشنهاد یا انتقادی به تحریریه ی تک نکست دارید؟ <br />
          از طریق ایمیل زیر با ما در ارتباط باشید و انتقادات و پیشنهادات خود را
          با ما در میان بگذارید. <br />
          ایمیل: <br /> <br />
          <Link
            href="mailto:contact@teknext.ir"
            className="text-red-700 font-bold"
          >
            contact@teknext.ir
          </Link>
        </div>

        {/* <form action={formAction} className="m-auto" id="contact-form">
          <div
            className="m-auto w-[500px] flex flex-col justify-center gap-3 
          border-2 border-slate-300 rounded-md p-6 relative"
          >
            <label htmlFor="email" className="m-auto">
              آدرس ایمیل شما
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full m-auto"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
            <label htmlFor="subject" className="m-auto">
              موضوع پیام
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="input input-bordered w-full m-auto "
              dir="rtl"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
            <label htmlFor="message" className="m-auto">
              پیام
            </label>
            <input
              type="text"
              name="message"
              id="message"
              className="input input-bordered input-lg w-full min-h-[100px] m-auto mt-3 overflow-scroll whitespace-pre"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              dir="rtl"
            />
            <div className="m-auto">
              {" "}
              <AddPostButton title="فرستادن پیام" />
            </div>
            <button
              type="reset"
              className="m-auto absolute top-2 right-1 hover:text-red-700"
              title="بازنشانی"
            >
              <IoClose size={25} />
            </button>

            {state?.status === "error" ? (
              <div className="text-red-700 m-auto">{state.message}</div>
            ) : (
              <div className="text-green-700 m-auto">{state?.message}</div>
            )}
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default page;
