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
                select: {
                    id: true,
                    name: true,
                    teacherDisciplines: {
                        select: {
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: {}
                                }
                            },
                            teacher: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export async function findByTeacher() {
    return prisma.teacher.findMany({
        include: {
            teacherDisciplines: {
                select: {
                    discipline: {
                        select: {
                            name: true
                        }
                    },
                    tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            category: {}
                        }
                    },
                }
            }
        }
    })
}