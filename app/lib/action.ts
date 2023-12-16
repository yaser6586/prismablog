'use server'

import { revalidatePath } from "next/cache";
import { addNewPost, getAllUser } from "./data";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";






const prisma = new PrismaClient()

export async function addPost(data : FormData){
    const users = await getAllUser();
    console.log(users)
    const userId = users[3].id;
    const title = data.get("title") as string
    const content = data.get('body') as string
    addNewPost(userId,title,content)
   
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
    const transaction = await prisma.$transaction([deleteComments ,deletePosts ])

   
    revalidatePath('/dashboard/editpost');
    revalidatePath('/' );
  
}

export async function handleEditPost(id:string , title: string , body : string  ) {
    

    await prisma.post.update({
        where : {
            id : id
        },
        data :{
          title : title,
          body : body
        }
    })
    revalidatePath('/' );
   
   prisma.$disconnect()
    

}

export async function addComment( formData : FormData){
    const PostId = formData.get("postId") as string
    const comment = formData.get("comment") as string
    await prisma.comment.create({
        data : {
            comment : comment,
            postId : PostId
        }
    })
    revalidatePath('/[id]');
    prisma.$disconnect()
}

export async function deleteComment(id : Number){
    await prisma.comment.delete({
        where : {
            id : id
        }
    })
    revalidatePath('/dashboard/editcomments');
    revalidatePath('/');
    
 
}