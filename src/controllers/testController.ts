import {  Request, Response } from "express";
import { TestData } from "../repositories/testRepository.js";
import { testService } from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const data: TestData = req.body;
    await testService.createTest(data);
    res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
    const {groupBy} = req.query;
    if (!groupBy) {
        return res.sendStatus(404);
    }
    const tests = await testService.getTests(groupBy.toString());
    res.send({tests});
}

export async function getCategories(req: Request, res: Response) {
    const categories = await testService.getCategories();
    res.send({categories});
}