import * as categoryRepository from "../repositories/categoryRepository.js";

async function checkExistingCategory(categoryId: number) {
    const category = await categoryRepository.findById(categoryId);

    if (!category) {
        throw {type: "not found", message: "invalid category" }
    }
}

export const categoryService = {
    checkExistingCategory    
}