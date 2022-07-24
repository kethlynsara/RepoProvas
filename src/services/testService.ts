import { CreateTestData, findByDiscipline, insert } from "../repositories/testRepository.js";

export async function createTest(testData: CreateTestData) {
    await insert(testData);
}

async function getTests(groupBy: string) {
    if (groupBy === "discipline") {
        const tests = await findByDiscipline();
        return {terms: tests};
    } else {
        console.log(groupBy)
    }  
    
}

export const testService = {
    createTest,
    getTests
}