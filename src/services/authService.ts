import { SignUpDataStructure } from "../repositories/authRepository";
import * as authRepository from "../repositories/authRepository.js";
import bcrypt from "bcrypt";

async function checkUser(email: string, type: string) {
    const user = await authRepository.findByEmail(email);
    if (user && type === "signUp") {
        throw {
            type: "conflict",
            message: "email already registered"
        }
    }

    if (!user && type === "signIn") {
        throw {
            type: "not found",
            message: "email not found"
        }
    }
    return user;
}

async function encrypt(password: string) {
    const SALT = 10;
    return bcrypt.hashSync(password, SALT);
}

export async function signUp(signUpData: SignUpDataStructure) {
    await checkUser(signUpData.email, "signUp");
    const password = await encrypt(signUpData.password);
    await authRepository.insert({email: signUpData.email, password});
}

export const authService = {
    signUp
}