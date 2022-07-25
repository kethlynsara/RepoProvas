import { findCategories } from "../repositories/categoryRepository.js";
import { TestData } from "../repositories/testRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js"
import * as disciplineRepository from "../repositories/disciplineRepository.js"
import * as teacherRepository from "../repositories/teacherRepository.js"
import * as testRepository from "../repositories/testRepository.js";

async function checkExistingCategory(name: string) {
    const category = await categoryRepository.findByName(name);

    if (!category) {
        throw {
            type: "not found",
            message: "category not found"
        }
    }

    return category.id;
}

async function checkExistingDiscipline(name: string) {
    const discipline = await disciplineRepository.findByName(name);

    if (!discipline) {
        throw {
            type: "not found",
            message: "discipline not found"
        }
    }

    return discipline.id;
}

async function checkExistingTeacher(name: string) {
    const teacher = await teacherRepository.findByName(name);

    if (!teacher) {
        throw {
            type: "not found",
            message: "teacher not found"
        }
    }

    return teacher.id;
}

async function checkExistingTeacherDiscipline(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await teacherRepository.findTeacherDiscipline(teacherId, disciplineId);

    if (!teacherDiscipline) {
        throw {
            type: "not found",
            message: "discipline doesn't belong to this teacher"
        }
    }

    return teacherDiscipline.id;
}

async function checkInputData(testData: TestData) {
    const teacherId = await checkExistingTeacher(testData.teacher);
    const categoryId = await checkExistingCategory(testData.category);
    const disciplineId = await checkExistingDiscipline(testData.discipline);
    const teacherDisciplineId = await checkExistingTeacherDiscipline(teacherId, disciplineId);
    return {categoryId, disciplineId, teacherId, teacherDisciplineId};
}

async function createTest(testData: TestData) {
    const tableFieldsId = await checkInputData(testData);
    await testRepository.insert({
        name: testData.name,
        pdfUrl: testData.pdfUrl,
        categoryId: tableFieldsId.categoryId,
        teacherDisciplineId: tableFieldsId.teacherDisciplineId
    });
}

async function getTests(groupBy: string) {
    if (groupBy === "disciplines") {
        return await testRepository.findByDiscipline();
    } else if (groupBy === "teachers"){
        return  await testRepository.findByTeacher();
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