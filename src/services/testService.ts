import { CreateTestData, insert } from "../repositories/testRepository.js";

export async function createTest(testData: CreateTestData) {
    await insert(testData);
}

export const testService = {
    createTest
}