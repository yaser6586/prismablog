import React from "react";
import SimpleNave from "./SimplNav";
import { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getProfileOfUser } from "@/app/lib/data";
import { ProfileType } from "@/app/lib/definations";
import { getServerSession } from "next-auth";

async function SimpleHeroSection() {
  const session = await getServerSession(authOptions);

  //   const profile = await getProfileOfUser(session?.user.userId as string);

  return (
    <div>
      <SimpleNave />
    </div>
  );
}

export default SimpleHeroSection;
