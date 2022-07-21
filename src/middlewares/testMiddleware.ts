import { NextFunction, Request, Response } from "express";
import { testSchema } from "../schemas/testSchema.js";

export async function validateTestData(req: Request, res: Response, next: NextFunction) {
    const { error } = testSchema.validate(req.body, {abortEarly: false});

    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}