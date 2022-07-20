import { NextFunction, Request, Response } from "express";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

export async function validateSignUpData(req: Request, res: Response, next: NextFunction) {
    const { error } = signUpSchema.validate(req.body, {abortEarly: false});

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}

export async function validateSignInData(req: Request, res: Response, next: NextFunction) {
    const { error } = signInSchema.validate(req.body, {abortEarly: false});

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}