"use client";
import { handlePostDislike, handlePostLike } from "@/app/lib/action";
import { LikeType, PostType } from "@/app/lib/definations";
import { useSession } from "next-auth/react";
import { transform } from "next/dist/build/swc";
import { useEffect, useLayoutEffect, useState } from "react";
import { SlDislike } from "react-icons/sl";
import { SlLike } from "react-icons/sl";

function PostLike({
  postData,
  likeData,
}: {
  postData: PostType;
  likeData: LikeType;
}) {
  const [isLiked, setIsLiked] = useState(false);
  useLayoutEffect(() => {
    if (likeData === null) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }, [likeData]);

  const { data: session } = useSession();

  return (
    <div className="flex justify-center">
      {!isLiked && (
        <button
          className="text-blue-700"
          title="می پسندم"
          onClick={() => {
            handlePostLike(session?.user.userId as string, postData.id);
            setIsLiked(true);
          }}
        >
          <SlLike size={40} />
        </button>
      )}
      {isLiked && (
        <button
          className="text-red-700"
          title="نمی پسندم"
          onClick={() => {
            handlePostDislike(postData.id);
            setIsLiked(false);
          }}
        >
          <SlDislike size={40} />
        </button>
      )}
    </div>
  );
}

export default PostLike;
