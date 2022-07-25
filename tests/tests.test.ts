import supertest from "supertest";
import app from "../src/app/index.js";
import prisma from "../src/config/database.js";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1ODc1MzQ2NSwiZXhwIjoxNjYxMzQ1NDY1fQ.kaeTKQ0KTxH608Pdi8YTc4ViaPIpBpK4TAhq4UBdmOY";
const testData = {
    name: "prova 1",
    pdfUrl: "httpps://prova1.com", 
    category: "Projeto",
    discipline: "JavaScript",
    teacher: "Diego Pinho"
}

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM tests`;
});

describe("Tests tests suite", () => {
    it("given name, pdfUrl, category, discipline and teacher, register test", async () => {
        const response = await supertest(app).post("/tests").set('Authorization', `Bearer ${TOKEN}`).send(testData);
        expect(response.statusCode).toBe(201);

        const test = await prisma.test.findFirst({where: {name: testData.name}});
        expect(test).not.toBeNull;
    });

    it("get tests by teachers", async () => {
        const response = await supertest(app).get("/tests/?groupBy=teachers").set('Authorization', `Bearer ${TOKEN}`);
        expect(response.body).not.toBeNull;
    });

    it("get tests by disciplines", async () => {
        const response = await supertest(app).get("/tests/?groupBy=disciplines").set('Authorization', `Bearer ${TOKEN}`);
        expect(response.body).not.toBeNull;
    });

    it("get tests with no query string, should fail", async () => {
        const response = await supertest(app).get("/tests/").set('Authorization', `Bearer ${TOKEN}`);
        expect(response.statusCode).toBe(404);
    });

    it("get tests with a wrong query string, should fail", async () => {
        const response = await supertest(app).get("/tests/?groupBy=teacher").set('Authorization', `Bearer ${TOKEN}`);
        expect(response.statusCode).toBe(404);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
})