import { Request, Response } from "express";
import { SignUpDataStructure } from "../repositories/authRepository.js";
import { authService } from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const data: SignUpDataStructure = req.body;
    await authService.signUp(data);
    res.sendStatus(201);
}