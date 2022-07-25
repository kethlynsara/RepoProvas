import prisma from "../config/database.js";

export async function findCategories() {
    return prisma.category.findMany();
}

export async function findByName(name: string) {
    return prisma.category.findFirst({where: {name}});
}