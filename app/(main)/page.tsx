import Image from "next/image";
import { checkUser, getAllPosts, getTopPosts } from "../lib/data";
import Post from "../ui/main/Post";
import { PostType } from "../lib/definations";
import Link from "next/link";
import { FcNext } from "react-icons/fc";
import { title } from "process";
import Carousel from "../ui/main/Carousel";
import { ImFire } from "react-icons/im";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.p === "string" ? Number(searchParams.p) : 0;
  const limit = typeof searchParams.l === "string" ? Number(searchParams.l) : 8;
  const posts: PostType[] = await getAllPosts(page, limit);
  const topPosts: PostType[] | undefined = await getTopPosts();
  const session = await getServerSession(authOptions);

  const max = Math.ceil(posts.length) / limit;
  return (
    <div className="flex flex-col">
      <div
        className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4 min-h-screen p-3 "
        id="posts"
        dir="rtl"
      >
        {posts.map((pt: PostType) => (
          <Post key={pt.id} postData={pt} />
        ))}
      </div>
      <div className="text-center flex justify-center mb-8 ">
        {page > 0 && (
          <Link href={`/?p=${page > 1 ? page - 1 : 0}#posts`} title="prev page">
            <FcNext size={30} style={{ transform: "rotate(-180deg)" }} />
          </Link>
        )}
        <h3 className="mt-2 mx-8">{page + 1} صفحه</h3>
        {page < max && (
          <Link
            href={`/?p=${page < max ? page + 1 : max}#posts`}
            title="next page"
            // className="btn btn-outline btn-accent m-5 "
          >
            <FcNext size={30} />
          </Link>
        )}
      </div>
      <div className="w-full m-auto text-center border-t-2 ">
        <div className="flex flex-row justify-center">
          <div className="font-bold text-2xl my-11   text-center border-2 rounded-full p-2">
            پست های پربازدید
          </div>
          <div className="text-red-700 my-14 mx-4 ">
            <ImFire size={35} />
          </div>
        </div>
        <Carousel postData={topPosts as PostType[]} />
      </div>
    </div>
  );
}
