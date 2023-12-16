import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllPosts() {
  return await prisma.post.findMany();
}

export async function addNewPost(
  userId: string,
  title: string,
  content: string
) {
  await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: userId,
    },
  });
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
    prisma.$disconnect()
    return post;
    
  } catch (error) {
    throw new Error('Post has not be found')
  }
 
}
