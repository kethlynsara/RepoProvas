import { User } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateAuthData = Omit<User, "id">;

export interface SignUpDataStructure {
    email: string;
    password: string;
    confirmPassword: string
}

export async function findByEmail(email: string) {
    return prisma.user.findFirst({where: {email}});
}

export async function insert(signUpData: CreateAuthData) {
    return prisma.user.create({data: signUpData});
}
