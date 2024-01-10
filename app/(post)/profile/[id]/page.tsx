import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getProfile, getUserOfProfile } from "@/app/lib/data";
import {
  ProfileType,
  ProfileUser,
  SecureUser,
  UserType,
} from "@/app/lib/definations";
import Profile from "@/app/ui/main/Profile";

import { Session, getServerSession } from "next-auth";
import React from "react";

async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const profile = await getProfile(params.id);

    const user = await getUserOfProfile(profile?.userId!);

  return (
    <div className="w-full flex justify-center p-5">
      <Profile profileData={profile as ProfileType} user={user} />
    </div>
  );
}

export default page;
