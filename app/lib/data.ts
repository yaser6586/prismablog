import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { resolve } from "path";
import { Category, UserType } from "./definations";
import { title } from "process";
import { revalidatePath } from "next/cache";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getAllPosts(page : number , limit : number) {
  // await new Promise(resolve  => setTimeout(resolve, 5000))
  const skip = page * limit;
  
     
      return  await prisma.post.findMany({
        skip : skip || 0,
        take : limit,
        orderBy : [
         { createdAt : 'desc'}
        ]
      });
}

export async function getAllPostsForProps() {
  // await new Promise(resolve  => setTimeout(resolve, 5000))
    const postsId = await prisma.post.findMany({
      select : {
        id : true
      }
    });
  
     return postsId 
}

export async function getAllPostsForSitemap() {
  // await new Promise(resolve  => setTimeout(resolve, 5000))

    const posts = await prisma.post.findMany({
  
  
      select :{
        id: true,
        slug : true,
        updatedAt : true
      }
    });
  
    return posts
    
  
 
}

// export async function addNewPost(
//   userId: string,
//   title: string,
//   content: string,
//   category : Category,
//   imageUrl : string
// ) {
  
//   try {
//     await prisma.post.create({
//       data: {
//         title: title,
//         content: content,
//         authorId: userId,
//         category : category,
//         imageUrl : imageUrl
//       },
//     });
   
//   } catch (error) {
    
//     throw new Error('the post cant be added form data module')
//   }
  
// }

export async function getAllUser() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getPost(slug : string) { 
  try {
  const post = await prisma.post.findUnique({
    where: {
     slug : slug
      
    },
    
    
  });
  
  return post;

} catch (error) {
  console.log(error)
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

export async function checkUser(username : string ) {
  const user = await prisma.user.findUnique({
    where : {
      username : username,
     
    },
    include : {
      profile : true
    }
   
  })
  return user
}
export async function getUserOfComment(userId : string){
  try {
    const user = await prisma.user.findUnique({
      where : {
        id  : userId
      },
      include : {
        profile : true
      }
    })
    
    return user
    
  } catch (error) {
    console.log(error)
  }
}

export async function getPostByCat(category : Category){
  try {
    const posts = await prisma.post.findMany({
     where : { category : category},
     orderBy : [
      { createdAt : 'desc'}
     ]
    })
    return posts
  } catch (error) {
    throw new Error("posts can not be found");
    
  }
}

export async function searchPost( query : string ) {
  try {
    const posts = await prisma.post.findMany({
      where : {
        OR : [
         { title : {
            contains : query
          },
        
        },
        {
          content : {
            contains : query
           }
        }
        ]
      }
    })
    return posts
  } catch (error) {
    throw new Error("this post include this query has not be found");
    
  }
}

export async function getAllIds() {
  const ids = await prisma.post.findMany({
    select : {
      id : true
    }
  })

  return ids
}
export async function getProfile(id : string) {
  try {
    const profile = await prisma.profile.findUnique({
      where : {
        id : id
      },
      include : {
        user :true
      }
    })
    
    return profile
  } catch (error) {
    throw new Error("profile has not be found")
  }
}

export async function getUserOfProfile(id : string){
  
  try {
    const user = await prisma.user.findUnique({
      where : {
        id : id
      }
    })
    const { password, username , ...rest} = user as UserType
    return rest
  } catch (error) {
    throw new Error("user has not be found")
  }
  
}

export async function getProfileOfUser(id:string){
  try {
    const profile = await prisma.profile.findUnique({
      where : {
        userId : id
      },
      include :{
        user : true
      }
    })

     
      const profileId = profile?.id
      const userId = profile?.userId
      const ImgUrl = profile?.user.imgUrl
      const name = profile?.name
    return {profileId,userId,ImgUrl , name}
  } catch (error) {
    throw new Error("در یافتن پروفایل مشکلی پیش آمده");
    
    // return null
  }

}

