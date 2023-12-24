import React from "react";

function loading() {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-4 min-h-screen p-3 ">
      {skeletonArray.map((sa, i) => (
        <div
          className="flex flex-col gap-4  mx-auto my-3 w-[300px] h-[320px]"
          key={i}
        >
          <div className="skeleton h-32 w-full "></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default loading;
