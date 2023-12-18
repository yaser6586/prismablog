import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllPosts() {
  try {
    prisma.$connect()
    return await prisma.post.findMany();
    
  } catch (error) {
    throw new Error('the posts can not be found'  + error)
  }
  
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
