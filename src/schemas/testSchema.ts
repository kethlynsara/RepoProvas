import joi from "joi";
import { TestData } from "../repositories/testRepository.js";

export const testSchema = joi.object<TestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    category: joi.string().required(),
    discipline: joi.string().required(),
    teacher: joi.string().required()
});