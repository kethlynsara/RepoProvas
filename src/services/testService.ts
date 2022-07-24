import { CreateTestData, findByDiscipline, findByTeacher, insert } from "../repositories/testRepository.js";

export async function createTest(testData: CreateTestData) {
    await insert(testData);
}

async function getTests(groupBy: string) {
    if (groupBy === "discipline") {
        return await findByDiscipline();
    } else if (groupBy === "teacher"){
        return  await findByTeacher();
    } else {
        throw {
            type: "not found",
            message: "invalid query string"
        }
    }    
}

export const testService = {
    createTest,
    getTests
}