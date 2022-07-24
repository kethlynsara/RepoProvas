import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

async function checkTeacherDisciplineId(id: number) {
    const teacherDiscipline = await teacherDisciplineRepository.findById(id);

    if (!teacherDiscipline) {
        throw {type: "not found", message: "invalid teacherDisciplineId"}
    }
}

export const teacherDisciplineService = {
    checkTeacherDisciplineId
};