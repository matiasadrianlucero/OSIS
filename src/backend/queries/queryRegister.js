import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


export async function queryRegister(username, email,password) {
  try {
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
            loginToken: "",
        },
    });
    console.log('User created successfully');
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}