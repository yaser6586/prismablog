import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="text-center mt-10 font-extrabold text-xl ">DASHBOARD</div>
  );
}

export default page;
