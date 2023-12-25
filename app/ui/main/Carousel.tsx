import { PostType } from "@/app/lib/definations";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Carousel({ postData }: { postData: PostType[] }) {
  return (
    <>
      <div className="carousel w-full h-[400px] ">
        {postData.map((pt, i) => (
          <div
            key={i}
            id={`item${i + 1}`}
            className="carousel-item w-full relative flex justify-center"
          >
            <Image
              alt="post image"
              src={pt.imageUrl ? pt.imageUrl : "/post.jpg"}
              className="w-full object-cover"
              height={1366}
              width={768}
            />
            <Link
              href={`/${pt.id}`}
              className="absolute m-auto bottom-5 text-center text-white bg-slate-300 backdrop-blur-md bg-opacity-40 min-w-[400px] md:min-w-[600px] rounded-2xl"
            >
              <h1 className="text-3xl my-5">{pt.title}</h1>
              <p>{pt.content?.slice(0, 35)}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center w-full py-2 gap-2">
        {postData.map((pt, i) => (
          <Link href={`#item${i + 1}`} className="btn btn-xs">
            {i + 1}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Carousel;
