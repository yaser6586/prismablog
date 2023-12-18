import Image from "next/image";
import { getAllPosts } from "../lib/data";
import Post from "../ui/main/Post";

export default async function Home() {
  const posts: PostType[] = await getAllPosts();

  return (
    <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4 min-h-screen p-3 ">
      {posts.map((pt: PostType) => (
        <Post key={pt.id} postData={pt} />
      ))}
    </div>
  );
}
