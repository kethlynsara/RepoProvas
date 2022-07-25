import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization?.replace("Bearer", "").trim();
    if (!token) {
        return res.status(401).send("invalid token");
    }

    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        console.log('data', data)
        if (!data) {
            return res.status(401).send("invalid token");
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send("invalid token")
    }

    next();
}