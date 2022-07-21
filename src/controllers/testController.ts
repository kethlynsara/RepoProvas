import {  Request, Response } from "express";
import { CreateTestData } from "../repositories/testRepository.js";
import { testService } from "../services/testService.js";


export async function createTest(req: Request, res: Response) {
    const data: CreateTestData = req.body;
    await testService.createTest(data);
    res.sendStatus(201);
}