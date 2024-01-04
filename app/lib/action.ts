'use server'

import { revalidatePath } from "next/cache";
import { addNewPost, getAllUser } from "./data";
import { redirect } from "next/navigation";

import { throws } from "assert";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { Category, SignUpInputs } from "./definations";
import {hash} from 'bcrypt'
import { PrismaClient } from "@prisma/client";







const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function addPost(data : FormData){
    const session = await getServerSession(authOptions)
    
    try {
        const  userId = session?.user.userId as string
        const title = data.get("title") as string
        const content = data.get('body') as string
        const category = data.get('category') as Category
        const imageUrl = data.get('url') as string
        
        addNewPost(userId,title,content , category , imageUrl)
        prisma.$disconnect()
    } catch (error) {
        throw new Error('the post cant be added') 
    }
   
   
    revalidatePath('/');
    redirect('/#posts');
   

}

export async function deletePost(id : string){

    const deleteComments =  prisma.comment.deleteMany({
        where : {
            postId : id
        }
    }
    )
    const deletePosts =  prisma.post.delete({
        where :{
            id : id
        }
    })
    // be carful in transaction other prisma cruds should not have await keyword 
    try {
        const transaction = await prisma.$transaction([deleteComments ,deletePosts ])
        prisma.$disconnect()
    } catch (error) {
        throw new Error('the post cant be deleted')
    }
    

   
    revalidatePath('/dashboard/editpost');
    revalidatePath('/' );
  
}

export async function handleEditPost(id:string , title: string , body : string  ) {
    
  try {
    await prisma.post.update({
        where : {
            id : id
        },
        data :{
          title : title,
          content : body,
       
        }
    })
    revalidatePath('/' );
    revalidatePath('/dashboard/editpost' );
   prisma.$disconnect()
    
  } catch (error) {
    throw new Error('the post cant be updated')
  }
  

}

export async function addComment( commentData : FormData){
    const comment = commentData.get("comment") as string
    const postId = commentData.get("postId") as string
    const userId =  commentData.get("userId") as string
    console.log(userId)
   try {
  
    await prisma.comment.create({
        data : {
            comment : comment,
            postId : postId,
            userId :  userId
        }
    })
    revalidatePath('/');
   
    prisma.$disconnect()
    
   } catch (error) {
    console.log(error)
   } 
}

export async function deleteComment(id : string){
    await prisma.comment.delete({
        where : {
            id : id
        }
    })
    revalidatePath('/dashboard/editcomments');
    revalidatePath('/[id]');
    revalidatePath('/');
    
 
}
 export async function AddViewPost(id : string){
    try {
        await prisma.post.update({
            where : {
                id : id
            },
            data : {
                view : {increment : 1} 
            }
           
        })
        revalidatePath('/')
    } catch (error) {
        throw new Error("the view can not be increased " + error);
        
    }
 }

 export async function handlePostLike(userId : string , postId :string){
    try {
        await prisma.like.create({
          data : {
            userId : userId ,
            postId : postId
            }
        })
        revalidatePath('/')
    } catch (error) {
        throw new Error("post can not be liked try again" + error);
        
    }
 }

 export async function handlePostDislike(id : string){
    try {
        await prisma.like.deleteMany({
          where : {
            postId : id
            }
        })
        revalidatePath('/')
        
    } catch (error) {
        throw new Error("post can not be disliked try again" + error);
        
    }
 }

 export async function createNewUser ( data : SignUpInputs) {
    try {
   const hashPass = await hash(data.password,6)
   const newUser =   await prisma.user.create({
  
        data : {
            name : data.name ,
            email : data.email,
            username : data.username,
            password : hashPass
        }
      })
    
    return newUser
    } catch (error) {
        
        console.log(error)
        
    }
 }

//  export async function userDeleteOwnComment(commentId : string) {
//     try {
//        console.log(commentId)
            
        
//     } catch (error) {
//        console.log(error) 
//     }
  
//  }