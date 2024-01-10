import React from "react";
import Navbar from "./Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Session } from "next-auth";
import { getProfileOfUser, getUserOfProfile } from "@/app/lib/data";
import { ProfileType, UserOfProfile } from "@/app/lib/definations";

async function HeroSection() {
  const session = await getServerSession(authOptions);
  let profile;
  if (session) {
    profile = await getProfileOfUser(session?.user.userId as string);
  }

  return (
    <div>
      <Navbar profile={profile as UserOfProfile} />
    </div>
  );
}

export default HeroSection;
