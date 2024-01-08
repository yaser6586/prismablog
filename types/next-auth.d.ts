import { ProfileType } from "@/app/lib/definations"
import NextAuth, { DefaultSession } from "next-auth"
 
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
     
      imgUrl : string
      userId : string
      role: string | undefined | null
      profileId:string
      
    } & DefaultSession["user"]
     
  }
}