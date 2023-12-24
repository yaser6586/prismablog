'use server'

import { revalidatePath } from "next/cache";
import { addNewPost, getAllUser } from "./data";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { throws } from "assert";






const prisma = new PrismaClient()

export async function addPost(data : FormData){
    try {
        const users = await getAllUser();
        
        const userId = users[1].id;
        const title = data.get("title") as string
        const content = data.get('body') as string
        const category = data.get('category') as string
        const imageUrl = data.get('url') as string
        
        addNewPost(userId,title,content , category , imageUrl)
        prisma.$disconnect()
    } catch (error) {
        throw new Error('the post cant be added') 
    }
   
   
    revalidatePath('/');
   
    redirect('/');
   

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

export async function addComment( comment : string , postId : string){
    
    await prisma.comment.create({
        data : {
            comment : comment,
            postId : postId
        }
    })
    revalidatePath('/');
   
    prisma.$disconnect()
}

export async function deleteComment(id : string){
    await prisma.comment.delete({
        where : {
            id : id
        }
    })
    revalidatePath('/dashboard/editcomments');
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