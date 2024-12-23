import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function queryCheckEmailExists(email){
    try {
        const checkEmail = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (checkEmail) {
            return false
        }
        return true
    } catch(error){
        console.error('Login error:', error);
        throw error;
    }
}