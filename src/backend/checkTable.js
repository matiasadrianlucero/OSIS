import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function checkTable() {
    try {
        const checkUser = await prisma.user.findMany();
        const checkasd = await prisma.post.findMany();
        console.log(checkUser,checkasd)
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
}
