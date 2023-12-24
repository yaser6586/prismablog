import { getAllPosts } from "@/app/lib/data";
import { PostType } from "@/app/lib/definations";
import PostTable from "@/app/ui/dashboardui/PostTable";
import Link from "next/link";
import { FcNext } from "react-icons/fc";

async function editPost({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.p === "string" ? Number(searchParams.p) : 0;
  const limit =
    typeof searchParams.l === "string" ? Number(searchParams.l) : 20;
  const posts: PostType[] = await getAllPosts(page, limit);
  const max = Math.ceil(posts.length) / limit + 1;
  return (
    <div className="flex flex-col ">
      <div className="grid grid-cols-4 my-4 ml-2 border-b-[1px] border-slate-600 font-bold relative">
        <div>index</div>
        <div>title</div>
        <div>body</div>
        <div>operations</div>
      </div>
      <div
        className="w-full h-fit grid
       grid-cols-4 pl-2 "
      >
        {posts.map((pt, i) => (
          <PostTable key={1} postData={pt} index={i} />
        ))}
      </div>
      <div className="text-center flex justify-center m-8">
        {page > 0 && (
          <Link
            href={`http://localhost:3000/dashboard/editpost?p=${
              page > 1 ? page - 1 : 0
            }`}
          >
            <FcNext size={30} style={{ transform: "rotate(-180deg)" }} />
          </Link>
        )}
        <h3 className="mt-2 text-sm">page {page + 1}</h3>
        {page < max && (
          <Link
            href={`http://localhost:3000/dashboard/editpost?p=${
              page < max ? page + 1 : max
            }`}
            // className="btn btn-outline btn-accent m-5 "
          >
            <FcNext size={30} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default editPost;
