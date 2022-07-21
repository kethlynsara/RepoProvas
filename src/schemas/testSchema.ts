import joi from "joi";
import { CreateTestData } from "../repositories/testRepository.js";

export const testSchema = joi.object<CreateTestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().integer().required(),
    disciplineId: joi.number().integer().required(),
    teacherDisciplineId: joi.number().integer().required()
});