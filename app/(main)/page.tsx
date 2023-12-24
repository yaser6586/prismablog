import Image from "next/image";
import { getAllPosts } from "../lib/data";
import Post from "../ui/main/Post";
import { PostType } from "../lib/definations";
import Link from "next/link";
import { FcNext } from "react-icons/fc";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.p === "string" ? Number(searchParams.p) : 0;
  const limit = typeof searchParams.l === "string" ? Number(searchParams.l) : 8;
  const posts: PostType[] = await getAllPosts(page, limit);

  const max = Math.ceil(posts.length) / limit;
  return (
    <div className="flex flex-col">
      <div
        className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4 min-h-screen p-3 "
        id="posts"
      >
        {posts.map((pt: PostType) => (
          <Post key={pt.id} postData={pt} />
        ))}
      </div>
      <div className="text-center flex justify-center ">
        {page > 0 && (
          <Link
            href={`http://localhost:3000/?p=${page > 1 ? page - 1 : 0}#posts`}
          >
            <FcNext size={30} style={{ transform: "rotate(-180deg)" }} />
          </Link>
        )}
        <h3 className="mt-2 mx-8">page {page + 1}</h3>
        {page < max && (
          <Link
            href={`http://localhost:3000/?p=${
              page < max ? page + 1 : max
            }#posts`}
            // className="btn btn-outline btn-accent m-5 "
          >
            <FcNext size={30} />
          </Link>
        )}
      </div>
    </div>
  );
}
