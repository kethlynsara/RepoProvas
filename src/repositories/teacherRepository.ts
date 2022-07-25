import prisma from "../config/database.js";

export async function findByName(name: string) {
    return prisma.teacher.findFirst({where: {name}});
}

export async function findTeacherDiscipline(teacherId: number, disciplineId: number) {
    return prisma.teacherDiscipline.findFirst({where: {teacherId, disciplineId}});
}