import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SignUpDataStructure } from "../repositories/authRepository";
import * as authRepository from "../repositories/authRepository.js";
dotenv.config();

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

async function checkPassword(password: string, hashPassword: string) {
    const SALT = 10;
    const comparePassword = bcrypt.compareSync(password, hashPassword);

    if (!comparePassword) {
        throw {
            type: "unauthorized",
            message: "invalid password",
        }
    }
}

async function generateToken(userId: number) {
    const data = {userId};
    const config = { expiresIn: 60*60*24*30 };
    const jwtKey = process.env.JWT_KEY;
    return jwt.sign(data, jwtKey, config);
}

export async function signUp(signUpData: SignUpDataStructure) {
    await checkUser(signUpData.email, "signUp");
    const password = await encrypt(signUpData.password);
    await authRepository.insert({email: signUpData.email, password});
}

export async function signIn(signUpData: authRepository.CreateAuthData) {
    const user = await checkUser(signUpData.email, "signIn");
    await checkPassword(signUpData.password, user.password);
    return await generateToken(user.id);;
}

export const authService = {
    signUp,
    signIn
}