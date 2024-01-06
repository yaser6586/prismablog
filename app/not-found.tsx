import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen  text-center  yekan ">
      <h2 className="m-auto my-10 text-5xl "> !!!پیدا نشد</h2>
      <p className="m-auto text-3xl">صفحه مورد نظر شما پیدا نشد </p>
      <div className="m-auto text-blue-700 py-10">
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
}
