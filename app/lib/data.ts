import { PrismaClient } from "@prisma/client";
import { resolve } from "path";
const prisma = new PrismaClient();

export async function getAllPosts(page : number , limit : number) {
  // await new Promise(resolve  => setTimeout(resolve, 5000))
  const skip = page * limit;
  
     
      return  await prisma.post.findMany({
        skip : skip,
        take : limit,
        orderBy : [
         { createdAt : 'desc'}
        ]
      });
      
     
  
   
  
  
}

export async function addNewPost(
  userId: string,
  title: string,
  content: string,
  category : string,
  imageUrl : string
) {
  try {
    await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: userId,
        category : category,
        imageUrl : imageUrl
      },
    });
  } catch (error) {
    throw new Error('the post cant be added form data module')
  }
  
}

export async function getAllUser() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getPost(id : string) { 
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
        
      },
      
      
    });
    
    return post;
    
  } catch (error) {
    throw new Error('Post has not be found')
  }
 
}

export async function getComment(id : string) {
  const comments = await prisma.comment.findMany({
    where: {
      postId : id
    }
  })
  return comments
}

export async function getAllComments(page : number , limit : number){
  const skip = page * limit;
  try {
    const comments = prisma.comment.findMany({
      skip : skip,
      take : limit
    })
    return comments
  } catch (error) {
    throw new Error('comment can not be fetched... ' + error)
  }
 
}

export async function getLike( userId : string , postId : string){
const like = prisma.like.findFirst({
  where : {
    userId : userId ,
    postId : postId
  }})
 return like



}

export async function likeNumber(id : string){
  const likesNumber = prisma.like.findMany({
    where : {
      postId : id
    }
  })
  return likesNumber
}

export async function getTopPosts(){
  try {
    const top = prisma.post.findMany({
  
      take : 6 ,
      orderBy : [
        { view : "desc"}
      ]
      
      
      
    })
    return top
  } catch (error) {
    
  }
}