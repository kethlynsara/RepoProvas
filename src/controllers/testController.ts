import {  Request, Response } from "express";
import { CreateTestData } from "../repositories/testRepository.js";
import { categoryService } from "../services/categoryService.js";
import { teacherDisciplineService } from "../services/teacherDisciplineService.js";
import { testService } from "../services/testService.js";


export async function createTest(req: Request, res: Response) {
    const data: CreateTestData = req.body;
    await categoryService.checkExistingCategory(data.categoryId);
    await teacherDisciplineService.checkTeacherDisciplineId(data.teacherDisciplineId);
    await testService.createTest(data);
    res.sendStatus(201);
}