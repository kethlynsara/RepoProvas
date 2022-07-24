import { findCategories } from "../repositories/categoryRepository.js";
import { CreateTestData, findByDiscipline, findByTeacher, insert } from "../repositories/testRepository.js";

async function createTest(testData: CreateTestData) {
    await insert(testData);
}

async function getTests(groupBy: string) {
    if (groupBy === "disciplines") {
        return await findByDiscipline();
    } else if (groupBy === "teachers"){
        return  await findByTeacher();
    } else {
        throw {
            type: "not found",
            message: "invalid query string"
        }
    }    
}

async function getCategories() {
    return await findCategories();
}

export const testService = {
    createTest,
    getTests,
    getCategories
}