import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateTestData = Omit<Test, "id">;

export async function insert(testData: CreateTestData) {
    return prisma.test.create({data: testData});
}

export async function findByDiscipline() {
    return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        select: {
                            tests: {
                                include: {
                                    category: {}
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}