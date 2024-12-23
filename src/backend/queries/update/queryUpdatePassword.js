import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import {queryCheckPassword} from '../checks/queryCheckPassword.js';
import bcrypt from 'bcrypt'

export async function queryUpdatePassword(updatePassword,currentPassword,email) {
    
  try {
        const compareResult=await queryCheckPassword(email,currentPassword)
        if(compareResult){

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updatePassword, saltRounds);

        const updateUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
              password: hashedPassword,
            },
          })
        }

} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}