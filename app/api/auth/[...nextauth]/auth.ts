import { checkUser } from "@/app/lib/data"
import { PostType, UserType } from "@/app/lib/definations";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions : NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
    
      // ...add more providers here
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
      
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
         const user = await checkUser(credentials?.username as string )
         
        if(!user) {
            return null
        }
         const isPassValid = await compare(credentials?.password as string , user?.password as string)
        if(!isPassValid) {
            return null
        }else {
            return user
        }
        }
    })
    ],
    callbacks: {
       
       
        async session({ session, token }) {
          
          return {
            ...session , 
            user:  {
                ...session.user,
                userId : token.sub,
               role :  token.role
            }
          
          }
        },
        async jwt({ token, user}) {
            const u = user as unknown as UserType
         if(user){
            return {
                ...token , 
                userId : u.id,
                role : u.role

            }
         }
         return token
        }
        
      },
 pages : {
  signIn : "/signin"
 }
    
  }
  