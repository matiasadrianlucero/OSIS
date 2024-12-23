import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryCreatePost(postText, fileName,id) {
  try {
    // Hash the password before saving
    await prisma.post.create({
        data: {
            text: postText,
            img: fileName,
            createdBy: id,
        },
    });
    console.log('User created successfully');
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}