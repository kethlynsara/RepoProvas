import prisma from "../config/database.js";

export async function findById(id: number) {
    return prisma.category.findFirst({where: {id}});
}

export async function findCategories() {
    return prisma.category.findMany();
}