import { PostType } from "@/app/lib/definations";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CarouselItems from "./CarouselItems";

function Carousel({ postData }: { postData: PostType[] }) {
  return (
    <>
      <div className="carousel w-full h-[400px] ">
        {postData.map((pt: PostType, i: number) => (
          <CarouselItems key={i} postData={pt} index={i} />
        ))}
      </div>
      <div className="flex flex-row justify-center w-full py-2 gap-2">
        {postData.map((pt, i) => (
          <Link key={i} href={`#item${i + 1}`} className="btn btn-xs">
            {i + 1}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Carousel;
