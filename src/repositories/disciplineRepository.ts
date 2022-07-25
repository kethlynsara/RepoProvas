import prisma from "../config/database.js";

export async function findByName(name: string) {
    return prisma.discipline.findFirst({where: {name}});
}