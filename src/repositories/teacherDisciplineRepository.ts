import prisma from "../config/database.js";

export async function findById(id: number) {
    return prisma.teacherDiscipline.findFirst({where: {id}});
}