import joi from "joi";
import { CreateAuthData, SignUpDataStructure } from "../repositories/authRepository";

export const signUpSchema = joi.object<SignUpDataStructure>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
});

export const signInSchema = joi.object<CreateAuthData>({
    email: joi.string().email().required(),
    password: joi.string().required()
});