import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateTestData = Omit<Test, "id">;

export type TestData = {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}

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
                            id: true,
                            discipline: {},
                            teacher: {},
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
                            name: true,
                            term: {}
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